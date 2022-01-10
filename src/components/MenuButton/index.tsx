import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import * as styles from './MenuButton.styles';

function MenuButton() {
  const { toggleMenu } = useContext(AppContext);
  return <styles.MenuButton onClick={toggleMenu}>Menu</styles.MenuButton>;
}

export default MenuButton;
