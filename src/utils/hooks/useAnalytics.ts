import { useSelector } from 'react-redux';
import { useSaveHistoryMutation } from 'store/api';
import { selectUserId } from 'store/user/authentication.slice';

export const useAnalytics = () => {
  const [saveHistory] = useSaveHistoryMutation();
  const userId = useSelector(selectUserId);

  const trackEvent = (historyEvent: string, data: string) => {
    // Only for logged in users
    if (userId) {
      saveHistory({ historyEvent, data });
    }
  };

  return {
    track: trackEvent,
  };
};
