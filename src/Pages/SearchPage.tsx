import React, { Component } from 'react';
import { Item } from '../types';
import { StateType } from '../state/app.types';
import { connect } from 'react-redux';
import ItemList from '../Components/ItemList';
import NavBar from "../Components/NavBar";
import FacetsBar from "../Components/FacetsBar";
import SearchBar from "../Components/SearchBar";
import SearchButton from "../Components/SearchButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


interface SearchStoreProps {
  itemList: Item[];
}

type SearchCombinedProps = SearchStoreProps;

class SearchPage extends Component< (SearchCombinedProps), {}>  {

  public async componentDidMount(): Promise<void> {
  };

  public render(): React.ReactElement {
    return (
      <>
        <NavBar/>
        <Container>
          <Row xs={16}>
            <Col xs={12} sm={4}>
              <br/>
              <FacetsBar/>
            </Col>
            <Col>
              <h2>CEDA Search</h2>
              <InputGroup className="mb-3">
                <SearchBar/>
                <InputGroup.Append>
                  <SearchButton />
                </InputGroup.Append>
              </InputGroup>
              {window.location.search &&
              <>
                {this.props.itemList !== [] ? (
                  <ItemList/>
                ) : (
                  <p>No match found</p>
                )}
              </>
              }
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: StateType): SearchStoreProps => {
  return {
    itemList: state.main.itemList,
  }
}

export default connect(mapStateToProps, null)(SearchPage);