import React from 'react';
import * as styles from './Form.styles';

export type TForm = {
  onSubmit: (e: React.FormEvent<EventTarget>) => void;
  children: React.ReactNode;
};

function Form({ onSubmit, children }: TForm) {
  return <styles.BaseForm onSubmit={onSubmit}>{children}</styles.BaseForm>;
}

export default Form;
