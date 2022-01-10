import React from 'react';

import { auth } from './firebase';
import { GlobalStyles } from './styles/GlobalStyles';

import Register from './pages/Register';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import Preview from './pages/Preview';
import UserRoutes from './pages/UserRoutes';
import NotFound from './pages/NotFound';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <React.Fragment>
      <GlobalStyles />
      <>
        <Routes>
          <Route path={'register'} element={<Register />} />
          <Route path={'/'} element={<Home />} />
          {user && <Route path={'user/*'} element={<UserRoutes />} />}
          <Route path={'preview/:authId/:previewId'} element={<Preview />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    </React.Fragment>
  );
};

export default App;
