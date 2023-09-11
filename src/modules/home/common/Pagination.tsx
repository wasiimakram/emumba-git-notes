import React from 'react';
import { Button, Layout, Typography, Pagination, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import {
  handleManualNext,
  handlePageChange,
  selectPage,
  selectPerPage,
  selectTotal,
} from '../../../app-redux/modules/gist/gistSlice';
import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import { usePagination } from '../../../data/hooks/usePagination';

const { Content } = Layout;
const { Text } = Typography;

type Props = {
  page: number;
  onNext: () => void;
};
const PaginationWrap: React.FC<Props> = ({ page, onNext }) => {
  const total = 3000;
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
            onChange={onNext}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default PaginationWrap;
