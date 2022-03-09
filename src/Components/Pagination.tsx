import React from 'react';
import { Context } from '../types';
import { StateType } from '../state/app.types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {Pagination as ReactPagination} from 'react-bootstrap';


interface PaginationStoreProps {
  context?: Context;
  page?: number;
}

type PaginationCombinedProps = PaginationStoreProps;

class Pagination extends React.Component<PaginationCombinedProps, {}> {

  public render(): React.ReactElement {
      let params = queryString.parse(window.location.search);
      // set query and facets from params
      const page = this.props.page ? Number(this.props.page): 1;

      delete params['page'];
      let url = "?"      
      for (const [key, value] of Object.entries(params)) {
        url += `${key}=${value}&`
      }
      console.log(this.props.context)
      const max = (this.props.context && this.props.context.matched && this.props.context.limit) ? Math.ceil(this.props.context.matched/this.props.context.limit): undefined;
      console.log(max)
      return (
        <ReactPagination>
          <ReactPagination.Item className={`${page === 1 ? 'disabled' : ''}`} href={`${url}page=${page-1}`} tabIndex={-1} >Previous</ReactPagination.Item>
          <ReactPagination.Item active href={`${url}&page=${page}`}>{page} <span className="sr-only">(current)</span></ReactPagination.Item>
          <ReactPagination.Item className={`${max && page >= max ? 'disabled' : ''}`} href={`${url}page=${page+1}`} >Next</ReactPagination.Item>
        </ReactPagination>
      );
  }
}
const mapStateToProps = (state: StateType): PaginationStoreProps => {

  return {
    context: state.main.context,
    page: state.main.page,
  }
}

export default connect(mapStateToProps, null)(Pagination);