import React from 'react';
import * as styles from './Masonry.styles';

export type TMasonry = {
  children: React.ReactNode;
};

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Masonry({ children }: TMasonry) {
  return (
    <styles.BaseGrid className='masonry' breakpointCols={breakpointColumnsObj}>
      {children}
    </styles.BaseGrid>
  );
}
