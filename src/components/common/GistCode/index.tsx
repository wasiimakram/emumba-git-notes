import './index.scss';

import React from 'react';
import ReactEmbedGist from 'react-embed-gist';

import type { GistProps } from '../../../common/typings/app';

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
