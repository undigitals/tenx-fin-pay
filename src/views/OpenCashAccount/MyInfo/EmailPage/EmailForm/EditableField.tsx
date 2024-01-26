import React, { useMemo, useState } from 'react';
import { Form } from 'antd';
import { BodyText } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { TThemeColor } from 'styles/theme';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { EditIcon, SIcon, SInputWrapper, SWrapper } from './EmailForm.style';

interface IEditableInputProps {
  value?: string;
  isEditMode?: boolean;
  onChange?: (val: any) => void;
}

export const EditableInput: React.FC<IEditableInputProps> = ({ value, isEditMode, onChange }) => {
  const [isEditActive, setIsEditActive] = useState(isEditMode || Boolean(!value));
  const { t } = useTranslation();
  // @ts-ignore
  const { status } = Form.Item.useStatus();

  const isSuccess = status === 'success' || (!status && isEditMode);

  const iconAfter = useMemo(() => {
    let icon;

    if (isSuccess) {
      icon = {
        name: 'tickInCircle',
        color: 'green' as TThemeColor,
      };
    }

    return icon;
  }, [isSuccess]);

  const handleOpenEdit = () => {
    // resetVal();
    setIsEditActive(true);
  };

  return (
    <div className="flex">
      <SWrapper>
        <BodyText textType="bodyText" size="N" color="charcoal" fontWeight="R" font="Poppins" marginBottom={15}>
          {t('myInfo.Email')}
        </BodyText>
        {isEditActive ? (
          <SInputWrapper>
            <BaseInput
              data-testid="emailInput"
              autoCapitalize="off"
              onChange={onChange}
              onBlur={onChange}
              value={value}
              inputMode="email"
              style={{ paddingRight: isSuccess ? '40px' : '0' }}
              onBeige={isEditMode}
            />
            {iconAfter?.name !== undefined && <SIcon name={iconAfter.name} color={iconAfter?.color} />}
          </SInputWrapper>
        ) : (
          <div className="flex">
            <BodyText textType="bodyText" size="M" color="charcoal" fontWeight="M" font="DM Sans" lineHeight={1.6}>
              {value}
            </BodyText>
          </div>
        )}
      </SWrapper>
      {!isEditActive && <EditIcon name="edit" color="blue" size="big" onClick={handleOpenEdit} cursorPointer />}
    </div>
  );
};
