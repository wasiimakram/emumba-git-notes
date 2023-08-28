import React, { useEffect } from "react";
import { Layout, Input, Button, Form } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { AddFormValues } from "../../../../common/typings/app";
import "./../../gist.scss";
const { Content } = Layout;
const { TextArea } = Input;

type Props = {
  onFinish: (values: AddFormValues) => void;
};
const FormContent: React.FC<Props> = ({ onFinish }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      files: [{ fileName: "", content: "" }],
    });
  }, [form]);
  return (
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
                  rules={[{ required: true, message: "Please fill the field" }]}
                >
                  <Input placeholder="Enter your file name..." />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "content"]}
                  rules={[{ required: true, message: "Please fill the field" }]}
                >
                  <TextArea rows={4} placeholder="Enter file content..." />
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
  );
};

export default FormContent;
