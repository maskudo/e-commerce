import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import VariableFlatlist from '../components/common/VariableFlatlist';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterHeader from '../components/common/FilterHeader';
import Header from '../components/common/Header';
import {ItemProps} from '../components/common/Item';
import {filterByCategory, sortByCategory} from '../utils/functions';

export default function Wishlist() {
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products);
  const wishlist: ItemProps[] = products.filter(item =>
    user.wishlist?.includes(item.id),
  );
  const [sortBy, setSortBy] = useState<null | string>(null);
  const [filterBy, setFilterBy] = useState<null | string>(null);
  const [searchTerm, setSearchTerm] = useState<null | string>(null);
  const searchedContent = searchTerm?.length
    ? wishlist.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm),
      )
    : wishlist;
  const filteredContent = filterBy?.length
    ? filterByCategory(searchedContent, filterBy)
    : searchedContent;
  const sortedContent = sortBy?.length
    ? sortByCategory(searchedContent, sortBy)
    : filteredContent;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Header setSearchTerm={setSearchTerm} />
        <FilterHeader
          title={'Wishlist'}
          sortBy={sortBy}
          filterBy={filterBy}
          setSortBy={setSortBy}
          setFilterBy={setFilterBy}
        />
        <VariableFlatlist data={sortedContent} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    gap: 10,
  },
  scrollview: {
    gap: 20,
  },
});
