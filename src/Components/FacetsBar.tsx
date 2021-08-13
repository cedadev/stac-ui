import React, { Component } from 'react';
import { Collection, Facet } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setSelectedFacet, setAvailableFacets, setDatetimeFacet, setBboxFacet } from '../state/actions/actions';
import { requestFacets } from '../requests';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Select from 'react-select';

interface FacetStoreProps {
  collection?: Collection;
  availableFacets: Facet[];
  selectedFacets: any;
  bboxFacet: any;
  datetimeFacet: any;
}

interface FacetDispatchProps {
  setAvailableFacets: (availableFacets: Facet[]) => Action;
  setSelectedFacet: (selectedFacet: string, facetValue: any) => Action;
  setBboxFacet: (selectedFacet: string, facetValue: any) => Action;
  setDatetimeFacet: (selectedFacet: string, facetValue: any) => Action;
  push: (path: string) => Action;
}

type SearchCombinedProps = FacetStoreProps & FacetDispatchProps;

class FacetBar extends Component<SearchCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    // set query and facets from params
    await this.setFacets();
  }

  public setFacets = async (): Promise<void> => {
    
    const result = await requestFacets(this.props.collection?.id);
    if (result.success) {
      this.props.setAvailableFacets(result.availableFacets);
    }
  };

  private handleFacetChange = async (e: any): Promise<void> => {
    if (e.target.name in ['northBbox', 'southBbox', 'eastBbox', 'westBbox']) {
      this.props.setBboxFacet(e.target.name, e.target.value);
    } else if (e.target.name in ['startTime', 'endTime']) {
      this.props.setDatetimeFacet(e.target.name, e.target.value);
    }
    
    console.log(this.props)
  };

  private handleSelectFacetChange = async (id: string, selectedOptions: { value:string, label:string }[]) => {
    console.log(id);
    console.log(selectedOptions);
    if (selectedOptions !== []) {
      this.props.setSelectedFacet(id, selectedOptions.map(option => { return option.value}));
    } else {
      this.props.setSelectedFacet(id, []);
    }
    console.log(this.props)    
  }

  private buildFacetBar(): React.ReactElement {
    let buffer = []
    buffer.push(
        <>
          <h3>Facets</h3>
            <h5>Date</h5>
            <Container>
              <Row>
                <Col style={{textAlign:'right', paddingLeft:'5px', paddingRight:'5px'}}>
                  <FormLabel>Start Date: </FormLabel>
                </Col>
                <Col>
                  <FormControl type="date" name="startTime" max="3000-12-31" 
                    min="1000-01-01" value={this.props.datetimeFacet.startTime} onChange={this.handleFacetChange} />
                </Col>
              </Row>
              <Row>
                <Col style={{textAlign:'right', paddingLeft:'5px', paddingRight:'5px'}}>
                  <FormLabel>End Date: </FormLabel>
                </Col>
                <Col>
                  <FormControl type="date" name="endTime" max="3000-12-31" 
                    min="1000-01-01" value={this.props.datetimeFacet.endTime} onChange={this.handleFacetChange} />
                </Col>
              </Row>
            </Container>
            <br/>
            <h5>Bbox</h5>
            <Container style={{alignItems:'centre'}}>
              <Row>
                <Col/>
                <Col xs={5}>
                  <FormControl type='number' step='.001'
                    min='0' max='90' placeholder='North' name="northBbox" 
                    value={this.props.bboxFacet.northBbox} onChange={this.handleFacetChange}/>
                </Col>
                <Col/>
              </Row>
              <Row>
                <Col xs={5} style={{paddingRight:'20px'}}>
                  <FormControl type='number' step='.001'
                    min='-180' max='0' placeholder='West' name="westBbox" 
                    value={this.props.bboxFacet.westBbox} onChange={this.handleFacetChange}/>
                </Col>
                <Col/>
                <Col xs={5} style={{paddingLeft:'20px'}}>
                  <FormControl type='number' step='.001'
                    min='0' max='180' placeholder='East' name="eastBbox"
                    value={this.props.bboxFacet.eastBbox} onChange={this.handleFacetChange}/>
                </Col>
              </Row>
              <Row>
                <Col/>
                <Col xs={5}>
                  <FormControl type='number' step='.001'
                    min='-90' max='0' placeholder='South' name="southBbox"
                    value={this.props.bboxFacet.southBbox} onChange={this.handleFacetChange}/>
                </Col>
                <Col/>
              </Row>
            </Container>
        </>
      );

      for (const key in this.props.availableFacets) {
        const f = this.props.availableFacets[key];
        const options = [];
        if (f.options) {
          for (const option of f.options) {
            options.push(
              { value:option, label:option }
            );
          };
        }
        
        buffer.push(
        <>
          <br/>
          <Container>
            <h5>{f.title}</h5>
            <Select aria-label={`${f.id} select`} isMulti isClearable name={f.id} 
              options={options} onChange={(e: any) => {this.handleSelectFacetChange(f.id, e)}}/>
          </Container>
        </>
      ) 
    }

    return <FormGroup>{buffer}</FormGroup>;
  }

  public render(): React.ReactElement {
    return <>{this.buildFacetBar()}</>;
  }
}

const mapStateToProps = (state: StateType): FacetStoreProps => {
    
  return {
    collection: state.main.selectedCollection,
    availableFacets: state.main.availableFacets,
    selectedFacets: state.main.selectedFacets,
    bboxFacet: state.main.bboxFacet,
    datetimeFacet: state.main.datetimeFacet,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): FacetDispatchProps => ({
  setAvailableFacets: (availableFacets: Facet[]) =>
    dispatch(setAvailableFacets(availableFacets)),
  setSelectedFacet: (selectedFacet: string, facetValue: any) =>
    dispatch(setSelectedFacet(selectedFacet, facetValue)),
  setBboxFacet: (selectedFacet: string, facetValue: any) =>
    dispatch(setBboxFacet(selectedFacet, facetValue)),
  setDatetimeFacet: (selectedFacet: string, facetValue: any) =>
    dispatch(setDatetimeFacet(selectedFacet, facetValue)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetBar);