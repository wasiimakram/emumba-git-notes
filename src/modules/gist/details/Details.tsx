import React, { useState } from "react";
import { Layout, Typography, Table } from "antd";
import "./../gist.scss";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";
import ShortProfile from "../../../components/common/Profile";
import ReactEmbedGist from "react-embed-gist";
import GistButtons from "../../../components/common/GistButtons";

const { Content } = Layout;
const { Title, Text } = Typography;

const Details: React.FC = () => {
  return (
    <Layout className="gist-main-wrap">
      <Content className="intro-wrap">
        <ShortProfile />
        <GistButtons />
      </Content>
      <Content className="code-view">
        <ReactEmbedGist
          gist={"msaracevic/5d757e2fc72482a9a4a439969500c2eb"}
          wrapperClass="gist__bash"
          loadingClass="loading__screen"
          titleClass="gist__title"
          errorClass="gist__error"
          contentClass="gist__content"
          file=".bash_profile.sh"
        />
      </Content>
    </Layout>
  );
};
export default Details;
