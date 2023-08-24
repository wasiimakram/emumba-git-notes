import React, { useState } from "react";
import { Layout, Typography, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./../gist.scss";

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

const Add: React.FC = () => {
  return (
    <Layout className="gist-main-wrap">
      <Content className="add-wrap">
        <Input placeholder="Enter your description..." />
        <Input placeholder="Enter your file name..." />
        <TextArea rows={4} placeholder="Enter file content..." />
        <Upload className="upload" multiple>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <Button className="add">Create Gist</Button>
      </Content>
    </Layout>
  );
};
export default Add;
