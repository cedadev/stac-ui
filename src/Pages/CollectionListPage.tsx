import React, { Component } from 'react';
import { Collection } from '../types';
import { StateType } from '../state/app.types';
import { connect } from 'react-redux';
import NavBar from "../Components/NavBar";
import BreadCrumb from "../Components/BreadCrumb";
import CollectionList from "../Components/CollectionList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface CollectionsStoreProps {
  collectionList: Collection[];
}

type CollectionsCombinedProps = CollectionsStoreProps;

class CollectionListPage extends Component<(CollectionsCombinedProps), {loading:boolean}>  {

  public render(): React.ReactElement {
      return (
        <>
          <NavBar/>
          <Container>
            <BreadCrumb/>
            <Row>
              <Col>
                {this.props.collectionList !== [] ? (
                    <CollectionList />
                  ) : (
                    <p>No match found</p>
                  )}
              </Col>
            </Row>
          </Container>
        </>
      );
  }
}

const mapStateToProps = (state: StateType): CollectionsStoreProps => {
  return {
    collectionList: state.main.collectionList,
  }
}

export default connect(mapStateToProps, null)(CollectionListPage);