import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import VariableFlatlist from '../components/common/VariableFlatlist';
import {View, ScrollView, StyleSheet} from 'react-native';
import FilterHeader from '../components/common/FilterHeader';
import Header from '../components/common/Header';

export default function Wishlist() {
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products.items);
  const wishlist = user?.wishlist?.map(itemId =>
    products.find(i => i.id === itemId),
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Header />
        <FilterHeader title={'Wishlist'} />
        <VariableFlatlist data={wishlist} />
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
