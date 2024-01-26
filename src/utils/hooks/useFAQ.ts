import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addQuestions, setAllQuestions, selectHelpData, setFAQGroups } from 'store/user/help.slice';
import { useLazyGetIntentGroupsQuery, useLazyGetIntentQuestionsQuery, useLazyGetIntentsByGroupIdQuery } from 'store/chat/chat.api';
import { IFAQQuestion } from 'views/Wellness/HelpAndSupport/FAQ.types';
import { IIntentGroupItem, IIntentItem } from 'store/chat/chat.types';
import { useAppDispatch } from './store';

interface IUseFAQ {
  activeGroupId?: string;
}

export const useFAQ = ({ activeGroupId }: IUseFAQ = {}) => {
  const dispatch = useAppDispatch();
  const [getGroups, getGroupsResult] = useLazyGetIntentGroupsQuery();
  const [getIntentsByGroup, getIntentsByGroupResult] = useLazyGetIntentsByGroupIdQuery();
  const [getQuestions, getQuestionsResult] = useLazyGetIntentQuestionsQuery();
  const { questions, FAQGroups, areAllQuestionsLoaded } = useSelector(selectHelpData);

  const activeGroup = FAQGroups?.find((group) => group.id === activeGroupId);
  const activeGroupQuestions = questions?.filter((question) => question.groupId === activeGroupId) ?? [];

  const loadGroupsWithIntents = async () => {
    const groups = await getGroups().unwrap();
    const groupsWithIntents = await Promise.all(
      groups.map(async (groupItem: IIntentGroupItem) => {
        const response = await getIntentsByGroup(groupItem.id).unwrap();
        return { ...groupItem, ...response };
      })
    );

    dispatch(setFAQGroups(groupsWithIntents));
  };

  const loadQuestionsForGroup = async () => {
    if (activeGroup?.intents) {
      const groupQuestions = await Promise.all(
        activeGroup.intents.map(async (intent: IIntentItem) => {
          const questionsRes = await getQuestions(intent.intentName).unwrap();
          return {
            groupId: activeGroup.id,
            questionText: questionsRes[0].questionText,
            intentName: intent.intentName,
            answerText: intent.correctAnswerText,
          };
        })
      );
      dispatch(addQuestions(groupQuestions));
    }
  };

  const loadAllQuestions = async () => {
    const allIntents: IIntentItem[] = [];
    FAQGroups.forEach((group) => {
      allIntents.push(...group.intents.map((intent) => ({ ...intent, groupId: group.id })));
    });

    const allQuestions: IFAQQuestion[] = await Promise.all(
      allIntents.map(async (intentItem: IIntentItem) => {
        const questionsRes = await getQuestions(intentItem.intentName).unwrap();
        return {
          groupId: intentItem.groupId,
          questionText: questionsRes?.[0]?.questionText,
          intentName: intentItem.intentName,
          answerText: intentItem.correctAnswerText,
        };
      })
    );
    dispatch(setAllQuestions(allQuestions));
  };

  useEffect(() => {
    if (activeGroupId !== 'all' && activeGroup && !areAllQuestionsLoaded && !activeGroupQuestions.length && FAQGroups?.length) {
      loadQuestionsForGroup();
    }
  }, [activeGroup, FAQGroups, areAllQuestionsLoaded, activeGroupQuestions.length]);

  useEffect(() => {
    if (FAQGroups?.length && activeGroupId === 'all' && !areAllQuestionsLoaded) {
      loadAllQuestions();
    }
  }, [activeGroupId, areAllQuestionsLoaded, FAQGroups]);

  useEffect(() => {
    if (!FAQGroups?.length) {
      loadGroupsWithIntents();
    }
  }, [FAQGroups?.length]);

  return {
    activeGroup,
    activeGroupQuestions,
    allQuestions: questions,
    groups: FAQGroups,
    isLoading: getGroupsResult.isLoading || getIntentsByGroupResult.isLoading || getQuestionsResult.isLoading,
  };
};
