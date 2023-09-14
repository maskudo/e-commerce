import {useNavigation} from '@react-navigation/native';
import {nanoid} from 'nanoid';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import COLORS from '../constants/colors';
import {updateUserProfilePicture} from '../slices/userSlice';
import TYPOGRAPHY from '../constants/typography';
import {RootState} from '../store/store';
import storage from '@react-native-firebase/storage';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

type Inputs = {
  username: string;
  businessAddressDetail?: {
    pincode?: number;
    address?: string;
    city?: string;
    country?: string;
  };
  bankAccountDetails?: {
    bankAccountNumber?: number;
    accountHolderName?: string;
    ifscCode?: number;
  };
};

export default function Profile() {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const goBack = () => navigation.goBack();
  const logOut = async () => await auth().signOut();

  const handleClickProfileImage = async () => {
    let image;
    try {
      image = await ImageCropPicker.openPicker({
        cropping: false,
      });
    } catch (e) {
      return;
    }
    const filename = nanoid().toString();
    const reference = storage().ref(filename);
    const fileRef = storage().ref(filename);
    await fileRef.putFile(image.path);
    const download_link = await reference.getDownloadURL();
    dispatch(
      updateUserProfilePicture({
        imageUrl: download_link,
        userId: user.id,
        errorCallback: () => fileRef.delete(),
      }),
    );
  };
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={goBack}>
            <Icon name="chevron-left" size={30} color={COLORS.black} />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Profile</Text>
          </View>
          <Pressable onPress={logOut}>
            <Icon name="log-out" size={20} color={COLORS.black} />
          </Pressable>
        </View>
        <View style={styles.profilePic}>
          <View style={styles.imageContainerOutline}>
            <Pressable
              style={styles.imageContainer}
              onPress={handleClickProfileImage}>
              {user?.image ? (
                <Image
                  source={{uri: user.image}}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <Icon name="user" size={50} color={COLORS.black} />
              )}
            </Pressable>
          </View>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.textInput}
              placeholder={user.username}
              placeholderTextColor={COLORS.lightgray}
            />
          </View>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Business Address Details</Text>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>Pincode</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>Country</Text>
            <TextInput style={styles.textInput} />
          </View>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>Bank Account Details</Text>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>Bank Account Number</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>Account Holder's Name</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputContaiener}>
            <Text style={styles.inputLabel}>IFSC Code</Text>
            <TextInput style={styles.textInput} />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    gap: 130,
    flex: 1,
  },
  headerText: {
    ...TYPOGRAPHY.caption,
    fontSize: 18,
    color: COLORS.black,
  },
  profilePic: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    position: 'absolute',
    width: 120,
    height: 120,
  },
  imageContainer: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 90,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainerOutline: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 100,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.lightpink,
  },
  detailSection: {
    gap: 20,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2Regular,
    fontSize: 18,
  },
  inputContaiener: {
    gap: 10,
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
  handle: {
    ...TYPOGRAPHY.bodyRegular,
    color: 'gray',
  },
});
