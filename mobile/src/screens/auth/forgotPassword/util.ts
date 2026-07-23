import { useEffect, useState } from 'react';
import type { IForgotPasswordErrors, IForgotPasswordState } from './interface';

import { useAuth } from '../hook';
import { useShaAuthentication } from '@shesha/mobile-core';

const INIT_STATE: IForgotPasswordState = {
  username: '',
  loading: false,
  errorMessage: '',
};

export const useForgotPassword = (navigation: any) => {
  const [form, setForm] = useState<IForgotPasswordState>(INIT_STATE);
  const [errors, setErrors] = useState<IForgotPasswordErrors | undefined>(
    {} as IForgotPasswordErrors
  );

  const { getResetOptions } = useAuth();

  const { errorInfo } = useShaAuthentication();
  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
  }, [code]);

  const submit = () => {
    if (!form.username) {
      setErrors((s) => ({ ...s, username: 'Username is required' }));
    }
    if (form.username) {
      setForm((s) => ({ ...s, loading: true, errorMessage: '' }));

      getResetOptions(form.username)
        .then((res) => {
          if (!res?.length) {
            setForm((s) => ({
              ...s,
              loading: false,
              errorMessage: 'Could not find any reset options for this user',
            }));
          } else {
            const transformedOptions = res.map((item) => ({
              label: item.prompt,
              value: item.method,
            }));

            setForm((s) => ({ ...s, loading: false, errorMessage: '' }));
            navigation?.navigate('ResetOptionsScreen', {
              options: transformedOptions,
              username: form.username,
            });
          }
        })
        .catch((err) => {
          setForm((s) => ({
            ...s,
            loading: false,
            errorMessage: err?.details ?? 'Please enter your Username',
          }));
        });
    }
  };

  return {
    form,
    setForm,
    submit,
    errors,
  };
};
