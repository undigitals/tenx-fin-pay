import React, { useMemo } from 'react';
import { useNavigate, useLocation, generatePath, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFAQ } from 'utils/hooks/useFAQ';
import { BodyText, Title } from 'components/general/Typography';
import { Loader } from 'components/general/Loader/Loader';
import { FAQGroup } from 'components/general/FAQ/FAQGroup/FAQGroup';
import { Question } from 'components/general/FAQ/Question/Question';
import { Answer } from 'components/general/FAQ/Answer/Answer';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { ROUTES } from 'vars/const/ROUTES';
import { TFAQCategory } from 'views/Wellness/HelpAndSupport/FAQ.types';
import { SHelpLayout, SLayout, SSearchIcon } from './HelpAndSupport.styles';

interface IPageState {
  isFAQFromHomePage?: boolean;
}

export const HelpAndSupport = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isFAQFromHomePage } = (useLocation().state as IPageState) || {};
  const { t } = useTranslation();
  const { groups, isLoading, activeGroup, activeGroupQuestions } = useFAQ({ activeGroupId: params.groupId });
  const shouldShowGroups = !params.groupId;
  const shouldShowQuestions = params.groupId && !params.questionName;
  const shouldShowAnswer = params.groupId && params.questionName;
  const selectedQuestion = useMemo(() => activeGroupQuestions.find((question) => question.intentName === params.questionName), [params, activeGroupQuestions]);

  const handleClickGroup = (groupId: string) => {
    const categoryPath = generatePath(':groupId', {
      groupId,
    });
    navigate(categoryPath);
  };

  const handleClickIntent = (intentName: string) => {
    const questionPath = generatePath(':questionName', {
      questionName: intentName,
    });
    navigate(questionPath);
  };

  const handleOnSearch = () => {
    navigate(generatePath(ROUTES.helpAndSupportSearch.path));
  };

  const memoizedActiveGroupQuestions = useMemo(
    () => activeGroupQuestions.map((question) => <Question intentName={question.intentName} key={question.intentName} text={question.questionText} onClick={handleClickIntent} />),
    [activeGroupQuestions]
  );

  const memoizedGroupQuestions = useMemo(
    () => groups?.map((group: TFAQCategory) => <FAQGroup id={group.id} title={group.name} key={group.id} intentsCount={group.intents?.length} onClick={handleClickGroup} />),
    [groups]
  );

  return (
    <SLayout>
      {isLoading && <Loader />}
      <SHelpLayout>
        {!isFAQFromHomePage && (
          <div className="helpSupportHeader">
            <Title size="S" fontWeight="SB" color="charcoal" font="Poppins">
              {shouldShowQuestions && activeGroup ? activeGroup.name : t('helpSupport.HelpAndSupportTitle')}
            </Title>
            <div className="helpSupportSearchBar" onClick={handleOnSearch}>
              <SSearchIcon name="search" size="small" color="blue" />
              <BodyText textType="bodyText" color="blue" size="N" fontWeight="B" cursorPointer marginLeft={8} nowrap>
                {t('helpSupport.Search')}
              </BodyText>
            </div>
          </div>
        )}
        {shouldShowGroups && memoizedGroupQuestions}
        {shouldShowQuestions && memoizedActiveGroupQuestions}
        {shouldShowAnswer && selectedQuestion && <Answer questionText={selectedQuestion.questionText} answerText={selectedQuestion.answerText} />}
      </SHelpLayout>
      <SuttonDisclaimerNote />
    </SLayout>
  );
};
