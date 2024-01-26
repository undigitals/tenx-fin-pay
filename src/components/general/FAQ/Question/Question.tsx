import React from 'react';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { CustomRow } from 'components/theme/CustomRow/CustomRow';
import { CustomText } from 'components/theme/CustomText/CustomText';
import { SArrowRight } from './Question.styles';

interface IQuestionItem {
  text: string;
  intentName: string;
  onClick: (intentName: string) => void;
}

export const Question: React.FC<IQuestionItem> = ({ text, intentName, onClick }) => {
  const handleClick = () => {
    onClick(intentName);
  };

  return text ? (
    <div>
      <CustomCard cursorPointer onClick={handleClick}>
        <CustomRow cursorPointer>
          <CustomText fontWeight="strong" size="big" cursorPointer marginRight={10}>
            {text}
          </CustomText>
          <SArrowRight />
        </CustomRow>
      </CustomCard>
    </div>
  ) : null;
};
