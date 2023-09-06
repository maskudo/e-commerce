import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
export default function FilterHeader({title}: {title: string}) {
  return (
    <View style={styles.filter}>
      <Text style={styles.featureText}>{title}</Text>
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
  );
}

const styles = StyleSheet.create({
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
});
