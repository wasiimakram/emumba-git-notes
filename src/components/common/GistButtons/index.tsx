import React, { useState } from "react";
import { Layout, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ForkOutlined,
  StarFilled,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import "./index.scss";
import isUserLoggedIn from "../../../common/utils/auth";
import {
  forkGist,
  starGist,
} from "../../../app-redux/modules/gist/actions/gistActions";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import { useHistory, useParams } from "react-router-dom";
import {
  selectIsForked,
  selectIsStarred,
} from "../../../app-redux/modules/gist/gistSlice";

const { Content } = Layout;
const { Text } = Typography;

const GistButtons: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isStarred = useAppSelector(selectIsStarred);
  const isForked = useAppSelector(selectIsForked);
  const forkCount = useAppSelector((state) => state.gist.forkCount);
  const starCount = useAppSelector((state) => state.gist.starCount);
  const hadleEdit = () => {
    history.push(`/edit/${id}`);
  };
  return (
    <Content className="icons">
      {isUserLoggedIn() && (
        <>
          <Text className="wrap" onClick={hadleEdit}>
            <EditOutlined /> <Text>Edit</Text>
          </Text>
          <Text className="wrap">
            <DeleteOutlined /> <Text>Delete</Text>
          </Text>
        </>
      )}
      <Text className="wrap">
        <Text onClick={() => dispatch(starGist({ id }))}>
          {isStarred ? (
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
        <Text onClick={() => dispatch(forkGist({ id }))}>
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
