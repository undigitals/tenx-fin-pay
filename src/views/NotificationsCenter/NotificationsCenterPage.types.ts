export type TNotificationTypes = Record<'read' | 'unread' | 'deleted', boolean>;

export type TFilterBy = {
  read: boolean;
  unread: boolean;
  deleted: boolean;
  fromDate: Date | null;
  toDate: Date | null;
};

export type TFiltersParams = {
  filterBy: TFilterBy;
  sortBy: { title: string; id: string };
};

export type TSheetProps = {
  open?: boolean;
  onOpen: (screen?: string) => void;
  onClose: () => void;
  filterParamsInit: TFiltersParams;
  filterParams: TFiltersParams;
  onFilter: (values: TFiltersParams, showDeleted: boolean, orderString: string, filterString?: string) => void;
  prevScreen?: string;
  searchValue: string;
};
