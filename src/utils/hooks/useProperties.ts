import { useAddUserPropertiesMutation, useLazyGetUserPropertiesQuery, useLazyGetUserPropertyQuery } from 'store/user/properties/userProperties.api';

export const useProperties = () => {
  const [getAllProperties, getAllPropertiesResult] = useLazyGetUserPropertiesQuery();
  const [setProperty, setPropertyResult] = useAddUserPropertiesMutation();
  const [getProperty, getPropertyResult] = useLazyGetUserPropertyQuery();

  return {
    getAllProperties,
    getAllPropertiesResult,
    setProperty,
    setPropertyResult,
    getProperty,
    getPropertyResult,
  };
};
