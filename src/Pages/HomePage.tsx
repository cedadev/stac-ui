import React, { Component } from 'react';
import { Facet } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push, replace } from 'connected-react-router';
import { setQuery, setAvailableFacets, setSelectedFacet } from '../state/actions/actions';
import { requestFacets } from '../requests';
import FacetsBar from "../Components/FacetsBar";
import SearchBar from "../Components/SearchBar";
import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface HomeStoreProps {
  query: string;
  availableFacets: Facet[];
  selectedFacets: {};
}

interface HomeDispatchProps {
  setQuery: (query: string) => Action;
  push: (path: string) => Action;
  replace: (path: string) => Action;
}


class HomePage extends Component<(HomeStoreProps & HomeDispatchProps), {history: any}>  {

  public async componentDidMount(): Promise<void> {
    await this.getFacets();
    console.log("query params: ", this.props);
  }

  public getFacets = async (): Promise<void> => {
    const result = await requestFacets();
    if (result.success) {
    //   this.props.setAvailableFacets(result.Facets);
    }
  };

  public handleSearch = async (e: any): Promise<void> => {
    this.props.push(`/search/q=${this.props.query}&facets=${JSON.stringify(this.props.selectedFacets)}`);
  };

  private handleQueryChange = async (e: any): Promise<void> => {
    this.props.setQuery(e.target.value);
  };

  private handleDateChange = async (e: any): Promise<void> => {
    console.log(e)
    if (e.target.id === 'startDate') {
      // this.props.setStartDate(event.target.value);
    } else {
      // this.props.setEndDate(event.target.value);
    }
  };

  public render(): React.ReactElement {
    return (
      <>
        <NavBar/>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <br/>
              <FacetsBar url_query=''/>
            </Col>
            <Col>
              <SearchBar handleSearch={this.handleSearch} handleQueryChange={this.handleQueryChange}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: StateType): HomeStoreProps => {
  return {
    query: state.main.query,
    availableFacets: state.main.availableFacets,
    selectedFacets: state.main.selectedFacets,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): HomeDispatchProps => ({
  setQuery: (query: string) =>
    dispatch(setQuery(query)),
  push: (path: string) =>
    dispatch(push(path)),
  replace: (path: string) =>
    dispatch(replace(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);