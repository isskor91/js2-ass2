import React, { HTMLAttributes } from 'react';
import * as styles from './Button.styles';

export type TButton = HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  active?: boolean;
};

export default function Button({
  children,
  onClick,
  type,
  disabled,
  active,
  ...props
}: TButton) {
  return (
    <styles.BaseButton
      disabled={disabled}
      onClick={onClick}
      type={type}
      selected={active}
      {...props}
    >
      {children}
    </styles.BaseButton>
  );
}
