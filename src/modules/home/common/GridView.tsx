import React, { useState } from 'react';
import { Row } from 'antd';
import GridCard from './GridSingle';
import CardSlate from '../../../components/common/BlankSlate/CardSlate';
import PaginationWrap from './Pagination';

import NoRecord from '../../../components/common/NoRecord/NoRecord';
import { useLocation } from 'react-router-dom';
import './../home.scss';
import { useHome } from '../../../data/home/useHome';
import ToggleButtons from './ToggleButtons';
import { useStarGists } from '../../../data/gist/useGist';

interface GridProps {
  onLayout: (value: string) => void;
  layout: string;
}
const GridView: React.FC<GridProps> = ({ onLayout, layout }) => {
  const skeltonData = new Array(12).fill(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('query') || '';

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const handleNext = () => {
    setPage((old) => old + 1);
  };

  const { data, isFetching } = useHome(page, perPage); // Data Fetch
  useStarGists(); // Data Fetch
  const pageRecord =
    search !== ''
      ? data.filter((item: any) =>
          item.id.toLowerCase().includes(search.toLowerCase())
        )
      : data;

  return (
    <div data-testid="grid-view">
      <ToggleButtons onLayout={onLayout} layout={layout} />
      <Row className="grid-card-content">
        {pageRecord && pageRecord.length > 0 && !isFetching ? (
          pageRecord.map((item: Record<string, any>) => (
            <GridCard item={item} key={item.id} />
          ))
        ) : pageRecord && pageRecord.length === 0 && !isFetching ? (
          <NoRecord key="no-record" />
        ) : (
          skeltonData.map((_, index) => (
            <CardSlate data-testid="loading" key={index} />
          ))
        )}
      </Row>
      {pageRecord && pageRecord.length > 0 && (
        <PaginationWrap onNext={handleNext} page={page} />
      )}
    </div>
  );
};
export default GridView;
