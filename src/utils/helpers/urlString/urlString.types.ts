export interface IUrlString {
  url: string;
  params?: {
    [key: string]: string;
  };
  onLoad?: () => void;
  hidden?: boolean;
  contentId?: string;
}
