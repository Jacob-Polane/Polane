import { useEffect, useState } from 'react';
import type { IResetOptionsState } from './interface';
import { useAuth } from '../hook';
import Toast from 'react-native-toast-message';
import { useShaAuthentication } from '@shesha/mobile-core';
import { ShaResetOptionsEnums } from './enums/resetOptions';

const INIT_STATE: IResetOptionsState = {
  loading: false,
  errorMessage: '',
  selectedOption: 0,
};

export const useResetOptions = (navigation: any) => {
  const [form, setForm] = useState<IResetOptionsState>(INIT_STATE);
  const { resetPasswordUsingEmail } = useAuth();

  const { errorInfo } = useShaAuthentication();
  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
  }, [code]);

  const onOptionSelected = (selectedOption: number, username: string) => {
    switch (selectedOption) {
      case ShaResetOptionsEnums.Email: {
        if (username) {
          setForm((s) => ({ ...s, loading: true, errorMessage: '' }));
          resetPasswordUsingEmail(username)
            .then((res) => {
              if (res) {
                setForm((s) => ({ ...s, success: true, loading: false }));
                Toast.show({
                  type: 'success',
                  text1: 'You may reset your password via email',
                  text2: 'You can now check your email for the reset link',
                });
                navigation.navigate('LoginScreen');
                setForm((s) => ({ ...s, errorMessage: '' }));
              }
            })
            .catch((err) => {
              setForm((s) => ({
                ...s,
                errorMessage:
                  err?.details ?? 'Unable to reset password using email',
                loading: false,
              }));
            });
        }
        break;
      }
      case ShaResetOptionsEnums.SMSOtp: {
        setForm((s) => ({
          ...s,
          success: true,
          loading: false,
        }));
        navigation.navigate('VerifyMobileNumberScreen');
        setForm((s) => ({ ...s, errorMessage: '' }));
        break;
      }
      case ShaResetOptionsEnums.SecurityQuestions: {
        setForm((s) => ({
          ...s,
          errorMessage: 'Security questions not implemented',
        }));
        break;
      }
      default: {
        setForm((s) => ({ ...s, errorMessage: 'Please select an option' }));
        break;
      }
    }
  };

  return {
    form,
    setForm,
    onOptionSelected,
  };
};
