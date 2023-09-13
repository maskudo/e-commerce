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
const initialState: {
  loading: boolean;
  error: boolean;
  message: string;
  items: ItemProps[];
} = {
  loading: true,
  items: [],
  error: false,
  message: '',
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.rejected, state => {
        state.loading = false;
        state.error = true;
        state.message = 'Error loading Products';
        ToastAndroid.showWithGravity(
          'Error updating Cart',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default productsSlice.reducer;
export const {} = productsSlice.actions;
