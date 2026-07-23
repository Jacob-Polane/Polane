import { useEffect, useState } from 'react';
import { useShaAuthentication } from '@shesha/mobile-core';
import Toast from 'react-native-toast-message';

export interface ILoginState {
  readonly email: string;
  readonly loading: boolean;
  readonly password: string;
  readonly errorMessage: string;
}

const INIT_STATE: ILoginState = {
  email: '',
  loading: false,
  password: '',
  errorMessage: '',
};

export const useLogin = () => {
  const [form, setForm] = useState<ILoginState>(INIT_STATE);
  const { authenticate, errorInfo, isAuthorizing, isAuthorized, createUser } =
    useShaAuthentication();

  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    setForm((s) => ({ ...s, loading: isAuthorizing ?? false }));
  }, [isAuthorizing]);

  const onPress = () => {
    if (form.email && form.password) {
      setForm((s) => ({ ...s, loading: true, errorMessage: '' }));
      authenticate({
        type: 'email',
        userNameOrEmailAddress: form.email,
        password: form.password,
      });
    } else {
      setForm((s) => ({
        ...s,
        errorMessage: 'Please fill in both username and password',
        loading: false,
      }));
    }
  };

  const generateDeviceIdentifier = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const onSkip = () => {
    setForm((s) => ({
      ...s,
      loading: true,
    }));
    const deviceIdentifier = generateDeviceIdentifier();
    createUser({ type: 'anonymous', deviceIdentifier })
      .then((res) => {
        if (res?.success) {
          setForm((s) => ({
            ...s,
            loading: false,
          }));
          authenticate({
            type: 'anonymous',
            deviceId: deviceIdentifier,
          }).catch((err) => {
            if (err.details.includes('already taken')) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please try again.',
              });
            }
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'An error occurred: ' + err?.details,
            });
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred: ' + err?.details,
        });
      });
  };

  return {
    onSkip,
    form,
    setForm,
    onPress,
    isAuthorized,
  };
};
