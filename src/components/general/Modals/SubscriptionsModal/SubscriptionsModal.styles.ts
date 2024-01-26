import styled from 'styled-components';
import { css } from 'styled-components/macro';
import { getColor, mediaUpTo } from 'utils/helpers/styleHelpers';
import { TThemeColor } from 'styles/theme';
import { CustomModal } from 'components/theme/CustomModal/CustomModal';

type TSListLiProps = {
  color?: TThemeColor;
  isNested?: boolean;
};

export const SModal = styled(CustomModal)`
  &.subscribe {
    button.primary {
      margin-top: 32px;
      padding: 12px 24px;
      font-size: 16px;
      line-height: 1.5;
    }
  }
`;

export const SContentLayout = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  button {
    height: 44px;
    font-family: 'Poppins';
    font-size: 14px;
    font-weight: 500;
  }

  img {
    width: 100%;
  }

  .connect-and-share {
    margin-top: 4px;
    margin-bottom: 24px;
    & img {
      width: 190px;
      ${mediaUpTo(
        'mobile',
        css`
          width: 150px;
        `
      )}
    }
  }

  .international-transfer {
    margin-top: 4px;
    margin-bottom: 15px;
    & img {
      width: 345px;
      ${mediaUpTo(
        'mobile',
        css`
          width: 270px;
        `
      )}
    }
  }

  .paid-as-you-go {
    margin-top: 4px;
    margin-bottom: 16px;
    & img {
      width: 190px;
      ${mediaUpTo(
        'mobile',
        css`
          width: 150px;
        `
      )}
    }
  }

  ${mediaUpTo(
    'mobile',
    css`
      ul,
      .body-text {
        padding-right: 0 !important;
      }

      img {
        width: 150px;
      }
    `
  )}
`;

export const SList = styled.ul<any>`
  ${({ fluid }: { fluid?: boolean }) =>
    fluid &&
    css`
      flex: 1;
    `}

  ${({ marginLeft, marginBottom }: { marginLeft?: number; marginBottom?: number }) => css`
    margin-left: ${marginLeft ?? -15}px;
    margin-bottom: ${marginBottom ?? 12}px;
  `}
`;

export const SListItem = styled.li`
  margin-bottom: 20px;
  padding-left: 5px;
`;

export const SWrapper = styled.div`
  overflow-y: auto;
`;

export const SIList = styled(SList)`
  li {
    list-style: disc;
    color: ${getColor('charcoal70')};
    margin-bottom: 20px;
  }
`;

export const SListLi = styled.li<TSListLiProps>`
  ${({ color = 'charcoal70', isNested }) => css`
    list-style: disc;
    color: ${getColor(isNested ? 'charcoal70' : color)};
    margin-bottom: 12px;
    margin-left: ${isNested ? '20px' : ''};

    &:last-child {
      margin-bottom: 0;
    }
  `};
`;
