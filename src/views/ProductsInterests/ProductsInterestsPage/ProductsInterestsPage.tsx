import React from 'react';
import { useLoginMutation } from 'store/user/authentication.api';
import { Spinner } from 'components/general/Spinner/Spinner';
import { ProductsInterestsForm } from 'views/ProductsInterests/ProductsInterestsForm/ProductsInterestsForm';
import { SLayout } from './ProductsInterestsPage.styles';

export const ProductsInterestsPage: React.FC = () => {
  const [, { isLoading }] = useLoginMutation();

  return <SLayout>{isLoading ? <Spinner /> : <ProductsInterestsForm />}</SLayout>;
};
