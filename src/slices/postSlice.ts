import {createSlice} from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: [],
  reducers: {
    action1: (state, action) => {},
    action2: (state, action) => {},
  },
});

export default postSlice.reducer;
export const {action1, action2} = postSlice.actions;
