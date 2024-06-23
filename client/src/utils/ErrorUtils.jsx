export const createErrorObj = (
  errorHeader,
  errorMessage,
  errorFunc,
  closable,
  errorFuncButton
) => {
  return {
    errorHeader: errorHeader,
    errorMessage: errorMessage,
    errorFunc: errorFunc,
    closable: closable,
    errorFuncButton: errorFuncButton,
  };
};
