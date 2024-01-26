import styled, { css } from 'styled-components';
import { getProp, ifProp } from 'utils/helpers/styleHelpers';
import { ICustomRowProps } from './CustomRow.types';

export const SRow = styled.div<ICustomRowProps>`
  display: flex;
  flex-direction: ${getProp('flexDirection')};
  align-items: ${getProp('alignItems')};
  justify-content: ${getProp('justifyContent')};
  gap: ${getProp('gap')}px;
  width: ${getProp('width')};
  margin-bottom: ${getProp('marginBottom')}px;
  margin-top: ${getProp('marginTop')}px;
  margin-left: ${getProp('marginLeft')}px;
  margin-right: ${getProp('marginRight')}px;
  padding-bottom: ${getProp('paddingBottom')}px;
  padding-top: ${getProp('paddingTop')}px;
  padding-left: ${getProp('paddingLeft')}px;
  padding-right: ${getProp('paddingRight')}px;
  cursor: ${ifProp('cursorPointer', 'pointer', 'default')};
  min-height: ${getProp('minHeight')};
  height: ${getProp('height')};
  overflow-y: ${getProp('overflowY')};
  overflow-x: ${ifProp('horizontalScroll', 'auto', 'visible')};
  ::-webkit-scrollbar {
    display: none;
  }
  flex: ${getProp('flex')};
  flex-wrap: ${getProp('flexWrap')};

  ${({ extraStyles }) => css({ ...extraStyles })};
`;
