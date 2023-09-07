import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import {couponImage} from '../constants/images';

export default function PlaceOrder({route}) {
  const navigation = useNavigation();
  const {item} = route.params;
  const goBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack}>
            <Icon name="chevron-left" size={30} color={COLORS.black} />
          </Pressable>
          <View>
            <Text style={styles.headerText}>Shopping Bag</Text>
          </View>
          <Pressable onPress={goBack}>
            <Icon name="heart" size={20} color={COLORS.black} />
          </Pressable>
        </View>

        <View style={styles.itemDetail}>
          <View>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
          <View style={styles.itemTextInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.description}>
              {item.description}
            </Text>
            <Text style={styles.description}>
              Delivered by <Text style={styles.deliveryDate}>10 May 20XX</Text>
            </Text>
          </View>
        </View>

        <View style={styles.couponContainer}>
          <View style={styles.coupon}>
            <Image style={styles.couponImage} source={couponImage} />
            <Text style={styles.couponText}>Apply Coupons</Text>
          </View>
          <Text style={styles.couponSelect}>Select</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.paymentDetailsContainer}>
          <Text style={styles.paymentDetailsTitle}>Order Payment Details</Text>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailTitle}>Order Amounts</Text>
            <Text style={styles.paymentDetailPrice}>${item.price}</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailTitle}>Convenience</Text>
            <Text style={styles.paymentDetailValue}>Apply Coupon</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailTitle}>Delivery Fee</Text>
            <Text style={styles.paymentDetailValue}>Free</Text>
          </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.paymentDetailsContainer}>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailTitle}>Order Total</Text>
            <Text style={styles.paymentDetailPrice}>${item.price}</Text>
          </View>
          <View style={styles.paymentDetail}>
            <Text style={styles.paymentDetailTitle}>EMI Available</Text>
            <Text style={styles.paymentDetailValue}>Details</Text>
          </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.goToCheckoutContainer}>
          <View>
            <Text style={styles.paymentDetailPrice}>${item.price}</Text>
            <Text style={styles.paymentDetailValue}>View Details</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.buttonText}>Proceed To Payment</Text>
          </Pressable>
        </View>
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
    gap: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerText: {
    ...TYPOGRAPHY.caption,
    fontSize: 18,
    color: COLORS.black,
  },
  itemDetail: {
    flexDirection: 'row',
    gap: 20,
    padding: 2,
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 4,
  },
  name: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 16,
  },
  description: {
    ...TYPOGRAPHY.captions,
    fontSize: 13,
  },
  deliveryDate: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 16,
  },
  itemTextInfo: {
    gap: 10,
  },
  couponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coupon: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  couponImage: {},
  couponText: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 16,
  },
  couponSelect: {
    ...TYPOGRAPHY.h2Regular,
    color: COLORS.red,
    fontSize: 14,
  },
  hr: {
    height: 1,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
  },
  paymentDetailsContainer: {
    gap: 20,
  },
  paymentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDetailValue: {
    color: COLORS.red,
  },
  paymentDetailPrice: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 16,
  },
  paymentDetailTitle: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 16,
  },
  paymentDetailsTitle: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 17,
  },
  buttonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontSize: 15,
  },
  button: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.red,
    borderRadius: 5,
  },
  goToCheckoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
  },
});
