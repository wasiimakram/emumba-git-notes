import React, { useState } from 'react';
import { Button, Image, Space, Layout, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import isUserLoggedIn from '../../../common/utils/auth';
import { useMutation } from '@tanstack/react-query';
import { forkGist, starGist } from '../../../data/gist/actions';
import { ForkOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
const { Content } = Layout;

type Props = {};

export default function Column() {
  const [starId, setStarId] = useState<string>('');
  const [forkId, setForkId] = useState<string>('');

  const { mutate: starGistMutation } = useMutation(starGist, {
    onSuccess(data) {
      console.log('dataaa', data);
      message.success('Gist Starred Successfully!');
      setStarId(data.staredId);
    },
  });
  const { mutate: forkGistMutation } = useMutation(forkGist, {
    onSuccess(data) {
      message.success('Gist Forked Successfully!');
      setForkId(data.staredId);
    },
  });
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
                onClick={() => starGistMutation(record.key)}
                className="table-action"
              >
                {starId == record.key ? <StarFilled /> : <StarTwoTone />}
              </Typography.Text>

              <Typography.Text
                onClick={() => forkGistMutation(record.key)}
                className="table-action"
              >
                <ForkOutlined />{' '}
              </Typography.Text>
            </>
          )
        );
      },
    },
  ];
}
