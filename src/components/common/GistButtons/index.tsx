import './index.scss';

import {
  DeleteOutlined,
  EditOutlined,
  ForkOutlined,
  StarFilled,
  StarTwoTone,
} from '@ant-design/icons';
import { Layout, message, Typography } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import {
  forkGist,
  starGist,
} from '../../../app-redux/modules/gist/actions/gistActions';
import {
  deleteGistValue,
  selectForkCount,
  selectIsForked,
  selectIsStarredArr,
  selectPage,
  selectPerPage,
  selectStarCount,
} from '../../../app-redux/modules/gist/gistSlice';
import isUserLoggedIn from '../../../common/utils/auth';

const { Content } = Layout;
const { Text } = Typography;
interface GistProps {
  gistId?: string;
}
const GistButtons: React.FC<GistProps> = ({ gistId }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isForked = useAppSelector(selectIsForked);
  const forkCount = useAppSelector(selectForkCount);
  const starCount = useAppSelector(selectStarCount);
  const isStaredArr = useAppSelector(selectIsStarredArr);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const pageId = id ?? gistId;

  const hadleEdit = () => {
    console.log('EDIT CLICKED', pageId, id, gistId);
    history.push(`/edit/${pageId}`);
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteGistValue(pageId));
      message.success('Gist deleted successfully!');
      history.push('/');
    } catch (err) {}
    // dispatch(deleteGist({ id: pageId }));
    // await dispatch(getMyGist({ page, perPage }));
  };
  return (
    <Content className="icons">
      {isUserLoggedIn() && (
        <>
          <Text className="wrap" onClick={hadleEdit} data-testid="edit-link">
            <EditOutlined /> <Text>Edit</Text>
          </Text>
          <Text className="wrap" onClick={handleDelete}>
            <DeleteOutlined /> <Text>Delete</Text>
          </Text>

          <Text className="wrap">
            <Text
              data-testid="star-button"
              onClick={() => dispatch(starGist({ id: pageId }))}
            >
              {isStaredArr.includes(pageId) ? (
                (() => {
                  console.log('Page is starred');
                  return (
                    <>
                      <StarFilled data-testid="unstar-text" /> Unstar
                    </>
                  );
                })()
              ) : (
                <>
                  <StarTwoTone /> Star
                </>
              )}
            </Text>
            <Text className="counter">{starCount}</Text>
          </Text>
          <Text className="wrap">
            <Text onClick={() => dispatch(forkGist({ id: pageId }))}>
              {isForked ? (
                <>
                  <ForkOutlined /> Unfork
                </>
              ) : (
                <>
                  <ForkOutlined /> Fork
                </>
              )}
            </Text>
            <Text className="counter">{forkCount}</Text>
          </Text>
        </>
      )}
    </Content>
  );
};
export default GistButtons;
