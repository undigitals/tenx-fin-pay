import i18next from 'i18next';
import { IMyInfoHomeAddressStatusData } from 'vars/types/myInfo.types';
import { IUSPSValidateAddressResponse } from 'vars/types/api.types';
import { ADDRESS_CHECK_STATUS, ADDRESS_FOOTNOTES, USPS_FOOTNOTES_ERROR_MAP } from 'vars/const/address';
import { getArraysIntersection } from 'utils/helpers/arrays';

export const handleUSPSAddressCheckResult = (mutationResult?: IUSPSValidateAddressResponse) => {
  if (!mutationResult) return null;

  const resultData: IMyInfoHomeAddressStatusData = {
    isSuccess: true,
    isError: false,
  };

  const {
    AddressValidateResponse: { Address },
  } = mutationResult;
  const footnotes = Address?.Footnotes;

  const suggested = {
    city: Address.City,
    address: Address.Address1 || Address.Address2,
    address2: Address.Address1 ? Address.Address2 : '',
    stateProvince: Address.State,
    zipCode: Address.Zip5,
  };

  if (Address.Error) {
    resultData.isSuccess = false;
    resultData.isError = true;
    resultData.errorType = ADDRESS_CHECK_STATUS.INVALID;
    return resultData;
  }
  if (Address.DPVCMRA === true) {
    resultData.isSuccess = false;
    resultData.isError = true;
    resultData.errorType = ADDRESS_CHECK_STATUS.DPVCMRA;
    return resultData;
  }
  if (footnotes) {
    const footnotesArr = footnotes.split('');

    if (footnotes === ADDRESS_FOOTNOTES.NORMALIZED || getArraysIntersection(footnotesArr, ADDRESS_FOOTNOTES.NORMALIZED_PREFFERED).length) {
      resultData.isSuccess = true;
      resultData.isError = false;
      resultData.errorType = ADDRESS_CHECK_STATUS.OK;
      return resultData;
    }

    resultData.isSuccess = false;
    resultData.isError = true;

    const errors = getArraysIntersection(footnotesArr, ADDRESS_FOOTNOTES.INVALID);

    if (errors.length) {
      resultData.errorType = ADDRESS_CHECK_STATUS.INVALID;
      resultData.errorMessages = errors.map((error) => i18next.t(`myInfo.address.${USPS_FOOTNOTES_ERROR_MAP[error]}`));
      return resultData;
    }

    if (getArraysIntersection(footnotesArr, ADDRESS_FOOTNOTES.WITH_SUGGESTIONS).length) {
      resultData.errorType = ADDRESS_CHECK_STATUS.WITH_SUGGESTIONS;
      resultData.suggested = suggested;
      return resultData;
    }
  }

  return resultData;
};
