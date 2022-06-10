import React, { Component } from 'react';
import AssetList from '../Components/AssetList';
import NavBar from "../Components/NavBar";
import FacetsBar from "../Components/FacetsBar";
import SearchBar from "../Components/SearchBar";
import SearchButton from "../Components/SearchButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


class AssetSearchPage extends Component< {}, {}>  {

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
              <h2>CEDA Asset Search</h2>
              <InputGroup className="mb-3">
                <SearchBar type="asset"/>
                <InputGroup.Append>
                  <SearchButton type="asset"/>
                </InputGroup.Append>
              </InputGroup>
              {window.location.search &&
              <>
                <AssetList/>
              </>
              }
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default (AssetSearchPage);