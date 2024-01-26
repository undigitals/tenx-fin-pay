import { useMemo } from 'react';
import { selectCurrentUser, selectTransactionId } from 'store/user/authentication.slice';
import { useDispatch, useSelector } from 'react-redux';
import { userPropertiesApi } from 'store/user/properties/userProperties.api';
import { truliooApi } from 'store/trulioo/trulioo.api';
import { authenticationApi } from 'store/user/authentication.api';
import { resetAccountOpeningData, selectAccountOpeningData } from 'store/user/properties/accountOpeningData.slice';
import { IMyInfoHelper } from 'vars/types/myInfo.types';
import { UserInfo } from 'vars/types/userInfo.types';
import { handleApiRequestResult, IRequestResult } from 'utils/helpers/request';

export const useCashAccountOpening = () => {
  const dispatch = useDispatch();
  const [setUserInfo, setUserResult] = userPropertiesApi.useSetAccountOpeningPropertyMutation();
  const [validateUser, validationResult] = truliooApi.useValidateUserInfoMutation();
  const [generateCodeEmail, generateCodeEmailResult] = authenticationApi.useGenerateCodeEmailMutation();
  const [checkCodeEmail, checkCodeEmailResult] = authenticationApi.useCheckCodeEmailMutation();
  const [updateUserData, updateUserDataResult] = authenticationApi.useUpdateUserDataMutation();
  const user = useSelector(selectCurrentUser);
  const transactionId = useSelector(selectTransactionId);
  const queryData = userPropertiesApi.useGetAccountOpeningPropertyQuery();
  const openingAccountData = useSelector(selectAccountOpeningData);

  return useMemo(() => {
    const helper: IMyInfoHelper = {
      openingAccountData,
      validateUser,
      saveOnboardingDataLoading: setUserResult.isLoading,
      saveOnboardingData: (userData: UserInfo) => {
        setUserInfo({
          userId: user?.userId ?? '',
          ...openingAccountData,
          ...userData,
        });
      },
    };
    helper.getOnboardingDataIsLoading = queryData.isLoading || queryData.isFetching;
    if (queryData.data) {
      helper.getUserResult = queryData.data;
    }
    helper.getUserStatus = handleApiRequestResult(queryData as IRequestResult);
    helper.setUserStatus = handleApiRequestResult(setUserResult as IRequestResult);
    helper.generateCodeEmailStatus = handleApiRequestResult(generateCodeEmailResult as IRequestResult);
    helper.checkCodeEmailStatus = handleApiRequestResult(checkCodeEmailResult as IRequestResult);
    helper.updateUserDataStatus = handleApiRequestResult(updateUserDataResult as IRequestResult);
    helper.validateUserStatus = handleApiRequestResult(validationResult as IRequestResult);

    helper.clearMyInfoData = () => dispatch(resetAccountOpeningData());

    helper.generateCodeEmail = (email: string) => generateCodeEmail({ email });

    helper.checkCodeEmail = (code: string) => checkCodeEmail({ code, transactionId: transactionId || '' });

    return helper;
  }, [
    setUserResult,
    generateCodeEmailResult,
    checkCodeEmailResult,
    updateUserData,
    updateUserDataResult,
    validationResult,
    queryData,
    user?.userId,
    setUserInfo,
    validateUser,
    generateCodeEmail,
    openingAccountData,
  ]);
};
