import '../home.scss';

import { Row } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import { getGistPublic } from '../../../app-redux/modules/gist/actions/gistActions';
import {
  handleNavSearch,
  selectIsDeleted,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectPublicGist,
} from '../../../app-redux/modules/gist/gistSlice';
import CardSlate from '../../../components/common/BlankSlate/CardSlate';
import NoRecord from '../../../components/common/NoRecord/NoRecord';
import GridCard from './GridSingle';
import PaginationWrap from './Pagination';
import ToggleButtons from './ToggleButtons';

interface GridProps {}
const GridView: React.FC<GridProps> = ({}) => {
  const skeltonData = new Array(12).fill(null);
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const dispatch = useAppDispatch();
  const pageRecord = useAppSelector(selectPublicGist);
  const isDeleted = useAppSelector(selectIsDeleted);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('query') || '';
  React.useEffect(() => {
    search !== ''
      ? dispatch(handleNavSearch(search))
      : !isDeleted && dispatch(getGistPublic({ page, perPage }));
  }, [dispatch, page]);
  return (
    <div data-testid="grid-view">
      <ToggleButtons />
      <Row className="grid-card-content">
        {pageRecord.length > 0 && !isLoading ? (
          pageRecord.map((item: Record<string, any>) => (
            <GridCard item={item} key={item.id} />
          ))
        ) : pageRecord.length === 0 && !isLoading ? (
          <NoRecord key="no-record" />
        ) : (
          skeltonData.map((_, index) => (
            <CardSlate data-testid="loading" key={index} />
          ))
        )}
      </Row>
      {pageRecord.length > 0 && <PaginationWrap />}
    </div>
  );
};
export default GridView;
