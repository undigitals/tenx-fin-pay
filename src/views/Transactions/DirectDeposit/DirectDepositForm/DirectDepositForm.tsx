import React, { useEffect, useState, useMemo } from 'react';
import { Form } from 'antd';
import { useTheme } from 'styled-components';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomButton } from 'components/theme/CustomButton/CustomButton';
import { Icon } from 'components/general/Icon/Icon';
import { handleError } from 'utils/helpers/errorHelper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useSelector } from 'react-redux';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useDirectDepositMutation } from 'store/user/users.api';
import { MaskedInput } from 'components/general/MaskedInput/MaskedInput';
import { getRequiredRule } from 'utils/helpers/validationRules';
import { Rule } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';
import { BodyText } from 'components/general/Typography';
import { useLazyGetAccountsQuery } from 'store/user/accounts/accounts.api';
import { Loader } from 'components/general/Loader/Loader';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { DepositEmailModal } from 'components/general/Modals/DepositEmailModal/DepositEmailModal';
import { useToggle } from 'utils/hooks/useToggle';
import { SCheckbox, SLayout } from './DirectDepositForm.styles';
import { TAmountType, IFormChangeProps, NamePath, EntryType } from './DirectDepositForm.types';

const AMOUNT_MASK = '000000000000';
const PERCENTAGE_MASK = '000';

interface IOnChangeEvent {
  unmaskedValue: string;
}

