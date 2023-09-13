import Firestore from '@react-native-firebase/firestore';
export async function populateFirebaseCollection({
  collection,
  objects,
}: {
  collection: string;
  objects: any[];
}) {
  const colRef = Firestore().collection(collection);
  const batch = Firestore().batch();
  objects.forEach(object => {
    const docRef = colRef.doc();
    batch.set(docRef, object);
  });
  let res = await batch.commit();
  return res;
}
