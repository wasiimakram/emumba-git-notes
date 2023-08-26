import React, { useState, useEffect } from "react";
import { Layout, Typography, Input, Button, Upload, Form, Space } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./../gist.scss";
import { useAppDispatch } from "../../../app-redux/hooks";
import { createGistContent } from "../../../app-redux/modules/gist/actions/gistActions";
import { AddFormValues } from "../../../common/typings/app";
import { fork_success_code } from "../../../common/utils/constants";
import { useHistory } from "react-router-dom";

const { Content } = Layout;
const { TextArea } = Input;

const Add: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const onFinish = (values: AddFormValues) => {
    const { description, files } = values;
    const filesStructure: Record<string, { content: string }> = {};
    files.forEach((file) => {
      filesStructure[file.fileName] = {
        content: file.content,
      };
    });
    dispatch(createGistContent({ description, files: filesStructure }));
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      files: [{ fileName: "", content: "" }],
    });
  }, [form]);

  return (
    <Content className="ant-container">
      <Layout className="gist-main-wrap">
        <Content className="add-wrap">
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please fill the field" }]}
            >
              <Input placeholder="Enter your description..." />
            </Form.Item>

            <Form.List name="files">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Content className="iteratables">
                      <Form.Item
                        {...restField}
                        name={[name, "fileName"]}
                        rules={[
                          { required: true, message: "Please fill the field" },
                        ]}
                      >
                        <Input placeholder="Enter your file name..." />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        rules={[
                          { required: true, message: "Please fill the field" },
                        ]}
                      >
                        <TextArea
                          rows={4}
                          placeholder="Enter file content..."
                        />
                      </Form.Item>

                      {index > 0 ? (
                        <MinusCircleOutlined
                          className="remove-button"
                          onClick={() => remove(name)}
                        />
                      ) : null}
                    </Content>
                  ))}
                  <Form.Item>
                    <Button className="add-button" onClick={() => add()} block>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button className="add-button" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Content>
  );
};
export default Add;
