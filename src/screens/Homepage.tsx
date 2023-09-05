import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Categories from '../components/common/Categories';
import DiscountSwiper from '../components/home/DiscountSwiper';
import Item from '../components/common/Item';
import COLORS from '../constants/colors';
import {ITEMS} from '../constants/data';
import {logoImage, newArrivalImage, sponsoredImage} from '../constants/images';
import TYPOGRAPHY from '../constants/typography';
import Deals from '../components/home/Deals';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
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
          <TextInput
            style={styles.searchBar}
            placeholder="Search any Product"
          />
          <Text>
            <Icon name="mic" size={14} color={COLORS.black} />
          </Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.featureText}>All Featured</Text>
          <View style={styles.filterCategory}>
            <View>
              <Text>
                Sort
                <Icon name="filter" size={14} color={COLORS.black} />
              </Text>
            </View>
            <View>
              <Text>
                Filter
                <Icon name="filter" size={14} color={COLORS.black} />
              </Text>
            </View>
          </View>
        </View>
        <Categories />
        <DiscountSwiper />
        <Deals />
        <View style={styles.newArrival}>
          <Image source={newArrivalImage} style={styles.newArrivalImage} />
          <View style={styles.newArrivalTextContainer}>
            <Text style={styles.newArrivalText}>New Arrival</Text>
            <View style={styles.newArrivalTextAndButtonContainer}>
              <Text style={styles.newArrivalInnerText}>
                Summer' 25 Collection
              </Text>
              <Pressable style={styles.newArrivalButton}>
                <Text style={styles.newArrivalButtonText}>View All</Text>
                <Icon name="arrow-right" size={12} color={COLORS.white} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.sponsored}>
          <Text style={styles.sponsoredText}>Sponsored</Text>
          <Pressable style={styles.sponsoredPressable}>
            <Image source={sponsoredImage} style={styles.sponsoredImage} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.discountText}>Up to 50% off </Text>
              <Icon name="chevron-right" size={24} color={COLORS.gray} />
            </View>
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
  scrollview: {
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
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureText: {
    ...TYPOGRAPHY.h3,
    fontWeight: 'bold',
  },
  discountSwiper: {
    height: 220,
    position: 'relative',
  },
  newArrival: {
    backgroundColor: COLORS.white,
  },

  newArrivalImage: {
    height: 200,
    width: '100%',
  },
  newArrivalTextContainer: {
    padding: 4,
    paddingBottom: 10,
  },
  newArrivalText: {
    ...TYPOGRAPHY.h3,
  },
  newArrivalTextAndButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newArrivalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.red,
    borderRadius: 4,
    height: 30,
    padding: 7,
  },
  newArrivalButtonText: {
    fontSize: 12,
    color: COLORS.white,
  },
  newArrivalInnerText: {
    ...TYPOGRAPHY.bodyRegular,
  },
  sponsored: {
    backgroundColor: COLORS.white,
    padding: 10,
    gap: 10,
  },
  sponsoredText: {
    ...TYPOGRAPHY.h3,
  },
  sponsoredImage: {
    height: 292,
    borderRadius: 8,
  },
  discountText: {
    ...TYPOGRAPHY.h2Bold,
    fontSize: 16,
  },
  sponsoredPressable: {
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    margin: 3,
    backgroundColor: COLORS.lightgray,
  },
});
