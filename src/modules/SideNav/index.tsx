import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Link, useNavigate } from 'react-router-dom';
import Box from '../../components/Box/Box';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';
import { signOut } from 'firebase/auth';

import { auth } from '../../firebase';
import useUserAlbums from '../../hooks/useUserAlbums';
import NewAlbum from '../NewAlbum';
import * as styles from './SideNav.styles';

export default function SideNav() {
  const [user] = useAuthState(auth);
  const [newAlbum, setNewAlbum] = useState(false);
  const { albums, reviewedAlbums } = useUserAlbums();
  const { menuOpen } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };
  return (
    <styles.NavContainer open={menuOpen}>
      <styles.NavMobileButton></styles.NavMobileButton>
      <div>
        <Button onClick={logout}>Sign out</Button>
      </div>
      <Box padding={'0 0 0 12px'}>{user?.email ?? ''}</Box>

      <Button>
        <Link to={'/user'}>DashBoard</Link>
      </Button>
      <Button onClick={() => setNewAlbum(!newAlbum)}>New Album</Button>
      {newAlbum && <NewAlbum />}
      <Box padding={'20px 0 0 0 '}>
        <h4>Albums</h4>
        {albums?.map(col => {
          return (
            <div key={col.uid}>
              <Link to={`albums/${col.uid}`}>{col.name}</Link>
            </div>
          );
        })}
      </Box>
      <Box padding={'20px 0 0 0 '}>
        <h4>reviewdAlbums</h4>
        {reviewedAlbums?.map(col => {
          return (
            <div key={col.uid}>
              <Link to={`reviewedAlbums/${col.uid}`}>{col.name}</Link>
            </div>
          );
        })}
      </Box>
    </styles.NavContainer>
  );
}
