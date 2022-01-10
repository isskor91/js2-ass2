import React from 'react';
import * as styles from './Grid.styles';

export type TGrid = {
  children: React.ReactNode;
};

export default function Grid({ children }: TGrid) {
  return <styles.BaseGrid>{children}</styles.BaseGrid>;
}
