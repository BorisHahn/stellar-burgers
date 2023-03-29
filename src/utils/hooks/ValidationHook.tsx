import { useState, useCallback, ChangeEvent } from 'react';

export interface IValues {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

type TErrors<T> = {
  [key: string]: T;
};

export function useFormAndValidation() {
  const [values, setValues] = useState<IValues>({});
  const [errors, setErrors] = useState<TErrors<string>>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChangeValid = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form')!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    handleChangeValid,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormAndValidation;
