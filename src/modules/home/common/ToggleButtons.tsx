import React from "react";
import { Layout } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import {
  changePageLayout,
  selectPageLayout,
} from "../../../app-redux/modules/gist/gistSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
const { Content } = Layout;

type Props = {};
const ToggleButtons: React.FC = (props: Props) => {
  const layout = useAppSelector(selectPageLayout);
  const dispatch = useAppDispatch();
  const handleChange = (type: string) => {
    dispatch(changePageLayout(type));
  };
  return (
    <Content className="page-icons">
      <AppstoreOutlined
        onClick={() => handleChange("grid")}
        className={layout === "grid" ? "selected" : ""}
      />{" "}
      {" | "}
      <BarsOutlined
        onClick={() => handleChange("listing")}
        className={layout === "listing" ? "selected" : ""}
      />
    </Content>
  );
};
export default ToggleButtons;
