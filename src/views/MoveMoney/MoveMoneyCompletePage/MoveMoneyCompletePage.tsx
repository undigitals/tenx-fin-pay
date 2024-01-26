import React from 'react';
import { Button } from 'antd';
import { Icon } from 'components/general/Icon/Icon';
import * as S from './MoveMoneyCompletePage.styles';

export const MoveMoneyCompletePage: React.FC = () => (
  <S.MoveMoneyCompletePage>
    <S.Wrapper>
      <S.Header>
        <S.IconContainer>
          <Icon name="success" color="blue" />
        </S.IconContainer>
        <h2>Successful!</h2>
        <p>
          Your transaction is successful.
          <br />
          Thank for using our services.
        </p>
      </S.Header>
      <table>
        <tr>
          <td>From</td>
          <td>VISA**** **** 5678</td>
        </tr>
        <tr>
          <td>To</td>
          <td>Benjamin Sentimo</td>
        </tr>
        <tr>
          <td>Account Number</td>
          <td>**** **** 0155</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>$400</td>
        </tr>
        <tr>
          <td>Message</td>
          <td>Shopping</td>
        </tr>
      </table>
      <Button type="primary" onClick={() => ''} block>
        Ok
      </Button>
    </S.Wrapper>
  </S.MoveMoneyCompletePage>
);
