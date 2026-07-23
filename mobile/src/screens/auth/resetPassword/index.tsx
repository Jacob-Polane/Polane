import {
  ShaButton,
  ShaDivider,
  ShaImage,
  ShaPasswordCombo,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { type FC } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useStyling } from './styles';
import { useResetPassword } from './util';

const ResetPassword: FC<any> = (props) => {
  const { navigation } = props;
  const { form, errors, setForm, onResetPasswordSubmit } =
    useResetPassword(navigation);

  const styles = useStyling();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  return (
    <ShaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'transparent' }}>
        <ShaView style={styles.container}>
          <ShaImage style={styles.image} source={{ uri: BannerURI }} />

          <ShaView style={styles.formContainer}>
            <ShaText style={styles.introText}>Reset Password</ShaText>
            <ShaText style={styles.descriptionText}>
              Reset your password.
            </ShaText>

            <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

            <ShaPasswordCombo
              label="New Password"
              labelPlaceholder="New Password"
              labelConfirmation="Confirm Password"
              labelConfirmationPlaceholder="Confirm Password"
              minPasswordLength={8}
              required
              errorMessage={errors?.confirmNewPassword}
              onValueMatch={(value) => {
                setForm((s) => ({ ...s, newPassword: value }));
              }}
              containerStyle={styles.inputContainer}
            />

            <ShaButton
              buttonStyle={{ width: '100%' }}
              containerStyle={{
                ...styles.loginBtn,
                opacity: form.loading ? 0.5 : 1,
              }}
              loading={form.loading}
              text={form.loading ? 'Resetting...' : 'Reset'}
              onPress={() => {
                onResetPasswordSubmit({
                  username: props.route.params?.username,
                  token: props.route.params?.token,
                  newPassword: form.newPassword,
                });
              }}
            />

            {!!form.errorMessage && (
              <ShaView>
                <ShaText style={styles.error}>{form.errorMessage}</ShaText>
              </ShaView>
            )}

            <TouchableOpacity
              onPress={() => {
                props.navigation?.navigate('LoginScreen');
              }}
            >
              <ShaText style={styles.registerBtn}>Back to Login</ShaText>
            </TouchableOpacity>
          </ShaView>
        </ShaView>
      </ScrollView>
    </ShaView>
  );
};

export default ResetPassword;
