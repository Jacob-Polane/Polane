import { type FC } from 'react';
import {
  ShaButton,
  ShaCheckBox,
  ShaDivider,
  ShaImage,
  ShaInput,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { ScrollView, TouchableOpacity } from 'react-native';
import { getStyling } from './styles';
import { useLogin } from './util';
const BannerURI =
  'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';

const Login: FC<any> = (props) => {
  const { form, setForm, onPress, onSkip, isAuthorized } = useLogin();
  const styles = getStyling();

  if (isAuthorized === undefined) {
    return null;
  }
  return (
    <>
      <ShaView style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: 'transparent' }}>
          <ShaView style={styles.container}>
            <ShaImage style={styles.image} source={{ uri: BannerURI }} />

            <ShaView style={styles.formContainer}>
              <ShaText style={styles.introText}>Sign In</ShaText>
              <ShaText style={styles.descriptionText}>
                Enter your login credentials and submit to access your account.
              </ShaText>

              <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

              <ShaInput
                placeholder="Email"
                value={form.email}
                label="Email"
                onChangeText={(email) => setForm((s) => ({ ...s, email }))}
                containerStyle={styles.inputContainer}
              />

              <ShaInput
                placeholder="Password"
                secureTextEntry={true}
                value={form.password}
                label="Password"
                onChangeText={(password) =>
                  setForm((s) => ({ ...s, password }))
                }
                containerStyle={styles.inputContainer}
              />

              <ShaView style={styles.secondaryOptionsContainer}>
                <ShaCheckBox
                  title="Remember me"
                  checkedColor="#c6831b"
                  containerStyle={styles.rememberMe}
                  titleStyle={styles.rememberMeTitle}
                  iconRight={false}
                />

                <TouchableOpacity
                  onPress={() => {
                    props.navigation?.navigate('ForgotPasswordScreen');
                  }}
                >
                  <ShaText style={styles.forgotButton}>
                    Forgot Password?
                  </ShaText>
                </TouchableOpacity>
              </ShaView>

              <ShaButton
                buttonStyle={styles.buttonContainer}
                containerStyle={{
                  ...styles.loginBtn,
                  opacity: form.loading ? 0.5 : 1,
                }}
                loading={form.loading}
                text={form.loading ? 'Signing In...' : 'Sign In'}
                onPress={onPress}
              />

              {!!form.errorMessage && (
                <ShaView>
                  <ShaText style={styles.error}>{form.errorMessage}</ShaText>
                </ShaView>
              )}
              <TouchableOpacity onPress={onSkip}>
                <ShaText style={styles.skipBtn}>Skip</ShaText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation?.navigate('RegisterScreen');
                }}
              >
                <ShaText style={styles.registerBtn}>
                  Don't have an account?
                </ShaText>
              </TouchableOpacity>
            </ShaView>
          </ShaView>
        </ScrollView>
      </ShaView>
    </>
  );
};

export default Login;
