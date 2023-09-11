import React, { useState, useEffect } from 'react';
import { Table, Pagination, Layout } from 'antd';
import Columns from './Column';
import ToggleButtons from './ToggleButtons';
import { useHome } from '../../../data/home/useHome';
import './../home.scss';

const { Content } = Layout;

interface ListProps {
  onLayout: (value: string) => void;
  layout: string;
}

const ListView: React.FC<ListProps> = ({ onLayout, layout }) => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [total] = useState(3000);
  const { data: pageRecord, isFetching } = useHome(page, perPage); // Data Fetch
  const updateRecord =
    pageRecord &&
    pageRecord.map((item: Record<string, any>) => ({
      key: item.id.toString(),
      name: item.owner.login,
      date: item.created_at,
      time: item.created_at,
      keyword: 'WebServer',
      notebook: (item.files && Object.keys(item.files)[0]) || '-',
      image: item.owner.avatar_url,
    }));
  const emptyData = new Array(12).fill({}).map((_, index) => ({ key: index }));

  return (
    <Content className="list-view" data-testid="list-view">
      <ToggleButtons onLayout={onLayout} layout={layout} />
      <Table
        rowSelection={{ type: 'checkbox' }}
        className="page-table table-responsive"
        columns={Columns()}
        dataSource={!isFetching ? updateRecord : emptyData}
        loading={isFetching}
        pagination={false}
      />
      <Pagination
        current={page}
        pageSize={perPage}
        total={total}
        onChange={(page: number) => setPage(page)}
        showSizeChanger={false}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </Content>
  );
};
export default ListView;
