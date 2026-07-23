import { version as coreVersion } from "@shesha/mobile-core/package.json";
import { version as designerVersion } from "@shesha/mobile-designer/package.json";
import { version as componentsVersion } from "@shesha/mobile-components/package.json";

const getEnvSuffix = (url: string): string => {
  if (url.includes("-test")) return " (Test)";
  if (url.includes("-qa")) return " (QA)";
  return "";
};

export const getFooterText = (baseUrl?: string): string => {
  let footer = `core: ${coreVersion}, designer: ${designerVersion}, components: ${componentsVersion}`;
  if (
    coreVersion === designerVersion &&
    designerVersion === componentsVersion
  ) {
    footer = `core, components, designer: ${designerVersion}`;
  }
  return `${footer}\n${getEnvSuffix(baseUrl ?? "")}`;
};
