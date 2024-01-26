import { Icon } from 'components/general/Icon/Icon';
import styled, { css } from 'styled-components';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SCircle = styled.div`
  width: 40px;
  height: 40px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;

  ${mediaUpTo(
    'mobile',
    css`
      width: 35px;
      height: 35px;
    `
  )}
`;
export const SCashTitleIcon = styled(Icon)`
  background: ${getColor('blue5')};
  width: 22px;
  position: relative;
  flex: 0 0 auto;
  top: 20.83%;
  margin: auto;
  ${mediaUpTo(
    'mobile',
    css`
      width: 20px;
    `
  )}
`;
export const SHolderIcon = styled(Icon)`
  width: 16px;
  position: relative;
  top: 5px;
`;
export const SContent = styled.div`
  display: flex;
  gap: 13px;
  width: 100%;
`;
export const STextBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
export const SMainTextBlock = styled(STextBlock)`
  flex: 1 1 0%;
`;
export const SLastTextBlock = styled(STextBlock)`
  flex: 0 0 auto;
`;
