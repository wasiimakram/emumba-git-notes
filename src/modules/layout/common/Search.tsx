import React from "react";
import isUserLoggedIn from "../../../common/utils/auth";
import { Button, Dropdown, Input, Layout } from "antd";
import { items } from "../../../common/utils/common";

type Props = {};
const SearchInput: React.FC<Props> = () => {
  const { Search } = Input;
  const onSearch = (text: string) => {
    console.log(text);
  };
  return (
    <Search
      className="nav-search"
      placeholder="Search Notes..."
      onSearch={onSearch}
    />
  );
};

export default SearchInput;
