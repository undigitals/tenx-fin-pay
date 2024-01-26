import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { BaseInput } from 'components/general/BaseInput/BaseInput';
import { Loader } from 'components/general/Loader/Loader';
import { BodyText, Title } from 'components/general/Typography';
import { CustomCard } from 'components/theme/CustomCard/CustomCard';
import { Question } from 'components/general/FAQ/Question/Question';
import { Answer } from 'components/general/FAQ/Answer/Answer';
import { SHelpLayout, SLink, SLayout } from 'views/HelpAndSupport/HelpAndSupport.styles';
import { SuttonDisclaimerNote } from 'components/general/DisclaimerNote/SuttonDisclaimerNote';
import { useFAQ } from 'utils/hooks/useFAQ';
import { IFAQQuestion } from 'views/Wellness/HelpAndSupport/FAQ.types';
import { selectSystemProperties } from 'store/user/authentication.slice';
import { formatPhone } from 'utils/helpers/phone';

export const QuestionSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { allQuestions, isLoading } = useFAQ({ activeGroupId: 'all' });
  const [searchResults, setSearchResults] = useState<IFAQQuestion[]>([]);
  const [searchStr, setSearchStr] = useState('');
  const selectedQuestion = useMemo(() => allQuestions?.find((item) => item.intentName === params?.questionName), [params, allQuestions?.length]);
  const { supportPhoneNumber } = useSelector(selectSystemProperties);
  const supportTelVal = useMemo(() => `tel:${formatPhone(supportPhoneNumber)}`, [supportPhoneNumber]);

  const handleSearchChange = (value: string) => {
    const trimmedValue = value.trim().toLowerCase();
    setSearchStr(trimmedValue);
  };

  const handleIntentClick = (intentName: string) => {
    const questionPath = generatePath(':questionName', {
      questionName: intentName,
    });
    navigate(questionPath);
  };

  useEffect(() => {
    setSearchResults(searchStr ? allQuestions.filter((item: IFAQQuestion) => item.questionText.trim().toLocaleLowerCase().includes(searchStr)) : allQuestions);
  }, [searchStr, allQuestions]);

  return (
    <SLayout>
      {isLoading && <Loader />}
      <SHelpLayout>
        {params.questionName ? (
          <Answer answerText={selectedQuestion?.answerText ?? ''} questionText={selectedQuestion?.questionText ?? ''} />
        ) : (
          <>
            <Title font="Poppins" color="charcoal" fontWeight="SB" size="S" textAlign="start">
              {t('helpSupport.SearchResult')}
            </Title>
            <CustomCard marginTop={32}>
              <BaseInput onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(event.target.value)} prefix="search" prefixColor="charcoal" />
            </CustomCard>
            {searchResults?.length > 0 &&
              searchResults.map((item: IFAQQuestion) => <Question key={item.intentName} text={item.questionText} intentName={item.intentName} onClick={handleIntentClick} />)}
            {searchResults?.length === 0 && (
              <BodyText textType="bodyText" size="N" fontWeight="R" color="charcoal" marginTop={32}>
                {t('helpSupport.NoResultPart1')}
                <SLink href={supportTelVal}>{t('helpSupport.here')}</SLink>
                {t('helpSupport.NoResultPart2')}
              </BodyText>
            )}
          </>
        )}
      </SHelpLayout>
      {searchResults?.length > 0 && <SuttonDisclaimerNote />}
    </SLayout>
  );
};
