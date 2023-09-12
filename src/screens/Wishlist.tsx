import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/common/Header';
import TYPOGRAPHY from '../constants/typography';
import React from 'react';
import {PRODUCTS} from '../constants/data';
import FilterHeader from '../components/common/FilterHeader';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

export default function Wishlist() {
  const user = useSelector((state: RootState) => state.user);
  const wishlist = user?.wishlist?.map(itemId =>
    PRODUCTS.find(i => i.id === itemId),
  );
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Header />
        <FilterHeader title={`${wishlist?.length ?? 0} Items`} />
        <MasonryList
          contentContainerStyle={styles.items}
          data={wishlist}
          numColumns={2}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, i}: {item: ItemProps; i: number}) =>
            (Math.floor(i / 2) + (i % 2)) % 2 === 0 ? (
              <Item item={item} height={245} />
            ) : (
              <Item item={item} height={305} />
            )
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  scrollview: {
    gap: 20,
  },
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
  items: {
    gap: 15,
  },
});
