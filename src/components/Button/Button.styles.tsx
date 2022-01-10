import React from 'react';
import styled from 'styled-components';

export type TButton = {
  selected?: boolean;
} & React.HTMLProps<HTMLButtonElement>;

export const BaseButton = styled.button<TButton>`
  padding: 8px 12px;
  outline: none;
  border: none;
  cursor: pointer;
  background: ${props => (props.selected ? '#dcdcff' : 'transparent')};
  font-size: 16px;

  &:hover {
    color: orchid;
  }
`;
