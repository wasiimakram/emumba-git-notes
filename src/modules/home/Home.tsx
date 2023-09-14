import './home.scss';

import { Layout } from 'antd';
import React from 'react';

import { useAppSelector } from '../../app-redux/hooks';
import GridView from './common/GridView';
import ListView from './common/ListView';
import { Container } from '@mui/material';

const { Content } = Layout;

const Home: React.FC = () => {
  const layout = useAppSelector((state) => state.gist.pageLayout);
  return (
    <Layout className="home-main-wrap">
      <Container maxWidth="lg" className="ant-container">
        {layout === 'listing' ? <ListView /> : <GridView />}
      </Container>
    </Layout>
  );
};
export default Home;
