export interface IPostUserInvitesResponse {}

export interface IPostUserInvitesRequest {
  inviteUserId: string | undefined;
  fromName: string;
  toName: string;
  phone: string;
  email: string;
}
