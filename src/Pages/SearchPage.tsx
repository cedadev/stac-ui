import React, { Component } from 'react';
import ItemList from '../Components/ItemList';
import NavBar from "../Components/NavBar";
import FacetsBar from "../Components/FacetsBar";
import SearchBar from "../Components/SearchBar";
import SearchButton from "../Components/SearchButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


class SearchPage extends Component< {}, {}>  {

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
                <ItemList/>
              </>
              }
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default (SearchPage);