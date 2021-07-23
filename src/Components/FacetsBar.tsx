import React, { Component } from 'react';
import { Facet } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setSelectedFacet, setAvailableFacets } from '../state/actions/actions';
import { requestFacets } from '../requests';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


interface FacetProps {
  url_query: string;
}

interface FacetStoreProps {
  availableFacets: Facet[];
  selectedFacets: {};
}

interface FacetDispatchProps {
  setAvailableFacets: (availableFacets: Facet[]) => Action;
  setSelectedFacet: (selectedFacet: string, facetValue: any) => Action;
  push: (path: string) => Action;
}

type SearchCombinedProps = FacetProps & FacetStoreProps & FacetDispatchProps;

class FacetBar extends Component<SearchCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    // set query and facets from params
    await this.setFacets();
  }

  public setFacets = async (): Promise<void> => {
    
    const result = await requestFacets();
    if (result.success) {
    //   await this.props.setAvailableFacets(result.Facets);
    }
  };

  private handleFacetChange = async (e: any): Promise<void> => {
    console.log(e)
    this.props.setSelectedFacet(e.target.name, e.target.value);
    console.group(this.props.selectedFacets)
  };

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
                    min="1000-01-01" onChange={this.handleFacetChange} />
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign:'right'}}>
                  <label >End Date: </label>
                </Col>
                <Col>
                  <input type="date" name="endDate" max="3000-12-31" 
                    min="1000-01-01" onChange={this.handleFacetChange} />
                </Col>
              </Row>
            </Container>
            <br/>
            <h5>Bbox</h5>
            <Container>
              <Row>
              <Col style={{width:'33%'}}/>
                <Col style={{width:'33%'}}>
                  <input type='number' step='.0001' style={{width:'100%'}} min='0' max='90' placeholder='North' name="northBbox" onChange={this.handleFacetChange}/>
                </Col>
                <Col style={{width:'33%'}}/>
              </Row>
              <Row>
                <Col style={{width:'33%'}}>
                  <input type='number' step='.0001' style={{width:'100%'}} min='0' max='180' placeholder='East' name="eastBbox" onChange={this.handleFacetChange}/>
                </Col>
                <Col style={{width:'33%'}}/>
                <Col style={{width:'33%'}}>
                  <input type='number' step='.0001' style={{width:'100%'}} min='-180' max='0' placeholder='West' name="westBbox" onChange={this.handleFacetChange}/>
                </Col>
              </Row>
              <Row>
                <Col style={{width:'33%'}}/>
                <Col style={{width:'33%'}}>
                  <input type='number' step='.0001' style={{width:'100%'}} min='-90' max='0' placeholder='South' name="southBbox" onChange={this.handleFacetChange}/>
                </Col>
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

const mapStateToProps = (state: StateType): FacetStoreProps => {
    
  return {
    availableFacets: state.main.availableFacets,
    selectedFacets: state.main.selectedFacets,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): FacetDispatchProps => ({
  setAvailableFacets: (availableFacets: Facet[]) =>
    dispatch(setAvailableFacets(availableFacets)),
  setSelectedFacet: (selectedFacet: string, facetValue: any) =>
    dispatch(setSelectedFacet(selectedFacet, facetValue)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetBar);