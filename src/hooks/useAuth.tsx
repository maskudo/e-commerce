import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {setUserFromAuth} from '../slices/userSlice';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

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
            },
            error => {
              console.log(error);
              setUser(undefined);
            },
          );
        // unsubPostSnapshot = firestore()
        //   .collection('Posts')
        //   .orderBy('createdAt', 'desc')
        //   .limit(10)
        //   .onSnapshot(res => {
        //     let posts: PostProps[] = [];
        //     res.forEach(post => {
        //       posts.push({...post.data(), id: post.id.toString()});
        //     });
        //     dispatch(setPosts(posts));
        //   });
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
