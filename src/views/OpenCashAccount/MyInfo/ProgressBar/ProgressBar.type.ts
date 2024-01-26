import { STAGES } from 'views/OpenCashAccount/MyInfo/MyInfo.constants';

export type TStage = typeof STAGES[number];

export interface ProgressBarInputProps {
  stage: TStage;
}
