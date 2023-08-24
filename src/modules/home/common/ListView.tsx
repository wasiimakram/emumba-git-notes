import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Skeleton, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./../home.scss";
import {
  AppstoreOutlined,
  BarsOutlined,
  ForkOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import {
  handlePageChange,
  resetListingValues,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectPublicGist,
  selectTotal,
} from "../../../app-redux/modules/gist/gistSlice";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import { getGistPublic } from "../../../app-redux/modules/gist/actions/gistActions";
import { useDispatch } from "react-redux";
import Columns from "./Column";
import ToggleButtons from "./ToggleButtons";

const ListView: React.FC = () => {
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const total = useAppSelector(selectTotal);
  const pageRecord = useAppSelector(selectPublicGist);
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getGistPublic({ page, perPage }));
  }, [dispatch, page]);
  useEffect(() => {
    return () => {
      //unmount
      dispatch(resetListingValues());
    };
  }, []);

  const updateRecord = pageRecord.map((item: any) => ({
    key: item.id.toString(),
    name: item.owner.login,
    date: item.created_at,
    time: item.created_at,
    keyword: "WebServer",
    notebook: Object.keys(item.files)[0] || "-",
    image: item.owner.avatar_url,
  }));
  const emptyData = new Array(12).fill({}).map((_, index) => ({ key: index }));

  return (
    <Content className="list-view">
      <ToggleButtons />
      <Table
        rowSelection={{ type: "checkbox" }}
        className="page-table"
        columns={Columns()}
        dataSource={!isLoading ? updateRecord : emptyData}
        loading={isLoading}
        pagination={false}
      />
      <Pagination
        current={page}
        pageSize={perPage}
        total={total}
        onChange={(page) => {
          dispatch(handlePageChange(page));
        }}
        showSizeChanger={false}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </Content>
  );
};
export default ListView;
