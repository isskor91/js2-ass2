import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import AdminContainer from '../../Containers/Admin.container';
import { auth } from '../../firebase';
import Album from './Album';
import Dashboard from './Dashboard';

export default function UserRoutes() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      window.location.replace('/');
    }
  }, [user]);

  return (
    <AdminContainer>
      <Routes>
        <Route path={'albums'} element={<Album />}>
          <Route path={':id'} element={<Album />} />
        </Route>
        <Route path={'reviewedAlbums'} element={<Album />}>
          <Route path={':id'} element={<Album />} />
        </Route>
        <Route index element={<Dashboard />} />
      </Routes>
    </AdminContainer>
  );
}
