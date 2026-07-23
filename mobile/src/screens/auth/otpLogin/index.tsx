import { type FC } from 'react';
import {
  ShaButton,
  ShaDivider,
  ShaImage,
  ShaInput,
  ShaLoader,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { getStyling } from './styles';
import { useOtpLogin } from './util';

const OtpLogin: FC<any> = (props) => {
  const { form, setForm, onLogin, onResendOtp, showOtp, isAuthorized, onSkip } =
    useOtpLogin();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  const styles = getStyling();
  if (isAuthorized === undefined) {
    return null;
  }
  return (
    <ShaLoader
      type="overlay"
      loading={form.loading}
      loadingText={form.loading ? 'Loading' : 'Please wait...'}
    >
      <ShaView style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: 'transparent' }}>
          <ShaView style={styles.container}>
            <ShaImage style={styles.image} source={{ uri: BannerURI }} />

            <ShaView style={styles.formContainer}>
              <ShaText style={styles.introText}>One-Time Pin</ShaText>
              <ShaText style={styles.descriptionText}>
                {!showOtp && 'Enter your phone number.'}
                {showOtp && 'Enter your OTP to login.'}
              </ShaText>

              <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

              <ShaInput
                placeholder="Phone Number"
                value={form.mobileNo}
                label="Phone Number"
                keyboardType="phone-pad"
                disabled={showOtp}
                maxLength={10}
                onChangeText={(mobileNo) =>
                  setForm((s) => ({ ...s, mobileNo }))
                }
                containerStyle={styles.inputContainer}
              />

              {showOtp && (
                <ShaInput
                  placeholder="One-Time Pin"
                  value={form.code}
                  label="One-Time Pin"
                  onChangeText={(code) => setForm((s) => ({ ...s, code }))}
                  containerStyle={styles.inputContainer}
                />
              )}

              {showOtp && (
                <ShaButton
                  buttonStyle={styles.buttonContainer}
                  containerStyle={{
                    ...styles.loginBtn,
                    ...{ opacity: form.loading ? 0.5 : 1 },
                  }}
                  loading={form.loading}
                  text={form.loading ? 'Signing In...' : 'Sign In'}
                  onPress={onLogin}
                />
              )}

              {!showOtp && (
                <ShaButton
                  buttonStyle={styles.buttonContainer}
                  containerStyle={{
                    ...styles.loginBtn,
                    ...{ opacity: form.loading ? 0.5 : 1 },
                  }}
                  loading={form.loading}
                  text={form.loading ? 'Sending...' : 'Send OTP'}
                  onPress={() => {
                    onResendOtp(form.mobileNo);
                  }}
                />
              )}

              {!!form.errorMessage && (
                <ShaView>
                  <ShaText style={styles.error}>{form.errorMessage}</ShaText>
                </ShaView>
              )}
              <TouchableOpacity onPress={onSkip}>
                <ShaText style={styles.skipBtn}>Skip</ShaText>
              </TouchableOpacity>
              <ShaView style={styles.secondaryOptionsContainer}>
                {showOtp && (
                  <TouchableOpacity onPress={() => onResendOtp(form.mobileNo)}>
                    <ShaText style={styles.registerBtn}>Re-send OTP</ShaText>
                  </TouchableOpacity>
                )}
                {showOtp && <ShaText style={styles.dot}>•</ShaText>}
                <TouchableOpacity
                  onPress={() => {
                    props.navigation?.navigate('RegisterScreen');
                  }}
                >
                  <ShaText style={styles.registerBtn}>
                    Don't have an account? Sign Up
                  </ShaText>
                </TouchableOpacity>
              </ShaView>
            </ShaView>
          </ShaView>
        </ScrollView>
      </ShaView>
    </ShaLoader>
  );
};

export default OtpLogin;
