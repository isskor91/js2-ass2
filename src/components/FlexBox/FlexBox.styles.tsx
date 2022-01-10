import styled from 'styled-components';

export type TFlex =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type TFlexBox = {
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-revers';
  padding?: string;
  background?: string;
  flexWrap?: boolean;
  gap?: number;
  justify?: TFlex;
  align?: TFlex;
  flex?: number;
  onClick?: () => void;
  width?: string;
};

export const BaseFlex = styled.div<TFlexBox>`
  background: ${props => props.background || ' transparent'};
  padding: ${props => (props.padding ? ` ${props.padding}` : 0)};
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-wrap: ${props => (props.flexWrap ? 'wrap' : 'nowrap')};
  gap: ${props => props.gap || 0}px;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  ${props => props.flex && `flex: ${props.flex}`};
  width: ${props => props.width ?? 'auto'};
`;
