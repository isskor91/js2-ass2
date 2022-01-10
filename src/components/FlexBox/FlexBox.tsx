import React from 'react';
import * as styles from './FlexBox.styles';

export type TFlexBox = styles.TFlexBox & {
  children: React.ReactNode;
};

export const FlexBox: React.FC<TFlexBox> = ({
  background,
  flexDirection,
  padding,
  flexWrap,
  justify,
  align,
  gap,
  flex,
  onClick,
  width,
  children,
  ...props
}) => {
  return (
    <styles.BaseFlex
      onClick={onClick}
      flex={flex}
      flexWrap={flexWrap}
      justify={justify}
      align={align}
      gap={gap}
      background={background}
      padding={padding}
      flexDirection={flexDirection}
      width={width}
      {...props}
    >
      {children}
    </styles.BaseFlex>
  );
};
