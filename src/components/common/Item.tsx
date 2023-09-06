import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
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
    ? item.discount * item.price
    : item.price;
  const navigation = useNavigation();
  const handlePress = () => navigation.navigate('ItemScreen', {item});
  return (
    <Pressable style={[styles.item, {height: height}]} onPress={handlePress}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 170,
    paddingBottom: 2,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  itemInfo: {
    padding: 4,
    height: 125,
  },
  image: {
    width: '100%',
    height: 125,
    flex: 1,
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
