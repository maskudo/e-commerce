import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Rating} from 'react-native-ratings';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';

export type ItemProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  stars: number;
  reviews: number;
  image: string;
};
export default function Item({
  item,
  height,
}: {
  item: ItemProps;
  height: number;
}) {
  const discountedPrice = item.discount
    ? (1 - item.discount / 100) * item.price
    : item.price;
  const navigation = useNavigation();
  const handlePress = () => navigation.navigate('ItemScreen', {item});
  return (
    <Pressable style={[styles.item, {height: height}]} onPress={handlePress}>
      <View style={styles.itemInfoContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.discountAndRating}>
            <View style={styles.rating}>
              <Text style={styles.reviews}>{item.reviews}</Text>
              <Rating
                fractions={2}
                startingValue={item.stars}
                type="star"
                imageSize={13}
              />
            </View>
            <View style={styles.discounts}>
              <Text style={styles.price}>${discountedPrice}</Text>
              {!!item.discount && (
                <View style={styles.discountInfo}>
                  <Text style={styles.discount}>Upto {item.discount}%Off</Text>
                  <Text style={styles.greyAndCrossed}>${item.price}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.hr} />
      <View style={styles.totalOrder}>
        <Text style={styles.totalOrderText}>Total Order(1):</Text>
        <Text style={styles.totalOrderText}>${discountedPrice}</Text>
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
    padding: 10,
    height: 125,
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
    justifyContent: 'space-between',
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
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
});
