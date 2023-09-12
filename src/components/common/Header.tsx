import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import COLORS from '../../constants/colors';
import {logoImage, menuIcon} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';
import {RootState} from '../../store/store';

export default function Header() {
  const profileImage = useSelector((state: RootState) => state?.user?.image);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.imageContainer,
            {backgroundColor: COLORS.lightergray},
          ]}>
          <Image source={menuIcon} style={styles.menuIcon} resizeMode="cover" />
        </View>
        <View style={styles.headerMiddle}>
          <Image
            source={logoImage}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <Text style={styles.logoText}>Stylish</Text>
        </View>

        <Pressable
          style={styles.imageContainer}
          onPress={() => navigation.navigate('Profile')}>
          {profileImage ? (
            <Image
              source={{uri: profileImage}}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : (
            <Icon name="user" size={32} color={COLORS.black} />
          )}
        </Pressable>
      </View>
      <View style={styles.searchBarContainer}>
        <Text>
          <Icon name="search" size={20} color={COLORS.gray} />
        </Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search any Product"
          placeholderTextColor={COLORS.gray}
        />
        <Text>
          <Icon name="mic" size={20} color={COLORS.gray} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMiddle: {
    flexDirection: 'row',
    gap: 10,
  },
  logoImage: {
    height: 34,
  },
  logoText: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 18,
    color: COLORS.blue,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    paddingHorizontal: 20,
    borderColor: COLORS.black,
  },
  searchBar: {},
  profileImage: {
    position: 'absolute',
    width: 45,
    height: 45,
  },
  imageContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 40,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightpink,
  },
  menuIcon: {},
});
