import {
  ShaButton,
  ShaDivider,
  ShaImage,
  ShaInput,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { type FC } from 'react';
import { ScrollView } from 'react-native';
import { useStyling } from './styles';
import { useForgotPassword } from './util';

const ForgotPassword: FC<any> = (props) => {
  const { navigation } = props;
  const { form, setForm, submit, errors } = useForgotPassword(navigation);

  const styles = useStyling();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  return (
    <ShaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'transparent' }}>
        <ShaView style={styles.container}>
          <ShaImage style={styles.image} source={{ uri: BannerURI }} />

          <ShaView style={styles.formContainer}>
            <ShaText style={styles.introText}>Forgot Password?</ShaText>
            <ShaText style={styles.descriptionText}>
              Please enter your username below
            </ShaText>

            <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

            <ShaInput
              placeholder="Username"
              value={form.username}
              label="Username"
              errorMessage={errors?.username}
              onChangeText={(username) => setForm((s) => ({ ...s, username }))}
              containerStyle={styles.inputContainer}
            />

            <ShaButton
              buttonStyle={{ width: '100%' }}
              containerStyle={{
                ...styles.loginBtn,
                opacity: form.loading ? 0.5 : 1,
              }}
              loading={form.loading}
              text={form.loading ? 'Loading...' : 'Submit'}
              onPress={submit}
            />

            {!!form.errorMessage && (
              <ShaView>
                <ShaText style={styles.error}>{form.errorMessage}</ShaText>
              </ShaView>
            )}
          </ShaView>
        </ShaView>
      </ScrollView>
    </ShaView>
  );
};

export default ForgotPassword;
