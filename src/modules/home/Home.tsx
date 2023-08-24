import React, { useState, useEffect } from "react";
import { Layout, Typography, Table } from "antd";
import ListView from "./common/ListView";
import "./home.scss";
import GridView from "./common/GridView";
import { getGistPublic } from "../../app-redux/modules/gist/actions/gistActions";
import { useAppDispatch, useAppSelector } from "../../app-redux/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app-redux/store";
import { selectPublicGist } from "../../app-redux/modules/gist/gistSlice";

const Home: React.FC = () => {
  return (
    <Layout className="home-main-wrap">
      <ListView />
      {/* <GridView /> */}
    </Layout>
  );
};
export default Home;
