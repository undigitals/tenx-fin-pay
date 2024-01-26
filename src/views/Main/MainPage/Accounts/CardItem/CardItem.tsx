/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'utils/hooks/store';
import { BodyText } from 'components/general/Typography';
import { setAddAccountType } from 'store/user/accounts/accounts.slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';
import { Icon } from 'components/general/Icon/Icon';
import { SDashedBox } from './CardItem.styles';

interface CardItemProps {
  title: string;
  type: 'goals' | 'needs';
  description: string;
  startIcon: JSX.Element;
}

export const CardItem: React.FC<CardItemProps> = ({ title, type, description, startIcon }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOnAdd = () => {
    dispatch(setAddAccountType(type));
    navigate(ROUTES.addNeedsGoalsAccount.path);
  };

  return (
    <SDashedBox onClick={handleOnAdd}>
      <div className="actions">
        <div className="title">
          {startIcon}
          <BodyText size="N" fontWeight="B" color="charcoal70" textType="bodyText">
            {title}
          </BodyText>
        </div>

        <div className="add">
          <BodyText size="N" fontWeight="SB" color="blue" textType="bodyText" marginRight={7} cursorPointer nowrap>
            {t('homeScreen.Add')}
          </BodyText>
          <Icon className="icon-add" name="circlePlus" color="blue" cursorPointer size="smaller" />
        </div>
      </div>

      <div className="description">
        <BodyText size="T" fontWeight="R" color="charcoal70" textType="bodyText">
          {description}
        </BodyText>
      </div>
    </SDashedBox>
  );
};
