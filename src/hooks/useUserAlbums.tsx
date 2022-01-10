import { collection } from 'firebase/firestore';
import { useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';

export default function useUserAlbums() {
  const [user] = useAuthState(auth);
  const query = useMemo(() => {
    const query = collection(db, 'users', user?.uid ?? '_', 'albums');
    return query;
  }, [user]);
  const queryReview = useMemo(() => {
    const query = collection(db, 'users', user?.uid ?? '_', 'reviewedAlbums');
    return query;
  }, [user]);

  const [albums, albumsLoading, AlbumsError] = useCollectionData(query, {
    idField: 'uid',
    refField: 'ref',
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [reviewedAlbums, reviewedAlbumsloading, reviewedAlbumsError] =
    useCollectionData(queryReview, {
      idField: 'uid',
      refField: 'ref',
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  return {
    albums,
    albumsLoading,
    AlbumsError,
    reviewedAlbums,
    reviewedAlbumsloading,
    reviewedAlbumsError,
  };
}
