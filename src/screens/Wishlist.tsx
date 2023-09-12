import React from 'react';
import {PRODUCTS} from '../constants/data';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import VariableFlatlist from '../components/common/VariableFlatlist';

export default function Wishlist() {
  const user = useSelector((state: RootState) => state.user);
  const wishlist = user?.wishlist?.map(itemId =>
    PRODUCTS.find(i => i.id === itemId),
  );
  return <VariableFlatlist data={wishlist} categoryName={'Wishlist'} />;
}
