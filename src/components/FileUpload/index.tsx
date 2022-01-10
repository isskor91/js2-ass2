import React from 'react';
import {
  DocumentData,
  DocumentReference,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, storage } from '../../firebase';

export type TFileUpload = {
  docRef: DocumentReference<DocumentData> | null;
};

export default function FileUpload({ docRef }: TFileUpload) {
  const [user] = useAuthState(auth);
  const handleUpload = async (image: File) => {
    if (!user || !image || !docRef) {
      return;
    }

    const storageFilename = `${image.name}-${Date.now()}`;
    const storageFullPath = `${user.uid}/${storageFilename}`;
    const storageRef = ref(storage, storageFullPath);
    try {
      await uploadBytesResumable(storageRef, image);
      const url = await getDownloadURL(storageRef);

      await updateDoc(docRef, {
        images: arrayUnion({
          name: image.name,
          owner: user.uid,
          path: storageRef.fullPath,
          size: image.size,
          type: image.type,
          url,
        }),
      });
    } catch (e) {}
  };
  return (
    <input
      type='file'
      multiple
      onChange={e =>
        e.target.files &&
        Array.from(e.target.files).forEach(image => handleUpload(image))
      }
    />
  );
}
