import { useTheme } from '@shesha/mobile-components';
import { StyleSheet } from 'react-native';

export const getStyling = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      marginTop: 10,
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    skipBtn: {
      height: 20,
      color: '#D8D8D8',
      marginTop: 10,
      textDecorationLine: 'underline',
    },
    error: {
      color: '#ff7171',
    },
    image: {
      flex: 1,
      width: '100%',
      height: 200,
      resizeMode: 'contain',
    },
    inputView: {
      backgroundColor: '#ffb17d',
      borderRadius: 30,
      width: '70%',
      height: 45,
      marginBottom: 20,
      alignItems: 'center',
    },
    rememberMe: {
      alignItems: 'flex-start',
    },
    rememberMeTitle: {
      marginLeft: 5,
    },
    forgotButton: {
      height: 30,
      color: '#c6831b',
      alignItems: 'flex-end',
      alignContent: 'center',
      marginTop: 0,
      marginRight: 10,
      textDecorationLine: 'underline',
    },
    loginBtn: {
      width: '95%',
      borderRadius: theme?.buttons?.borderRadius ?? 20,
      height: theme?.buttons?.height ?? 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#c6831b',
    },
    buttonContainer: {
      width: '100%',
      backgroundColor: '#c6831b',
    },
    loginText: {
      color: '#fff',
    },
    textInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      fontFamily: theme?.font?.mediumFontFamily,
    },
    introText: {
      fontSize: 30,
      fontFamily: theme?.font?.boldFontFamily,
    },
    descriptionText: {
      fontFamily: theme?.font?.regularFontFamily,
      textAlign: 'center',
      marginHorizontal: 30,
    },
    inputContainer: {
      width: '95%',
    },

    secondaryOptionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingRight: 10,
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 15,
    },
    registerBtn: {
      height: 30,
      color: '#c6831b',
      marginTop: 20,
      textDecorationLine: 'underline',
    },
    divider: {
      marginVertical: 20,
      paddingHorizontal: 10,
    },
  });
};
