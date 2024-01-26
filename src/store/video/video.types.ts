export type TGroupName = 'Main' | 'LearnAndPlay';

export interface IVideoItem {
  description: string;
  group: string;
  groupIndex: number;
  id: string;
  location: string;
  name: string;
}
