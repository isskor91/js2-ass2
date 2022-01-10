import styled from 'styled-components';

export type TBox = {
  background?: string;
  padding?: string;
  margin?: string;
};

export const BaseBox = styled.div<TBox>`
  padding: ${props => props.padding};
  background: ${props => props.background};
  ${props => props.margin && `margin: ${props.margin}`};
  width: 100%;
`;
