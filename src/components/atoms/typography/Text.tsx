import {
  color,
  margin,
  typography,
  ColorProps,
  MarginProps,
  TypographyProps,
  compose,
} from 'styled-system';
import styled from 'styled-components/native';

export const typographyPropsFns = compose(typography, color, margin);

export interface ITypographyComponentProps
  extends TypographyProps,
    ColorProps,
    MarginProps {}

/**
 * Text Component wrapped around native Text component
 */

export const Text = styled.Text<ITypographyComponentProps>(typographyPropsFns);

Text.displayName = 'Typography';
