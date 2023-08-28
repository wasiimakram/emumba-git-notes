import React, { useState, useEffect } from "react";
import { Layout, Typography, Table, Button, Skeleton } from "antd";
import ShortProfile from "../../../components/common/Profile";
import GistButtons from "../../../components/common/GistButtons";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useParams } from "react-router-dom";
import {
  getGistDetails,
  updateGistContent,
} from "../../../app-redux/modules/gist/actions/gistActions";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import {
  selectGistDetails,
  selectIsLoading,
} from "../../../app-redux/modules/gist/gistSlice";
import { formatTimeDifference } from "../../../common/utils/timeUtils";
import "./../gist.scss";

const { Content } = Layout;

const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGistDetails({ id }));
  }, [dispatch, id]);
  const data = useAppSelector(selectGistDetails);
  const isLoading = useAppSelector(selectIsLoading);
  const [editCode, setEditCode] = useState<string>("");

  useEffect(() => {
    if (data) {
      const newInitialContent =
        data?.files?.[Object.keys(data.files)[0]]?.content || "";
      setEditCode(newInitialContent);
    }
  }, [data]);

  const onChange = (value: string) => {
    setEditCode(value);
  };
  const updateContent = () => {
    const updatedContent = {
      gist_id: data.id,
      description: data?.description,
      files: {
        [Object.keys(data.files)[0]]: {
          content: editCode,
        },
      },
    };
    dispatch(updateGistContent({ id, updatedContent }));
  };
  return !isLoading && data ? (
    <Content className="ant-container">
      <Layout className="gist-main-wrap">
        <Content className="intro-wrap edit-wrap">
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
          <AceEditor
            setOptions={{ useWorker: false }}
            value={editCode}
            mode="javascript"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            highlightActiveLine={true}
          />
        </Content>
      </Layout>
      <Button
        className="add-button edit-button"
        onClick={() => updateContent()}
        loading={isLoading}
      >
        Update Code
      </Button>
    </Content>
  ) : (
    <Content className="ant-container">
      <Skeleton className="edit-page-sk" avatar paragraph={{ rows: 10 }} />
    </Content>
  );
};
export default Edit;
