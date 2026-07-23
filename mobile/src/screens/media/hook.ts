import { useTheme } from '@shesha/mobile-components';

export const useToolbar = () => {
  const { theme } = useTheme();
  const {
    toolbar: {
      barStyle = 'light-content',
      toolbarColor = 'white',
      textColor = 'black',
    } = {},
  } = theme ?? {};

  const getToolbarOptions = (title?: string, props?: any) => {
    return {
      headerTitle: title,
      headerStyle: {
        backgroundColor: toolbarColor,
      },
      headerTintColor: textColor,
      headerBackTitleVisible: false,
      ...props,
    };
  };
  return {
    getToolbarOptions,
    barStyle,
    toolbarColor,
  };
};
