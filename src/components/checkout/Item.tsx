import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
import {updateCartItem, updateUserCart} from '../../slices/cartSlice';
import {RootState} from '../../store/store';
import {ItemProps} from '../common/Item';

export default function Item({
  item,
  height,
}: {
  item: ItemProps;
  height: number;
}) {
  const discountedPrice = (1 - (item.discount ?? 0) / 100) * item.price;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const cart = useSelector((state: RootState) => state.cart);
  const cartItem = cart.items.find(i => i.itemId === item.id);
  const handlePress = () => navigation.navigate('ItemScreen', {item});
  const [qty, setQty] = useState(cartItem?.qty ?? 1);
  const decCount = () =>
    setQty(q => {
      let val = Math.max(q - 1, 1);
      dispatch(updateCartItem({cartItemId: cartItem.id, qty: val}));
      return val;
    });
  const incCount = () =>
    setQty(q => {
      let val = Math.min(q + 1, 10);
      dispatch(updateCartItem({cartItemId: cartItem.id, qty: val}));
      return val;
    });
  const updateCart = () => {
    dispatch(
      updateUserCart({
        itemId: item.id,
        userId,
        add: false,
      }),
    );
  };

  return (
    <Pressable style={[styles.item, {height: height}]} onPress={handlePress}>
      <View style={styles.itemInfoContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.discountAndRating}>
            <View style={styles.discounts}>
              <Text style={styles.price}>${discountedPrice}</Text>
              {!!item.discount && (
                <View style={styles.discountInfo}>
                  <Text style={styles.discount}>Upto {item.discount}%Off</Text>
                  <Text style={styles.greyAndCrossed}>${item.price}</Text>
                </View>
              )}
            </View>
            <View style={styles.counterAndDeleteContainer}>
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={decCount}>
                  <Icon name="minus" size={30} style={styles.counterIcon} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{qty}</Text>
                <TouchableOpacity onPress={incCount}>
                  <Icon name="plus" size={30} style={styles.counterIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={updateCart}>
                <Icon name="trash" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.hr} />
      <View style={styles.totalOrder}>
        <Text style={styles.totalOrderText}>Total Order({qty}):</Text>
        <Text style={styles.totalOrderText}>${qty * discountedPrice}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 5,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  itemInfoContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
  },
  itemInfo: {
    paddingHorizontal: 10,
    height: 125,
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    height: 125,
    width: 130,
    borderRadius: 4,
  },
  name: {
    ...TYPOGRAPHY.bodySmall,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    fontSize: 10,
  },
  greyAndCrossed: {
    color: COLORS.lightgray,
    textDecorationLine: 'line-through',
    fontSize: 12,
  },
  discountAndRating: {
    flex: 1,
    justifyContent: 'space-around',
  },
  discountInfo: {
    marginHorizontal: 10,
    alignItems: 'center',
    height: 29,
  },
  discount: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.red,
    fontSize: 8,
  },
  counterAndDeleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
  },
  discounts: {
    flexDirection: 'row',
  },
  price: {
    height: 29,
    borderWidth: 1,
    borderColor: COLORS.lightgray,
    borderRadius: 4,
    padding: 3,
    ...TYPOGRAPHY.h2Bold,
    fontSize: 16,
    textAlign: 'center',
  },
  hr: {
    height: 1,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
  },
  totalOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalOrderText: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 12,
  },
  counterIcon: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.lightgray,
    borderRadius: 10,
  },
  counterText: {
    ...TYPOGRAPHY.h3,
  },
});
