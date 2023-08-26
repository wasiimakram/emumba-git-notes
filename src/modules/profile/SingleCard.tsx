import React, { useState, useEffect } from "react";
import { Typography, Card, Avatar, Image, Button, Col } from "antd";

import { Content } from "antd/es/layout/layout";
import ReactEmbedGist from "react-embed-gist";
import { useHistory } from "react-router-dom";

import GistCode from "../../components/common/GistCode";
import { formatTimeDifference } from "../../common/utils/timeUtils";
import ShortProfile from "../../components/common/Profile";
import GistButtons from "../../components/common/GistButtons";
import { useAppDispatch, useAppSelector } from "../../app-redux/hooks";
import {
  selectIsLoading,
  selectMyGist,
  selectPage,
  selectPerPage,
} from "../../app-redux/modules/profile/profileSlice";
import { getMyGist } from "../../app-redux/modules/profile/actions/profileActions";
const { Title, Text } = Typography;

interface GridProps {}
const SingleCard: React.FC<GridProps> = ({}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const pageRecord = useAppSelector(selectMyGist);

  useEffect(() => {
    dispatch(getMyGist({ page, perPage }));
  }, []);

  return (
    <>
      {pageRecord ? (
        pageRecord.map((item: any) => {
          const file = Object.keys(item.files)[0];
          return (
            <Content className="gist-wrap">
              <Card>
                <Content className="header">
                  <ShortProfile
                    name={item.owner?.login || ""}
                    avatar={item.owner?.avatar_url || ""}
                    time={formatTimeDifference(item.created_at) || ""}
                    keyword="Web Server"
                    file={item.files ? Object.keys(item.files)[0] || "" : ""}
                  />
                  <GistButtons />
                </Content>
                <Content className="git-container">
                  <GistCode id={`${item.owner.login}/${item.id}`} file={file} />
                </Content>
              </Card>
            </Content>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
export default SingleCard;
