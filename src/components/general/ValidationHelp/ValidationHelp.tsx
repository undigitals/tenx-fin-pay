import React from 'react';
import i18next from 'i18next';
import { BodyText } from 'components/general/Typography';
import { Scontainer, SIconValidationError, SIconValidationDefault, SIconValidationSuccess } from './ValidationHelp.styles';

interface IValidationHelp {
  message: string;
  matchMessage?: string;
  isError: boolean;
  isSuccess: boolean;
}

export const ValidationHelp: React.FC<IValidationHelp> = ({ message, matchMessage, isError, isSuccess }) => {
  const getTextColor = () => {
    if (isError) {
      return 'red';
    }
    if (isSuccess) {
      return 'green';
    }
    return 'charcoal60';
  };

  const getMessage = () => {
    if (matchMessage) {
      if (isError) return i18next.t(message);
      if (isSuccess) return i18next.t(matchMessage);
      return i18next.t(message);
    }

    return i18next.t(message);
  };

  return (
    <Scontainer>
      {!isError && !isSuccess && <SIconValidationDefault />}
      {isError && <SIconValidationError />}
      {isSuccess && <SIconValidationSuccess />}
      <BodyText textType="helperText" fontWeight="R" size="N" color={getTextColor()}>
        {getMessage()}
      </BodyText>
    </Scontainer>
  );
};
