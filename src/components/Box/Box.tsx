import React from 'react';
import * as styles from './Box.styles';
export type TBox = styles.TBox & {
  children: React.ReactNode;
};

export const Box: React.FC<TBox> = ({
  padding = '0',
  margin,
  background = 'transparent',
  children,
  ...props
}) => {
  return (
    <styles.BaseBox
      margin={margin}
      background={background}
      padding={padding}
      {...props}
    >
      {children}
    </styles.BaseBox>
  );
};

export default Box;
