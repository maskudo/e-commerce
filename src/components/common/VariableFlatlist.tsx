import {StyleSheet} from 'react-native';
import React from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import Item, {ItemProps} from './Item';

export default function VariableFlatlist({data}: {data: ItemProps[]}) {
  return (
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
  );
}
const styles = StyleSheet.create({
  items: {
    gap: 15,
  },
});
