import {View, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import Header from './Header';
import FilterHeader from './FilterHeader';
import Item, {ItemProps} from './Item';
import TYPOGRAPHY from '../../constants/typography';

export default function VariableFlatlist({data, categoryName}) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Header />
        <FilterHeader title={categoryName} />
        <MasonryList
          contentContainerStyle={styles.items}
          data={data}
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
    gap: 10,
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
