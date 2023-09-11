import React, { useState } from 'react';
import { Layout, Typography, Image, Row, Col } from 'antd';
import SingleCard from './SingleCard';
import './profile.scss';
import { useMyGist, useStarGists } from '../../data/gist/useGist';

const { Content } = Layout;
const { Title } = Typography;

const StarGists: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const handlePage = (page: number) => {
    setPage(page);
  };
  const { data, isFetching } = useStarGists(page, perPage);
  return (
    <Layout className="profile-main-wrap">
      <Content className="ant-container">
        <Row className="profile-row">
          <Col span={8} className="left-wrap">
            <Content className="image-wrap">
              <Image src="assets/images/user4.jfif" />
              <Title level={4} className="title">
                Muhammad Wasim Akram
              </Title>
              <a target="_blank" href="https://github.com/wasiimakram">
                View GitHub Profile
              </a>
            </Content>
          </Col>
          <Col span={16} className="right-wrap">
            <SingleCard
              pageRecord={data}
              isFetching={isFetching}
              page={page}
              perPage={perPage}
              setPage={setPage}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default StarGists;
