import { useGet, useMutate } from '@shesha/mobile-core';
import type { IResponse, ITokenInfo } from './forgotPassword/interface';
import type {
  IOperationId,
  IResetPasswordUsingToken,
} from './resetPassword/interface';
import type { IResetPasswordVerifyOtp } from './verifyOtp/interface';
import type { IUserPasswordResetOptions } from './resetOptions/interface';

const useAuth = () => {
  const { refetch: refetchPasswordResetOptions } = useGet<
    IResponse<IUserPasswordResetOptions[]>
  >({
    path: `/api/services/app/User/GetUserPasswordResetOptions`,
    lazy: false,
  });

  const { mutateAsync: refetchSendEmailLink } = useMutate<IResponse<boolean>>({
    path: `/api/services/app/User/SendEmailLink`,
    verb: 'post',
    isStringify: false,
  });

  const { mutateAsync: refetchResetPasswordVerifyOtp } = useMutate<
    IResponse<ITokenInfo>
  >({
    path: '/api/services/app/User/ResetPasswordVerifyOtp',
    verb: 'post',
    isStringify: false,
  });

  const { mutateAsync: refetchResetPasswordUsingToken } = useMutate<
    IResponse<IResponse>
  >({
    path: '/api/services/app/User/ResetPasswordUsingToken',
    verb: 'post',
    isStringify: false,
  });

  const { mutateAsync: refetchResetPasswordSendOtp } = useMutate<
    IResponse<IOperationId>
  >({
    path: '/api/services/app/User/ResetPasswordSendOtp',
    verb: 'post',
    isStringify: true,
  });

  const { mutateAsync: refetchOtpAuthenticationSendPin } = useMutate<
    IResponse<IOperationId>
  >({
    path: '/api/TokenAuth/OtpAuthenticateSendPin',
    verb: 'post',
    isStringify: true,
  });

  const getResetOptions = (
    username: string
  ): Promise<IUserPasswordResetOptions[]> => {
    return new Promise((resolve, reject) => {
      refetchPasswordResetOptions({ queryParams: { username } })
        .then((data) => {
          if (data?.success) {
            resolve(data?.result);
          }
        })
        .catch((e) => reject(e));
    });
  };

  const resetPasswordSendOtp = (mobileNo: string): Promise<IOperationId> => {
    return new Promise((resolve, reject) => {
      refetchResetPasswordSendOtp({ queryParams: { mobileNo } })
        .then((data) => {
          if (data?.success) {
            resolve(data?.result);
          }
        })
        .catch((e) => reject(e));
    });
  };

  const otpAuthenticationSendPin = (
    userNameOrMobileNo: string
  ): Promise<IOperationId> => {
    return new Promise((resolve, reject) => {
      refetchOtpAuthenticationSendPin({ queryParams: { userNameOrMobileNo } })
        .then((data) => {
          if (data?.success) {
            resolve(data?.result);
          }
        })
        .catch((e) => reject(e));
    });
  };

  const resetPasswordVerifyOtp = (
    payload: IResetPasswordVerifyOtp
  ): Promise<ITokenInfo> => {
    return new Promise((resolve, reject) => {
      refetchResetPasswordVerifyOtp({ payload })
        .then((data) => {
          if (data?.success) {
            resolve(data?.result);
          }
        })
        .catch((e) => reject(e));
    });
  };

  const resetPasswordUsingToken = (
    payload: IResetPasswordUsingToken
  ): Promise<IResponse> => {
    return new Promise((resolve, reject) => {
      refetchResetPasswordUsingToken({ payload })
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  const resetPasswordUsingEmail = (username: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      refetchSendEmailLink({ queryParams: { username } })
        .then((data) => {
          if (data?.success) {
            resolve(data?.result);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  return {
    getResetOptions,
    resetPasswordSendOtp,
    resetPasswordVerifyOtp,
    resetPasswordUsingToken,
    resetPasswordUsingEmail,
    otpAuthenticationSendPin,
  };
};

export { useAuth };
