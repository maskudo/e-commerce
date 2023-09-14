import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import FilterHeader from '../components/common/FilterHeader';
import Header from '../components/common/Header';
import VariableFlatlist from '../components/common/VariableFlatlist';
import {RootState} from '../store/store';
import {filterByCategory, sortByCategory} from '../utils/functions';

export default function Search() {
  const products = useSelector((state: RootState) => state.products);
  const [sortBy, setSortBy] = useState<null | string>(null);
  const [filterBy, setFilterBy] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState<null | string>(null);
  const searchedContent = searchTerm?.length
    ? products.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm),
      )
    : products;
  const filteredContent = filterBy?.length
    ? filterByCategory(searchedContent, filterBy)
    : searchedContent;
  const sortedContent = sortBy?.length
    ? sortByCategory(searchedContent, sortBy)
    : filteredContent;

  return (
    <View style={styles.container}>
      <Header setSearchTerm={setSearchTerm} />
      <FilterHeader
        title={'Search'}
        sortBy={sortBy}
        filterBy={filterBy}
        setSortBy={setSortBy}
        setFilterBy={setFilterBy}
      />
      <VariableFlatlist data={sortedContent} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    gap: 10,
  },
});
