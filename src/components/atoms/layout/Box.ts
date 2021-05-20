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
  margin,
  MarginProps,
  display,
  DisplayProps,
  flex,
  FlexProps,
  flexGrow,
  FlexGrowProps,
  flexShrink,
  FlexShrinkProps,
  flexBasis,
  FlexBasisProps,
  justifySelf,
  JustifySelfProps,
  alignSelf,
  AlignSelfProps,
  width,
  WidthProps,
  minWidth,
  MinWidthProps,
  maxWidth,
  MaxWidthProps,
  height,
  HeightProps,
  minHeight,
  MinHeightProps,
  maxHeight,
  MaxHeightProps,
} from 'styled-system';

export interface IBoxProps
  extends LayoutProps,
    SpaceProps,
    ColorProps,
    BorderProps,
    PositionProps,
    OpacityProps {}

const boxProps = compose(layout, color, space, border, position, opacity);

/**
 * Should be used for individual items
 */

export const Box = styled.View<IBoxProps>(boxProps);

Box.displayName = 'Box';

/**
 * A flexbox component
 */
const flexProps = compose(flexbox, margin, display);

export const FlexBox =
  styled(Box)<FlexboxProps & MarginProps & DisplayProps>(flexProps);

FlexBox.defaultProps = {
  display: 'flex',
};

/**
 * A flex item component. Use this when you want to adjust something about the flex item in
 * a flexbox. Intended mainly for flex grow / shrink / basis.
 */

const flexItemProps = compose(
  flex,
  flexGrow,
  flexShrink,
  flexBasis,
  justifySelf,
  alignSelf,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  margin,
);

export const FlexItem =
  styled(Box)<
    FlexProps &
      FlexGrowProps &
      FlexShrinkProps &
      FlexBasisProps &
      JustifySelfProps &
      AlignSelfProps &
      WidthProps &
      MinWidthProps &
      MaxWidthProps &
      HeightProps &
      MinHeightProps &
      MaxHeightProps &
      MarginProps
  >(flexItemProps);

FlexItem.displayName = 'FlexItem';
