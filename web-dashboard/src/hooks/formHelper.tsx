import { ChangeEvent } from 'react';
import { UseFormReturn, Path, PathValue } from 'react-hook-form';

const useFormHelper = <T extends {}>(form: UseFormReturn<T>) => {
  const { setValue, clearErrors } = form;

  const handleChangeNoValidation = (e: ChangeEvent<any>) => {
    setValue(e.currentTarget.name as Path<T>, e.currentTarget.value as PathValue<T, any>);
    clearErrors(e.currentTarget.name as Path<T>);
  };

  return {
    handleChangeNoValidation
  };
};

export default useFormHelper;
