import React from 'react';
import Text from 'antd/lib/typography/Text';
import * as S from './AddButtonWithLabel.styles';

interface AddButtonWithLabelProps {
  label: string;
  onClick?: () => void;
}

export const AddButtonWithLabel: React.FC<AddButtonWithLabelProps> = ({ label, onClick }) => (
  <S.ButtonAddContainer>
    <Text>
      {label}
      <Text type="danger">*</Text>
    </Text>
    <S.ButtonAdd onClick={onClick}>+ Add</S.ButtonAdd>
  </S.ButtonAddContainer>
);
