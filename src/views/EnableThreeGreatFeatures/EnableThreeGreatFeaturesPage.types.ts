type TFeatureItemButton = {
  text: string;
  onClick: () => void;
};

export interface IFeatureItemProps {
  index: number;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  button: TFeatureItemButton;
}
