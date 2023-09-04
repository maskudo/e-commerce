import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import Swiper from 'react-native-swiper';
import FONTS from '../constants/fonts';

export default function Swipe() {
  const navigation = useNavigation();
  return (
    <Swiper
      bounces={true}
      pagingEnabled={true}
      paginationStyle={{
        position: 'absolute',
        bottom: 250,
      }}
      dot={<View style={styles.dot} />}
      activeDot={
        <View style={{...styles.dot, backgroundColor: COLORS.black}} />
      }>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome to </Text>
          <Text style={styles.eCommerce}>eCommerce</Text>
        </View>
        <View style={styles.imageContainer} />
        <View style={styles.next}>
          <TouchableOpacity
            style={styles.nextText}
            onPress={() => navigation.navigate('Login')}
          />
          <Text style={styles.nextText}>
            Next {'  '}
            <Octicons name="arrow-right" style={{...styles.nextText}} />
          </Text>
        </View>
        <View style={styles.blackContainerOutline} />
        <View style={styles.blackContainer} />
      </View>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome to </Text>
          <Text style={styles.eCommerce}>eCommerce</Text>
        </View>
        <View style={styles.imageContainer} />
        <View style={styles.next}>
          <TouchableOpacity
            style={styles.nextText}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                ...styles.nextText,
                fontFamily: FONTS.fontBold,
                color: COLORS.black,
              }}>
              Next {'  '}
              <Octicons
                name="arrow-right"
                style={{...styles.nextText, color: COLORS.black}}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.blackContainerOutline} />
        <View
          style={{...styles.blackContainer, backgroundColor: COLORS.lightblue}}
        />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderWidth: 1,
    borderColor: COLORS.black,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  container: {
    position: 'relative',
    backgroundColor: COLORS.white,
  },
  welcomeContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    ...TYPOGRAPHY.bodyRegular,
    color: COLORS.gray,
  },
  eCommerce: {
    ...TYPOGRAPHY.title,
  },
  imageContainer: {
    height: '30%',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: '100%',
  },
  next: {
    height: '40%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '20%',
    paddingRight: 40,
  },
  nextText: {
    ...TYPOGRAPHY.buttonLarge,
    color: COLORS.white,
    zIndex: 2,
  },
  blackContainer: {
    position: 'absolute',
    width: 240,
    height: 240,
    bottom: -40,
    right: -40,
    borderWidth: 1,
    borderRadius: 79,
    backgroundColor: COLORS.black,
    transform: [{rotate: '45deg'}],
  },
  blackContainerOutline: {
    position: 'absolute',
    width: 255,
    height: 260,
    bottom: -45,
    right: -45,
    borderWidth: 1,
    borderRadius: 79,
    transform: [{rotate: '45deg'}],
  },
});
