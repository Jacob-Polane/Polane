import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useSheshaApplication } from '@shesha-io/reactjs';
import { formDesignerComponents } from '../designer-components';

export interface IPolanePluginProps {}

export const POLANE_PLUGIN_NAME = `Shesha.Polane`;

export const PolanePlugin: FC<PropsWithChildren<IPolanePluginProps>> = ({ children }) => {
  const { registerFormDesignerComponents } = useSheshaApplication();

  useEffect(() => {
    registerFormDesignerComponents(POLANE_PLUGIN_NAME, formDesignerComponents);
  }, []);

  return <>{children}</>;
};
