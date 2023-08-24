import React from "react";
import { Button, Layout, Typography, Pagination } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Content } = Layout;
const { Text } = Typography;

type Props = {
  onPageChange: any;
  onNext: any;
  page: number;
  total: number;
};

const PaginationWrap: React.FC<Props> = ({
  onPageChange,
  onNext,
  page,
  total,
}) => {
  const handlePaginationChange = (newPage: any) => {
    console.log("Page", newPage);
    onPageChange(newPage);
    // onPageChange(newPage, additionalParam);
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
        total={3000}
        showSizeChanger={false}
        showLessItems
        onChange={handlePaginationChange}
      />
    </Content>
  );
};

export default PaginationWrap;
