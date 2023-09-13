import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

export type userId = string;
export type itemId = string | number;

export type User = {
  id: userId;
  displayName?: string;
  username?: string;
  wishlist?: itemId[];
  cart?: string;
  email: string;
  image?: string;
  businessAddressDetail?: {
    pincode?: number;
    address?: string;
    city?: string;
    country?: string;
  };
  bankAccountDetails?: {
    bankAccountNumber?: number;
    accountHolderName?: string;
    ifscCode?: number;
  };
};
const initialState: User = {
  id: '',
  displayName: '',
  username: '',
  wishlist: [],
  cart: '',
  email: '',
};

export const updateUserWishlist = createAsyncThunk(
  'uses/wishlist',
  async ({
    userId,
    itemId,
    add,
  }: {
    userId: userId;
    itemId: itemId;
    add: boolean;
  }) => {
    const userRef = firestore().collection('Users').doc(userId);
    if (add) {
      await userRef.update({
        wishlist: firestore.FieldValue.arrayUnion(itemId),
      });
    } else {
      await userRef.update({
        wishlist: firestore.FieldValue.arrayRemove(itemId),
      });
    }
    return {itemId, add};
  },
);

export const updateUserProfilePicture = createAsyncThunk(
  'uses/profilePic',
  async ({
    imageUrl,
    userId,
    errorCallback,
  }: {
    userId: string;
    imageUrl: string;
    errorCallback: () => {};
  }) => {
    const userRef = firestore().collection('Users').doc(userId);
    try {
      await userRef.update({
        image: imageUrl,
      });
    } catch (e) {
      errorCallback();
    }
  },
);
export const updateUsername = createAsyncThunk(
  'user/username',
  async ({
    oldUsername,
    newUsername,
  }: {
    oldUsername: string;
    newUsername: string;
  }) => {
    const col = firestore().collection('Users');
    const newUsernameDocs = await col
      .where('username', '==', newUsername)
      .get();
    if (newUsernameDocs.docs.length > 0) {
      return {message: `Username ${newUsername} taken`};
    }
    const docs = await col.where('username', '==', oldUsername).get();
    const ref = docs.docs[0].ref;
    ref.update({
      username: newUsername,
    });
    return {message: 'Username changed successfully'};
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserFromAuth: (state, action) => {
      const {displayName, email, username, wishlist, id, cart, image} =
        action.payload;
      state.displayName = displayName;
      state.email = email;
      state.image = image;
      state.username = username;
      state.cart = cart;
      state.wishlist = wishlist ?? [];
      state.id = id;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserProfilePicture.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating ProfilePicture',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .addCase(updateUsername.rejected, () => {
        let message = 'Error updating Username';
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .addCase(updateUsername.fulfilled, (_, action) => {
        let message = action.payload.message;
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .addCase(updateUserWishlist.rejected, () => {
        ToastAndroid.showWithGravity(
          'Failed updating Wishlist',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  },
});

export default userSlice.reducer;
export const {setUserFromAuth} = userSlice.actions;
