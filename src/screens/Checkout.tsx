import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import BrandIcon from 'react-native-vector-icons/FontAwesome5';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import Item from '../components/checkout/Item';
import {ITEMS} from '../constants/data';
import {useState} from 'react';

const PAYMENT_OPTIONS = [
  {type: 'visa', icon: 'cc-visa', accountNo: '*********2109'},
  {type: 'paypal', icon: 'cc-paypal', accountNo: '*********2109'},
  {type: 'apple-pay', icon: 'cc-apple-pay', accountNo: '*********2109'},
  {type: 'mastercard', icon: 'cc-mastercard', accountNo: '*********2109'},
];

export default function Checkout() {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
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
            <Text style={styles.headerText}>Checkout</Text>
          </View>
        </View>
        <View style={styles.deliveryAddressContainer}>
          <View style={styles.deliveryAddressHeader}>
            <Icon name="map-pin" size={18} color={COLORS.gray} />
            <Text style={styles.deliveryAddressHeaderText}>
              Delivery Address
            </Text>
          </View>
          <View style={styles.deliveryAddressBody}>
            <View style={[styles.deliveryAddress, styles.boxShadow]}>
              <Text style={styles.deliveryAddressTitle}>Address</Text>
              <Text style={styles.deliveryAddressLocation}>
                216 St Paul's Rd, London N1 2LL, UK {'\n'}Contact : +44-784232
              </Text>
            </View>
            <View style={[styles.editDeliveryAddress, styles.boxShadow]}>
              <Icon name="plus-circle" size={30} color={COLORS.black} />
            </View>
          </View>
        </View>
        <View style={styles.shoppingList}>
          <Text style={styles.shoppingListTitle}>Shopping List</Text>
          <View>
            <Item item={ITEMS[0]} />
            <Item item={ITEMS[1]} />
          </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.totalCost}>
          <View style={styles.totalCostTextContainer}>
            <Text style={styles.totalCostText}>Order</Text>
            <Text style={styles.totalCostText}>$7000</Text>
          </View>
          <View style={styles.totalCostTextContainer}>
            <Text style={styles.totalCostText}>Shipping</Text>
            <Text style={styles.totalCostText}>$30</Text>
          </View>
          <View style={[styles.totalCostTextContainer]}>
            <Text style={[styles.totalCostText, {color: COLORS.black}]}>
              Total
            </Text>
            <Text style={[styles.totalCostText, {color: COLORS.black}]}>
              $7030
            </Text>
          </View>
        </View>
        <View style={styles.hr} />
        <View style={styles.paymentContainer}>
          <Text style={[styles.totalCostText, {color: COLORS.black}]}>
            Payment
          </Text>
          {PAYMENT_OPTIONS.map(payment => (
            <Pressable
              style={[
                styles.paymentOption,
                {
                  borderWidth: payment.type === selectedPaymentOption ? 1 : 0,
                  borderColor:
                    payment.type === selectedPaymentOption
                      ? COLORS.red
                      : COLORS.lightergray,
                },
              ]}
              key={payment.type}
              onPress={() => setSelectedPaymentOption(payment.type)}>
              <BrandIcon name={payment.icon} size={30} color={COLORS.black} />
              <Text style={[styles.totalCostText, {color: COLORS.black}]}>
                {payment.accountNo}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 13,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    gap: 20,
    overflow: 'visible',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 130,
    flex: 1,
  },
  headerText: {
    ...TYPOGRAPHY.caption,
    fontSize: 18,
    color: COLORS.black,
  },
  deliveryAddressContainer: {
    gap: 20,
  },
  deliveryAddressHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  boxShadow: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  editDeliveryAddress: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryAddress: {
    height: '100%',
    width: 241,
  },
  deliveryAddressHeaderText: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 14,
  },
  deliveryAddressBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  deliveryAddressTitle: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 12,
  },
  deliveryAddressLocation: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 12,
  },
  hr: {
    height: 1,
    borderWidth: 0.5,
    borderColor: COLORS.lightgray,
  },
  shoppingList: {
    gap: 10,
  },
  shoppingListTitle: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 14,
  },
  totalCost: {},
  totalCostTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalCostText: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 18,
    color: COLORS.lightgray,
  },
  paymentContainer: {
    gap: 20,
  },
  paymentOption: {
    flex: 1,
    height: 60,
    backgroundColor: COLORS.lightergray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
});
