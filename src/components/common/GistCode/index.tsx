import React, { useState } from "react";
import { Layout, Typography, Input } from "antd";
import "./index.scss";
import ReactEmbedGist from "react-embed-gist";

interface GistProps {
  id: any;
  file: any;
}
const GistCode: React.FC<GistProps> = ({ id, file }) => {
  return (
    <ReactEmbedGist
      gist={id}
      wrapperClass="gist__bash"
      loadingClass="loading__screen"
      titleClass="gist__title"
      errorClass="gist__error"
      contentClass="gist__content"
      file={file}
    />
  );
};
export default GistCode;
