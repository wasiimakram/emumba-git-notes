import React, { useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Upload,
  Image,
  Row,
  Col,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./profile.scss";
import { Link } from "react-router-dom";
import GistButtons from "../../components/common/GistButtons";
import ShortProfile from "../../components/common/Profile";
import ReactEmbedGist from "react-embed-gist";
import GistCode from "../../components/common/GistCode";

const { Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

const Profile: React.FC = () => {
  return (
    <Layout className="profile-main-wrap">
      <Row className="profile-row">
        <Col span={10} className="left-wrap">
          <Content className="image-wrap">
            <Image src="assets/images/user1.jpg" />
            <Title level={4} className="title">
              Anna John
            </Title>
            <Button>View GitHub Profile</Button>
            {/* <Link to="/index">View GitHub Profile</Link> */}
          </Content>
        </Col>
        <Col span={14} className="right-wrap">
          <Content className="gist-wrap">
            <Card>
              <Content className="header">
                <ShortProfile />
                <GistButtons />
              </Content>
              <Content className="git-container">
                <GistCode
                  id="ayabenz/e113045f668568f4b40fd290c005c82b"
                  file="error404.txt"
                />
              </Content>
            </Card>
            <Card>
              <Content className="header">
                <ShortProfile />
                <GistButtons />
              </Content>
              <Content className="git-container">
                <GistCode
                  id="msaracevic/5d757e2fc72482a9a4a439969500c2eb"
                  file=".bash_profile.sh"
                />
                {/* <ReactEmbedGist
                  gist={"msaracevic/5d757e2fc72482a9a4a439969500c2eb"}
                  wrapperClass="gist__bash"
                  loadingClass="loading__screen"
                  titleClass="gist__title"
                  errorClass="gist__error"
                  contentClass="gist__content"
                  file=".bash_profile.sh"
                /> */}
              </Content>
            </Card>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};
export default Profile;
