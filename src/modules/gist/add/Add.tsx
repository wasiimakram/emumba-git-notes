import React, { useState } from 'react';
import { Layout, message } from 'antd';
import { useAppDispatch } from '../../../app-redux/hooks';
import { createGistContent } from '../../../app-redux/modules/gist/actions/gistActions';
import type { AddFormValues } from '../../../common/typings/app';
import FormContent from './common/FormContent';

import '../gist.scss';

const { Content } = Layout;

const Add: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isReset, setIsReset] = useState(false);

  const onFinish = async (values: AddFormValues) => {
    const { description, files } = values;
    const filesStructure: Record<string, { content: string }> = {};
    files.forEach((file) => {
      filesStructure[file.fileName] = {
        content: file.content,
      };
    });
    await dispatch(createGistContent({ description, files: filesStructure }));
    message.success('Gist created successfully!');
    setIsReset(true);
  };
  return (
    <Content className="ant-container">
      <Layout className="gist-main-wrap">
        <Content className="add-wrap">
          <FormContent onFinish={onFinish} isReset={isReset} />
        </Content>
      </Layout>
    </Content>
  );
};
export default Add;
