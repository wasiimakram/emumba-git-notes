import React from "react";
import { Button, Layout, Typography, Pagination } from "antd";
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
      <Button type="primary" onClick={onNext}>
        Next Page <ArrowRightOutlined />
      </Button>
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
    </Content>
  );
};

export default PaginationWrap;
