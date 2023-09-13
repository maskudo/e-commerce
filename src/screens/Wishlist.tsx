import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import VariableFlatlist from '../components/common/VariableFlatlist';

export default function Wishlist() {
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.products.items);
  const wishlist = user?.wishlist?.map(itemId =>
    products.find(i => i.id === itemId),
  );
  return <VariableFlatlist data={wishlist} categoryName={'Wishlist'} />;
}
