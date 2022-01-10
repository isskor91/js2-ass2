import styled from 'styled-components';

export type TBaseGrid = {
  padding?: string;
};

export const BaseGrid = styled.div<TBaseGrid>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(200px, 320px));
  gap: 20px;
  width: 100%;
  padding: ${props => props.padding ?? 0};
`;
