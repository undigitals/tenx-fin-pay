import styled from 'styled-components';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { getColor } from 'utils/helpers/styleHelpers';
import { BodyText } from 'components/general/Typography';

export const SCustomCard = styled(CustomCard)`
  position: relative;

  .icon-pad {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin: 0 4px;
    flex: auto;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${getColor('green10')};

    &.security {
      background-color: ${getColor('green10')};

      & div.svg-icon {
        background-color: ${getColor('green')} !important;
      }

      &.new {
        background-color: ${getColor('green')};

        & div.svg-icon {
          background-color: white !important;
        }
      }
    }

    &.balance {
      background-color: ${getColor('charcoal5')};

      &.new {
        background-color: ${getColor('blue')};

        & div.svg-icon {
          background-color: white !important;
        }
      }
    }
  }

  .dots {
    display: flex;
    justify-content: flex-end;
    width: 24px;
    height: 24px;
  }

  .ellipsis {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: ${getColor('red')};
  }
`;

export const SBodyText = styled(BodyText)`
  .custom-text-inner {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
