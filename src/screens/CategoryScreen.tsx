import React from 'react';
import VariableFlatlist from '../components/common/VariableFlatlist';
import {useSelector} from 'react-redux';

export default function CategoryScreen({route}) {
  const category = route?.params?.category;
  const products = useSelector((state: RootState) => state.products.items);

  const categoryItems = products.filter(item => item.category === category);
  return <VariableFlatlist data={categoryItems} categoryName={category} />;
}
