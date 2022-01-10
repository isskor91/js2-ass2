import React from 'react';
import * as styles from './Grid.styles';

export type TGrid = {
  children: React.ReactNode;
} & styles.TBaseGrid;

export default function Grid({ children, padding }: TGrid) {
  return <styles.BaseGrid padding={padding}>{children}</styles.BaseGrid>;
}
