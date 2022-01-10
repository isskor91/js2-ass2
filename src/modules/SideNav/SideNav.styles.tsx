import styled from 'styled-components';

export type TNav = {
  open?: boolean;
};

export const NavContainer = styled.div<TNav>`
  position: absolute;
  z-index: 999;
  top: 0;
  left: ${props => (props.open ? 0 : '-215px')};
  width: 200px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  background: white;

  @media (min-width: 768px) {
    position: relative;
    left: 0;
  }
`;

export const NavMobileButton = styled.div`
  position: absolute;
  top: 2px;
  z-index: 999;
  left: 180px;
`;
