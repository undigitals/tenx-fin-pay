import React, { useState } from 'react';
import { Table } from 'antd';
import { tableData } from 'views/OpenCashAccount/StarterPage/mocks/feeScheduleTableTwoData';
import { Trans } from 'react-i18next';
import { BodyText } from 'components/general/Typography';

const columns = [
  {
    title: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.fee" />,
    dataIndex: 'fee',
    key: 'fee',
    width: 140,
    render: (text: string) => (
      <BodyText textType="bodyText" font="DM Sans" fontWeight="B" size="N" color="charcoal80">
        {text}
      </BodyText>
    ),
  },
  {
    title: <Trans i18nKey="starter.benefits.noSurpriseFees.feeScheduleModal.amount" />,
    dataIndex: 'amount',
    key: 'amount',
    render: (text: string) => (
      <BodyText textType="bodyText" font="DM Sans" fontWeight="R" size="N" color="charcoal80">
        {text}
      </BodyText>
    ),
  },
];

export const FeeScheduleTableTwo: React.FC = () => {
  const [dataSource] = useState(tableData);

  return <Table size="small" columns={columns} dataSource={dataSource} pagination={false} bordered style={{ marginBottom: 10 }} />;
};
