import React from 'react';
import { Input } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

type Props = {};
const SearchInput: React.FC<Props> = () => {
  const { Search } = Input;
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fetchData = (text: string) => {
    if (text === '') {
      queryParams.delete('query');
    }
  };
  const onSearch = (text: string) => {
    history.push(`/?query=${text}`);
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
