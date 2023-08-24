import React, { useState } from "react";
import { Layout, Typography, Table } from "antd";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";
import ShortProfile from "../../../components/common/Profile";
import GistButtons from "../../../components/common/GistButtons";
import "./../gist.scss";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const { Content } = Layout;
const { Text } = Typography;

const Edit: React.FC = () => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  function onChange(newValue: any) {
    console.log("change", newValue);
  }

  return (
    <Layout className="gist-main-wrap">
      <Content className="intro-wrap">
        <ShortProfile />
        <GistButtons />
      </Content>
      <Content className="code-view">
        <AceEditor
          value={code}
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          highlightActiveLine={false}
        />
      </Content>
    </Layout>
  );
};
export default Edit;
