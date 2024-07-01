export const hasFormErrorOccurred = (formValues) => {
    return Object.values(formValues).some(
      (field) => field.errorMessage !== ""
    );
  };