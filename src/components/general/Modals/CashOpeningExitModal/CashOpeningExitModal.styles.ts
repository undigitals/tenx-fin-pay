import styled, { css } from 'styled-components';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { mediaUpToHeight, getColor } from 'utils/helpers/styleHelpers';
import { Icon } from 'components/general/Icon/Icon';

export const SIconClose = styled(Icon)`
  color: ${getColor('charcoal70')};
  position: absolute;
  min-width: 25px;
  min-height: 25px;
  top: 12px;
  right: 12px;
  z-index: 1000;
`;

export const SCustomModal = styled(CustomModal)`
  ${mediaUpToHeight(
    750,
    css`
      top: 0% !important;
    `
  )}
  ${mediaUpToHeight(
    700,
    css`
      .custom-title-text {
        font-size: 24px;
      }
    `
  )}
`;

export const SLinkTel = styled.a`
  color: ${getColor('blue')};

  &:hover {
    color: ${getColor('blue')};
  }
`;

export const SModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  align-items: end;
`;

export const SModalTextBlock = styled.div`
  align-self: flex-start;
`;

export const SCustomButton = styled(CustomButton)`
  padding: 12px 24px;
  font-size: 14px;
  line-height: 20px;
`;
