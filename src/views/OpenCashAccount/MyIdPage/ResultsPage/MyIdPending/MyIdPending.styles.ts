import styled, { css } from 'styled-components';
import { mediaUpTo } from 'utils/helpers/styleHelpers';
import { BodyText } from 'components/general/Typography';

export const SBodyText = styled(BodyText)`
  margin-bottom: 32px;
  ${mediaUpTo(
    380,
    css`
      margin-bottom: 15px;
    `
  )}
`;
