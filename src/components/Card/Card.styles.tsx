import styled from 'styled-components';

export type TBaseCard = {
  selected?: boolean;
  selectBorderColor?: string;
};

export const BaseCard = styled.div<TBaseCard>`
  background: transparent;
  cursor: pointer;
  position: relative;
  ${props => props.selected && `border: 5px solid ${props.selectBorderColor}`}
  margin-bottom: 20px;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalChild = styled.div`
  max-width: 80vw;
  max-height: 80vh;
  min-height: 50vh;
  min-width: 50vw;
  overflow: hidden;
  cursor: pointer;

  img {
    object-fit: inherit;
    height: 100%;
    width: 100%;
  }
`;
