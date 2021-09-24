import React, { Component } from 'react';
import { Collection, Facet, Context } from '../types';
import { StateType } from '../state/app.types';
import { Action, AnyAction} from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { push } from 'connected-react-router';
import { setSearchFacets, setSearchFacetValue, setDatetimeFacet, setBboxFacet } from '../state/actions/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { requestFacets } from '../requests';


interface FacetStoreProps {
  collection?: Collection;
  context?: Context;
  bboxFacet: any;
  datetimeFacet: any;
  searchFacets: any;
}

interface FacetDispatchProps {
  setSearchFacets: (searchFacets: Facet[]) => Action;
  setSearchFacetValue: (id: string, value: any) => Action;
  setBboxFacet: (id: string, value: any) => Action;
  setDatetimeFacet: (id: string, value: any) => Action;
  push: (path: string) => Action;
}

type SearchCombinedProps = FacetStoreProps & FacetDispatchProps;

class FacetBar extends Component<SearchCombinedProps, {}> {

  public async componentDidMount(): Promise<void> {
    // set query and facets from params
    await this.setFacets();
  }

  public setFacets = async (): Promise<void> => {
    const contextCollections = this.props.context?.collections ?  this.props.context.collections.toString() : undefined
    const result = await requestFacets(this.props.collection?.id, contextCollections);
    if (result.success) {
      this.props.setSearchFacets(result.availableFacets);
    }
  };

  private handleBboxFacetChange = async (e: any): Promise<void> => {
    await this.setBboxFacet(e.target.name, e.target.value);
  };
  
  private setBboxFacet = async (name: string, value: number): Promise<void> => {
    this.props.setBboxFacet(name, value);
  };

  private handleStartDatetimeFacetChange = async (date: any): Promise<void> => {
    if (date) {
      await this.setDatetimeFacet('startTime', new Date(date));
    } else {
      await this.setDatetimeFacet('startTime', null);
    }
  };

  private handleEndDatetimeFacetChange = async (date: any): Promise<void> => {
    if (date) {
      await this.setDatetimeFacet('endTime', new Date(date));
    } else {
      await this.setDatetimeFacet('endTime', null);
    }
  };

  private setDatetimeFacet = async (name: string, value: any): Promise<void> => {
    this.props.setDatetimeFacet(name, value);
  };

  private handleSelectFacetChange = async (id: string, selectedOptions: { value:string, label:string }[]) => {
    if (selectedOptions !== []) {
      this.props.setSearchFacetValue(id, selectedOptions.map(option => { return option.value }));
    } else {
      this.props.setSearchFacetValue(id, []);
    };
  }

  private buildFacetBar(): React.ReactElement {
    let buffer = [
      <div key='1'>
        <h3>Facets</h3>
          <h5>Date</h5>
          <Container>
            <Row>
              <Col style={{textAlign:'right', paddingLeft:'5px', paddingRight:'5px'}}>
                <FormLabel>Start Date: </FormLabel>
              </Col>
              <Col>
                <DatePicker name="startTime" isClearable selectsStart autoComplete='off'
                  startDate={this.props.datetimeFacet.startTime} endDate={this.props.datetimeFacet.endTime}
                  selected={this.props.datetimeFacet.startTime} onChange={(date: any) => this.handleStartDatetimeFacetChange(date)} />
              </Col>
            </Row>
            <Row>
              <Col style={{textAlign:'right', paddingLeft:'5px', paddingRight:'5px'}}>
                <FormLabel>End Date: </FormLabel>
              </Col>
              <Col>
                <DatePicker name="endTime" isClearable selectsEnd autoComplete='off' minDate={this.props.datetimeFacet.startTime}
                  startDate={this.props.datetimeFacet.startTime} endDate={this.props.datetimeFacet.endTime}
                  selected={this.props.datetimeFacet.endTime} onChange={(date: any) => this.handleEndDatetimeFacetChange(date)} />
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
                  value={this.props.bboxFacet.northBbox} onChange={this.handleBboxFacetChange}/>
              </Col>
              <Col/>
            </Row>
            <Row>
              <Col xs={{span:5, offset:1}} style={{paddingRight:'0px', paddingLeft:'30px'}}>
                <FormControl type='number' step='.001'
                  min='-180' max='0' placeholder='West' name="westBbox" 
                  value={this.props.bboxFacet.westBbox} onChange={this.handleBboxFacetChange}/>
              </Col>
              <Col xs={5} style={{paddingRight:'30px', paddingLeft:'0px'}}>
                <FormControl type='number' step='.001'
                  min='0' max='180' placeholder='East' name="eastBbox"
                  value={this.props.bboxFacet.eastBbox} onChange={this.handleBboxFacetChange}/>
              </Col>
            </Row>
            <Row>
              <Col/>
              <Col xs={5}>
                <FormControl type='number' step='.001'
                  min='-90' max='0' placeholder='South' name="southBbox"
                  value={this.props.bboxFacet.southBbox} onChange={this.handleBboxFacetChange}/>
              </Col>
              <Col/>
            </Row>
          </Container>
      </div>
    ];

    for (const f of this.props.searchFacets) {
      const options = [];
      const values = [];
      if (f.options) {
        for (const option of f.options) {
          options.push(
            { value:option, label:option }
          );
        };
      }

      if (f.value) {
        for (const value of f.value) {
          values.push(
            { value:value, label:value }
          );
        };
      }
      
      buffer.push(
        <div key={f.id}>
          <br/>
          <Container>
            <h5>{f.title}</h5>
            <Select aria-label={`${f.id} select`} isMulti isClearable name={f.id} value={values}
              options={options} onChange={(e: any) => {this.handleSelectFacetChange(f.id, e)}}/>
          </Container>
        </div>
      ) 
    }

    // compare function to ensure facet list stays in the same order during value changes
    const compare = (a:any, b:any) => {
      if (a.key < b.key) {
        return -1
      } else if (a.key > b.key){
        return 1
      }
      return 0
    }

    return <FormGroup>{buffer.sort(compare)}</FormGroup>;
  }

  public render(): React.ReactElement {
    if (this.props.searchFacets) {
      return <>{this.buildFacetBar()}</>;
    } else {
      return <></>
    }
    
  }
}

const mapStateToProps = (state: StateType): FacetStoreProps => {
    
  return {
    collection: state.main.selectedCollection,
    searchFacets: state.main.searchFacets,
    bboxFacet: state.main.bboxFacet,
    datetimeFacet: state.main.datetimeFacet,
    context: state.main.context,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, null, AnyAction>
): FacetDispatchProps => ({
  setSearchFacets: (searchFacets: Facet[]) =>
    dispatch(setSearchFacets(searchFacets)),
  setSearchFacetValue: (id: string, value: any) =>
    dispatch(setSearchFacetValue(id, value)),
  setBboxFacet: (id: string, value: any) =>
    dispatch(setBboxFacet(id, value)),
  setDatetimeFacet: (id: string, value: any) =>
    dispatch(setDatetimeFacet(id, value)),
  push: (path: string) =>
    dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacetBar);