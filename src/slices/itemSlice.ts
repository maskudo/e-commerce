import {createSlice} from '@reduxjs/toolkit';

export type ItemT = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stars: number;
  discount?: number;
  reviews: number;
  image: string;
  variations?: string[];
  size?: string[];
};
const itemSlice = createSlice({
  name: 'item',
  initialState: [],
  reducers: {
    action1: (state, action) => {},
    action2: (state, action) => {},
  },
});

export default itemSlice.reducer;
export const {action1, action2} = itemSlice.actions;
