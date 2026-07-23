import { useEffect, useState } from 'react';
import type {
  IResetPasswordVerifyOtp,
  IVerifyOtpErrors,
  IVerifyOtpState,
} from './interface';
import { useShaAuthentication } from '@shesha/mobile-core';
import { useAuth } from '../hook';

const INIT_STATE: IVerifyOtpState = {
  loading: false,
  errorMessage: '',
  otp: '',
  operationId: '',
};

export const useVerifyOtp = (navigation: any) => {
  const [form, setForm] = useState<IVerifyOtpState>(INIT_STATE);
  const [errors, setErrors] = useState<IVerifyOtpErrors | undefined>(
    {} as IVerifyOtpErrors
  );
  const { resetPasswordSendOtp, resetPasswordVerifyOtp } = useAuth();
  const { errorInfo } = useShaAuthentication();
  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
  }, [code]);

  const onResendOtp = (mobileNo: string) => {
    resetPasswordSendOtp(mobileNo)
      .then((res) => {
        setForm((s) => ({
          ...s,
          loading: false,
          operationId: res.operationId,
        }));
        navigation.navigate('VerifyOtpScreen', {
          mobileNo: mobileNo,
          operationId: res.operationId,
        });
      })
      .catch((err) => {
        setForm((s) => ({
          ...s,
          errorMessage: err?.details ?? 'Cannot resend OTP',
          loading: false,
        }));
      });
  };

  const onOtpSubmit = (payload: IResetPasswordVerifyOtp) => {
    if (!form.otp) {
      setErrors((s) => ({ ...s, otp: 'OTP is required' }));
    }
    if (form.otp) {
      setForm((s) => ({
        ...s,
        loading: true,
        errorMessage: '',
        otp: form.otp,
      }));

      resetPasswordVerifyOtp(payload)
        .then((res) => {
          if (res.isSuccess) {
            setForm((s) => ({
              ...s,
              loading: false,
              token: res.token,
            }));
            navigation.navigate('ResetPasswordScreen', {
              username: res.username,
              token: res.token,
            });
          } else {
            setForm((s) => ({
              ...s,
              loading: false,
              errorMessage: res.errorMessage,
            }));
          }
        })
        .catch((err) => {
          setForm((s) => ({
            ...s,
            errorMessage:
              err?.details ?? 'Please ensure that you enter the correct OTP',
            loading: false,
          }));
        });
    }
  };

  return {
    form,
    errors,
    setForm,
    setErrors,
    onResendOtp,
    onOtpSubmit,
  };
};
