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
import { useStyling } from '../forgotPassword/styles';
import { useVerifyMobileNumber } from './util';

const VerifyMobileNumber: FC<any> = (props) => {
  const { navigation } = props;
  const { form, setForm, onSubmitMobileNumber, errors } =
    useVerifyMobileNumber(navigation);

  const styles = useStyling();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  return (
    <ShaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'transparent' }}>
        <ShaView style={styles.container}>
          <ShaImage style={styles.image} source={{ uri: BannerURI }} />

          <ShaView style={styles.formContainer}>
            <ShaText style={styles.introText}>Mobile number</ShaText>
            <ShaText style={styles.descriptionText}>
              Verify your Mobile Number to reset your password.
            </ShaText>

            <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

            <ShaInput
              placeholder="Mobile Number"
              value={form.mobileNumber}
              label="Mobile Number"
              keyboardType="numeric"
              errorMessage={errors?.mobileNumber}
              onChangeText={(mobileNumber) =>
                setForm((s) => ({ ...s, mobileNumber }))
              }
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
              onPress={() => onSubmitMobileNumber(form.mobileNumber)}
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

export default VerifyMobileNumber;
