import {
  ShaButton,
  ShaImage,
  ShaText,
  ShaView,
} from '@shesha/mobile-components';
import { useShaNavigation } from '@shesha/mobile-designer';
import { type FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BackHandler } from 'react-native';

const CustomScreen: FC = () => {
  const { router } = useShaNavigation();
  const { navigation } = router || {};
  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick
      );
    };
  }, []);
  return (
    <ShaView style={styles.container}>
      <ShaText>Hi there. I'm a custom screen</ShaText>
      <ShaImage
        source={{
          uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif',
        }}
        style={{ width: 130, height: 130 }}
      />
      <ShaButton
        onPress={() => navigation?.navigate('AnotherScreen')}
        text={'Open Another screen'}
      />
    </ShaView>
  );
};

export default CustomScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
