import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
import FilterModal from './FilterModal';

export default function FilterHeader({
  title,
  sortBy,
  filterBy,
  setSortBy,
  setFilterBy,
}: {
  title: string;
  sortBy: string | null;
  setSortBy: (val: string) => void;
  filterBy: string | null;
  setFilterBy: (val: string) => void;
}) {
  const [isModalVisisble, setIsModalVisible] = useState(false);
  const handleClick = () => setIsModalVisible(true);
  return (
    <View style={styles.filter}>
      <Text style={styles.featureText}>{title}</Text>
      <View style={styles.filterCategory}>
        <View>
          <TouchableOpacity style={styles.filterButton} onPress={handleClick}>
            <Text style={styles.filterText}>Filter and Sort</Text>
            <Icon name="filter" size={14} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <FilterModal
        isVisible={isModalVisisble}
        setIsVisible={setIsModalVisible}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
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
    paddingHorizontal: 5,
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
