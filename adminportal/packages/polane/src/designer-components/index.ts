import { IToolboxComponentGroup } from '@shesha-io/reactjs';
import PublishingTestComponent from './publishingTest';
/* NEW_COMPONENT_IMPORT_GOES_HERE */

export const formDesignerComponents: IToolboxComponentGroup[] = [
  {
    name: 'Polane',
    components: [
      PublishingTestComponent,
      /* NEW_COMPONENT_GOES_HERE */
    ],
    visible: true,
  },
];
