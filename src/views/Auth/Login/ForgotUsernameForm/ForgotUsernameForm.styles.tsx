import styled from 'styled-components/macro';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';

export const SFormWrapper = styled.div`
  & .ant-form-item .ant-form-item-label {
    padding: 0;
  }

  .enter-mobile-number {
    margin-bottom: 30px;
  }

  .separate-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 28px;
  }
  .separator {
    flex: 1;
    height: 1px;
    border-bottom: 1px solid ${getColor('charcoal10')};
  }

  .forgot-username-button-wrapper {
    @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;
