import React from 'react';
import { Layout } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import {
  changePageLayout,
  selectPageLayout,
} from '../../../app-redux/modules/gist/gistSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import { QueryClient, useQuery } from '@tanstack/react-query';
const { Content } = Layout;

type Props = {
  onLayout: any;
  layout: any;
};
const ToggleButtons: React.FC<Props> = ({ onLayout, layout }) => {
  const handleChange = (type: string) => {
    onLayout(type);
  };
  return (
    <Content className="page-icons">
      <AppstoreOutlined
        onClick={() => handleChange('grid')}
        className={layout === 'grid' ? 'selected' : ''}
      />{' '}
      {' | '}
      <BarsOutlined
        onClick={() => handleChange('listing')}
        className={layout === 'listing' ? 'selected' : ''}
      />
    </Content>
  );
};
export default ToggleButtons;
