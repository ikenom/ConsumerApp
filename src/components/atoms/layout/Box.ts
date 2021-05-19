import styled from 'styled-components/native';
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  border,
  BorderProps,
  position,
  PositionProps,
  compose,
  opacity,
  OpacityProps,
 } from "styled-system";

export interface IBoxProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BorderProps,
    PositionProps,
    FlexboxProps,
    OpacityProps {}

 export const viewProps = compose(
  layout,
  color,
  space,
  border,
  position,
  flexbox,
  opacity,
);

export const Box = styled.View<IBoxProps>(viewProps);

Box.displayName = 'Box';
