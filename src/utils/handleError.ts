import Snackbar from 'react-native-snackbar';

interface IError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function handleError(err: IError | string): void {
  if (typeof err === 'string') {
    return Snackbar.show({
      text: err,
    });
  }
  Snackbar.show({
    text:
      err?.response?.data?.message ||
      err?.message ||
      'Houve um imprevisto, tente novamente mais tarde',
  });
}