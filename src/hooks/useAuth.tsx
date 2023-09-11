import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {setUserFromAuth} from '../slices/userSlice';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {populateCart} from '../slices/cartSlice';

export function useAuth() {
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubPostSnapshot = () => {};
    let unsubUserSnapshot = () => {};
    const unsub = auth().onAuthStateChanged(loggedUser => {
      if (loggedUser) {
        setUser(loggedUser);
        unsubUserSnapshot = firestore()
          .collection('Users')
          .where('email', '==', loggedUser.email)
          .onSnapshot(
            res => {
              const userData = res.docs[0];
              dispatch(setUserFromAuth({...userData.data(), id: userData.id}));
              dispatch(populateCart({userId: userData.id}));
            },
            error => {
              console.log(error);
              setUser(undefined);
            },
          );
      } else {
        setUser(undefined);
      }
    });
    return () => {
      unsub();
      unsubUserSnapshot();
      unsubPostSnapshot();
    };
  }, [dispatch]);
  return {
    user,
  };
}
