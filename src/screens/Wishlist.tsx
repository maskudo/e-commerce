import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import VariableFlatlist from '../components/common/VariableFlatlist';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterHeader from '../components/common/FilterHeader';
import Header from '../components/common/Header';
import {ItemProps} from '../components/common/Item';

export default function Wishlist() {
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products.items);
  const wishlist =
    user?.wishlist?.map(itemId => products.find(i => i.id === itemId)) ?? [];
  const [searchedContent, setSearchedContent] = useState<ItemProps[]>(wishlist);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Header
          originalItems={wishlist}
          setSearchedContent={setSearchedContent}
        />
        <FilterHeader title={'Wishlist'} />
        <VariableFlatlist data={searchedContent} />
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
