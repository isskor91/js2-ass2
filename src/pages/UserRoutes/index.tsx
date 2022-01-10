import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminContainer from '../../Containers/Admin.container';
import Album from './Album';
import Dashboard from './Dashboard';

export default function UserRoutes() {
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
