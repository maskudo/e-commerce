import {PRODUCTS} from '../constants/data';
import React from 'react';
import VariableFlatlist from '../components/common/VariableFlatlist';

export default function CategoryScreen({route}) {
  const category = route?.params?.category;
  const categoryItems = PRODUCTS.filter(item => item.category === category);
  return <VariableFlatlist data={categoryItems} categoryName={category} />;
}
