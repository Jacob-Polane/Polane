import {useTheme} from '@shesha/mobile-components';
import {StyleSheet} from 'react-native';

export const getStyling = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme, themeColors} = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 10,
    },

    error: {
      color: '#ff7171',
    },

    image: {
      marginBottom: 20,
      flex: 1,
      width: '100%',
      height: 190,
      resizeMode: 'cover',
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
    skipBtn: {
      height: 20,
      color: '#D8D8D8',
      marginTop: 10,
      textDecorationLine: 'underline',
    },

    forgotButton: {
      height: 30,
      color: themeColors?.accentColor,
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
      backgroundColor: themeColors?.accentColor ?? 'grey',
      marginHorizontal: 50,
    },

    loginBtnContainer: {
      width: '95%',
      alignItems: 'center',
      marginHorizontal: 50,
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
    buttonContainer: {width: '100%'},
    secondaryOptionsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 15,
    },
    registerBtn: {
      color: themeColors?.accentColor,
      marginTop: 20,
      textDecorationLine: 'underline',
    },
    divider: {
      marginVertical: 30,
      paddingHorizontal: 10,
    },
    dot: {
      marginHorizontal: 5,
      paddingTop: 20,
      justifyContent: 'center',
    },
  });
};
