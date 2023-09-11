import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Avatar,
  Image,
  Button,
  Col,
  Skeleton,
  Pagination,
  Layout,
} from 'antd';

import { useHistory } from 'react-router-dom';
import GistCode from '../../components/common/GistCode';
import { formatTimeDifference } from '../../common/utils/timeUtils';
import ShortProfile from '../../components/common/Profile';
import GistButtons from '../../components/common/GistButtons';
import { useAppDispatch, useAppSelector } from '../../app-redux/hooks';
import {
  handlePageChange,
  selectIsLoading,
  selectMyGist,
  selectPage,
  selectPerPage,
} from '../../app-redux/modules/profile/profileSlice';
import { getMyGist } from '../../app-redux/modules/profile/actions/profileActions';
import { useMyGist } from '../../data/gist/useGist';
const { Content } = Layout;
interface GridProps {
  pageRecord: any;
  isFetching: boolean;
  page: number;
  perPage: number;
  setPage: any;
}
const SingleCard: React.FC<GridProps> = ({
  pageRecord,
  isFetching,
  page,
  perPage,
  setPage,
}) => {
  const history = useHistory();
  const skeltonData = new Array(6).fill(null);

  // const { data: pageRecord, isFetching } = useMyGist(page, perPage);

  const handleClick = (id: string) => {
    history.push(`/gist/${id}`);
  };
  return (
    <Content className="gist-wrap">
      {!isFetching && pageRecord
        ? pageRecord.map((item: any) => {
            const file = item && Object.keys(item.files)[0];
            return (
              <Content className="gist-wrap">
                <Card>
                  <Content className="header">
                    <ShortProfile
                      name={item.owner?.login || ''}
                      avatar={item.owner?.avatar_url || ''}
                      time={formatTimeDifference(item.created_at) || ''}
                      keyword="Web Server"
                      file={item.files ? Object.keys(item.files)[0] || '' : ''}
                    />
                    <GistButtons gistId={item.id} isUser={item.owner.login} />
                  </Content>
                  <Content
                    className="git-container"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    <GistCode
                      id={`${item.owner.login}/${item.id}`}
                      file={file}
                    />
                  </Content>
                </Card>
              </Content>
            );
          })
        : skeltonData.map((_, index) => (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          ))}
      <Pagination
        current={page}
        pageSize={perPage}
        total={25}
        onChange={(page: number) => setPage(page)}
        showSizeChanger={false}
      />
    </Content>
  );
};
export default SingleCard;
