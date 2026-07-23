import { useEffect, useState } from 'react';
import type {
  IResetPasswordErrors,
  IResetPasswordState,
  IResetPasswordUsingToken,
} from './interface';
import { useShaAuthentication } from '@shesha/mobile-core';
import { useAuth } from '../hook';
import Toast from 'react-native-toast-message';

const INIT_STATE: IResetPasswordState = {
  loading: false,
  errorMessage: '',
  token: '',
  newPassword: '',
  operationId: '',
  confirmNewPassword: '',
};

export const useResetPassword = (navigation: any) => {
  const [form, setForm] = useState<IResetPasswordState>(INIT_STATE);
  const [errors, _setErrors] = useState<IResetPasswordErrors | undefined>(
    {} as IResetPasswordErrors
  );

  const { errorInfo } = useShaAuthentication();
  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
  }, [code]);

  const { resetPasswordUsingToken } = useAuth();
  const onResetPasswordSubmit = (payload: IResetPasswordUsingToken) => {
    if (!form.newPassword) {
      setForm((s) => ({
        ...s,
        errorMessage: 'Enter matching passwords',
      }));
      return;
    }
    if (
      form.newPassword.length < 8 ||
      !/[a-zA-Z]/.test(form.newPassword) ||
      !/\d/.test(form.newPassword)
    ) {
      setForm((s) => ({
        ...s,
        errorMessage:
          'Password must be at least 8 characters long and contain letters and numbers',
      }));
      return;
    }
    if (form.newPassword) {
      setForm((s) => ({
        ...s,
        loading: true,
        errorMessage: '',
        newPassword: form.newPassword,
      }));
      resetPasswordUsingToken(payload as IResetPasswordUsingToken)
        .then((res) => {
          if (res?.success) {
            setForm((s) => ({
              ...s,
              loading: false,
            }));
            Toast.show({
              type: 'success',
              text1: 'Your password has been reset',
              text2: 'You can now login with your new password',
            });
            navigation.navigate('LoginScreen');
            setForm((s) => ({ ...s, errorMessage: '' }));
          }
        })
        .catch((err) => {
          setForm((s) => ({
            ...s,
            errorMessage: err?.details ?? 'An error occurred. Please try again',
            loading: false,
          }));
        });
    }
  };

  return {
    form,
    errors,
    setForm,
    onResetPasswordSubmit,
  };
};
