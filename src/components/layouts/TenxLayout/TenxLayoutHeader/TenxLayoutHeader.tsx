import React from 'react';
import { ROUTES } from 'vars/const/ROUTES';
import { STenxLayoutHeader } from './TenxLayoutHeader.styles';

export const TenxLayoutHeader = () => {
  return (
    <STenxLayoutHeader>
      <h1>
        <a href={ROUTES.home.path}>
          <span className="visually-hidden">Tenx</span>
        </a>
      </h1>
    </STenxLayoutHeader>
  );
};
