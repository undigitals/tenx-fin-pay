import React from 'react';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { SInput } from './Input.styles';
import { IInput, INPUT_TYPES_MAP } from './Input.types';

export const Input: React.FC<IInput> = ({ label, type = 'text', onBeige = false, marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0, isError = false, isSuccess = false, ...props }) =>
  label ? (
    <CustomRow flexDirection="column" alignItems="flex-start">
      <CustomText marginBottom={8}>{label}</CustomText>
      <SInput
        as={INPUT_TYPES_MAP[type]}
        type={type}
        onBeige={onBeige}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        isError={isError}
        isSuccess={isSuccess}
        {...props}
      />
    </CustomRow>
  ) : (
    <SInput
      as={INPUT_TYPES_MAP[type]}
      type={type}
      onBeige={onBeige}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      isError={isError}
      isSuccess={isSuccess}
      {...props}
    />
  );
