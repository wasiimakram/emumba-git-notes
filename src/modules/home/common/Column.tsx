import { ForkOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { Image, Layout, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import {
  forkGist,
  starGist,
} from '../../../app-redux/modules/gist/actions/gistActions';
import {
  selectIsForked,
  selectIsForkedArr,
  selectIsStarred,
  selectIsStarredArr,
} from '../../../app-redux/modules/gist/gistSlice';
import isUserLoggedIn from '../../../common/utils/auth';

const { Content } = Layout;

const Columns = () => {
  const dispatch = useAppDispatch();
  const isStared = useAppSelector(selectIsStarred);
  const isForked = useAppSelector(selectIsForked);
  const isStaredArr = useAppSelector(selectIsStarredArr);
  const isForkedArr = useAppSelector(selectIsForkedArr);
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, record: Record<string, any>) => (
        <Content className="name-cell">
          <Image src={record.image} />{' '}
          <Link datatest-id="gist-name" to={`/gist/${record.key}`}>
            {text}
          </Link>{' '}
        </Content>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Keyword',
      dataIndex: 'keyword',
    },
    {
      title: 'Notbook Name',
      dataIndex: 'notebook',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text: string, record: Record<string, any>) => {
        return (
          isUserLoggedIn() && (
            <>
              <Typography.Text
                onClick={() => dispatch(starGist({ id: record.key }))}
                className="table-action"
              >
                {isStaredArr.includes(record.key) ? (
                  <StarFilled />
                ) : (
                  <StarTwoTone />
                )}
              </Typography.Text>

              <Typography.Text
                onClick={() => dispatch(forkGist({ id: record.key }))}
                className="table-action"
              >
                {isForkedArr.includes(record.key) ? (
                  <ForkOutlined />
                ) : (
                  <ForkOutlined />
                )}
              </Typography.Text>
            </>
          )
        );
      },
    },
  ];
};
export default Columns;
