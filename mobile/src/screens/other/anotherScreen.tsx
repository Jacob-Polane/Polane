import type { FC } from 'react';
import { useShaNavigation } from '@shesha/mobile-designer';
import {
  ShaButton,
  ShaImage,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { StyleSheet } from 'react-native';

const AnotherScreen: FC = () => {
  const { router } = useShaNavigation();
  const { navigation } = router || {};

  return (
    <ShaView style={styles.container}>
      <ShaText>Well well well. You made it to another screen</ShaText>
      <ShaImage
        source={{
          uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif',
        }}
        style={{ width: 130, height: 130 }}
      />
      <ShaButton
        text="Open FormDesigner"
        onPress={() => {
          navigation?.shaDesigner('Boxfusion.Dep/mobile-home-test', {
            param1: 'Hi there',
            param2: 'You can access me through onInitialized',
            param3: 'Just console.log(routeParams) in onInitialized',
          });
        }}
      />

      <ShaButton
        text="Open FormDesigner"
        onPress={() => {
          navigation?.shaDesigner('Boxfusion.Dep/mobile-home-test', null, {
            disableFocus: true,
          });
        }}
      />
      <ShaButton
        text="Open Custom Screen"
        onPress={() => {
          navigation?.navigate('CustomScreen');
        }}
      />
    </ShaView>
  );
};

export default AnotherScreen;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
