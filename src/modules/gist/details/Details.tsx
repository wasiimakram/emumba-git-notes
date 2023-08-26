import React, { useState } from "react";
import { Layout, Typography, Table, Skeleton } from "antd";
import "./../gist.scss";
import { ForkOutlined, StarOutlined } from "@ant-design/icons";
import ShortProfile from "../../../components/common/Profile";
import ReactEmbedGist from "react-embed-gist";
import GistButtons from "../../../components/common/GistButtons";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import { getGistDetails } from "../../../app-redux/modules/gist/actions/gistActions";
import {
  selectGistDetails,
  selectIsLoading,
} from "../../../app-redux/modules/gist/gistSlice";
import GistCode from "../../../components/common/GistCode";
import { formatTimeDifference } from "../../../common/utils/timeUtils";

const { Content } = Layout;
const { Title, Text } = Typography;

const Details: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    dispatch(getGistDetails({ id }));
  }, [dispatch, id]);

  const data = useAppSelector(selectGistDetails);
  const isLoading = useAppSelector(selectIsLoading);

  let contentToRender;

  if (!isLoading && data) {
    contentToRender = (
      <>
        <Content className="ant-container">
          <Content className="intro-wrap">
            <ShortProfile
              name={data.owner?.login || ""}
              avatar={data.owner?.avatar_url || ""}
              time={formatTimeDifference(data.created_at) || ""}
              keyword="Web Server"
              file={data.files ? Object.keys(data.files)[0] || "" : ""}
            />
            <GistButtons />
          </Content>
          <Content className="code-view">
            <GistCode
              id={`${data.owner && data?.owner?.login}/${data && data?.id}`}
              file={data.files && Object.keys(data?.files)[0]}
            />
          </Content>
        </Content>
      </>
    );
  } else {
    contentToRender = (
      <Content className="ant-container">
        <Skeleton avatar paragraph={{ rows: 10 }} />
      </Content>
    );
  }

  return <Layout className="gist-main-wrap">{contentToRender}</Layout>;
};
export default Details;
