import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import COLORS from '../../constants/colors';
import {
  electronicsCategoryImage,
  mensCategoryImage,
  womensCategoryImage,
  jeweleryCategoryImage,
} from '../../constants/images';
import TYPOGRAPHY from '../../constants/typography';

export const CATEGORIES = [
  {
    id: 1,
    name: 'Mens',
    image: mensCategoryImage,
  },
  {
    id: 2,
    name: 'Womens',
    image: womensCategoryImage,
  },
  {
    id: 3,
    name: 'Electronics',
    image: electronicsCategoryImage,
  },
  {
    id: 4,
    name: 'Jewelery',
    image: jeweleryCategoryImage,
  },
];

export default function Categories() {
  const navigation = useNavigation();
  const goToCategory = category => navigation.navigate('Category', {category});
  return (
    <FlatList
      contentContainerStyle={styles.categoryContainer}
      data={CATEGORIES}
      horizontal={true}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.category}>
          <TouchableOpacity
            onPress={() => goToCategory(item.name)}
            key={item.name}
            style={styles.categoryButton}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.categoryButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.categoryText}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 25,
    width: '100%',
    padding: 5,
  },
  categoryText: {
    textTransform: 'capitalize',
    ...TYPOGRAPHY.captions,
    color: COLORS.black,
    fontSize: 12,
  },
  categoryButton: {
    height: 56,
    width: 56,
    borderRadius: 56,
    borderWidth: 0,
    overflow: 'hidden',
  },
  categoryButtonImage: {
    width: '100%',
    height: '100%',
  },
  category: {
    gap: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
