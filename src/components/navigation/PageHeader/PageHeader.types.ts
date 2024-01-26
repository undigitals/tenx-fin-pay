export interface PageHeaderProps {
  backButton?: boolean;
  isIframePage?: boolean;
  learnAbout?: boolean;
  noActions?: boolean;
  headerTitle?: string;
}

export interface IPageState {
  fromPage?: string;
  backPage?: string;
  isFromMenu?: boolean;
  editingModeHeaderTitle?: string;
  isFAQFromHomePage?: boolean;
}
