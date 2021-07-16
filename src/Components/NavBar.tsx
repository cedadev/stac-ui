import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



class NavBar extends React.Component {

  public render(): React.ReactElement {
    return (
      <Navbar bg="light" variant="light" >
        <Container style={{justifyContent: 'unset'}}>
          <Navbar.Brand href="/">CEDA</Navbar.Brand>
            <Nav >
              <Nav.Link href="/">Search</Nav.Link>
              <Nav.Link href="collections">Collections</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default (NavBar);