import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { getColor, MEDIA_SIZE } from 'utils/helpers/styleHelpers';
import { motion } from 'framer-motion';
import { Title } from 'components/general/Typography';

export const SLayout = styled.div`
  width: 100%;
`;

export const STitle = styled(Title)`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    width: 100%;
  }
`;

export const SMotionDiv = styled(motion.div)``;

export const SActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 104px;
  margin-bottom: 12px;
  gap: 18px;

  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    margin-top: 20px;
  }

  span.ant-typography {
    color: ${getColor('charcoal60')};
  }
`;

export const SLink = styled(Link)`
  font-weight: 500;
  font-family: Poppins;
  font-size: 14px;
  & span {
    color: ${getColor('blue')} !important;
  }

  &:hover {
    color: ${getColor('blue')};
  }
}
`;

export const SForgotLink = styled.span`
  color: ${getColor('blue')};
  font-weight: 500;
  height: 24px;
  line-height: 14px;
  cursor: pointer;

  &:hover, &:focus {
    color: ${getColor('blue')};
  }
}
`;

export const SFaceIdInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
