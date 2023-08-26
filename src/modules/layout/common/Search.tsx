import React from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import {
  handleNavSearch,
  selectPage,
  selectPerPage,
} from "../../../app-redux/modules/gist/gistSlice";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import { getGistPublic } from "../../../app-redux/modules/gist/actions/gistActions";

type Props = {};
const SearchInput: React.FC<Props> = () => {
  const { Search } = Input;
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const dispatch = useDispatch();
  const customDispatch = useAppDispatch();

  const fetchData = (text: string) =>
    text === "" && customDispatch(getGistPublic({ page, perPage }));

  const onSearch = (text: string) =>
    text !== "" && dispatch(handleNavSearch(text));

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
