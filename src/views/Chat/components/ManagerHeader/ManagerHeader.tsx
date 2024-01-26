import React from 'react';
import { Icon } from 'components/general/Icon/Icon';
import { SHeaderManager } from './ManagerHeader.styled';

export const ManagerHeader: React.FC = () => (
  <SHeaderManager>
    <div className="topContainer">
      <div className="headerName">Konstantin Konstantinopolskyy</div>
      <div className="accountType">
        <div>Primary Account</div>
        <div>2222015</div>
      </div>
    </div>
    <div className="bottomContainer">
      <button type="button">
        <Icon name="newPhone" color="blue" />
      </button>
      <button type="button">
        <Icon name="newChat" color="blue" />
      </button>
      <button type="button">
        <Icon name="videoCall" color="blue" />
      </button>
      <button type="button">
        <Icon name="mail" color="blue" />
      </button>
      <button className="leaveButton" type="button">
        Leave
      </button>
    </div>
  </SHeaderManager>
);
