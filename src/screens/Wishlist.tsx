import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/common/Header';
import TYPOGRAPHY from '../constants/typography';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import {ITEMS} from '../constants/data';
import Item, {ItemProps} from '../components/common/Item';
import FilterHeader from '../components/common/FilterHeader';

export default function Wishlist() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Header />
        <FilterHeader title={'52000+ Items'} />
        <MasonryList
          contentContainerStyle={styles.items}
          data={ITEMS}
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
