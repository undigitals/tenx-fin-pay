import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BodyText } from 'components/general/Typography';
import { chatActions, selectChatState } from 'store/chat/chat.slice';

import { useLazyGetIntentQuestionsQuery, useSendIntentMutation } from 'store/chat/chat.api';
import { SButton, SIntentsHeader, SQuestionWrapper, SAnswerWrapper, SIntentsHeaderLeft } from './IntentsHeader.styled';

export const IntentsHeader: FC = () => {
  const { selectedIntent, selectedQuestion, intentTestingResults, currentIntentMessages } = useSelector(selectChatState) || {};
  const dispatch = useDispatch();
  const [getQuestions] = useLazyGetIntentQuestionsQuery();
  const { pickAnotherQuestion, prepareIntentTestingResults } = chatActions;

  const [sendIntent] = useSendIntentMutation();

  const handlePickAnotherQuestion = () => {
    dispatch(pickAnotherQuestion());
  };

  useEffect(() => {
    if (selectedIntent?.id) {
      getQuestions(selectedIntent.id);
    }
  }, [selectedIntent?.id]);

  useEffect(() => {
    if (currentIntentMessages?.length === 2) {
      dispatch(prepareIntentTestingResults());
    }
  }, [currentIntentMessages, dispatch, prepareIntentTestingResults]);

  useEffect(() => {
    if (intentTestingResults?.length) {
      intentTestingResults.forEach((result: any) => {
        sendIntent(result);
      });
    }
  }, [intentTestingResults, sendIntent]);

  useEffect(() => {
    if (!selectedQuestion) dispatch(pickAnotherQuestion());
  }, [dispatch, pickAnotherQuestion, selectedQuestion]);

  return (
    <SIntentsHeader>
      <SIntentsHeaderLeft>
        {selectedQuestion && (
          <SQuestionWrapper>
            <BodyText textType="bodyText" fontWeight="B" size="M" color="black">
              Question
            </BodyText>
            <BodyText textType="bodyText" size="N" color="black" fontWeight="R">
              {selectedQuestion.questionText}
            </BodyText>
          </SQuestionWrapper>
        )}
        <SButton onClick={handlePickAnotherQuestion}>Pick another</SButton>
      </SIntentsHeaderLeft>
      {selectedIntent && (
        <SAnswerWrapper>
          <div>
            <BodyText textType="bodyText" fontWeight="B" size="M" color="black">
              Answer
            </BodyText>
          </div>
          {/* eslint-disable-next-line react/no-danger */}
          {selectedQuestion && <div dangerouslySetInnerHTML={{ __html: selectedIntent?.correctAnswerText }} />}
        </SAnswerWrapper>
      )}
    </SIntentsHeader>
  );
};
