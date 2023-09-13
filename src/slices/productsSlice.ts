import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';
import {ItemProps} from '../components/common/Item';

export const fetchAllProducts = createAsyncThunk('products/fetch', async () => {
  const colRef = firestore().collection('Products');
  const docs = await colRef.get();
  let res: ItemProps[] = [];
  docs.forEach(doc => {
    res.push({...doc.data(), id: doc.id});
  });
  return res;
});
const initialState: ItemProps[] = [];
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.rejected, state => {
        ToastAndroid.showWithGravity(
          'Error updating Cart',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default productsSlice.reducer;
export const {} = productsSlice.actions;
