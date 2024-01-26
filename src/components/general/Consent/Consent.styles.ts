import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import styled from 'styled-components';
import { getColor } from 'utils/helpers/styleHelpers';

export const SCustomSheet = styled(CustomSheet)`
  // Markup comes from server with styles so we have to hardly override it
  h1 {
    font-size: 16px !important;
    font-weight: 600 !important;
    line-height: 20px !important;
    margin-bottom: 20px !important;
  }

  p {
    font-size: 14px !important;
    line-height: 20px !important;
    font-family: 'DM Sans', sans-serif !important;
  }

  table {
    width: auto;
  }
`;

export const SConsentWrapper = styled.div`
  position: relative;
  border-radius: 25px;
  overflow: hidden;
  margin-top: 25px;

  .consent-bar {
    padding: 24px;
  }
`;

export const SSuccessTopIcon = styled.img`
  align-self: center;
  width: 120px;
  margin: 0 auto 32px;
`;

export const SSentSuccessfully = styled.div`
  display: flex;
  flex-direction: column;

  .email {
    color: ${getColor('charcoal')};
    font-weight: 700;
  }
`;

export const SSendViaEmailLayout = styled.div`
  display: flex;
  flex-direction: column;

  & .email-label-container {
    flex-direction: row;
    justify-content: flex-start;
  }
`;
