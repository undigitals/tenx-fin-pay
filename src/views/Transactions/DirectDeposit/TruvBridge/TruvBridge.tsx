import React from 'react';
import TruvBridge from '@truv/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'vars/const/ROUTES';

interface ITruvBridgeProps {
  bridgeToken: string;
  isOpen: boolean;
  close: () => void;
}

export const TruvBridgeElement: React.FC<ITruvBridgeProps> = ({ bridgeToken, isOpen, close }) => {
  const navigate = useNavigate();

  return (
    <TruvBridge
      bridgeToken={bridgeToken}
      onClose={close}
      onSuccess={(publicToken, metaData) => {
        close();
        navigate(ROUTES.home.path);
        console.log(publicToken, metaData);
      }}
      isOpened={isOpen}
    />
  );
};
