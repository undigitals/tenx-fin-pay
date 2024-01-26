import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { SMaskedInput } from './MaskedInput.styles';
import { IMaskedInput } from './MaskedInput.types';

export const MaskedInput: React.FC<IMaskedInput> = ({
  label,
  placeholderColor = 'charcoal40',
  onBeige = false,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  minWidth = 0,
  isError = false,
  isSuccess = false,
  isBorderHidden = false,
  ...props
}) =>
  label ? (
    <CustomRow flexDirection="column" alignItems="flex-start" className="masked-input-container">
      <CustomText marginBottom={8}>{label}</CustomText>
      <SMaskedInput
        placeholderColor={placeholderColor}
        className="masked-input-input"
        onBeige={onBeige}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        minWidth={minWidth}
        isError={isError}
        isSuccess={isSuccess}
        isBorderHidden={isBorderHidden}
        {...props}
      />
    </CustomRow>
  ) : (
    <SMaskedInput
      placeholderColor={placeholderColor}
      className="masked-input-input"
      onBeige={onBeige}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      minWidth={minWidth}
      isError={isError}
      isSuccess={isSuccess}
      isBorderHidden={isBorderHidden}
      {...props}
    />
  );