export const DirectDepositForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { cashAccountId } = useSelector(selectAccountsData);
  const theme = useTheme();
  const depositEmailModal = useToggle(false);

  const [getAccounts, getAccountsResult] = useLazyGetAccountsQuery();
  const [directDepositAPI, directDepositAPIResult] = useDirectDepositMutation();

  const [isAmountDisabled, setIsAmountDisabled] = useState<boolean>(true);
  const [isPercentageDisabled, setIsPercentageDisabled] = useState<boolean>(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [amountType, setAmountType] = useState<TAmountType>('full');
  const [amount, setAmount] = useState<number>(0);

  const [hasAmountError, setHasAmountError] = useState<boolean>(false);
  const [hasPercentageError, setHasPercentageError] = useState<boolean>(false);

  const AMOUNT_MASK_OPTIONS = {
    lazy: true,
    placeholderChar: t('directDeposit.Enter the amount'),
  };

  const PERCENTAGE_MASK_OPTIONS = {
    lazy: true,
    placeholderChar: t('directDeposit.Enter the percentage'),
  };

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if (directDepositAPIResult.isSuccess) {
      depositEmailModal.show();
    }

    if (directDepositAPIResult.isError) {
      handleError(directDepositAPIResult.error);
    }
  }, [directDepositAPIResult.isSuccess, directDepositAPIResult.isError]);

  const percentageRules = (): Rule[] => [
    getRequiredRule(t('directDeposit.Percentage is required')),
    {
      validator: async (_, value) => {
        if (value > 100) {
          throw new Error(t('directDeposit.Maximum percentage is 100%.'));
        }
      },
    },
  ];

  const amountRules: Rule[] = [
    {
      validator: async (_, value) => {
        if (!value && !isAmountDisabled) {
          throw new Error(t('directDeposit.Amount is required'));
        }
      },
    },
  ];

  const handleCompleteLater = () => {
    navigate(ROUTES.home.path);
  };

  const handleFormChange = (changedValues: IFormChangeProps[], allValues: IFormChangeProps[]) => {
    let isButtonDisabled = false;

    const checkboxValues: Record<string, boolean> = {
      amountChecked: false,
      percentageChecked: false,
    };

    Object.entries(allValues).forEach((item: EntryType<IFormChangeProps>) => {
      const itemName = (item[1].name as NamePath[]) ?? '';
      const itemValue = item[1].value ?? '';

      if (itemName[0] === 'amountChecked' || itemName[0] === 'percentageChecked') {
        checkboxValues[itemName[0]] = Boolean(itemValue);
      }

      if (itemName[0] === 'entireChecked') {
        isButtonDisabled = !itemValue;
      }

      if ((itemName[0] === 'amount' && checkboxValues.amountChecked) || (itemName[0] === 'percentage' && checkboxValues.percentageChecked)) {
        isButtonDisabled = !String(itemValue).length;
      }
    });

    const hasError = form.getFieldsError().some(({ errors }) => errors.length);
    setIsSubmitDisabled(isButtonDisabled || hasError);
  };

  const handleAmountCheckedChange = (checked: boolean) => {
    setIsSubmitDisabled(true);
    setHasPercentageError(false);
    setHasAmountError(false);

    form.resetFields(['percentage', 'amount']);

    setAmountType('dollar');

    if (checked) {
      form.setFieldsValue({
        entireChecked: false,
        percentageChecked: false,
        percentage: '',
      });

      setIsPercentageDisabled(true);
      setIsAmountDisabled(false);
    } else {
      setIsAmountDisabled(true);
    }
  };

  const handlePercentageCheckedChange = (checked: boolean) => {
    setIsSubmitDisabled(true);
    setHasPercentageError(false);
    setHasAmountError(false);

    form.resetFields(['percentage', 'amount']);

    setAmountType('percent');

    if (checked) {
      form.setFieldsValue({
        entireChecked: false,
        amountChecked: false,
        amount: '',
      });

      setIsAmountDisabled(true);
      setIsPercentageDisabled(false);
    } else {
      setIsPercentageDisabled(true);
    }
  };

  const handleEntireCheckedChange = (checked: boolean) => {
    form.resetFields(['percentage', 'amount']);

    setAmountType('full');
    setAmount(0);

    if (checked) {
      form.setFieldsValue({
        percentageChecked: false,
        amountChecked: false,
        amount: '',
        percentage: '',
      });

      setIsAmountDisabled(true);
      setIsPercentageDisabled(true);
      setIsSubmitDisabled(false);
    }
  };

  const handleAmountChange = ({ unmaskedValue }: IOnChangeEvent) => {
    if (unmaskedValue === '') {
      setIsSubmitDisabled(true);
    }
    setAmount(Number(unmaskedValue));
  };

  const handlePercentageChange = ({ unmaskedValue }: IOnChangeEvent) => {
    if (unmaskedValue === '') {
      setIsSubmitDisabled(true);
    }
    setAmount(Number(unmaskedValue));
  };

  const handleOnSubmit = () => {
    if (cashAccountId) {
      directDepositAPI({
        accountId: cashAccountId,
        amountType,
        amount,
      });
    }
  };

  const memoizedPercentageRules = useMemo(() => percentageRules(), [t, amount]);

  if (getAccountsResult.isLoading || directDepositAPIResult.isLoading) return <Loader />;

  return (
    <SLayout>
      <CustomCard width="100%" marginTop={0}>
        <Form
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          form={form}
          onFieldsChange={handleFormChange}
          initialValues={{
            entireChecked: false,
            amountChecked: false,
            percentageChecked: false,
            amount: '',
            percentage: '',
          }}
        >
          <Form.Item name="entireChecked" valuePropName="checked" style={{ marginBottom: '12px' }}>
            <SCheckbox onChange={(event: CheckboxChangeEvent) => handleEntireCheckedChange(event.target.checked)}>
              <BodyText textType="bodyText" color="charcoal70" marginTop={15} size="N" fontWeight="R">
                {t('directDeposit.Deposit my entire paycheck.')}
              </BodyText>
            </SCheckbox>
          </Form.Item>

          <Form.Item name="amountChecked" valuePropName="checked" style={{ marginBottom: '12px' }}>
            <SCheckbox onChange={(event: CheckboxChangeEvent) => handleAmountCheckedChange(event.target.checked)}>
              <BodyText textType="bodyText" color="charcoal70" marginTop={15} size="N" fontWeight="R">
                {t('directDeposit.Deposit this amount of my paycheck.')}
              </BodyText>
            </SCheckbox>
          </Form.Item>

          <Form.Item name="amount" validateTrigger={['onBlur', 'onChange']} rules={amountRules} style={{ marginBottom: '12px' }}>
            <MaskedInput
              placeholder={t('directDeposit.EnterValue')}
              disabled={isAmountDisabled}
              onChange={(value) => handleAmountChange(value)}
              prefix={<Icon name="budgetIcon" color="charcoal" />}
              mask={AMOUNT_MASK}
              maskOptions={AMOUNT_MASK_OPTIONS}
              isError={hasAmountError}
              style={{ background: theme.white }}
              inputMode="numeric"
            />
          </Form.Item>

          <Form.Item name="percentageChecked" valuePropName="checked" style={{ marginBottom: '12px' }}>
            <SCheckbox onChange={(event: CheckboxChangeEvent) => handlePercentageCheckedChange(event.target.checked)}>
              <BodyText textType="bodyText" color="charcoal70" marginTop={15} size="N" fontWeight="R">
                {t('directDeposit.Deposit this percentage of my paycheck.')}
              </BodyText>
            </SCheckbox>
          </Form.Item>

          <Form.Item name="percentage" validateTrigger={['onBlur', 'onChange']} rules={memoizedPercentageRules} style={{ marginBottom: '12px' }}>
            <MaskedInput
              placeholder={t('directDeposit.EnterValue')}
              disabled={isPercentageDisabled}
              onChange={(number) => handlePercentageChange(number)}
              prefix={<Icon name="percentage" />}
              mask={PERCENTAGE_MASK}
              maskOptions={PERCENTAGE_MASK_OPTIONS}
              isError={hasPercentageError}
              style={{ background: theme.white }}
              inputMode="numeric"
            />
          </Form.Item>
        </Form>
      </CustomCard>

      <div className="footer">
        <CustomButton preset="primary" onClick={handleOnSubmit} disabled={isSubmitDisabled} marginTop={120}>
          {t('directDeposit.Submit')}
        </CustomButton>

        <BodyText textType="bodyText" size="N" fontWeight="M" color="blue" marginTop={28} marginBottom={60} textAlign="center" font="Poppins" onClick={handleCompleteLater} cursorPointer>
          {t('directDeposit.Complete Later')}
        </BodyText>
      </div>
      <DepositEmailModal isOpen={depositEmailModal.isActive} onClose={depositEmailModal.hide} />
    </SLayout>
  );
};
