import styled from 'styled-components';
import Button from '../Button';

export const MenuButton = styled(Button)`
  margin-left: auto;
  @media (min-width: 768px) {
    display: none;
  }
`;
