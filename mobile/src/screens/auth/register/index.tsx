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
import { useStyling } from './styles';
import { useSignUp } from './util';

const Register: FC<any> = (props) => {
  const { navigation } = props;
  const { form, onPress, errors, onChange } = useSignUp(navigation);
  const styles = useStyling();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  return (
    <ShaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'transparent' }}>
        <ShaView style={styles.container}>
          <ShaImage style={styles.image} source={{ uri: BannerURI }} />

          <ShaView style={styles.formContainer}>
            <ShaText style={styles.introText}>Sign Up</ShaText>
            <ShaText style={styles.descriptionText}>
              Complete the form below to register a new account.
            </ShaText>

            <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />
            <ShaInput
              placeholder="First Name"
              value={form.firstName}
              label="First Name"
              onChangeText={(value) => onChange('firstName', value)}
              containerStyle={styles.inputContainer}
              errorMessage={errors?.firstName}
            />
            <ShaInput
              placeholder="Last Name"
              value={form.lastName}
              label="Last Name"
              onChangeText={(value) => onChange('lastName', value)}
              containerStyle={styles.inputContainer}
              errorMessage={errors?.lastName}
            />
            <ShaInput
              placeholder="Username"
              value={form.userName}
              label="Username"
              onChangeText={(value) => onChange('userName', value)}
              containerStyle={styles.inputContainer}
              errorMessage={errors?.userName}
            />
            <ShaInput
              placeholder="user@example.com"
              value={form.emailAddress}
              label="Email Address"
              onChangeText={(value) => onChange('emailAddress', value)}
              containerStyle={styles.inputContainer}
              errorMessage={errors?.emailAddress}
              shakeOnError
            />
            <ShaInput
              placeholder="0123456789"
              value={form.mobileNumber}
              label="Mobile Number"
              onChangeText={(value) => onChange('mobileNumber', value)}
              containerStyle={styles.inputContainer}
              errorMessage={errors?.mobileNumber}
              keyboardType="numeric"
              shakeOnError
            />

            <ShaInput
              placeholder="Password"
              secureTextEntry={true}
              value={form.password}
              label="Password"
              onChangeText={(value) => onChange('password', value)}
              containerStyle={styles.inputContainer}
              errorMessage={errors?.password}
            />
            <ShaInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={form.passwordConfirmation}
              label="Confirm Password"
              errorMessage={errors?.passwordConfirmation}
              onChangeText={(value) => onChange('passwordConfirmation', value)}
              containerStyle={styles.inputContainer}
            />

            <ShaButton
              buttonStyle={{ width: '100%' }}
              containerStyle={{
                ...styles.signUpBtn,
                opacity: form.loading ? 0.5 : 1,
              }}
              loading={form.loading}
              text={form.loading ? 'Signing Up...' : 'Sign Up'}
              onPress={onPress}
            />

            {!!form.errorMessage && (
              <ShaView>
                <ShaText style={styles.error}>{form.errorMessage}</ShaText>
              </ShaView>
            )}

            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('LoginScreen');
              }}
            >
              <ShaText style={styles.registerBtn}>
                Already have an account?
              </ShaText>
            </TouchableOpacity>
          </ShaView>
        </ShaView>
      </ScrollView>
    </ShaView>
  );
};

export default Register;
