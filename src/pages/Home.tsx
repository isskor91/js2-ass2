import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Login from '../modules/Login';
import Register from './Register';

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/user`);
    }
  }, [user]);
  return (
    <div
      style={{ maxWidth: '576px', margin: '50px auto', textAlign: 'center' }}
    >
      <Login />
      <Register />
    </div>
  );
}

export default Home;
