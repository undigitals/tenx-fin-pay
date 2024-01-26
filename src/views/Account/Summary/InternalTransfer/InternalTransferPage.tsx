import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import isNumeric from 'antd/es/_util/isNumeric';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Rule } from 'antd/lib/form';
import { useGetAccountsQuery } from 'store/user/accounts/accounts.api';
import { selectAccountsData } from 'store/user/accounts/accounts.slice';
import { Loader } from 'components/general/Loader/Loader';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { useToggle } from 'utils/hooks/useToggle';
import { IPartyAcctRelRecItem } from 'store/user/accounts/accounts.types';
import { useDeviceDimension } from 'utils/hooks/useDeviceDimension';
import { AmountInputComponent } from 'components/general/AmountInput/AmountInputComponent';
import { GoalsYouWantToCloseModal } from 'views/Account/AccountInformation/modals/closingAccount/GoalsYouWantToCloseModal/GoalsYouWantToCloseModal';
import { GoalsAccountClosedModal } from 'views/Account/AccountInformation/modals/closingAccount/GoalsAccountClosedModal/GoalsAccountClosedModal';
import { ProcessNames } from 'views/Account/AccountInformation/constants';
import { SInternalTransferPage } from './InternalTransferPage.styles';
import { AddNoteSheet } from './InternalTransferSheets/AddNoteSheet';
import { ConfirmTransferSheet } from './InternalTransferSheets/ConfirmTransferSheet';
import { SuccessTransferSheet } from './InternalTransferSheets/SuccessTransferSheet';
import { getFiservBalance } from './internalTransferHelper';
import { AccountSelector } from './AccountSelector';

