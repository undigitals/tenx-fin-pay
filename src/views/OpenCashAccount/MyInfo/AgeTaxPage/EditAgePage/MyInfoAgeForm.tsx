import React, { useMemo } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { ageDateStringRules } from 'utils/helpers/validationRules';
import { useCashAccountOpening } from 'utils/hooks/useCashAccountOpening';
import { formatDate, parseDate } from 'utils/helpers/date';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { differenceInYears } from 'date-fns';
import { useAppDispatch } from 'utils/hooks/store';
import { setShowAdditionalInformationModal } from 'store/ui.slice';
import { IAgeForm, MyInfoFormInputProps } from 'views/OpenCashAccount/MyInfo/MyInfo.type';

export const MyInfoAgeForm: React.FC<MyInfoFormInputProps<IAgeForm>> = ({ onCompletion, form, handleSubmit, isEditMode }) => {
  const { openingAccountData } = useCashAccountOpening();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const showAgeReminderPopupForMinors = () => {
    dispatch(
      setShowAdditionalInformationModal({
        displayAdditionalInformationModal: true,
        additionalInformationModalType: 'myInfoAgeValidation',
      })
    );
  };
  const onFieldsChange = () => {
    const formErrors = form.isFieldsTouched(true) && form.getFieldsError().some(({ errors }): number => errors.length);
    const dob = form.getFieldValue('dateOfBirth');
    onCompletion(!formErrors);
    if (dob.split('/').slice(-1)[0] > 2000 && differenceInYears(new Date(), new Date(dob)) < 18) {
      showAgeReminderPopupForMinors();
    }
  };

  const memoizedAgeDateStringRules = useMemo(() => ageDateStringRules(), [t]);
  return (
    <Form
      style={{ width: '100%' }}
      onFieldsChange={onFieldsChange}
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      form={form}
      initialValues={{ dateOfBirth: openingAccountData?.dateOfBirth }}
    >
      <Form.Item name="dateOfBirth" validateTrigger={['onBlur', 'onChange']} validateFirst rules={memoizedAgeDateStringRules}>
        <MaskedInput
          mask={Date}
          maskOptions={{
            pattern: 'm/d/Y',
            parse: parseDate,
            format: formatDate,
            lazy: true,
          }}
          placeholder="MM/DD/YYYY"
          data-testid="dateOfBirth"
          isBorderHidden={isEditMode}
        />
      </Form.Item>
    </Form>
  );
};
