import React from 'react';
import Button from '../Button';
import * as styles from './AdminBar.styles';

export type TAdminBar = {
  children?: React.ReactNode;
};
export default function AdminBar({ children }: TAdminBar) {
  return <styles.BaseSideBar>{children}</styles.BaseSideBar>;
}
