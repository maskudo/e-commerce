import {createSlice} from '@reduxjs/toolkit';
export type User = {
  id: string;
  displayName?: string;
  handle?: string;
  posts?: string[];
  likedPosts?: string[];
  savedPosts?: string[];
  followers?: string[];
  following?: string[];
  url?: string;
  email: string;
};
const initialState: User = {
  id: '',
  displayName: '',
  handle: '',
  posts: [],
  likedPosts: [],
  savedPosts: [],
  followers: [],
  following: [],
  url: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {},
    setUserFromAuth: (state, action) => {
      const {
        displayName,
        email,
        handle,
        posts,
        likedPosts,
        savedPosts,
        followers,
        following,
        id,
        url,
      } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.handle = handle;
      state.posts = posts;
      state.likedPosts = likedPosts;
      state.savedPosts = savedPosts;
      state.followers = followers;
      state.following = following;
      state.id = id;
      state.url = url;
    },
  },
});

export default userSlice.reducer;
export const {updateUser, setUserFromAuth} = userSlice.actions;
