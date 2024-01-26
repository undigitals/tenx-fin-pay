import styled, { css } from 'styled-components/macro';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Icon } from 'components/general/Icon/Icon';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';

export const SIcon = styled(Icon)`
  background: ${getColor('blue')};
  padding: 10px;
  border-radius: 50%;
  float: right;
`;

export const SEditIcon = styled(Icon)`
  position: absolute;
  right: 8%;
`;

export const SIconWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 24px 0;
`;

export const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 0 35px 5px;
  min-height: 100%;
  width: 100%;

  .ant-form-item {
    margin-bottom: 18px;
  }

  .tel-link {
    margin-bottom: 15px;
  }

  .stateAndZipCodeField {
    display: flex;
    justify-content: space-between;
  }

  .eConsentDisclosures {
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    margin-bottom: 10px;
  }

  .ageTaxPage {
    &Header {
      display: flex;
      flex-direction: column;
    }
    &Footer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  ${mediaUpTo(
    'mobile',
    css`
      .custom-title-text {
        font-size: 23px;
      }

      .icon-exitFlow {
        width: 20px;
        height: 20px;
      }
    `
  )}
`;

export const SResultPageContainer = styled(SPageContainer)`
  padding-top: 75px;
  justify-content: flex-start;
  align-items: center;
`;

export const SCircle = styled.div`
  width: 42px;
  height: 42px;
  background: ${getColor('blue5')};
  border-radius: 20px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SIconMail = styled(Icon)`
  background: ${getColor('blue5')};
  width: 20px;
  position: relative;
  flex: 0 0 auto;
  top: 7px;
  margin: auto;
`;

export const SButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

export const SCustomRow = styled(CustomRow)`
  gap: 10px;
  .input-status-success {
    min-width: 100%;
  }
`;

export const SCustomButton = styled(CustomButton)`
  padding: 15px 32px;
`;

export const SAgeFormWrapper = styled.div`
  margin-bottom: 24px;
`;

export const SSelectWrapper = styled.div`
  position: relative;
  width: 49%;
`;

export const SContent = styled.div`
  position: relative;
  background: ${getColor('white')};
  border-radius: 20px;
  padding: 24px;
`;

export const SMailingWrapper = styled.div`
  display: block;
  &.hide {
    display: none;
  }
`;
