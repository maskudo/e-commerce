import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import FilterHeader from '../components/common/FilterHeader';
import Item, {ItemProps} from '../components/common/Item';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import {useSelector} from 'react-redux';
import {updateUserWishlist} from '../slices/userSlice';
import {RootState} from '../store/store';
import {updateUserCart} from '../slices/cartSlice';

export default function ItemScreen({route}) {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const products = useSelector((state: RootState) => state.products);
  const {item}: {item: ItemProps} = route.params;
  const [numberOfLines, setNumberOfLines] = useState(6);
  const inUserWishlist = user.wishlist?.includes(item.id);
  const inUserCart = cart?.items?.find(i => i.itemId === item.id);
  const discountedPrice = item.discount
    ? (1 - item.discount / 100) * item.price
    : item.price;
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const similarProducts = products.filter(
    product => product.category === item.category,
  );
  const dispatch = useDispatch();
  const updateWishlist = () => {
    dispatch(
      updateUserWishlist({
        itemId: item.id,
        userId: user.id,
        add: !inUserWishlist,
      }),
    );
  };
  const updateCart = () => {
    dispatch(
      updateUserCart({
        itemId: item.id,
        userId: user.id,
        add: !inUserCart,
      }),
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Pressable onPress={goBack}>
            <Icon name="chevron-left" size={30} color={COLORS.black} />
          </Pressable>
        </View>
        <Swiper
          style={styles.swiper}
          bounces={true}
          pagingEnabled={true}
          dot={<View style={styles.dot} />}
          paginationStyle={{
            position: 'absolute',
          }}
          activeDot={
            <View style={{...styles.dot, backgroundColor: COLORS.pink}} />
          }>
          <Image source={{uri: item.image}} style={styles.image} />
          <Image source={{uri: item.image}} style={styles.image} />
        </Swiper>
        <View style={styles.itemInformation}>
          <Text>{item.name}</Text>
          <View style={styles.discountAndRating}>
            <View style={styles.rating}>
              <Rating
                fractions={2}
                startingValue={item.rating.rate}
                type="star"
                imageSize={13}
              />
              <Text style={styles.reviews}>{item.rating.count}</Text>
            </View>
            <View style={styles.discounts}>
              {!!item.discount && (
                <Text style={styles.greyAndCrossed}>${item.price}</Text>
              )}
              <Text style={styles.price}>${discountedPrice}</Text>
              {!!item.discount && (
                <Text style={styles.discount}>{item.discount}%Off</Text>
              )}
            </View>
          </View>
          <View>
            <Text style={styles.productDetail}>Product Details</Text>
            <Text
              numberOfLines={numberOfLines}
              ellipsizeMode="tail"
              style={styles.description}
              onPress={() => setNumberOfLines(0)}>
              {item.description}
            </Text>
          </View>
        </View>
        <View style={styles.additionalInformation}>
          <View style={styles.iconContainer}>
            <Ionicon name="location-outline" size={16} color={COLORS.gray} />
            <Text style={styles.iconText}>Nearest Store</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicon name="lock-closed-outline" size={16} color={COLORS.gray} />
            <Text style={styles.iconText}>VIP</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicon name="sync-circle-outline" size={16} color={COLORS.gray} />
            <Text style={styles.iconText}>Return Policy</Text>
          </View>
        </View>
        <View style={styles.buyOptions}>
          <TouchableOpacity onPress={updateWishlist} style={styles.addToButton}>
            <Text style={styles.addToButtonText}>
              {inUserWishlist ? 'Unw' : 'W'}ishlist
            </Text>
            <Ionicon
              name={inUserWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={COLORS.red}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={updateCart} style={styles.addToButton}>
            <Text style={styles.addToButtonText}>
              {inUserCart ? 'Remove from ' : 'Add to '}Cart
            </Text>
            <MaterialIcon
              name={inUserCart ? 'remove-shopping-cart' : 'add-shopping-cart'}
              size={24}
              solid
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.deliveryInContainer}>
          <Text style={styles.deliveryInText}>Delivery in</Text>
          <Text style={styles.deliveryInDurationText}>Within 1 Hour</Text>
        </View>
        <View style={styles.compareContainer}>
          <View style={styles.innerCompareContainer}>
            <Icon name="eye" size={20} color={COLORS.black} />
            <Text style={styles.compareText}>View Similar</Text>
          </View>
          <View style={styles.innerCompareContainer}>
            <Icon name="eye" size={20} color={COLORS.black} />
            <Text style={styles.compareText}>Add to Compare</Text>
          </View>
        </View>
        <FilterHeader title={`${similarProducts?.length ?? 0} Similar Items`} />
        <ScrollView horizontal={true}>
          <FlatList
            contentContainerStyle={styles.items}
            data={similarProducts}
            numColumns={2}
            keyExtractor={itemEl => itemEl.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <Item item={item} />}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  scrollView: {
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swiper: {
    height: 220,
    position: 'relative',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    margin: 3,
    backgroundColor: COLORS.lightgray,
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  itemInformation: {
    gap: 20,
  },
  discountAndRating: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 5,
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  discount: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.red,
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  greyAndCrossed: {
    color: COLORS.lightgray,
    textDecorationLine: 'line-through',
  },
  discounts: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
  price: {
    color: COLORS.black,
  },
  productDetail: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 14,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    fontSize: 12,
  },
  additionalInformation: {
    flexDirection: 'row',
    gap: 10,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  iconText: {
    ...TYPOGRAPHY.captions,
    fontSize: 10,
    color: COLORS.gray,
  },
  buyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buyOptionsImage: {
    width: 136,
    height: 40,
  },
  deliveryInContainer: {
    width: '100%',
    height: 60,
    backgroundColor: COLORS.lightpink,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deliveryInText: {
    ...TYPOGRAPHY.captions,
    fontSize: 14,
  },
  deliveryInDurationText: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 21,
  },
  compareContainer: {
    height: 50,
    flexDirection: 'row',
    gap: 2,
  },
  innerCompareContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: COLORS.lightgray,
    borderRadius: 8,
    gap: 2,
  },
  compareText: {
    ...TYPOGRAPHY.captions,
    fontSize: 14,
  },

  items: {
    gap: 10,
  },
  addToButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: COLORS.lightergray,
    backgroundColor: COLORS.white,
    width: '45%',
    padding: 10,
  },
});
