import '../../gist.scss';

import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout } from 'antd';
import React, { useEffect } from 'react';

import type { AddFormValues } from '../../../../common/typings/app';

const { Content } = Layout;
const { TextArea } = Input;

type Props = {
  isReset: boolean;
  onFinish: (values: AddFormValues) => void;
};
const FormContent: React.FC<Props> = ({ onFinish, isReset }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      files: [{ fileName: '', content: '' }],
    });
    if (isReset) {
      form.resetFields();
      form.setFieldsValue({
        files: [{ fileName: '', content: '' }],
      });
    }
  }, [isReset, form]);
  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Please fill the field' }]}
      >
        <Input
          data-testid="description"
          placeholder="Enter your description..."
        />
      </Form.Item>

      <Form.List name="files">
        {(fields, { add, remove }) => (
          <div>
            {fields.map(({ key, name, ...restField }, index) => (
              <Content className="iteratables" key={index}>
                <Form.Item
                  {...restField}
                  name={[name, 'fileName']}
                  rules={[{ required: true, message: 'Please fill the field' }]}
                >
                  <Input
                    data-testid="fileName"
                    placeholder="Enter your file name..."
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'content']}
                  rules={[{ required: true, message: 'Please fill the field' }]}
                >
                  <TextArea
                    data-testid="fileContent"
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
              <Button
                className="add-button"
                data-testid="add-file"
                onClick={() => add()}
                block
              >
                Add field
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.Item>
        <Button
          className="add-button"
          data-testid="submit-gist"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormContent;
