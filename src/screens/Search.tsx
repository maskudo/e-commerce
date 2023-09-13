import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../components/common/Header';
import {ItemProps} from '../components/common/Item';
import VariableFlatlist from '../components/common/VariableFlatlist';
import {RootState} from '../store/store';

export default function Search() {
  const products = useSelector((state: RootState) => state.products);
  const [searchedContent, setSearchedContent] = useState<ItemProps[]>([]);

  return (
    <View style={styles.container}>
      <Header
        setSearchedContent={setSearchedContent}
        originalItems={products}
      />
      <VariableFlatlist data={searchedContent} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
});
