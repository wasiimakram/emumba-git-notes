import '../home.scss';

import { Card, Col, Layout, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { formatTimeDifference } from '../../../common/utils/timeUtils';
import GistCode from '../../../components/common/GistCode';
import { Grid } from '@mui/material';

const { Title, Text } = Typography;
const { Content } = Layout;

interface GridProps {
  item: Record<string, any>;
}
const GridCard: React.FC<GridProps> = ({ item }) => {
  const file = Object.keys(item.files)[0];
  const history = useHistory();
  const handleClick = (id: string) => {
    history.push(`/gist/${id}`);
  };
  return (
    <>
      <Grid className="home-col-box" key={item.id} xs={12} sm={6} md={4} lg={4}>
        <Card
          key={item.id}
          className="single-card"
          onClick={() => handleClick(item.id)}
        >
          <GistCode id={`${item.owner.login}/${item.id}`} file={file} />
          <Content className="profile-wrap footer-wrap">
            <img src={item.owner.avatar_url} />
            <Content>
              <Title datatest-id="owner-name" level={5} className="title">
                {item.owner.login} / {file}
              </Title>
              <Text>Created {formatTimeDifference(item.created_at)}</Text>
              <Text className="user-tag">{item.owner.type}</Text>
            </Content>
          </Content>
        </Card>
      </Grid>
    </>
  );
};
export default GridCard;
