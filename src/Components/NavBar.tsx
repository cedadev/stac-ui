import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import { REACT_APP_STAC_API } from '../config';


class NavBar extends React.Component {

  public render(): React.ReactElement {
    return (
      <Navbar bg="light" expand="lg" variant="light" >
        <Container >
          <Navbar.Brand href="/">CEDA</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/search">Search</Nav.Link>
              <Nav.Link href="/collections">Collections</Nav.Link>
            </Nav>
            <Nav >
              <Nav.Link className='ml-auto' href={`${REACT_APP_STAC_API.slice(0, -1)}${window.location.pathname}`}>As JSON</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default connect()(NavBar);