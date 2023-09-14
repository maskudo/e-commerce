import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
import * as yup from 'yup';

type Inputs = {
  username: string | undefined;
  businessAddressDetail: {
    pincode: number | undefined;
    address: string | undefined;
    city: string | undefined;
    country: string | undefined;
  };
  bankAccountDetails: {
    bankAccountNumber: number | undefined;
    accountHolderName: string | undefined;
    ifscCode: number | undefined;
  };
};

const UserDetailsValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is Required')
    .min(3, ({min}) => `Username must be at least ${min} characters`)
    .max(20, ({max}) => `Username must be at most ${max} characters`),
  businessAddressDetail: yup.object().shape({
    pincode: yup
      .number()
      // .test({
      //   name: '4 digits',
      //   test(value, ctx) {
      //     if (value?.toString().length !== 4) {
      //       return ctx.createError({
      //         message: 'Pincode must be a 4 digit number.',
      //       });
      //     }
      //     return true;
      //   },
      // })
      .label('Pincode')
      .min(1000, 'Pincode must be a 4 digit number')
      .max(9999, 'Pincode must be a 4 digit number'),

    address: yup
      .string()
      .min(3, ({min}) => `Address must be at least ${min} characters`)
      .max(30, ({max}) => `Address must be at most ${max} characters`)
      .label('Address'),
    city: yup
      .string()
      .min(3, ({min}) => `City must be at least ${min} characters`)
      .max(30, ({max}) => `City must be at most ${max} characters`)
      .label('City'),
    country: yup
      .string()
      .min(3, ({min}) => `Country must be at least ${min} characters`)
      .max(30, ({max}) => `Country must be at most ${max} characters`)
      .label('Country'),
  }),
  bankAccountDetails: yup.object().shape({
    bankAccountNumber: yup
      .string()
      .min(1000_0000_0000_0000, 'Pincode must be a 16 digit number')
      .max(9999_9999_9999_9999, 'Pincode must be a 16 digit number')
      .label('Bank Account Number'),
    accountHolderName: yup
      .string()
      .min(
        3,
        ({min}) => `Account Holder Name must be at least ${min} characters`,
      )
      .max(
        30,
        ({max}) => `Account Holder Name must be at most ${max} characters`,
      )
      .label('Account Holder Name'),
    ifscCode: yup
      .string()
      .length(6, ({length}) => `IFSC Code must be ${length} characters`)
      .label('IFSC Code'),
  }),
});

export default function Form() {
  const user = useSelector((state: RootState) => state.user);
  const initialValues: Inputs = {
    username: user.username,
    businessAddressDetail: {
      pincode: user.businessAddressDetail?.pincode,
      address: user.businessAddressDetail?.address,
      city: user.businessAddressDetail?.city,
      country: user.businessAddressDetail?.country,
    },
    bankAccountDetails: {
      bankAccountNumber: user.bankAccountDetails?.bankAccountNumber,
      accountHolderName: user.bankAccountDetails?.accountHolderName,
      ifscCode: user.bankAccountDetails?.ifscCode,
    },
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserDetailsValidationSchema}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.formContainer}>
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.textInput}
                placeholder={user.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholderTextColor={COLORS.lightgray}
              />
              {errors.username && touched.username ? (
                <Text style={styles.errorMessage}>{errors.username}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Business Address Details</Text>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>Pincode</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('businessAddressDetail.pincode')}
                onBlur={handleBlur('businessAddressDetail.pincode')}
                value={values.businessAddressDetail?.pincode}
              />
              {errors.businessAddressDetail?.pincode ? (
                <Text style={styles.errorMessage}>
                  {errors.businessAddressDetail.pincode}
                </Text>
              ) : null}
            </View>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('businessAddressDetail.address')}
                onBlur={handleBlur('businessAddressDetail.address')}
                value={values.businessAddressDetail?.address}
              />
              {errors.businessAddressDetail?.address ? (
                <Text style={styles.errorMessage}>
                  {errors.businessAddressDetail.address}
                </Text>
              ) : null}
            </View>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('businessAddressDetail.city')}
                onBlur={handleBlur('businessAddressDetail.city')}
                value={values.businessAddressDetail?.city}
              />
              {errors.businessAddressDetail?.city &&
              touched.businessAddressDetail?.city ? (
                <Text style={styles.errorMessage}>
                  {errors.businessAddressDetail.city}
                </Text>
              ) : null}
            </View>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('businessAddressDetail.country')}
                onBlur={handleBlur('businessAddressDetail.country')}
                value={values.businessAddressDetail?.country}
              />
              {errors.businessAddressDetail?.country &&
              touched.businessAddressDetail?.country ? (
                <Text style={styles.errorMessage}>
                  {errors.businessAddressDetail.country}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Bank Account Details</Text>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>Bank Account Number</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange(
                  'bankAccountDetails.bankAccountNumber',
                )}
                onBlur={handleBlur('bankAccountDetails.bankAccountNumber')}
                value={values.bankAccountDetails.bankAccountNumber}
              />
              {errors.bankAccountDetails?.bankAccountNumber &&
              touched.bankAccountDetails?.bankAccountNumber ? (
                <Text style={styles.errorMessage}>
                  {errors.bankAccountDetails?.bankAccountNumber}
                </Text>
              ) : null}
            </View>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>Account Holder's Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange(
                  'bankAccountDetails.accountHolderName',
                )}
                onBlur={handleBlur('bankAccountDetails.accountHolderName')}
                value={values.bankAccountDetails.accountHolderName}
              />
              {errors.bankAccountDetails?.accountHolderName &&
              touched.bankAccountDetails?.accountHolderName ? (
                <Text style={styles.errorMessage}>
                  {errors.bankAccountDetails?.accountHolderName}
                </Text>
              ) : null}
            </View>
            <View style={styles.inputContaiener}>
              <Text style={styles.inputLabel}>IFSC Code</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('bankAccountDetails.ifscCode')}
                onBlur={handleBlur('bankAccountDetails.ifscCode')}
                value={values.bankAccountDetails.ifscCode}
              />
              {errors.bankAccountDetails?.ifscCode &&
              touched.bankAccountDetails?.ifscCode ? (
                <Text style={styles.errorMessage}>
                  {errors.bankAccountDetails?.ifscCode}
                </Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    gap: 30,
  },
  detailSection: {
    gap: 10,
    // borderWidth: 1,
    borderColor: COLORS.red,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 18,
  },
  inputContaiener: {
    gap: 1,
    // borderWidth: 1,
  },
  inputLabel: {
    ...TYPOGRAPHY.captions,
    fontSize: 12,
  },
  textInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.lightgray,
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
  errorMessage: {
    ...TYPOGRAPHY.captions,
    color: COLORS.red,
    fontSize: 12,
  },
});
