import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import {logoImage} from '../../constants/images';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>
          <Icon name="menu" size={32} color={COLORS.black} />
        </Text>
        <View style={styles.headerMiddle}>
          <Image
            source={logoImage}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <Text>Stylish</Text>
        </View>
        <Text>
          <Icon name="user" size={32} color={COLORS.black} />
        </Text>
      </View>
      <View style={styles.searchBarContainer}>
        <Text>
          <Icon name="search" size={14} color={COLORS.black} />
        </Text>
        <TextInput style={styles.searchBar} placeholder="Search any Product" />
        <Text>
          <Icon name="mic" size={14} color={COLORS.black} />
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
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: COLORS.black,
  },
  searchBar: {},
});
