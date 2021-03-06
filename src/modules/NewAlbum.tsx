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
  fromSideBar?: boolean;
};

export default function NewAlbum({
  title,
  onComplete,
  buttonLabel = 'create album',
  images,
  fromSideBar,
}: TNewAlbum) {
  const [user] = useAuthState(auth);
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
        fromSideBar
          ? navigate(`albums/${docRef.id}`, { replace: true })
          : navigate(`${docRef.id}`, { replace: true });
        onComplete && onComplete();
      }
    } catch (e) {}
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
