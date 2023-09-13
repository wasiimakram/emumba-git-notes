import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Pagination, Row, Typography } from 'antd';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import {
  handleManualNext,
  handlePageChange,
  selectPage,
  selectPerPage,
  selectTotal,
} from '../../../app-redux/modules/gist/gistSlice';

const { Content } = Layout;
const { Text } = Typography;

type Props = {};
const PaginationWrap: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const total = useAppSelector(selectTotal);

  const handleChange = (newPage: number) => {
    dispatch(handlePageChange(newPage));
  };
  const onNext = () => {
    dispatch(handleManualNext());
  };
  return (
    <Content className="pagination-wrap">
      <Row>
        <Col span={8} offset={8} className="pagination-btn">
          <Button type="primary" onClick={onNext}>
            Next Page <ArrowRightOutlined />
          </Button>
        </Col>
        <Col span={8} className="pagination-inner">
          <Text>
            Page <span>{page}</span> of {total}
          </Text>
          <Pagination
            size="small"
            total={total}
            showLessItems
            showSizeChanger={false}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default PaginationWrap;
