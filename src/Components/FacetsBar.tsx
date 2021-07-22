import React from 'react';
import { Facet } from '../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface Props {
    facets: Facet[];
    handleChange: (e: any) => void;
}

class FacetBar extends React.Component<Props, {}> {

  private buildFacetBar(): React.ReactElement {
    const FacetBar = (
        <>
          <h3>Facets</h3>
            <h5>Date</h5>
            <Container>
              <Row>
                <Col style={{textAlign:'right'}}>
                  <label>Start Date: </label>
                </Col>
                <Col>
                  <input type="date" name="startDate" max="3000-12-31" 
                    min="1000-01-01" onChange={this.props.handleChange} />
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign:'right'}}>
                  <label >End Date: </label>
                </Col>
                <Col>
                  <input type="date" name="startDate" max="3000-12-31" 
                    min="1000-01-01" onChange={this.props.handleChange} />
                </Col>
              </Row>
            </Container>
            <br/>
            <h5>Bbox</h5>
            <Container>
              <Row>
              <Col style={{width:'33%'}}/>
                <Col style={{width:'33%'}}><input type='number' step='.0001' style={{width:'100%'}} min='0' max='90' placeholder='North' name="northBbox"/></Col>
                <Col style={{width:'33%'}}/>
              </Row>
              <Row>
                <Col style={{width:'33%'}}><input type='number' step='.0001' style={{width:'100%'}} min='0' max='180' placeholder='East' name="eastBbox"/></Col>
                <Col style={{width:'33%'}}/>
                <Col style={{width:'33%'}}><input type='number' step='.0001' style={{width:'100%'}} min='-180' max='0' placeholder='West' name="westBbox"/></Col>
              </Row>
              <Row>
                <Col style={{width:'33%'}}/>
                <Col style={{width:'33%'}}><input type='number' step='.0001' style={{width:'100%'}} min='-90' max='0' placeholder='South' name="southBbox"/></Col>
                <Col style={{width:'33%'}}/>
              </Row>
            </Container>
        </>
      );

    return FacetBar;
  }

  public render(): React.ReactElement {
    return <>{this.buildFacetBar()}</>;
  }
}

export default (FacetBar);