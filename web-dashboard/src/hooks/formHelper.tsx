import { ChangeEvent, FocusEvent } from 'react';
import { UseFormReturn, Path, PathValue } from 'react-hook-form';

const useFormHelper = <T extends {}>(form: UseFormReturn<T>) => {
  const { setValue, trigger, clearErrors } = form;

  const handleChangeNoValidation = (e: ChangeEvent<any>) => {
    const name = e.currentTarget.name as Path<T>;
    const value = e.currentTarget.value as PathValue<T, any>;

    setValue(name, value);
    clearErrors(name);
  };

  const handleChangeWithValidation = async (e: ChangeEvent<any>) => {
    const name = e.currentTarget.name as Path<T>;
    const value = e.currentTarget.value as PathValue<T, any>;

    setValue(name, value);
    await trigger(name);
  };

  const handleChangeWithMultiFieldValidation = (...otherFieldsToValidate: Path<T>[]) => async (e: ChangeEvent<any>) => {
    await handleChangeWithValidation(e);
    for (const field of otherFieldsToValidate) {
      await trigger(field);
    }
  };

  const handleBlurValidate = async (e: FocusEvent<any>) => {
    const name = e.target.name as Path<T>;

    await trigger(name);
  };

  return {
    handleChangeNoValidation,
    handleChangeWithValidation,
    handleChangeWithMultiFieldValidation,
    handleBlurValidate
  };
};

export default useFormHelper;
