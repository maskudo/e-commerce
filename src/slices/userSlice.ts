import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';
import {itemId} from './itemSlice';

export type userId = string | number;

export type User = {
  id: userId;
  displayName?: string;
  username?: string;
  wishlist?: itemId[];
  cart?: [
    {
      itemId: itemId;
      qty: number;
    },
  ];
  email: string;
  image?: string;
  businessAddressDetail?: {
    pincode?: number;
    address?: string;
    city?: string;
    country?: string;
  };
  bankAccountDetails?: {
    bankAccountNumber?: string;
    accountHolderName?: string;
    ifscCode?: string;
  };
};
const initialState: User = {
  id: '',
  displayName: '',
  username: '',
  wishlist: [],
  cart: [],
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
    console.log({itemId, add, userId});
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
  },
);
export const updateUserCart = createAsyncThunk(
  'uses/cart',
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
        cart: firestore.FieldValue.arrayUnion(itemId),
      });
    } else {
      await userRef.update({
        cart: firestore.FieldValue.arrayRemove(itemId),
      });
    }
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {},
    setUserFromAuth: (state, action) => {
      const {displayName, email, handle, wishlist, id, cart, image} =
        action.payload;
      state.displayName = displayName;
      state.email = email;
      state.image = image;
      state.username = handle;
      state.cart = cart;
      state.wishlist = wishlist;
      state.id = id;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserWishlist.pending, () => {})
      .addCase(updateUserWishlist.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating Wishlist',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updateUserWishlist.fulfilled, () => {})
      .addCase(updateUserCart.pending, () => {})
      .addCase(updateUserCart.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating Cart',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updateUserCart.fulfilled, () => {})
      .addCase(updateUserProfilePicture.pending, () => {})
      .addCase(updateUserProfilePicture.rejected, () => {
        ToastAndroid.showWithGravity(
          'Error updating ProfilePicture',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .addCase(updateUserProfilePicture.fulfilled, () => {});
  },
});

export default userSlice.reducer;
export const {updateUser, setUserFromAuth} = userSlice.actions;
