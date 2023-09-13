import { Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import { getGistPublic } from '../../../app-redux/modules/gist/actions/gistActions';
import {
  handleNavSearch,
  selectPage,
  selectPerPage,
} from '../../../app-redux/modules/gist/gistSlice';

type Props = {};
const SearchInput: React.FC<Props> = () => {
  const { Search } = Input;
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const dispatch = useDispatch();
  const customDispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fetchData = (text: string) => {
    if (text === '') {
      queryParams.delete('query');
      customDispatch(getGistPublic({ page, perPage }));
    }
  };

  const onSearch = (text: string) => {
    history.push(`/?query=${text}`);
    text !== '' && dispatch(handleNavSearch(text));
  };

  return (
    <Search
      className="nav-search"
      placeholder="Search Notes..."
      onSearch={onSearch}
      onChange={(event) => {
        fetchData(event.target.value);
      }}
    />
  );
};

export default SearchInput;
