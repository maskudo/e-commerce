import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import COLORS from '../../constants/colors';
import {beautyCategoryImage} from '../../constants/images';

const CATEGORIES = ['Beauty', 'Fashion', 'Kids', 'Mens', 'Womens'];

export default function Categories() {
  return (
    <FlatList
      style={styles.categoryContainer}
      data={CATEGORIES}
      horizontal={true}
      keyExtractor={item => item}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.category}>
          <TouchableOpacity
            onPress={() => {}}
            key={item}
            style={styles.categoryButton}>
            <ImageBackground
              source={beautyCategoryImage}
              resizeMode="cover"
              style={styles.categoryButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.categoryText}>{item}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    margin: 10,
  },
  categoryText: {
    paddingLeft: 7,
  },
  categoryButton: {
    height: 56,
    width: 56,
    marginRight: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.blue,
    overflow: 'hidden',
  },
  categoryButtonImage: {
    width: '100%',
    height: '100%',
  },
  category: {
    gap: 5,
  },
});
