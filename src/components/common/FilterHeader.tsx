import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../constants/typography';
import FilterModal from './FilterModal';
import {ItemProps} from './Item';

function filterByCategory(items: ItemProps[], filterBy: string): ItemProps[] {
  return items.filter(item => item.category === filterBy);
}
function sortByCategory(items: ItemProps[], sortBy: string): ItemProps[] {
  switch (sortBy) {
    case 'Low Price': {
      return [...items].sort((a, z) => a.price - z.price);
    }
    case 'High Price': {
      return [...items].sort((a, z) => z.price - a.price);
    }
    case 'Low Rating': {
      return [...items].sort((a, z) => a.rating.rate - z.rating.rate);
    }
    case 'High Rating': {
      return [...items].sort((a, z) => z.rating.rate - a.rating.rate);
    }
  }
}
export default function FilterHeader({
  title,
  originalItems,
  setFilteredItems,
}: {
  title: string;
  originalItems: ItemProps[];
  setFilteredItems: (items: ItemProps[]) => void;
}) {
  const [isModalVisisble, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<null | string>(null);
  const [filterBy, setFilterBy] = useState<null | string>(null);
  const handleClick = () => setIsModalVisible(true);
  useEffect(() => {
    let filteredItems = originalItems;
    if (filterBy) {
      filteredItems = filterByCategory(originalItems, filterBy);
    }
    if (sortBy) {
      filteredItems = sortByCategory(filteredItems, sortBy);
    }

    setFilteredItems && setFilteredItems([...filteredItems]);
  }, [filterBy, sortBy, setFilteredItems]);
  return (
    <View style={styles.filter}>
      <Text style={styles.featureText}>{title}</Text>
      <View style={styles.filterCategory}>
        <View>
          <TouchableOpacity style={styles.filterButton} onPress={handleClick}>
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
