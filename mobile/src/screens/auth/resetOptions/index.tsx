import {
  ShaButton,
  ShaDivider,
  ShaImage,
  ShaRadio,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { type FC } from 'react';
import { ScrollView } from 'react-native';
import { useStyling } from '../forgotPassword/styles';
import { useResetOptions } from './util';

const ResetOptions: FC<any> = (props) => {
  const { navigation } = props;
  const { form, setForm, onOptionSelected } = useResetOptions(navigation);

  const styles = useStyling();
  const BannerURI =
    'https://www.filepicker.io/api/file/CBotH7lpTzCIz1ueTD0z/convert?h=600&w=600';
  return (
    <ShaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: 'transparent' }}>
        <ShaView style={styles.container}>
          <ShaImage style={styles.image} source={{ uri: BannerURI }} />

          <ShaView style={styles.formContainer}>
            <ShaText style={styles.introText}>Reset Options</ShaText>
            <ShaText style={styles.descriptionText}>
              Select the option you would like to use to reset your password.
            </ShaText>

            <ShaDivider containerStyle={styles.divider} color="#D9D9D9" />

            <ShaRadio
              labelText="What is your preferred option?"
              options={props.route.params?.options}
              onValueChange={(value: number) =>
                setForm((s) => ({ ...s, selectedOption: value }))
              }
              parentContainerStyle={{
                width: '95%',
                marginBottom: 30,
              }}
            />

            <ShaButton
              buttonStyle={{ width: '100%' }}
              containerStyle={{
                ...styles.loginBtn,
                opacity: form.loading ? 0.5 : 1,
              }}
              loading={form.loading}
              text={form.loading ? 'Loading...' : 'Submit'}
              onPress={() =>
                onOptionSelected(
                  form.selectedOption,
                  props.route.params?.username
                )
              }
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

export default ResetOptions;
