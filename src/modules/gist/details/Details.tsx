import React, { useState } from 'react';
import { Layout, Skeleton } from 'antd';
import ShortProfile from '../../../components/common/Profile';
import GistButtons from '../../../components/common/GistButtons';
import { useParams } from 'react-router-dom';
import GistCode from '../../../components/common/GistCode';
import { formatTimeDifference } from '../../../common/utils/timeUtils';
import './../gist.scss';
import { useGistDetails } from '../../../data/home/useHome';

const { Content } = Layout;

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useGistDetails(id);
  let contentToRender;
  if (!isFetching && data) {
    contentToRender = (
      <>
        <Content data-testid="detail-page" className="ant-container">
          <Content className="intro-wrap">
            <ShortProfile
              name={data?.owner?.login || ''}
              avatar={data?.owner?.avatar_url || ''}
              time={formatTimeDifference(data.created_at) || ''}
              keyword="Web Server"
              file={data.files ? Object.keys(data.files)[0] || '' : ''}
            />
            <GistButtons isUser={data.owner.login} />
          </Content>
          <Content className="code-view">
            <GistCode
              id={`${data.owner && data?.owner?.login}/${data && data?.id}`}
              file={data.files && Object.keys(data?.files)[0]}
            />
          </Content>
        </Content>
      </>
    );
  } else {
    contentToRender = (
      <Content className="ant-container">
        <Skeleton avatar paragraph={{ rows: 10 }} />
      </Content>
    );
  }

  return <Layout className="gist-main-wrap">{contentToRender}</Layout>;
};
export default Details;
