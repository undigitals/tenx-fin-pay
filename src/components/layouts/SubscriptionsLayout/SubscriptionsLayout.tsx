import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { SubscriptionsModal } from 'components/general/Modals/SubscriptionsModal/SubscriptionsModal';
import { Checkbox } from 'components/general/Checkbox/Checkbox';
import { BodyText } from 'components/general/Typography';
import { ESubscriptionModalType } from 'vars/types/subscription.types';
import { SInfo, SInputGroup, SProductItem } from './SubscriptionsLayout.styles';

const CASH_ACCOUNT_ID = '16218906-d9f0-482d-b4ac-4d6158f679c1';
const PERCAPITA_PAY_ID = '6973dc11-570e-4f71-ac01-37c57ac32499';
const INTERNATIONAL_TRANSFER_ID = 'e8c24417-1183-4b05-b1cf-4f848f5b80b0';
const CONNECT_AND_SHARE_ID = '349a06fb-cecc-4fdf-98dd-4ac2b2557707';

interface ISubscriptionsLayout {
  handleChange: (checked: boolean, productId: string) => void;
  handleCheckAll: (checked: boolean) => void;
  isAlertChecked: (alertId: string) => boolean | undefined;
  showInfoModal: (modalType?: ESubscriptionModalType | undefined) => void;
  areAllSubscriptionPagesActive: boolean;
}

export const SubscriptionsLayout: React.FC<ISubscriptionsLayout> = ({ handleChange, handleCheckAll, isAlertChecked, showInfoModal, areAllSubscriptionPagesActive }) => {
  const { t } = useTranslation();

  return (
    <>
      <SInputGroup>
        <Form.Item valuePropName="checked">
          <div className="checkbox-layout">
            <Checkbox onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => handleChange(target.checked, CASH_ACCOUNT_ID)} checked={isAlertChecked(CASH_ACCOUNT_ID)}>
              <BodyText textType="bodyText" color="charcoal" size="L" fontWeight="R">
                {t(`mySubscriptions.Cash Account`)}
              </BodyText>
            </Checkbox>
            <SInfo marginLeft={13} name="info" color="blue" size="small" cursorPointer onClick={() => showInfoModal(ESubscriptionModalType.DEPOSIT)} />
          </div>
        </Form.Item>
      </SInputGroup>

      <SInputGroup>
        <Form.Item valuePropName="checked">
          <div className="checkbox-layout">
            <Checkbox onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => handleChange(target.checked, PERCAPITA_PAY_ID)} checked={isAlertChecked(PERCAPITA_PAY_ID)}>
              <BodyText textType="bodyText" color="charcoal" size="L" fontWeight="R">
                {t(`mySubscriptions.Tenx Pay`)}
              </BodyText>
            </Checkbox>
            <SInfo marginLeft={13} name="info" color="blue" size="small" cursorPointer onClick={() => showInfoModal(ESubscriptionModalType.PAID)} />
          </div>
        </Form.Item>
      </SInputGroup>

      <SInputGroup>
        <Form.Item valuePropName="checked">
          <div className="checkbox-layout">
            <Checkbox onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => handleChange(target.checked, INTERNATIONAL_TRANSFER_ID)} checked={isAlertChecked(INTERNATIONAL_TRANSFER_ID)}>
              <BodyText textType="bodyText" color="charcoal" size="L" fontWeight="R">
                {t(`mySubscriptions.International Transfer`)}
              </BodyText>
            </Checkbox>
            <SInfo marginLeft={13} name="info" color="blue" size="small" cursorPointer onClick={() => showInfoModal(ESubscriptionModalType.INTERNATIONAL)} />
          </div>
        </Form.Item>
      </SInputGroup>

      <SInputGroup>
        <Form.Item valuePropName="checked">
          <div className="checkbox-layout">
            <Checkbox onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => handleChange(target.checked, CONNECT_AND_SHARE_ID)} checked={isAlertChecked(CONNECT_AND_SHARE_ID)}>
              <BodyText textType="bodyText" color="charcoal" size="L" fontWeight="R">
                {t(`connectShare.Connect & Share`)}
              </BodyText>
            </Checkbox>
            <SInfo marginLeft={13} name="info" color="blue" size="small" cursorPointer onClick={() => showInfoModal(ESubscriptionModalType.CONNECT)} />
          </div>
        </Form.Item>
      </SInputGroup>

      <SInputGroup key="selectAll">
        <Form.Item>
          <SProductItem>
            <Checkbox onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => handleCheckAll(target.checked)} checked={areAllSubscriptionPagesActive}>
              <BodyText textType="bodyText" color="charcoal" size="L" fontWeight="R">
                {t(`preRegOnboarding.All Products`)}
              </BodyText>
            </Checkbox>
          </SProductItem>
        </Form.Item>
      </SInputGroup>
      <SubscriptionsModal />
    </>
  );
};
