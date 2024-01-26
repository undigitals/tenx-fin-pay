import React, { useEffect, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'components/general/Loader/Loader';
import { BodyText, Title } from 'components/general/Typography';
import { useTranslation } from 'react-i18next';
import { useFAQ } from 'utils/hooks/useFAQ';
import { WELLNESS_FAQ_GROUP_ID } from 'vars/const/FAQ';
import { SLayout, SDisclosureContainer } from 'views/HelpAndSupport/HelpAndSupport.styles';
import { Question } from 'components/general/FAQ/Question/Question';
import { Answer } from 'components/general/FAQ/Answer/Answer';
import { useAppDispatch } from 'utils/hooks/store';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { setPreviousTab } from 'store/user/help.slice';

export const WellnessFAQ = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { activeGroupQuestions, isLoading } = useFAQ({ activeGroupId: WELLNESS_FAQ_GROUP_ID });
  const activeQuestion = useMemo(() => activeGroupQuestions?.find((questions) => questions.intentName === params.questionName), [params.questionName, activeGroupQuestions]);

  const handleQuestionClick = (questionName: string) => {
    const questionPath = generatePath(':questionName', {
      questionName,
    });
    navigate(questionPath);
  };

  const memoizedActiveGroupQuestions = useMemo(
    () => activeGroupQuestions.map((question) => <Question intentName={question.intentName} text={question.questionText} key={question.intentName} onClick={handleQuestionClick} />),
    [activeGroupQuestions]
  );

  useEffect(() => {
    dispatch(setPreviousTab('help-and-support'));
  }, []);

  return (
    <SLayout>
      {isLoading && <Loader />}
      {!activeQuestion && (
        <div className="wellnessFAQHeader">
          <Title size="S" fontWeight="SB" color="charcoal" font="Poppins" extraStyles={{ width: '70%' }}>
            {t('helpSupport.Financial Wellness FAQs')}
          </Title>
        </div>
      )}
      <div>
        {!activeQuestion && memoizedActiveGroupQuestions}
        {activeQuestion && <Answer answerText={activeQuestion.answerText} questionText={activeQuestion.questionText} />}
      </div>
      <SDisclosureContainer>
        <div className="disclosure-mobile">
          <SuttonDisclaimerNote marginBottom={25} />
        </div>
        <BodyText textType="bodyText" color="charcoal70" size="S" fontWeight="R" textAlign="start" className="disclosure-web">
          {t('learnPlay.Disclosure')}
        </BodyText>
      </SDisclosureContainer>
    </SLayout>
  );
};
