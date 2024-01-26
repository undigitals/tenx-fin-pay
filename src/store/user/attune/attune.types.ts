export interface IGetAttuneResultsRequest {
  id: string;
}

export interface IResultItem {
  email: string;
  quizId: string;
  userUUID: string;
  score: number;
  spendScore: number;
  saveScore: number;
  borrowScore: number;
  planScore: number;
  ipAddress: string;
  startDate: Date;
  lastActivityDate: Date;
  minuteSpent: number;
  customData: string;
  emailEnz: string;
  firstNameEnz: string;
  lastNameEnz: string;
  zipEnz: string;
  fhnFocus: string;
}
