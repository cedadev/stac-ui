import { store } from '../App';

function constructUrl(): string {
  const state = store.getState().main;
  const bboxFacet = state.bboxFacet;
  const datetimeFacet = state.datetimeFacet;
  
  const bboxString = `${(bboxFacet.westBbox !== '') ? bboxFacet.westBbox : '-180'},\
${(bboxFacet.southBbox !== '') ? bboxFacet.southBbox : '-90'},\
${(bboxFacet.eastBbox !== '') ? bboxFacet.eastBbox : '180'},\
${(bboxFacet.northBbox !== '') ? bboxFacet.northBbox : '90'}`;


  const datetimeString = `${(datetimeFacet.startTime) ? datetimeFacet.startTime.toISOString() : '..'}/${(datetimeFacet.endTime) ? datetimeFacet.endTime.toISOString() : '..'}`;
    
  const filters = [];
  for (const facet of state.searchFacets) {
    if (facet.value !== undefined && facet.value.length >= 1) {
      filters.push(`${facet.id}=${JSON.stringify(facet.value)}`);
    }
  };

  const url = `?\
${`q=${state.query ? state.query:''}`}\
${(datetimeString !== '..:..') ? `&datetime=${datetimeString}`:''}\
${(bboxString !== '-180,-90,180,90') ? `&bbox=${bboxString}`:''}\
${`${state.page && state.page !== 1 ? `&page=${state.page}`:''}`}\
${`${state.collection ? `&collections=${state.collection.id}`:''}`}\
${`${filters.length !== 0 ? `&filters=${filters.join('AND')}`:''}`}`;
  
  return url;
};

export default constructUrl;
