import React, { useState, useEffect } from 'react';
import { Layout, Typography, Table } from 'antd';
import ListView from './common/ListView';
import GridView from './common/GridView';
import { useAppSelector } from '../../app-redux/hooks';
import { selectPageLayout } from '../../app-redux/modules/gist/gistSlice';
import './home.scss';
import { QueryClient, useQuery } from '@tanstack/react-query';

const { Content } = Layout;

const Home: React.FC = () => {
  const [layout, setLayout] = useState('grid');
  const onLayout = (value: string) => setLayout(value);
  return (
    <Layout className="home-main-wrap">
      <Content className="ant-container">
        {layout === 'listing' ? (
          <ListView onLayout={onLayout} layout={layout} />
        ) : (
          <GridView onLayout={onLayout} layout={layout} />
        )}
      </Content>
    </Layout>
  );
};
export default Home;
