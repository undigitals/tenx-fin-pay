import styled, { css } from 'styled-components/macro';
import Text from 'antd/lib/typography/Text';
import { ReactComponent as EmvChipSvg } from 'assets/images/emvChip.svg';
import { ReactComponent as DebitSvg } from 'assets/images/debit.svg';
import { getColor, ifProp } from 'utils/helpers/styleHelpers';
import { americanExpressLogo, americanExpressText, discoverLogo, mastercardLogo, VisaLogo } from 'assets/logos';
import { TenxLogo as TenxLogoSvg } from 'components/general/TenxLogo/TenxLogo';
import { images } from 'assets';
import { ICard, ILabel, IOutline } from './CreditCardSmall.types';

const SelectedStyles = css`
  border: 2px solid ${getColor('blue')};
  border-radius: 22px;
`;

const SCardPurplePreset = css`
  background: linear-gradient(to right, #5e1a86, #271a67);
`;

const SCardBluePreset = css`
  background: linear-gradient(to right, #3d61c9, #2549af);
`;

const SCardGreenPreset = css`
  background: linear-gradient(to right, #0e9588, #2bc89c);
`;

const SCardPurpleOrangePreset = css`
  background: linear-gradient(to right, #852b89, #e07733);
`;

const SCardBlackPreset = css`
  background: linear-gradient(to right, #4f515a, #3a3f47);
`;

export const SOutline = styled.div<IOutline>`
  padding: 1.5px;
  ${ifProp('isSelected', SelectedStyles)};
`;

export const SCard = styled.div<ICard>`
  display: flex;
  flex-direction: column;
  width: 210px;
  height: 128px;
  border-radius: 20px;
  background-color: ${({ color }) => getColor(color)};
  color: ${getColor('white')};
  position: relative;
  cursor: pointer;
  overflow: hidden;

  ${({ styleId }) => {
    switch (styleId) {
      case 0:
        return SCardPurpleOrangePreset;
      case 1:
        return SCardBlackPreset;
      case 2:
        return SCardBluePreset;
      case 3:
        return SCardGreenPreset;
      case 4:
      default:
        return SCardPurplePreset;
    }
  }};
`;

export const SBackgroundImage = styled.div`
  background: url(${images.brandOverlay}) no-repeat center / contain;
  width: 117px;
  height: 85px;
  position: absolute;
  top: 60.5px;
  left: -4px;
`;

export const SCardNumber = styled.div`
  font-size: 14px;
  position: absolute;
  left: 2rem;
  top: 2rem;
  color: white;
`;

export const SCurrentBalance = styled.div`
  position: absolute;
  right: 18px;
  top: 71px;
  font-size: 14px;
  color: ${getColor('white')};
`;

export const SAmount = styled.div`
  position: absolute;
  right: 18px;
  bottom: 65px;
  font-size: 24px;
  color: ${getColor('white')};
`;

export const SInfoLabel = styled(Text)<ILabel>`
  font-weight: 400;
  font-size: 5.22px;
  color: ${getColor('white')};
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

export const SDataLabel = styled(Text)<ILabel>`
  font-weight: 500;
  font-size: 12px;
  color: ${getColor('white')};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  font-feature-settings: 'ss03' on, 'ss01' on;
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
`;

export const STenxLogo = styled(TenxLogoSvg)`
  position: absolute;
  top: 14px;
  right: 13px;
  width: 89px;
  height: 15px;
`;

export const SEmvChip = styled(EmvChipSvg)`
  width: 27px;
  height: 20px;
  position: absolute;
  top: 43px;
  left: 23.5px;
`;

export const SDebit = styled(DebitSvg)`
  width: 23px;
  position: absolute;
  bottom: 38px;
  right: 13px;
  color: ${getColor('white')};
`;

export const SVisa = styled(VisaLogo)`
  height: auto;
  width: 64px;
  position: absolute;
  bottom: 11px;
  right: 13px;
  color: ${getColor('white')};
`;

export const SMastercard = styled(mastercardLogo)`
  position: absolute;
  bottom: 11px;
  right: 13px;
`;

export const SDiscover = styled(discoverLogo)`
  position: absolute;
  bottom: 11px;
  right: 13px;
`;

export const SAmericanExpressTitle = styled(americanExpressText)`
  position: absolute;
  bottom: 11px;
  right: 13px;
`;

export const SAmericanExpressLogo = styled(americanExpressLogo)`
  flex: 1;
  align-self: center;
  justify-self: center;
`;
