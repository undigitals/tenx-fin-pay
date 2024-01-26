export interface IFundsPageProps {
  isSendType?: boolean;
}

export interface IBtnProps {
  isActive?: boolean;
}

export interface ICustomCard {
  isError: boolean;
}

export interface ISendFunds {
  state?: {
    selectedExternalAccountId: string;
  };
}
