import React from 'react';
import { BodyText } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';

interface IAnswer {
  questionText: string;
  answerText: string;
}

export const Answer: React.FC<IAnswer> = ({ questionText, answerText }) => {
  return (
    <CustomCard>
      <BodyText textType="bodyText" font="Poppins" color="charcoal" fontWeight="SB" size="M" textAlign="start">
        {questionText}
      </BodyText>
      <BodyText textType="bodyText" color="charcoal70" size="M" fontWeight="R" marginTop={32}>
        <div dangerouslySetInnerHTML={{ __html: answerText }} />
      </BodyText>
    </CustomCard>
  );
};
