import styled from 'styled-components';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';
import { getColor } from 'utils/helpers/styleHelpers';

export const SProductModal = styled(CustomModal)`
  .ant-modal-close-x {
    height: 25px;
    width: 25px;
    line-height: 25px;
    font-size: 13px;
  }

  .ant-modal-content {
    border-radius: 20px;
  }

  .ant-modal-body {
    padding: 50px 25px;
  }
`;

export const STopImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

export const SContentWrapper = styled.div`
  p {
    font-size: 12px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 20px;
    margin-bottom: 30px;
  }

  h4 {
    font-weight: 700;
    margin-bottom: 20px;
  }

  ul {
    padding-left: 25px;
  }

  li {
    margin-bottom: 20px;
    font-size: 12px;
  }
`;

export const STitle = styled.h2`
  color: ${getColor('blue')};
  margin-bottom: 30px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 12px;
    width: 31px;
    height: 31px;
  }
`;
