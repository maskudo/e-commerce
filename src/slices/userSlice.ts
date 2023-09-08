import {createSlice} from '@reduxjs/toolkit';
export type User = {
  id: string;
  displayName?: string;
  username?: string;
  pincode?: number;
  address?: string;
  city?: string;
  country?: string;
  bankAccountNumber?: string;
  accountHolderName?: string;
  ifscCode?: string;
  wishlist?: string[];
  cart?: string[];
  email: string;
};
const initialState: User = {
  id: '',
  displayName: '',
  username: '',
  wishlist: [],
  cart: [],
  wishlist: [],
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {},
    setUserFromAuth: (state, action) => {
      const {displayName, email, handle, posts, id} = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.username = handle;
      state.posts = posts;
      state.id = id;
    },
  },
});

export default userSlice.reducer;
export const {updateUser, setUserFromAuth} = userSlice.actions;
