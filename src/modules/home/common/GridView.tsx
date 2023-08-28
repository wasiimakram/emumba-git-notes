import React, { useState } from "react";
import { Row } from "antd";
import GridCard from "./GridSingle";
import CardSlate from "../../../components/common/BlankSlate/CardSlate";
import PaginationWrap from "./Pagination";
import { useAppDispatch, useAppSelector } from "../../../app-redux/hooks";
import {
  handleNavSearch,
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectPublicGist,
} from "../../../app-redux/modules/gist/gistSlice";
import { getGistPublic } from "../../../app-redux/modules/gist/actions/gistActions";
import ToggleButtons from "./ToggleButtons";
import NoRecord from "../../../components/common/NoRecord/NoRecord";
import { useLocation } from "react-router-dom";
import "./../home.scss";

interface GridProps {}
const GridView: React.FC<GridProps> = ({}) => {
  const skeltonData = new Array(12).fill(null);
  const isLoading = useAppSelector(selectIsLoading);
  const page = useAppSelector(selectPage);
  const perPage = useAppSelector(selectPerPage);
  const dispatch = useAppDispatch();
  const pageRecord = useAppSelector(selectPublicGist);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("query") || "";
  React.useEffect(() => {
    search !== ""
      ? dispatch(handleNavSearch(search))
      : dispatch(getGistPublic({ page, perPage }));
  }, [dispatch, page]);
  return (
    <>
      <ToggleButtons />
      <Row className="grid-card-content">
        {pageRecord.length > 0 && !isLoading ? (
          pageRecord.map((item: Record<string, any>) => (
            <GridCard item={item} />
          ))
        ) : pageRecord.length === 0 && !isLoading ? (
          <NoRecord />
        ) : (
          skeltonData.map((_, index) => <CardSlate />)
        )}
      </Row>
      {pageRecord.length > 0 && <PaginationWrap />}
    </>
  );
};
export default GridView;
