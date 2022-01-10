import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import { auth, db } from '../firebase';
import { TImage } from '../types';

export type TNewAlbum = {
  onComplete?: () => void;
  title?: string;
  buttonLabel?: string;
  images?: TImage[];
};

export default function NewAlbum({
  title,
  onComplete,
  buttonLabel = 'create album',
  images,
}: TNewAlbum) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const albumNameRef = useRef<HTMLInputElement | null>(null);

  const createAlbum = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (!user) return;
    if (!albumNameRef.current) return;
    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'albums'), {
        name: albumNameRef.current.value,
        images: images ?? [],
      });
      if (docRef) {
        navigate(`albums/${docRef.id}`, { replace: true });
        onComplete && onComplete();
      }
      console.log(docRef);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {title && <h2>{title}</h2>}
      <Form onSubmit={createAlbum}>
        <p>create album</p>
        <input type='text' ref={albumNameRef} />
        <button type='submit'>{buttonLabel}</button>
      </Form>
    </div>
  );
}
