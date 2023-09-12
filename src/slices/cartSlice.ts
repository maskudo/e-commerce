import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

type Cart = {
  items: CartItem[];
};
export type CartItem = {
  id: string;
  itemId: string | number;
  userId: string;
  qty: number;
};

const initialState: Cart = {
  items: [],
};

export const updateUserCart = createAsyncThunk(
  'cart/update',
  async ({
    userId,
    itemId,
    add,
  }: {
    userId: string;
    itemId: string | number;
    add: boolean;
  }) => {
    const cartItemCollection = firestore().collection('CartItems');
    if (add) {
      const cartItemRef = await cartItemCollection.add({
        userId,
        itemId,
        qty: 1,
      });
      let data = await cartItemRef.get();
      return {...data.data(), id: data.id};
    } else {
      await firestore()
        .collection('CartItems')
        .where('userId', '==', userId)
        .where('itemId', '==', itemId)
        .get()
        .then(res => res.docs[0].ref.delete());
      return {itemId, userId};
    }
  },
);
export const populateCart = createAsyncThunk('cart/fetch', async ({userId}) => {
  const col = firestore().collection('CartItems').where('userId', '==', userId);
  const data = await col.get();
  const res: CartItem[] = [];
  data.forEach(doc => {
    res.push({...doc.data(), id: doc.id});
  });
  return res;
});

export const updateCartItem = createAsyncThunk(
  'cart/item/update',
  async ({cartItemId, qty}: {cartItemId: string; qty: number}) => {
    const col = firestore().collection('CartItems').doc(cartItemId);
    const docRef = await col.get();
    docRef.ref.update({
      qty: qty,
    });
    return {cartItemId, qty};
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateUserCart.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating Cart',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.items = [...state.items, action.payload];
        } else {
          state.items = state.items.filter(
            item =>
              !(
                item.itemId === action.payload.itemId &&
                item.userId === action.payload.userId
              ),
          );
        }
      })
      .addCase(populateCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartItem.pending, () => {})
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = state.items.map(item =>
          item.id === action.payload.cartItemId
            ? {...item, qty: action.payload.qty}
            : {...item},
        );
      })
      .addCase(updateCartItem.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating CartItem',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  },
});

export default cartSlice.reducer;
export const {} = cartSlice.actions;
