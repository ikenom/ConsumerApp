import styled from 'styled-components/native';
import {
  border,
  boxShadow,
  color,
  layout,
  opacity,
  position,
  space,
  zIndex,
  BorderProps,
  BoxShadowProps,
  ColorProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  SpaceProps,
  ZIndexProps,
  flexbox,
  margin,
  display,
  FlexboxProps,
  MarginProps,
  DisplayProps,
} from 'styled-system';

export interface IBoxProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BorderProps,
    PositionProps,
    BoxShadowProps,
    OpacityProps,
    ZIndexProps {}

export const Box = styled.View<IBoxProps>`
  ${layout};
`;

Box.displayName = 'Box';

/**
 * A flexbox component
 */
 export const Flexbox = styled(Box)<FlexboxProps & MarginProps & DisplayProps>`
  ${flexbox};
  ${margin};
  ${display}; /** really only want this to be "flex", but could be "inline-flex" */
`;
