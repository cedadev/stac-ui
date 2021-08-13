import React from 'react';
import { StateType } from '../state/app.types';
import { connect } from 'react-redux';
import { Action, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setPage, setMaxPage, setPageUrl } from '../state/actions/actions';
import queryString from 'query-string';


interface PaginationStoreProps {
  page?: number;
  url?: string;
  max?: number;
}

interface PaginationDispatchProps {
  setPage: (page: number) => Action;
  setMaxPage: (page: number) => Action;
  setPageUrl: (url: string) => Action;
}

type PaginationCombinedProps = PaginationStoreProps & PaginationDispatchProps;

class Pagination extends React.Component<PaginationCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    let params = queryString.parse(window.location.search);
    const base_url = `${window.location.protocol}//${window.location.host}/`;
    // set query and facets from params
    await this.setPage(Number(params.page));
    await this.setMaxPage(Number(10));
    await this.setPageUrl(params);
  };

  public setPage = async (page: number): Promise<void> => {
    if (page) {
      this.props.setPage(page);
    } else {
      this.props.setPage(1);
    }
  };

  public setMaxPage = async (page: number): Promise<void> => {
    this.props.setMaxPage(page);
  };

  public setPageUrl = async (params: any): Promise<void> => {
    let url = "?"
    delete params['page'];
    for (const [key, value] of Object.entries(params)) {
      url += `${key}=${value}&`
    }
    this.props.setPageUrl(url);
  };

  public render(): React.ReactElement {
    if (this.props.page && this.props.url && this.props.max) {
      return (
        <nav aria-label="Search results pages">
          <ul className="pagination">
            <li className={`page-item ${this.props.page === 1 ? 'disabled' : ''}`}>
              <a className="page-link" href={`${this.props.url}${`page=${this.props.page - 1}`}`} tabIndex={-1}>Previous</a>
            </li>
            {this.props.page === this.props.max &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page - 4}`}`}>{this.props.page - 4}</a>
              </li>
            }
            {this.props.page >= this.props.max - 1 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page - 3}`}`}>{this.props.page - 3}</a>
              </li>
            }
            {this.props.page >= 3 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page - 2}`}`}>{this.props.page - 2}</a>
              </li>
            }
            {this.props.page >= 2 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page - 1}`}`}>{this.props.page - 1}</a>
              </li>
            }
            <li className="page-item active">
              <a className="page-link" href={`${this.props.url}${`page=${this.props.page}`}`}>{this.props.page} <span className="sr-only">(current)</span></a>
            </li>
            {this.props.page <= this.props.max - 1 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page + 1}`}`}>{this.props.page + 1}</a>
              </li>
            }
            {this.props.page <= this.props.max - 2 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page + 2}`}`}>{this.props.page + 2}</a>
              </li>
            }
            {this.props.page <= 2 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page + 3}`}`}>{this.props.page + 3}</a>
              </li>
            }
            {this.props.page === 1 &&
              <li className="page-item">
                <a className="page-link" href={`${this.props.url}${`page=${this.props.page + 4}`}`}>{this.props.page + 4}</a>
              </li>
            }
            <li className="page-item">
              <a className="page-link" href={`${this.props.url}${`page=${this.props.page + 1}`}`}>Next</a>
            </li>
          </ul>
        </nav>
      );
    } else {
      return <></>
    }
  }
}
const mapStateToProps = (state: StateType): PaginationStoreProps => {

  return {
    page: state.main.page,
    url: state.main.pageUrl,
    max: state.main.maxPage,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): PaginationDispatchProps => ({
  setPage: (page: number) =>
    dispatch(setPage(page)),
  setMaxPage: (page: number) =>
    dispatch(setMaxPage(page)),
  setPageUrl: (url: string) =>
    dispatch(setPageUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);