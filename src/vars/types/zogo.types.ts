export interface IPutZogoPointsRequest {
  zogoUserId: string | null;
  primaryPointsChangeAmount: number;
  primaryPointsChangeType: string;
}

export interface IPutZogoPointsResponse {}

export interface IGetZogoPointsRequest {
  zogoUserId: string | null;
}

export interface IGetZogoPointsResponse {
  primaryPoints: number;
  userNotFound: boolean | null;
}

export interface IGetAllZogoPointsRequest {}

interface IZogoUser {
  userId: null | string;
  firstName: string;
  lastName: string;
  primaryPoints: number;
}

export interface IGetAllZogoPointsResponse {
  zogoUsers: IZogoUser[];
}

export interface IGetZogoModulesRequest {
  zogoUserId: string;
  skillId: string;
}

// Might be an array
export interface IGetZogoModulesResponse {
  modulesName: string;
  moduleId: number;
  moduleAccuracy: number;
  dateCompleted: Date;
}

export interface IGetZogoSkillsRequest {}

// Might be an array
export interface IGetZogoSkillsResponse {
  skillName: string;
  skillId: number;
  skillAccuracy: number;
  categoryName: string;
  categoryId: number;
  modulesCompletedCount: number;
  modulesTotalCount: number;
}

export interface IGetZogoTokenRequest {}

export interface IGetZogoTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
