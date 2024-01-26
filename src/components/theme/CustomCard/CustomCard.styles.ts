import styled, { css } from 'styled-components/macro';
import { getColorByProp, getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ICustomCard, ICustomCardProps } from './CustomCard.types';

export const SCard = styled.div<ICustomCard>`
  background: ${getColorByProp('background')};
  border-radius: ${getProp('borderRadius')}px;
  padding: ${getProp('padding', '24px')};
  margin: ${getProp('margin')};
  margin-bottom: ${getProp('marginBottom')}px;
  margin-top: ${getProp('marginTop')}px;
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};
  border: ${getProp('border')};
  position: ${getProp('position')};
  z-index: 10;
  width: ${getProp('width')};
  height: ${getProp('height')};

  ${({ $extraStyles }: ICustomCardProps) => css({ ...$extraStyles })};
`;
