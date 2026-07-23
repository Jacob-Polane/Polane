import type { IShaNavigationProps } from "@shesha/mobile-components/lib/typescript/components/navigator/interface";
import LoginScreen from "../screens/auth/login";
import AnotherScreen from "../screens/other/anotherScreen";
import CustomScreen from "../screens/other/customScreen";
// import { AttendanceModuleScreens } from '@shesha/mobile-module-attendance';
import type { IShaTheme } from "@shesha/mobile-components/lib/typescript/providers/theme/utils/interface";
import type { ISplash } from "src/providers/shaApplication/utils/interface";
import MediaScreen from "../screens/media";

export const THEME: IShaTheme = {
  toolbar: {
    toolbarColor: "#03417B",
    statusBarColor: "#03417B",
    textColor: "white",
    barStyle: "light-content",
    backIconColor: "white",
    showDivider: false,
  },
  colors: {
    light: { accentColor: "#FFC21C" },
    drawerDark: {
      containerColor: "#03417B",
      textColor: "white",
      iconColor: "white",
    },
  },
};

export const SPLASH_CONFIG: ISplash = {
  type: "image",
  iconSource: require("../../assets/SheshaLoadingAnimation.gif"),
  style: {
    image: { height: 80, width: 80 },
    background: { backgroundColor: "white" },
  },
  // backgroundSource: {
  //   uri: 'https://media.istockphoto.com/photos/white-studio-background-picture-id1040250650?b=1&k=20&m=1040250650&s=612x612&w=0&h=b-ijOD-3NFHSgUW7cwBel6j4ubmIQDS8Q7jOjTO2U08=',
  // },
};

export const CUSTOM_SCREENS: IShaNavigationProps["screens"] = {
  auth: [
    /* DISABLED SCREENS - Uncomment these when the screens are implemented
    {
      name: "LoginScreen",
      component: LoginScreen as any,
      options: { headerShown: false },
    },
    
    {
      name: 'RegisterScreen',
      component: Register,
      options: { headerShown: false },
    },
    {
      name: 'ForgotPasswordScreen',
      component: ForgotPassword,
      options: { headerShown: true, headerTitle: 'Forgot Password' },
    },
    {
      name: 'ResetOptionsScreen',
      component: ResetOptions,
      options: { headerShown: true, headerTitle: 'Reset Options' },
    },
    {
      name: 'VerifyMobileNumberScreen',
      component: VerifyMobileNumber,
      options: { headerShown: true, headerTitle: 'Verify Mobile Number' },
    },
    {
      name: 'VerifyOtpScreen',
      component: VerifyOtp,
      options: { headerShown: true, headerTitle: 'Verify OTP' },
    },
    {
      name: 'ResetPasswordScreen',
      component: ResetPassword,
      options: { headerShown: true, headerTitle: 'Reset Password' },
    }, */
  ],
  main: [
    //...AttendanceModuleScreens.main,
    {
      name: "MediaScreen",
      component: MediaScreen,
      options: {
        headerShown: true,
        headerTitle: "Media",
        animation: "fade_from_bottom",
      },
    },
    {
      name: "CustomScreen",
      component: CustomScreen,
      options: { headerShown: false },
      showDrawer: true,
    },
    {
      name: "AnotherScreen",
      component: AnotherScreen,
      options: { headerShown: true },
    },
  ],
};
