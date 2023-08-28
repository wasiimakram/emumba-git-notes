import React, { useState } from "react";
import { Layout, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ForkOutlined,
  StarFilled,
  StarTwoTone,
} from "@ant-design/icons";
import "./index.scss";
import isUserLoggedIn from "../../../common/utils/auth";
import {
  deleteGist,
  forkGist,
  starGist,
} from "../../../app-redux/modules/gist/actions/gistActions";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteGistValue,
  selectForkCount,
  selectIsForked,
  selectIsStarred,
  selectIsStarredArr,
  selectStarCount,
} from "../../../app-redux/modules/gist/gistSlice";
import { getMyGist } from "../../../app-redux/modules/profile/actions/profileActions";
import {
  selectPage,
  selectPerPage,
} from "../../../app-redux/modules/gist/gistSlice";

const { Content } = Layout;
const { Text } = Typography;
interface GistProps {
  gistId?: string;
}
const GistButtons: React.FC<GistProps> = ({ gistId }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isForked = useAppSelector(selectIsForked);
  const forkCount = useAppSelector(selectForkCount);
  const starCount = useAppSelector(selectStarCount);
  const isStaredArr = useAppSelector(selectIsStarredArr);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const pageId = id ?? gistId;

  const hadleEdit = () => {
    history.push(`/edit/${pageId}`);
  };
  const handleDelete = async () => {
    // dispatch(deleteGistValue(pageId));
    dispatch(deleteGist({ id: pageId }));
    await dispatch(getMyGist({ page, perPage }));
  };
  return (
    <Content className="icons">
      {isUserLoggedIn() && (
        <>
          <Text className="wrap" onClick={hadleEdit}>
            <EditOutlined /> <Text>Edit</Text>
          </Text>
          <Text className="wrap" onClick={handleDelete}>
            <DeleteOutlined /> <Text>Delete</Text>
          </Text>
        </>
      )}
      <Text className="wrap">
        <Text onClick={() => dispatch(starGist({ id: pageId }))}>
          {isStaredArr.includes(pageId) ? (
            <>
              <StarFilled /> Unstar
            </>
          ) : (
            <>
              <StarTwoTone /> Star
            </>
          )}
        </Text>
        <Text className="counter">{starCount}</Text>
      </Text>
      <Text className="wrap">
        <Text onClick={() => dispatch(forkGist({ id: pageId }))}>
          {isForked ? (
            <>
              <ForkOutlined /> Unfork
            </>
          ) : (
            <>
              <ForkOutlined /> Fork
            </>
          )}
        </Text>
        <Text className="counter">{forkCount}</Text>
      </Text>
    </Content>
  );
};
export default GistButtons;
