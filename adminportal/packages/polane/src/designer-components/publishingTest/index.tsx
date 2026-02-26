import React from 'react';
import { IToolboxComponent, IConfigurableFormComponent } from '@shesha-io/reactjs';
import { FileTextOutlined } from '@ant-design/icons';

export interface IPublishingTestProps extends IConfigurableFormComponent {}

const PublishingTestComponent: IToolboxComponent<IPublishingTestProps> = {
  type: 'publishingTest',
  name: 'Publishing Test',
  isInput: false,
  icon: <FileTextOutlined />,
  Factory: ({ model: _model }) => {
    return (
      <div
        style={{
          padding: '16px',
          border: '1px dashed #1677ff',
          borderRadius: '6px',
          background: '#e6f4ff',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '16px',
          color: '#1677ff',
        }}
      >
        Publishing Test
      </div>
    );
  },
};

export default PublishingTestComponent;
