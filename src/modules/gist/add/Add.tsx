import React, { useState, useEffect } from 'react';
import { Form, Layout, message } from 'antd';
import { AddFormValues } from '../../../common/typings/app';
import FormContent from './common/FormContent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGist } from '../../../data/gist/actions';
import './../gist.scss';

const { Content } = Layout;

const Add: React.FC = () => {
  const queryClient = useQueryClient();

  const [isReset, setIsReset] = useState(false);

  const { mutate: createGistMutation } = useMutation(createGist, {
    onSuccess() {
      message.success('Gist Added Successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['my-gists']);
    },
  });

  const onFinish = async (values: AddFormValues) => {
    const { description, files } = values;
    const filesStructure: Record<string, { content: string }> = {};
    files.forEach((file) => {
      filesStructure[file.fileName] = {
        content: file.content,
      };
    });
    await createGistMutation({ description, files: filesStructure });
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
