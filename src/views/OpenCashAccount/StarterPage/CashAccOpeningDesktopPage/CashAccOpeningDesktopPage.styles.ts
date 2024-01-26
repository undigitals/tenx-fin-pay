import styled, { css } from 'styled-components';
import bgCreamGradient from 'assets/images/bgCreamGradient.svg';
import { getColor } from 'utils/helpers/styleHelpers';
import { telephone } from 'assets/icons';

export const SLayout = styled.div<{ bgFooterImage?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    display: flex;
    justify-content: space-between;
    background-image: url(${bgCreamGradient});
    background-position: bottom;
    min-height: 318px;
    padding: 0 60px 52px;
  }

  header .titleContainer {
    display: flex;
    flex-direction: column;
    flex: 5;
    padding-top: 70px;
  }

  header .imageContainer {
    display: flex;
    flex: 3;
    justify-content: flex-end;
    height: 232px;
    overflow: hidden;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 60px 26px;
  }

  section.help {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 32px 16px 0;
    text-align: center;

    button.primary {
      width: 164px;
      margin-bottom: 60px;
    }

    address {
      margin: 0;

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
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 212px;
    padding: 0 60px 64px 60px;

    ${({ bgFooterImage }) => css`
      background: url(${bgFooterImage}) no-repeat bottom right;
    `};
  }
`;
