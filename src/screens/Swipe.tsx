import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import COLORS from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import Swiper from 'react-native-swiper';
import {swiperImage1, swiperImage2, swiperImage3} from '../constants/images';

// use next and prev button properties instead
export default function Swipe() {
  return (
    <Swiper
      bounces={true}
      pagingEnabled={true}
      paginationStyle={{
        position: 'absolute',
        bottom: 20,
      }}
      dot={<View style={styles.dot} />}
      style={styles.swiper}
      activeDot={
        <View style={{...styles.dot, backgroundColor: COLORS.black}} />
      }>
      <View>
        <Screen
          image={swiperImage1}
          title={'Choose Products'}
          description={
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
          }
        />
        <Text style={styles.next}>Next</Text>
      </View>
      <View>
        <Screen
          image={swiperImage2}
          title={'Make Payment'}
          description={
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
          }
        />
        <Text style={styles.previous}>Prev</Text>
        <Text style={styles.next}>Next</Text>
      </View>
      <View>
        <Screen
          image={swiperImage3}
          title={'Get Your Order'}
          description={
            'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.'
          }
        />
        <Text style={styles.previous}>Prev</Text>
        <Text style={styles.next}>Get Started</Text>
      </View>
    </Swiper>
  );
}

function Screen({image, title, description}) {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.skip}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  swiper: {},
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
  screen: {
    padding: 10,
    height: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  imageContainer: {flex: 3 / 5, justifyContent: 'flex-end'},
  text: {height: '40%', flex: 2 / 5, alignItems: 'center'},
  title: {
    ...TYPOGRAPHY.h2Bold,
  },
  description: {
    textAlign: 'center',
    ...TYPOGRAPHY.captions,
    color: COLORS.gray,
  },
  next: {
    ...TYPOGRAPHY.h3,
    color: COLORS.red,
    textAlign: 'right',
    width: '100%',
    paddingRight: 10,
    position: 'absolute',
    bottom: 10,
  },
  previous: {
    ...TYPOGRAPHY.h3,
    color: COLORS.red,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
    position: 'absolute',
    bottom: 10,
  },
  skip: {
    position: 'absolute',
    width: '100%',
    paddingRight: 10,
    top: 10,
  },
  skipText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    textAlign: 'right',
  },
});
