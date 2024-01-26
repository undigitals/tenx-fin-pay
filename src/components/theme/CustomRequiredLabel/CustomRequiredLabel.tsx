import React from 'react';
import { Typography } from 'antd';
import { InputLabel } from 'components/general/InputLabel/InputLabel';
import { ICustomInputStyleObject } from 'components/general/InputLabel/InputLabel.types';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface ICustomRequiredLabel extends ICustomInputStyleObject {
  label: string;
  isDanger?: boolean;
  color?: string;
  translation?: string;
}

export const CustomRequiredLabel: React.FC<ICustomRequiredLabel> = ({ label, color, isDanger = false, translation = '', ...props }) => {
  const { t } = useTranslation();
  const StyleObj: ICustomInputStyleObject = {
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    marginRight: props.marginRight,
    marginLeft: props.marginLeft,
    fontFamily: props.fontFamily,
  };

  return (
    <InputLabel marginTop={StyleObj.marginTop} marginLeft={StyleObj.marginLeft} marginRight={StyleObj.marginRight} marginBottom={StyleObj.marginBottom} fontFamily={StyleObj.fontFamily} color={color}>
      {t(`${translation}${label}`)}
      {isDanger && <Text type="danger">*</Text>}
    </InputLabel>
  );
};
