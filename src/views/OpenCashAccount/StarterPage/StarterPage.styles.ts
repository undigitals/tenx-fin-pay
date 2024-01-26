import styled, { css } from 'styled-components';
import { getColor, ifProp, MEDIA_SIZE, mediaUpTo } from 'utils/helpers/styleHelpers';
import { telephone } from 'assets/icons';

interface IStarterPage {
  isStarterPage: boolean;
}

export const SStarterPage = styled.section<IStarterPage>`
  padding: 0 15px;

  img {
    display: block;
    margin: 0 auto 40px;
  }

  section.benefits {
    margin-bottom: 32px;

    & > .list {
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 14px;

      div:not(:last-child) {
        margin-bottom: 16px;
      }

      a {
        color: ${getColor('blue')};
        text-decoration: underline;
      }

      &ColoredBorder details {
        border: 1px solid ${getColor('charcoal10')};
      }
    }

    ul.benefit {
      list-style-type: disc;
      padding-left: 68px;
      color: ${getColor('charcoal70')};

      li:not(:last-child) {
        margin-bottom: 8px;
      }

      & > li::marker {
        color: ${getColor('blue')};
      }

      ul {
        list-style-type: disc;
        padding-left: 28px;
        margin-top: 8px;

        & > li::marker {
          color: ${getColor('charcoal70')};
        }
      }
    }
  }

  section.help {
    margin-block: 32px 16px;
    text-align: center;

    address {
      &::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 24px;
        margin-bottom: 8px;
        mask: url(${telephone}) no-repeat center;
        background-color: ${getColor('blue')};
      }

      a {
        font-weight: 700;
        color: ${getColor('charcoal')};

        &:hover {
          color: ${getColor('blue')};
        }
      }
    }
  }

  footer {
    margin-bottom: 48px;
  }

  ${ifProp(
    'isStarterPage',
    mediaUpTo(
      'mobile',
      css`
        padding: 0;
        img {
          width: 150px;
        }
        .custom-title-text {
          font-size: 20px;
        }

        .custom-text-inner {
          font-size: 14px;
        }

        span {
          font-size: 12px;
        }
      `
    )
  )}
`;

export const SWrapper = styled.div`
  @media screen and (min-width: ${MEDIA_SIZE.tablet}px) {
    border: 2px solid ${getColor('charcoal10')};
    border-radius: 20px;
  }
`;
