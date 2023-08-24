import React, { useState } from "react";
import {
  Layout,
  Typography,
  Table,
  Card,
  Avatar,
  Image,
  Row,
  Col,
  Pagination,
  Button,
  Skeleton,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  AppstoreOutlined,
  ArrowRightOutlined,
  BarsOutlined,
  ForkOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import ReactEmbedGist from "react-embed-gist";
import "./../home.scss";
import GridCard from "./GridSingle";
import GistCode from "../../../components/common/GistCode";
import { formatTimeDifference } from "../../../common/utils/timeUtils";
import CardSlate from "../../../components/common/BlankSlate/CardSlate";
import PaginationWrap from "./Pagination";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import {
  selectIsLoading,
  selectPublicGist,
} from "../../../app-redux/modules/gist/gistSlice";
import { getGistPublic } from "../../../app-redux/modules/gist/actions/gistActions";
const { Meta } = Card;
const { Title, Text } = Typography;

interface GridProps {}
const GridView: React.FC<GridProps> = ({}) => {
  const skeltonData = new Array(12).fill(null);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  const pageRecord = useAppSelector(selectPublicGist);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(12);
  const total = 3000;

  React.useEffect(() => {
    dispatch(getGistPublic({ page, perPage }));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleManualNext = () => {
    setPage(page + 1);
  };
  return (
    <>
      <Content className="page-icons">
        <AppstoreOutlined /> {" | "}
        <BarsOutlined />
      </Content>
      <Row className="grid-card-content">
        {pageRecord.length > 0 && !isLoading
          ? pageRecord.map((item: any, index: any) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={8}>
                <GridCard item={item} />
              </Col>
            ))
          : skeltonData.map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={8}>
                <CardSlate />
              </Col>
            ))}
      </Row>
      <PaginationWrap
        onPageChange={handlePageChange}
        onNext={handleManualNext}
        page={page}
        total={total}
      />
    </>
  );
};
export default GridView;
