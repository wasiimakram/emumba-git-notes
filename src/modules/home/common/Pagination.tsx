import React from "react";
import { Button, Layout, Typography, Pagination, Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  handleManualNext,
  handlePageChange,
  selectPage,
  selectPerPage,
  selectTotal,
} from "../../../app-redux/modules/gist/gistSlice";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
const { Content } = Layout;
const { Text } = Typography;

type Props = {};

const PaginationWrap: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const total = useAppSelector(selectTotal);

  const handleChange = (newPage: any) => {
    dispatch(handlePageChange(newPage));
  };
  const onNext = (newPage: any) => {
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
