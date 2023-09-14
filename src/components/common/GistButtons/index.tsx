import React, { useState } from 'react';
import { Layout, Typography, message } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ForkOutlined,
  StarFilled,
  StarTwoTone,
} from '@ant-design/icons';
import isUserLoggedIn from '../../../common/utils/auth';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './index.scss';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { forkGist, starGist } from '../../../data/gist/actions';
import { GistData } from '../../../common/typings/app';
import { isStaredGist } from '../../../common/utils/common';
import { useHome } from '../../../data/home/useHome';
import {
  useDeleteGist,
  useStarGistMutation,
  useStarGists,
  useUnStarGistMutation,
} from '../../../data/gist/useGist';

const { Content } = Layout;
const { Text } = Typography;
interface GistProps {
  gistId?: string;
  isUser?: string;
}
const GistButtons: React.FC<GistProps> = ({ gistId, isUser }) => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const pageId = id ?? gistId;
  const [forkId, setForkId] = useState<string>('');
  const location = useLocation();
  const userName = 'wasiimakram';

  const { mutate: forkGistMutation } = useMutation(forkGist, {
    onSuccess(data) {
      message.success('Gist Forked Successfully!');
      setForkId(data.staredId);
    },
  });
  const { mutate: StarGist } = useStarGistMutation(pageId);
  const handleStar = async () => {
    await StarGist();
  };
  const { mutate: UnStarGist } = useUnStarGistMutation(pageId);
  const handleUnStar = async () => {
    await UnStarGist();
  };
  const handleFork = async () => {
    await forkGistMutation(pageId);
  };
  const hadleEdit = () => {
    history.push(`/edit/${pageId}`);
  };
  const { mutate: DeleteGist } = useDeleteGist(pageId);
  const handleDelete = async () => {
    await DeleteGist();
    message.success('Gist Deleted Successfully!');
    if (location.pathname.startsWith('/gists/')) {
      history.push('/');
    }
  };
  let staredData: GistData[] | undefined;
  staredData = queryClient.getQueryData(['star-gists']);
  const { data: apiStaredData, isFetching } = useStarGists();
  if (staredData === undefined || staredData === null) {
    staredData = apiStaredData;
  }
  const isStared = isStaredGist(staredData, pageId);
  return (
    <Content className="icons">
      {isUserLoggedIn() && (
        <>
          {isUser === userName ? (
            <>
              <Text
                className="wrap"
                onClick={hadleEdit}
                data-testid="edit-link"
              >
                <EditOutlined /> <Text>Edit</Text>
              </Text>
              <Text className="wrap" onClick={handleDelete}>
                <DeleteOutlined /> <Text>Delete</Text>
              </Text>
            </>
          ) : (
            <></>
          )}

          <Text className="wrap">
            {isStared ? (
              <Text onClick={handleUnStar}>
                <StarFilled /> Unstar
              </Text>
            ) : (
              <Text onClick={handleStar}>
                <StarTwoTone /> Star
              </Text>
            )}
          </Text>
          <Text className="wrap">
            <Text onClick={handleFork}>
              {forkId == pageId ? (
                <>
                  <ForkOutlined /> Unfork
                </>
              ) : (
                <>
                  <ForkOutlined /> Fork
                </>
              )}
            </Text>
            {/* <Text className="counter">{forkCount}</Text> */}
          </Text>
        </>
      )}
    </Content>
  );
};
export default GistButtons;
