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
import { useDispatch } from "react-redux";
import SingleCard from "./SingleCard";

const { Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

const Profile: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Layout className="profile-main-wrap">
      <Content className="ant-container">
        <Row className="profile-row">
          <Col span={8} className="left-wrap">
            <Content className="image-wrap">
              <Image src="assets/images/user3.jpg" />
              <Title level={4} className="title">
                Johan Doe
              </Title>
              <Button>View GitHub Profile</Button>
              {/* <Link to="/index">View GitHub Profile</Link> */}
            </Content>
          </Col>
          <Col span={16} className="right-wrap">
            <SingleCard />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default Profile;
