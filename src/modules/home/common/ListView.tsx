import React, { useState, useEffect } from "react";
import { Layout, Typography, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import "./../home.scss";
import {
  AppstoreOutlined,
  BarsOutlined,
  ForkOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { selectPublicGist } from "../../../app-redux/modules/gist/gistSlice";
import { useAppSelector } from "../../../app-redux/hooks";

const ListView: React.FC = () => {
  const pageRecord = useAppSelector(selectPublicGist);
  let tableData: any = [];
  interface DataType {
    key: React.Key;
    name: string;
    date: string;
    time: string;
    keyword: string;
    notebook: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: () => (
        <>
          <StarOutlined className="table-action" />
          <ForkOutlined className="table-action" />
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
    },
    {
      title: "Notbook Name",
      dataIndex: "notebook",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => (
        <>
          <StarOutlined className="table-action" />
          <ForkOutlined className="table-action" />
        </>
      ),
    },
  ];
  useEffect(() => {
    console.log("pageRecord", pageRecord);
    tableData = pageRecord.data.map((item: any) => ({
      key: item.id.toString(),
      name: item.owner.login,
      date: item.created_at, // You might need to format this
      time: item.created_at, // You might need to format this
      keyword: "WebServer", // Replace with actual keyword if available
      notebook: "server.xml", // Replace with actual notebook if available
      image: item.owner.avatar_url, // Use the avatar_url from the owner object
    }));
  }, [pageRecord]);

  return (
    <>
      <Content className="page-icons">
        <AppstoreOutlined /> {" | "}
        <BarsOutlined />
      </Content>
      <Table
        rowSelection={{
          type: "checkbox",
        }}
        className="page-table"
        columns={columns}
        dataSource={tableData}
      />
    </>
  );
};
export default ListView;
