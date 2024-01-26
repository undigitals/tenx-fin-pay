import { useSelector } from 'react-redux';
import { selectDisplayChat, setShowChat } from 'store/ui.slice';
import { useSendMessageMutation } from 'store/chat/chat.api';
import { selectPingMessage } from 'store/chat/chat.slice';
import { useAppDispatch } from './store';

export const useChat = () => {
  const isChatVisible = useSelector(selectDisplayChat);
  const dispatch = useAppDispatch();
  const pingMessage = useSelector(selectPingMessage);
  const [sendMessage] = useSendMessageMutation();

  const handleCloseChat = () => {
    dispatch(setShowChat(false));
  };

  const handleOpenChat = () => {
    dispatch(setShowChat(true));
  };

  return {
    isVisible: isChatVisible,
    close: handleCloseChat,
    open: handleOpenChat,
    sendMessage,
    pingMessage,
  };
};
