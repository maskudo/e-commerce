import {FlatList, Pressable, StyleSheet, View, Text} from 'react-native';
import {PRODUCTS} from '../../constants/data';
import Icon from 'react-native-vector-icons/Ionicons';
import Item from '../common/Item';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';

export default function Deals() {
  return (
    <View>
      <View style={styles.deal}>
        <View style={styles.textContainer}>
          <Text style={styles.dotd}>Deal of the day</Text>
          <View style={styles.timeContainer}>
            <Icon name="alarm-outline" color={COLORS.white} size={20} />
            <Text style={styles.time}>22h 55m 20s remaining</Text>
          </View>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>View All</Text>
          <Icon name="arrow-forward" size={12} color={COLORS.white} />
        </Pressable>
      </View>
      <FlatList
        contentContainerStyle={styles.items}
        data={PRODUCTS}
        horizontal={true}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Item item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    gap: 5,
  },
  deal: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    padding: 5,
    marginBottom: 20,
  },
  dotd: {
    ...TYPOGRAPHY.buttonRegular,
    color: COLORS.white,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  time: {
    ...TYPOGRAPHY.bodySmall,
    fontSize: 12,
    color: COLORS.white,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.white,
    height: 30,
    padding: 7,
  },
  buttonText: {
    fontSize: 12,
    color: COLORS.white,
  },
});
