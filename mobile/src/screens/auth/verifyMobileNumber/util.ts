import { useEffect, useState } from 'react';
import type {
  IVerifyMobileNumberErrors,
  IVerifyMobileNumberState,
} from './interface';
import { useAuth } from '../hook';
import { useShaAuthentication } from '@shesha/mobile-core';

const INIT_STATE: IVerifyMobileNumberState = {
  loading: false,
  errorMessage: '',
  mobileNumber: '',
  otp: '',
  token: '',
};

export const useVerifyMobileNumber = (navigation: any) => {
  const [form, setForm] = useState<IVerifyMobileNumberState>(INIT_STATE);
  const [errors, setErrors] = useState<IVerifyMobileNumberErrors | undefined>(
    {} as IVerifyMobileNumberErrors
  );
  const { resetPasswordSendOtp } = useAuth();

  const { errorInfo } = useShaAuthentication();
  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
  }, [code]);

  const onSubmitMobileNumber = (mobileNo: string) => {
    if (!form.mobileNumber) {
      setErrors((s) => ({ ...s, mobileNumber: 'Mobile number is required' }));
    }
    if (form.mobileNumber) {
      setForm((s) => ({
        ...s,
        loading: true,
        errorMessage: '',
        mobileNumber: form.mobileNumber,
      }));

      resetPasswordSendOtp(mobileNo)
        .then((res) => {
          setForm((s) => ({
            ...s,
            loading: false,
            operationId: res.operationId,
          }));
          navigation.navigate('VerifyOtpScreen', {
            mobileNo: form.mobileNumber,
            operationId: res.operationId,
          });
        })
        .catch((err) => {
          setForm((s) => ({
            ...s,
            errorMessage:
              err?.details ?? 'Please enter the correct mobile number',
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
    onSubmitMobileNumber,
  };
};
