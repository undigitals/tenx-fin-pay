import React, { useState } from 'react';
import { Form, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import { US_STATES } from 'vars/const/USE_STATEX';
import { BaseSelect } from 'components/general/BaseSelect/BaseSelect';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomSheet } from 'components/theme/CustomSheet/CustomSheet';
import { Title } from 'components/general/Typography';

interface IStateAddressSheet {
  form: FormInstance;
  value?: string;
  open: boolean;
  fieldName?: keyof IStateAddressForm;
  onClose: () => void;
  changeSelection?: () => void;
}

interface IStateAddressForm {
  stateProvince: {
    label: string;
    value: string;
  };
  mailingState: {
    label: string;
    value: string;
  };
}

export const StateAddressSheet: React.FC<IStateAddressSheet> = ({ form, value, open, onClose, fieldName = 'stateProvince', changeSelection }) => {
  const { t } = useTranslation();
  const [stateForm] = Form.useForm();
  const [selectedState, setSelectedState] = useState(value);
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const onChange = (selectedOption: any) => {
    if (!selectedOption) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }

    if (selectedOption) {
      form.setFieldValue(fieldName, stateForm.getFieldValue([fieldName, 'value']));
      changeSelection?.();
      setSelectedState(stateForm.getFieldValue([fieldName, 'value']));
      onClose();
    }
  };

  return (
    <CustomSheet isOpen={open} onClose={onClose} destroyOnClose closable={false} wrapperPadding={false} headerStyle={{ minHeight: 0, padding: 0 }} height="fit-content">
      <CustomRow minHeight="100%" flexDirection="column" alignItems="flex-start" width="100%">
        <CustomRow flexDirection="column" justifyContent="flex-start" alignItems="stretch" width="100%">
          <Title color="charcoal" size="S" fontWeight="SB" font="Poppins" marginBottom={20}>
            {t('myInfo.State')}
          </Title>

          <Form autoComplete="off" requiredMark={false} layout="vertical" form={stateForm}>
            <Form.Item name={fieldName} validateTrigger={['onBlur', 'onChange']} style={{ cursor: 'pointer' }}>
              <BaseSelect
                options={US_STATES.map((state) => ({
                  value: state.value,
                  label: state.label,
                }))}
                value={US_STATES.find((item) => item.value === selectedState)}
                placeholder={t('myInfo.State')}
                isClearable
                onChange={onChange}
                onMenuOpen={() => setMenuIsOpen(true)}
                menuIsOpen={menuIsOpen}
              />
            </Form.Item>
          </Form>
        </CustomRow>
      </CustomRow>
    </CustomSheet>
  );
};
