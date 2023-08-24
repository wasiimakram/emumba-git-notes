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
  handlePageChange,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectPublicGist,
} from "../../../app-redux/modules/gist/gistSlice";
import { getGistPublic } from "../../../app-redux/modules/gist/actions/gistActions";
import ToggleButtons from "./ToggleButtons";
const { Meta } = Card;
const { Title, Text } = Typography;

interface GridProps {}
const GridView: React.FC<GridProps> = ({}) => {
  const skeltonData = new Array(12).fill(null);
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const dispatch = useAppDispatch();
  const pageRecord = useAppSelector(selectPublicGist);

  React.useEffect(() => {
    dispatch(getGistPublic({ page, perPage }));
  }, [dispatch, page]);

  return (
    <>
      <ToggleButtons />
      <Row className="grid-card-content">
        {pageRecord.length > 0 && !isLoading
          ? pageRecord.map((item: any, index: any) => <GridCard item={item} />)
          : skeltonData.map((_, index) => <CardSlate />)}
      </Row>
      <PaginationWrap />
    </>
  );
};
export default GridView;
