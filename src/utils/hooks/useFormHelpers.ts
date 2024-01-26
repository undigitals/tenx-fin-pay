import { useState } from 'react';
import { FormInstance } from 'antd';

export const useFormHelpers = (form: FormInstance) => {
  const [hasErrors, setHasErrors] = useState<boolean>(true);
  const checkErrors = (): void => {
    const formErrors = form.getFieldsError().some(({ errors }): number => errors.length);
    setHasErrors(formErrors);
  };

  return { hasErrors, checkErrors };
};
