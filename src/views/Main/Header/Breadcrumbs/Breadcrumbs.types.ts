export type TBreadcrumbsPath = {
  id: number;
  name: string;
  path?: string;
};

export type TBreadcrumbsProps = {
  paths: TBreadcrumbsPath[];
  title?: string;
  hasBackNav?: boolean;
};
