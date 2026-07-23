import {
  ignoreCommonLogs,
  Main,
  ShaDesigner,
  type IShaDesignerProps,
} from "@shesha/mobile-designer";
import { useEffect } from "react";
import Config from "react-native-config";
import { DEFAULT_HEADERS } from "./constants/api";
import { CUSTOM_SCREENS, SPLASH_CONFIG, THEME } from "./constants/screens";
import ShaSync from "./sync";
import { getFooterText } from "./constants/misc";

// Fallbacks used when HOME_URL / ONBOARD_URL are not provided via .env
// (react-native-config). The CI pipeline writes these from the variable group.
const HOME_URL = "Boxfusion.Project/mobile-home";
const ONBOARD_URL = "boxfusion.dep/mobile-wizard";

const App = () => {
  useEffect(() => {
    ignoreCommonLogs();
  }, []);

  const config: IShaDesignerProps = {
    baseURL: Config.BASE_URL || "",
    headers: DEFAULT_HEADERS,
    applicationKey: Config.APP_KEY,
    homeUrl: Config.HOME_URL || HOME_URL,
    onboardUrl: Config.ONBOARD_URL || ONBOARD_URL,
    ui: {
      screens: CUSTOM_SCREENS,
      theme: THEME,
      splash: SPLASH_CONFIG,
      footerText: getFooterText(Config.BASE_URL),
    },
    apiKeys: {
      googleMaps: Config.GOOGLE_MAPS_KEY,
      googlePlaces: Config.GOOGLE_PLACES_KEY,
      mapbox: Config.MAPBOX_ACCESS_KEY,
    },
  };

  return (
    <ShaDesigner {...config}>
      <ShaSync />
      <Main />
    </ShaDesigner>
  );
};

export default App;
