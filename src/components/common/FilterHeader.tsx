import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
export default function FilterHeader({title}: {title: string}) {
  return (
    <View style={styles.filter}>
      <Text style={styles.featureText}>{title}</Text>
      <View style={styles.filterCategory}>
        <View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Sort</Text>
            <Icon name="filter" size={14} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Filter</Text>
            <Icon name="filter" size={14} color={COLORS.black} />
          </TouchableOpacity>
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
    gap: 10,
  },
  featureText: {
    ...TYPOGRAPHY.h3,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 61,
    height: 24,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    gap: 5,
  },
  filterText: {
    ...TYPOGRAPHY.captions,
    color: COLORS.black,
  },
});
