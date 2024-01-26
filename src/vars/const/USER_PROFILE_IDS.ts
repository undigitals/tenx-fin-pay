export const USER_PROFILE_IDS = {
  PROSPECT_fd3: 'ec72ac21-5511-418a-9c82-62e073943fd3',
  PROSPECT_ONLY_b2f: '01b6c80a-36fa-420e-8c67-967f6f18ab2f',
  PROSPECT_EWA_a81: 'FB813A1D-C455-40B0-865D-0048C1933A81',
  CLIENT_ccc: 'a52680ed-8314-47c5-b74d-a387aea80ccc',
};

export const areEqualUsers = (id1: string, id2: string) => id1 && id2 && id1.toLowerCase() === id2.toLowerCase();

export const isProspectOnly = (systemProfileId: string) => areEqualUsers(systemProfileId, USER_PROFILE_IDS.PROSPECT_ONLY_b2f);

export const canHaveTenxPayOrEnroll = (systemProfileId: string) =>
  areEqualUsers(systemProfileId, USER_PROFILE_IDS.PROSPECT_fd3) || areEqualUsers(systemProfileId, USER_PROFILE_IDS.PROSPECT_EWA_a81) || areEqualUsers(systemProfileId, USER_PROFILE_IDS.CLIENT_ccc);

export const canHaveAccounts = (systemProfileId: string) => !areEqualUsers(systemProfileId, USER_PROFILE_IDS.PROSPECT_ONLY_b2f);

export const canHaveAccountOrEnroll = (systemProfileId: string) => areEqualUsers(systemProfileId, USER_PROFILE_IDS.PROSPECT_fd3) || areEqualUsers(systemProfileId, USER_PROFILE_IDS.CLIENT_ccc);
