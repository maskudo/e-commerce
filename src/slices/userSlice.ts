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
export const updateUser = createAsyncThunk(
  'user/user',
  async ({
    userId,
    username,
    businessAddressDetail,
    bankAccountDetails,
  }: {
    userId: string;
    businessAddressDetail: any;
    username: string;
    bankAccountDetails: any;
  }) => {
    const col = firestore().collection('Users');
    try {
      const user = col.doc(userId);
      let res = await user.update({
        businessAddressDetail: JSON.parse(
          JSON.stringify(businessAddressDetail),
        ),
        bankAccountDetails: JSON.parse(JSON.stringify(bankAccountDetails)),
        username,
      });
      console.log({res});
    } catch (e) {
      console.log({error: e});
    }
  },
);
export const updateBusinessAddressDetail = createAsyncThunk(
  'user/businessAddressDetail',
  async ({
    userId,
    businessAddressDetail,
  }: {
    userId: string;
    businessAddressDetail: any;
  }) => {
    const col = firestore().collection('Users');
    const user = col.doc(userId);
    await user.update({
      businessAddressDetail,
    });
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
      const {
        displayName,
        email,
        username,
        wishlist,
        id,
        cart,
        image,
        businessAddressDetail,
        bankAccountDetails,
      } = action.payload;
      state.displayName = displayName;
      state.email = email;
      state.image = image;
      state.username = username;
      state.cart = cart;
      state.wishlist = wishlist ?? [];
      state.id = id;
      state.businessAddressDetail = businessAddressDetail;
      state.bankAccountDetails = bankAccountDetails;
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
      })
      .addCase(updateUser.fulfilled, () => {
        ToastAndroid.showWithGravity(
          'Updated User Information Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .addCase(updateUser.rejected, () => {
        ToastAndroid.showWithGravity(
          'Failed updating User',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .addCase(updateBusinessAddressDetail.rejected, () => {
        ToastAndroid.showWithGravity(
          'Failed updating Business Address Details',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  },
});

export default userSlice.reducer;
export const {setUserFromAuth} = userSlice.actions;
