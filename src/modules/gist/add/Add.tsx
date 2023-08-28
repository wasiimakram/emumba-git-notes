import React, { useState, useEffect } from "react";
import { Layout, Input, Button, Form } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../app-redux/hooks";
import { createGistContent } from "../../../app-redux/modules/gist/actions/gistActions";
import { AddFormValues } from "../../../common/typings/app";
import { useHistory } from "react-router-dom";
import "./../gist.scss";
import FormContent from "./common/FormContent";

const { Content } = Layout;
const { TextArea } = Input;

const Add: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = (values: AddFormValues): void => {
    const { description, files } = values;
    const filesStructure: Record<string, { content: string }> = {};
    files.forEach((file) => {
      filesStructure[file.fileName] = {
        content: file.content,
      };
    });
    dispatch(createGistContent({ description, files: filesStructure }));
  };

  // const [form] = Form.useForm();
  // useEffect(() => {
  //   form.setFieldsValue({
  //     files: [{ fileName: "", content: "" }],
  //   });
  // }, [form]);

  return (
    <Content className="ant-container">
      <Layout className="gist-main-wrap">
        <Content className="add-wrap">
          <FormContent onFinish={onFinish} />
        </Content>
      </Layout>
    </Content>
  );
};
export default Add;
