import {
  ShaButton,
  ShaDivider,
  ShaImage,
  ShaInput,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { type FC } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useStyling } from './style';
import { useVerifyOtp } from './util';

const VerifyOtp: FC<any> = (props) => {
  const { navigation } = props;
  const { form, setForm, onResendOtp, onOtpSubmit, errors } =
    useVerifyOtp(navigation);

  const styles = useStyling();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  return (
    <ShaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'transparent' }}>
        <ShaView style={styles.container}>
          <ShaImage style={styles.image} source={{ uri: BannerURI }} />

          <ShaView style={styles.formContainer}>
            <ShaText style={styles.introText}>One-Time Pin</ShaText>
            <ShaText style={styles.descriptionText}>
              Enter the OTP to reset your password.
            </ShaText>

            <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

            <ShaInput
              placeholder="One-Time Pin"
              value={form.otp}
              label="One-Time Pin"
              errorMessage={errors?.otp}
              onChangeText={(otp) => setForm((s) => ({ ...s, otp }))}
              containerStyle={styles.inputContainer}
            />

            <ShaButton
              buttonStyle={{ width: '100%' }}
              containerStyle={{
                ...styles.loginBtn,
                opacity: form.loading ? 0.5 : 1,
              }}
              loading={form.loading}
              text={form.loading ? 'Verifying...' : 'Verify'}
              onPress={() => {
                onOtpSubmit({
                  operationId: props.route.params?.operationId,
                  pin: form.otp,
                  mobileNo: props.route.params?.mobileNo,
                });
              }}
            />

            {!!form.errorMessage && (
              <ShaView>
                <ShaText style={styles.error}>{form.errorMessage}</ShaText>
              </ShaView>
            )}

            <ShaView style={styles.secondaryOptionsContainer}>
              <TouchableOpacity
                onPress={() => onResendOtp(props.route.params?.mobileNo)}
              >
                <ShaText style={styles.registerBtn}>Re-send Otp</ShaText>
              </TouchableOpacity>
              <ShaText style={styles.dot}>•</ShaText>
              <TouchableOpacity
                onPress={() => {
                  props.navigation?.navigate('LoginScreen');
                }}
              >
                <ShaText style={styles.registerBtn}>Back to Login</ShaText>
              </TouchableOpacity>
            </ShaView>
          </ShaView>
        </ShaView>
      </ScrollView>
    </ShaView>
  );
};

export default VerifyOtp;
