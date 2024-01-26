import React from 'react';
import { Title } from 'components/general/Typography';
import { ExitIcon } from 'views/OpenCashAccount/MyInfo/ExitIcon';
import { ProgressBar } from 'views/OpenCashAccount/MyInfo/ProgressBar/ProgressBar';
import { SCustomRow } from './Header.styles';

interface IHeaderProps {
  title: string;
  stage?: string;
  marginTop?: number;
  marginBottom?: number;
}

export const Header: React.FC<IHeaderProps> = ({ title, stage, marginBottom = 28, marginTop = 0 }) => (
  <>
    <SCustomRow marginBottom={marginBottom} marginTop={marginTop}>
      <Title textAlign="start" size="M" fontWeight="SB" font="Poppins">
        {title}
      </Title>
      {stage && <ExitIcon />}
    </SCustomRow>
    {stage && <ProgressBar stage={stage} />}
  </>
);