export const InternalTransferPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const accountsQuery = useGetAccountsQuery();
  const { fiservAccountsData } = useSelector(selectAccountsData);
  const confirmSheet = useToggle();
  const successSheet = useToggle();
  const addNoteSheet = useToggle();
  const errorModal = useToggle();
  const goalsSureYouWantToCloseModal = useToggle();
  const goalsYourAccountClosedModal = useToggle();
  const [form] = Form.useForm();
  const [isAmountValid, setIsAmountValid] = useState(false);
  const { isDesktopSize } = useDeviceDimension();

  const [senderAccount, setSenderAccount] = useState<IPartyAcctRelRecItem | null>(null);
  const [recipientAccount, setRecipientAccount] = useState<IPartyAcctRelRecItem | null>(null);
  const [transferNote, setTransferNote] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [isFieldFromDisabled, setIsFieldFromDisabled] = useState(false);
  const [isAmountInputDisabled, setAmountInputDisabled] = useState(false);
  const transferAccountType = location.state?.transferAccountType;
  const processType = location.state?.processType;

  const amountValidationRules: Rule[] = useMemo(
    () => [
      {
        required: true,
        message: t('internalTransfer.amount.required'),
      },
      () => ({
        validator: async (_, value) => {
          if (!isNumeric(value)) {
            throw new Error(t('internalTransfer.amount.number'));
          }
          if (Number(value) === 0) {
            throw new Error(t('internalTransfer.amount.zero'));
          }
          if (Number(value) < 0) {
            throw new Error(t('internalTransfer.amount.negative'));
          }
          const senderBalance = getFiservBalance(fiservAccountsData?.partyAcctRelRec, senderAccount?.partyAcctRelKeys.acctKeys.acctId || '');
          if (senderBalance === undefined || !isNumeric(senderBalance)) {
            return;
          }
          if (value > senderBalance) {
            throw new Error(t('internalTransfer.amount.balanceTooLow'));
          }
        },
      }),
    ],
    [t, senderAccount, fiservAccountsData]
  );

  const isAccountDataLoading = accountsQuery?.isLoading || accountsQuery?.isFetching;

  const senderAccountOptions = useMemo(() => fiservAccountsData?.partyAcctRelRec.filter((account) => account !== recipientAccount), [fiservAccountsData, recipientAccount]);
  const recipientAccountOptions = useMemo(() => fiservAccountsData?.partyAcctRelRec.filter((account) => account !== senderAccount), [fiservAccountsData, senderAccount]);

  const handleFieldsChange = () => {
    setIsAmountValid(form.getFieldError('amount').length === 0);
  };

  const closeAllModals = () => {
    confirmSheet.hide();
    successSheet.hide();
    errorModal.hide();
    addNoteSheet.hide();
  };

  const handleTransferNoteChange = (note: string) => {
    addNoteSheet.hide();
    setTransferNote(note);
  };

  const goalsAccountActions = {
    accountClosedModal: {
      onClose: () => {
        goalsYourAccountClosedModal.hide();
        navigate(ROUTES.home.path);
      },
    },
    youWantToCloseModal: {
      onCloseAccountClick: () => {
        goalsSureYouWantToCloseModal.hide();
        goalsYourAccountClosedModal.show();
      },
      onCancel: () => {
        goalsSureYouWantToCloseModal.hide();
        navigate(ROUTES.selectedAccountInformation.path);
      },
    },
  };

  const handleTransferDone = () => {
    successSheet.hide();

    if (processType === ProcessNames.CLOSING_ACCOUNT) {
      goalsSureYouWantToCloseModal.show();
    } else {
      navigate(ROUTES.home.path);
    }
  };

  const handleBackClick = () => navigate(-1);

  useEffect(() => {
    closeAllModals();
    setIsAmountValid(form.getFieldError('amount').length === 0);
  }, []);

  useEffect(() => {
    if (transferAccountType) {
      const selectedAccount: IPartyAcctRelRecItem | null =
        senderAccountOptions.find((account) => {
          return transferAccountType === account?.partyAcctRelKeys?.acctKeys?.tenxAccountType;
        }) ?? null;

      if (selectedAccount && processType === ProcessNames.CLOSING_ACCOUNT) {
        const selectedAccountAmount = getFiservBalance(fiservAccountsData?.partyAcctRelRec, selectedAccount?.partyAcctRelKeys.acctKeys.acctId);

        setSenderAccount(selectedAccount);
        setIsFieldFromDisabled(true);
        setAmountInputDisabled(true);
        setTransferAmount(String(selectedAccountAmount));
        form.setFieldValue('amount', selectedAccountAmount);
      }
    }
  }, [transferAccountType]);

  useEffect(() => {
    (async function updateAndRevalidateForm() {
      if (form.isFieldTouched('amount')) {
        try {
          await form.validateFields(['amount']);
          setIsAmountValid(true);
        } catch (err) {
          setIsAmountValid(false);
        }
      }
    })();
    // this ignore is intentional, we don't need to manually run validation when the form changes since
    // in this case antd fires validation on its own
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderAccount]);

  return (
    <>
      {isAccountDataLoading && <Loader />}
      <SInternalTransferPage>
        <h2>{t('internalTransfer.Transfer Between Accounts')}</h2>

        <Form form={form} onFinish={confirmSheet.show} onFieldsChange={handleFieldsChange}>
          <header>{t('internalTransfer.formHeader')}</header>
          <div>
            <div className="sender">
              <div className="account-label">{t('internalTransfer.From')}</div>
              <AccountSelector account={senderAccount} options={senderAccountOptions} onSelect={setSenderAccount} isDisabled={isFieldFromDisabled} />
            </div>
            <div className="recipient">
              <div className="account-label">{t('internalTransfer.To')}</div>
              <AccountSelector recipient account={recipientAccount} options={recipientAccountOptions} onSelect={setRecipientAccount} />
            </div>
            <div className="amount">
              <button type="button" className="note" onClick={addNoteSheet.show}>
                <span>{t('internalTransfer.Add note')}</span>
              </button>
              <label>
                <span>{t('internalTransfer.Amount')}</span>
                <Form.Item className="amount-form-item" name="amount" validateTrigger={['onBlur', 'onChange']} validateFirst rules={amountValidationRules}>
                  <AmountInputComponent
                    wrapperClassName={clsx('amount-input', !isAmountValid && 'error', form.isFieldTouched('amount') && 'touched')}
                    value={transferAmount}
                    onChange={setTransferAmount}
                    noPrefix={isDesktopSize}
                    disabled={isAmountInputDisabled}
                  />
                </Form.Item>
              </label>
              <small>{t('internalTransfer.Transfer available within minutes')}</small>
            </div>
          </div>
          <footer>
            <div className="buttons">
              {isDesktopSize && (
                <button type="button" className="new secondary solid" onClick={handleBackClick}>
                  Back
                </button>
              )}
              <button type="submit" className="new primary" disabled={!senderAccount || !recipientAccount || !isAmountValid || (!isAmountInputDisabled && !form.isFieldTouched('amount'))}>
                {t('internalTransfer.Continue')}
              </button>
            </div>
            <SuttonDisclaimerNote />
          </footer>
        </Form>
      </SInternalTransferPage>

      <AddNoteSheet isOpen={addNoteSheet.isActive} note={transferNote} onClose={addNoteSheet.hide} onNoteChange={handleTransferNoteChange} />
      <ConfirmTransferSheet
        isOpen={confirmSheet.isActive}
        senderAccount={senderAccount}
        recipientAccount={recipientAccount}
        transferNote={transferNote}
        transferAmount={Number(transferAmount)}
        onClose={confirmSheet.hide}
        handleOpenSuccessSheet={successSheet.show}
        isErrorModalOpen={errorModal.isActive}
        handleOpenErrorModal={errorModal.show}
        handleCloseErrorModal={errorModal.hide}
      />
      <SuccessTransferSheet
        isOpen={successSheet.isActive && !isAccountDataLoading}
        senderAccount={senderAccount}
        recipientAccount={recipientAccount}
        transferNote={transferNote}
        transferAmount={Number(transferAmount)}
        handleTransferDone={handleTransferDone}
        processType={processType}
      />

      <GoalsYouWantToCloseModal
        open={goalsSureYouWantToCloseModal.isActive}
        onClose={goalsSureYouWantToCloseModal.hide}
        onCloseMyGoalsAccountClick={goalsAccountActions.youWantToCloseModal.onCloseAccountClick}
        onCancel={goalsAccountActions.youWantToCloseModal.onCancel}
      />

      <GoalsAccountClosedModal open={goalsYourAccountClosedModal.isActive} onClose={goalsAccountActions.accountClosedModal.onClose} />
    </>
  );
};
