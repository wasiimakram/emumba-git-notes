import React, { useState } from 'react';
import { Row } from 'antd';
import GridCard from './GridSingle';
import CardSlate from '../../../components/common/BlankSlate/CardSlate';
import PaginationWrap from './Pagination';
import { useAppDispatch, useAppSelector } from '../../../app-redux/hooks';
import {
  handleNavSearch,
  selectIsDeleted,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectPublicGist,
} from '../../../app-redux/modules/gist/gistSlice';
import { getGistPublic } from '../../../app-redux/modules/gist/actions/gistActions';
import ToggleButtons from './ToggleButtons';
import NoRecord from '../../../components/common/NoRecord/NoRecord';
import { useLocation } from 'react-router-dom';
import './../home.scss';
import { useHome } from '../../../data/home/useHome';

interface GridProps {}
const GridView: React.FC<GridProps> = ({}) => {
  const skeltonData = new Array(12).fill(null);
  // const isLoading = useAppSelector(selectIsLoading);
  // const page = useAppSelector(selectPage);
  // const perPage = useAppSelector(selectPerPage);
  // const dispatch = useAppDispatch();
  // const isDeleted = useAppSelector(selectIsDeleted);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('query') || '';
  // const pageRecord = useAppSelector(selectPublicGist);
  const pageRecord = useHome();
  console.log('pageRecord', pageRecord);
  // React.useEffect(() => {
  //   search !== ''
  //     ? dispatch(handleNavSearch(search))
  //     : !isDeleted && dispatch(getGistPublic({ page, perPage }));
  // }, [dispatch, page]);
  return (
    <div data-testid="grid-view">
      {/* <ToggleButtons />
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
      </Row> */}
      {/* {pageRecord.length > 0 && <PaginationWrap />} */}
    </div>
  );
};
export default GridView;
