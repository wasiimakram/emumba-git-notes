import React from "react";
import { Button, Image, Space, Layout } from "antd";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";
const { Content } = Layout;
type Data = any;

const Columns = () => [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: string, record: Data) => (
      <Content className="name-cell">
        <Image src={record.image} /> <span>{text}</span>{" "}
      </Content>
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
export default Columns;
