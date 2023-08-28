import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Avatar,
  Image,
  Button,
  Col,
  Skeleton,
  Pagination,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";
import GistCode from "../../components/common/GistCode";
import { formatTimeDifference } from "../../common/utils/timeUtils";
import ShortProfile from "../../components/common/Profile";
import GistButtons from "../../components/common/GistButtons";
import { useAppDispatch, useAppSelector } from "../../app-redux/hooks";
import {
  handlePageChange,
  selectIsLoading,
  selectMyGist,
  selectPage,
  selectPerPage,
} from "../../app-redux/modules/profile/profileSlice";
import { getMyGist } from "../../app-redux/modules/profile/actions/profileActions";

interface GridProps {}
const SingleCard: React.FC<GridProps> = ({}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const pageRecord = useAppSelector(selectMyGist);
  const skeltonData = new Array(6).fill(null);

  useEffect(() => {
    dispatch(getMyGist({ page, perPage }));
  }, [dispatch, page]);

  const handleClick = (id: string) => {
    history.push(`/gist/${id}`);
  };
  return (
    <Content className="gist-wrap">
      {!isLoading && pageRecord
        ? pageRecord.map((item: any) => {
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
                    <GistButtons gistId={item.id} />
                  </Content>
                  <Content
                    className="git-container"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    <GistCode
                      id={`${item.owner.login}/${item.id}`}
                      file={file}
                    />
                  </Content>
                </Card>
              </Content>
            );
          })
        : skeltonData.map((_, index) => (
            <Skeleton avatar paragraph={{ rows: 4 }} />
          ))}
      <Pagination
        current={page}
        pageSize={perPage}
        total={25}
        onChange={(page: number) => {
          dispatch(handlePageChange(page));
        }}
        showSizeChanger={false}
      />
    </Content>
  );
};
export default SingleCard;
