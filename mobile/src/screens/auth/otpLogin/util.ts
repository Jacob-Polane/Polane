import { useEffect, useState } from 'react';
import { useShaAuthentication } from '@shesha/mobile-core';
import { useAuth } from '../hook';
import { type IOtpLoginState } from './interface';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const INIT_STATE: IOtpLoginState = {
  operationId: '',
  code: '',
  loading: false,
  mobileNo: '',
  imei: '',
  errorMessage: '',
};

export const useOtpLogin = () => {
  const [form, setForm] = useState<IOtpLoginState>(INIT_STATE);
  const { authenticate, errorInfo, isAuthorizing, isAuthorized, createUser } =
    useShaAuthentication();
  const { otpAuthenticationSendPin } = useAuth();
  const [showOtp, setShowOtp] = useState(false);

  const error = errorInfo?.message;
  const code = errorInfo?.code;

  useEffect(() => {
    if (error) {
      setForm((s) => ({ ...s, errorMessage: error, loading: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    setForm((s) => ({
      ...s,
      loading: isAuthorizing ?? false,
      errorMessage: '',
    }));
  }, [isAuthorizing]);

  const onLogin = () => {
    if (form.code && form.mobileNo) {
      authenticate({
        type: 'otp',
        code: form.code,
        mobileNo: form.mobileNo,
        operationId: form.operationId,
      }).catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occured: ' + err.response?.data?.error?.details,
        });
        if (
          (axios.isAxiosError(err) &&
            err.response &&
            err.response.status === 400) ||
          (axios.isAxiosError(err) &&
            err.response &&
            err.response.status === 401)
        ) {
          const errorResponse: any = err.response.data;
          if (errorResponse) {
            const errorMessage = errorResponse.error.details;
            setForm((s) => ({
              ...s,
              errorMessage:
                errorMessage ||
                'Bad Request: Please ensure that you enter the correct OTP',
              loading: false,
              success: false,
            }));
          }
        } else {
          setForm((s) => ({
            ...s,
            errorMessage:
              err?.details || 'Please ensure that you enter the correct OTP',
            loading: false,
            success: false,
          }));
        }
      });
    } else {
      setForm((s) => ({
        ...s,
        errorMessage: 'Please fill in both phone number and otp',
        loading: false,
      }));
    }
  };

  const onResendOtp = (mobileNo: string) => {
    setForm((s) => ({ ...s, loading: true }));
    otpAuthenticationSendPin(mobileNo)
      .then((res) => {
        setForm((s) => ({
          ...s,
          loading: false,
          operationId: res.operationId,
        }));
        setShowOtp(true);
      })
      .catch((err) => {
        setForm((s) => ({
          ...s,
          errorMessage:
            err?.response?.data?.error?.details ?? 'Cannot resend OTP',
          loading: false,
        }));
      });
  };

  const generateDeviceIdentifier = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const onSkip = () => {
    const deviceIdentifier = generateDeviceIdentifier();
    console.log('deviceIdentifier', deviceIdentifier);
    createUser({ type: 'anonymous', deviceIdentifier })
      .then((res) => {
        if (res?.success) {
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
              text2: 'An error occured: ' + err?.details,
            });
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occured: ' + err?.details,
        });
      });
  };

  return {
    form,
    setForm,
    onLogin,
    onResendOtp,
    isAuthorized,
    showOtp,
    onSkip,
  };
};
