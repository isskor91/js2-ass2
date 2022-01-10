import * as React from 'react';

const AppContext = React.createContext({
  menuOpen: false,
  toggleMenu: () => {},
});

type TUserProvider = {
  children?: React.ReactNode;
};

function AppContextProvider({ children }: TUserProvider) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <AppContext.Provider value={{ menuOpen, toggleMenu }}>
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppContextProvider as default };
