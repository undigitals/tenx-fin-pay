import { Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectHelpData } from 'store/user/help.slice';
import { SContainer } from './Wellness.styles';
import { LearnAndPlay } from './LearnAndPlay/LearnAndPlay';
import { WellnessFAQ } from './WellnessFAQ';
import { GoalsAndTools } from './GoalsAndTools/GoalsAndTools';

export const WELLNESS_TABS = {
  goalsAndTools: 'goals-and-tools',
  learnAndPlay: 'learn-and-play',
  helpAndSupport: 'help-and-support',
};

const { TabPane } = Tabs;

export const WellnessPage = () => {
  const { t } = useTranslation();
  const { previousTab } = useSelector(selectHelpData);
  const [activeKey, setActiveKey] = useState(previousTab);

  useEffect(() => {
    setActiveKey(previousTab);
  }, []);

  return (
    <SContainer>
      <Tabs activeKey={activeKey} animated={{ inkBar: false }} destroyInactiveTabPane onChange={setActiveKey}>
        <TabPane tab={t('goalsTools.Goals & Tools')} key={WELLNESS_TABS.goalsAndTools}>
          <GoalsAndTools />
        </TabPane>
        <TabPane tab={t('learnPlay.Learn & Play')} key={WELLNESS_TABS.learnAndPlay}>
          <LearnAndPlay />
        </TabPane>
        <TabPane tab={t('helpSupport.FAQ')} key={WELLNESS_TABS.helpAndSupport}>
          <WellnessFAQ />
        </TabPane>
      </Tabs>
    </SContainer>
  );
};
