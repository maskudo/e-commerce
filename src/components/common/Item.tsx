import {Image, StyleSheet, Text, View} from 'react-native';
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
export default function Item({item}: {item: ItemProps}) {
  const discountedPrice = item.discount
    ? item.discount * item.price
    : item.price;
  return (
    <View style={styles.item}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.discountAndRating}>
          <View style={styles.discounts}>
            <Text style={styles.price}>${discountedPrice}</Text>
            {!!item.discount && (
              <View style={styles.discountInfo}>
                <Text style={styles.greyAndCrossed}>${item.price}</Text>
                <Text style={styles.discount}>{item.discount}%Off</Text>
              </View>
            )}
          </View>
          <View style={styles.rating}>
            <Text style={styles.stars}>{item.stars}*</Text>
            <Text style={styles.reviews}>{item.reviews}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 170,
    paddingBottom: 2,
    backgroundColor: COLORS.white,
  },
  itemInfo: {
    padding: 4,
  },
  image: {
    width: '100%',
    height: 125,
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
  },
  discountAndRating: {
    flex: 1,
    justifyContent: 'space-between',
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  discount: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.red,
    fontSize: 10,
  },
  rating: {
    flexDirection: 'row',
    gap: 5,
  },
});
