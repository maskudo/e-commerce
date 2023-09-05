import Swiper from 'react-native-swiper';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import COLORS from '../../constants/colors';
import {discountsImage} from '../../constants/images';
import Icon from 'react-native-vector-icons/Feather';
import TYPOGRAPHY from '../../constants/typography';

export default function DiscountSwiper() {
  return (
    <Swiper
      style={styles.discountSwiper}
      bounces={true}
      pagingEnabled={true}
      dot={<View style={styles.dot} />}
      paginationStyle={{
        position: 'absolute',
        bottom: 0,
      }}
      activeDot={
        <View style={{...styles.dot, backgroundColor: COLORS.pink}} />
      }>
      <SwiperScreen />
      <SwiperScreen />
      <SwiperScreen />
    </Swiper>
  );
}
function SwiperScreen() {
  return (
    <Pressable>
      <Image source={discountsImage} style={styles.newArrivalImage} />
      <View style={styles.textContainer}>
        <Text style={styles.discount}>40-50% OFF</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Now in(product)</Text>
          <Text style={styles.info}>All colours</Text>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.shopnow}>Shop Now</Text>
          <Icon name="arrow-right" size={16} color={COLORS.white} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  discountSwiper: {
    height: 220,
    position: 'relative',
  },
  newArrivalImage: {
    position: 'absolute',
    height: 200,
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    margin: 3,
    backgroundColor: COLORS.lightgray,
  },
  textContainer: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  discount: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 20,
    color: COLORS.white,
  },
  infoContainer: {
    gap: 5,
    paddingBottom: 10,
  },
  info: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 12,
  },
  shopnow: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    gap: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.white,
    height: 32,
  },
});
