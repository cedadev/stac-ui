import React from 'react';
import { Context } from '../types';
import { StateType } from '../state/app.types';
import { connect } from 'react-redux';
import queryString from 'query-string';


interface PaginationStoreProps {
  context?: Context;
  limit?: number;
}

type PaginationCombinedProps = PaginationStoreProps;

class Pagination extends React.Component<PaginationCombinedProps, {}> {

  public render(): React.ReactElement {
      let params = queryString.parse(window.location.search);
      // set query and facets from params
      const page = params.page ? Number(params.page): 1;

      delete params['page'];
      let url = "?"      
      for (const [key, value] of Object.entries(params)) {
        url += `${key}=${value}&`
      }

      const max = (this.props.context && this.props.context.matched && this.props.limit) ? Math.ceil(this.props.context?.matched/this.props.limit):10;

      return (
        <nav aria-label="Search results pages">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href={`${url}&page=${page-1}`} tabIndex={-1}>Previous</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href={`${url}&page=${page}`}>{page} <span className="sr-only">(current)</span></a>
            </li>
            <li className={`page-item ${page === max ? 'disabled' : ''}`}>
              <a className="page-link" href={`${url}&page=${page+1}`}>Next</a>
            </li>
          </ul>
        </nav>
      );
  }
}
const mapStateToProps = (state: StateType): PaginationStoreProps => {

  return {
    context: state.main.context,
    limit: state.main.limit
  }
}

export default connect(mapStateToProps, null)(Pagination);