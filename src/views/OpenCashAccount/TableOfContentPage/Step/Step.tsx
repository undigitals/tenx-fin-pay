import React, { MouseEventHandler } from 'react';
import { EKycFlowStatusType } from 'utils/hooks/useKYC';
import { useToggle } from 'utils/hooks/useToggle';
import { Icon } from 'components/general/Icon/Icon';
import { Chip } from 'components/general/Chip/Chip';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { Collapsible } from 'components/general/Collapsible/Collapsible';
import { useNavigate } from 'react-router-dom';
import { TThemeColor } from 'styles/theme';
import { IListText } from 'views/OpenCashAccount/TableOfContentPage/TableOfContentPage';
import { useTranslation } from 'react-i18next';
import { BodyText } from 'components/general/Typography';
import { StepBar } from './ProgressBar/StepBar';
import { Container, SCardContent, SCardHeader, SIconContainer, SList, SCustomButton } from './Step.styles';

interface ICard {
  title: string;
  iconName: string;
  listingText: IListText[];
  stepNumber: number;
  isLast?: boolean;
  color: TThemeColor;
  bgColor: TThemeColor;
  to: string;
  minute: string;
  status: EKycFlowStatusType;
  isDisabled?: boolean;
  navText: string;
}

export const Step: React.FC<ICard> = ({ title, iconName, listingText, color, bgColor, to, status, stepNumber, minute = '', isLast = false, navText, isDisabled = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const collapsible = useToggle();

  const isDone = status === EKycFlowStatusType.DONE;
  const isFailed = status === EKycFlowStatusType.FAILED;
  const iconColor = (isDone && 'green') || (isFailed && 'red') || color;
  const iconBgColor = (isDone && 'green5') || (isFailed && 'red5') || bgColor;

  const handleClickButton = () => {
    if (isFailed || isDisabled) {
      return false;
    }
    return navigate(to);
  };

  const handleToggleCollapse: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    collapsible.toggle();
  };

  return (
    <Container isLastItem={isLast} isDisabled={isDisabled}>
      <StepBar stepNumber={stepNumber} isLast={isLast} isDone={isDone} isFailed={isFailed} />
      <SCardHeader onClick={handleToggleCollapse}>
        <div className="left">
          <SIconContainer bgColor={iconBgColor}>
            <Icon name={iconName} color={iconColor} size="bigger" />
          </SIconContainer>
          <CustomRow flexDirection="column" justifyContent="center" alignItems="flex-start">
            <BodyText textType="bodyText" cursorPointer marginLeft={10} lineHeight={1.4} size="M" fontWeight="B" color="charcoal">
              {t(`accountOpening.${title}`)}
            </BodyText>
            <BodyText textType="bodyText" color="charcoal60" size="T" fontWeight="R" marginLeft={10}>
              {`${t('accountOpening.Estimated time')}: ${minute}`}
            </BodyText>
          </CustomRow>
        </div>
        {isDone && (
          <Chip size="small" preset="cream" extraStyles={{ color: 'green', background: 'green10' }} noHoverEffect>
            {t('accountOpening.Completed')}
          </Chip>
        )}
        {isFailed && (
          <Chip size="small" preset="cream" extraStyles={{ color: 'red', background: 'red10' }} noHoverEffect>
            {t('accountOpening.Not Verified')}
          </Chip>
        )}
      </SCardHeader>

      <Collapsible isOpen={collapsible.isActive} isActive={isDone || isFailed}>
        <SCardContent>
          <SList markerColor={color}>
            {listingText.map((item: IListText) => (
              <li>
                {t(`accountOpening.${item.text}`)}
                <BodyText textType="bodyText" size="N" color="charcoal60" fontWeight="R">
                  {item.description}
                </BodyText>
              </li>
            ))}
          </SList>

          {!isFailed && (
            <CustomRow justifyContent="flex-end" marginTop={38}>
              <SCustomButton onClick={handleClickButton}>
                <BodyText textType="bodyText" size="M" fontWeight="M" font="Poppins" cursorPointer marginRight={21} color="blue">
                  {navText}
                </BodyText>
                <Icon name="chevronRight" color="blue" size="smallest" cursorPointer />
              </SCustomButton>
            </CustomRow>
          )}
        </SCardContent>
      </Collapsible>
    </Container>
  );
};
