import React, { useState, useEffect } from 'react';
import { Layout, Typography, Table } from 'antd';
import ListView from './common/ListView';
import GridView from './common/GridView';
import { useAppSelector } from '../../app-redux/hooks';
import { selectPageLayout } from '../../app-redux/modules/gist/gistSlice';
import './home.scss';

const { Content } = Layout;

const Home: React.FC = () => {
  // const layout = useAppSelector((state) => state.gist.pageLayout);
  const layout: string = '';
  return (
    <Layout className="home-main-wrap">
      <Content className="ant-container">
        {layout === 'listing' ? <ListView /> : <GridView />}
      </Content>
    </Layout>
  );
};
export default Home;
