import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import type { IRegisterUser, ISignUpErrors, ISignUpState } from './interface';
import { useShaAuthentication, type IApiResponse } from '@shesha/mobile-core';

export const useSignUp = (navigation: any) => {
  const [form, setForm] = useState<ISignUpState>({} as ISignUpState);
  const [errors, setErrors] = useState<ISignUpErrors | undefined>(
    {} as ISignUpErrors
  );
  const { createUser, isCreatingUser } = useShaAuthentication();

  useEffect(() => {
    setForm((s) => ({ ...s, loading: isCreatingUser ?? false }));
  }, [isCreatingUser]);

  const onChange = (name: keyof ISignUpErrors, value: string) => {
    setErrors((s) => ({ ...s, [name]: undefined }));
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const onValidate = (): boolean => {
    let isValid = true;
    if (!form.firstName) {
      setErrors((s) => ({ ...s, firstName: 'First name is required' }));
      isValid = false;
    }

    if (!form.lastName) {
      setErrors((s) => ({ ...s, lastName: 'Last name is required' }));
      isValid = false;
    }

    if (!form.userName) {
      setErrors((s) => ({ ...s, userName: 'Username is required' }));
      isValid = false;
    }

    if (!form.emailAddress) {
      setErrors((s) => ({ ...s, emailAddress: 'Email address is required' }));
      isValid = false;
    }

    if (!validateEmail(form.emailAddress)) {
      setErrors((s) => ({ ...s, emailAddress: 'Invalid email address' }));
      isValid = false;
    }

    if (!form.mobileNumber) {
      setErrors((s) => ({ ...s, mobileNumber: 'Mobile number is required' }));
      isValid = false;
    }

    if (!validateMobileNumber(form.mobileNumber)) {
      setErrors((s) => ({
        ...s,
        mobileNumber: 'Mobile number must start with 0 and must be 10 digits',
      }));
      isValid = false;
    }

    if (!form.password) {
      setErrors((s) => ({ ...s, password: 'Password is required' }));
      isValid = false;
    }

    if (form.password !== form.passwordConfirmation) {
      setErrors((s) => ({
        ...s,
        passwordConfirmation: 'Passwords do not match',
      }));
      isValid = false;
    }

    return isValid;
  };

  const onPress = () => {
    if (onValidate()) {
      createUser({
        type: 'default',
        registrationPayload: {
          ...form,
          typeOfAccount: {
            item: 'Internal',
            itemValue: 1,
          },
        },
      })
        .then((response: IApiResponse<IRegisterUser>) => {
          if (response.success) {
            Toast.show({
              type: 'success',
              text1: 'Profile successfully created',
              text2: 'You can now login',
            });
            navigation.navigate('LoginScreen');
          }
        })
        .catch((err) => {
          setForm((s) => ({
            ...s,
            errorMessage: err?.details ?? 'Please fill in correct details',
            loading: false,
            success: false,
          }));
        });
    }
  };

  return {
    form,
    setForm,
    onPress,
    errors,
    onChange,
  };
};
