import React from 'react';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { CustomCheckbox } from 'components/theme/CustomCheckbox/CustomCheckbox';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { convertLinksToExternal } from 'utils/helpers/urlString/urlString';
import { SSheetFooter } from './DisclosureSheet.styles';

interface IDisclosureSheetProps {
  name?: string;
  isOpen?: boolean;
  handleCloseSheet: () => void;
  handleButtonClick?: () => void;
  handleCheckboxClick?: () => void;
  subTitle?: string;
  acceptCheckBoxText?: string;
  isChecked?: boolean;
  acceptButtonText?: string;
  errorMessage?: string;
  disclosureText?: string;
  isError?: boolean;
  isReadOnly?: boolean;
}

export const DisclosureSheet: React.FC<IDisclosureSheetProps> = ({
  name,
  isOpen,
  handleCloseSheet,
  handleButtonClick,
  handleCheckboxClick,
  subTitle,
  acceptCheckBoxText,
  isChecked,
  acceptButtonText,
  errorMessage,
  disclosureText,
  isError,
  isReadOnly,
}) => (
  <CustomSheet
    title={name}
    isOpen={isOpen}
    onClose={handleCloseSheet}
    subtitle={subTitle}
    footer={
      !isReadOnly && (
        <SSheetFooter>
          <CustomCheckbox checked={isChecked} marginBottom={25} className="white" onClick={handleCheckboxClick}>
            <CustomText size="big" textColor="charcoal70">
              {acceptCheckBoxText}
            </CustomText>
          </CustomCheckbox>

          <CustomButton size="large" preset="primary" onClick={handleButtonClick} disabled={!isChecked}>
            {acceptButtonText}
          </CustomButton>
        </SSheetFooter>
      )
    }
  >
    <div>
      {isError && (errorMessage || 'Some error occured while fetching data')}
      {!isError && disclosureText && <div dangerouslySetInnerHTML={{ __html: convertLinksToExternal(disclosureText) }} />}
    </div>
  </CustomSheet>
);
