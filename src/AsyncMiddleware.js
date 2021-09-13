import { requestSearchItemsPOST } from './requests';
import queryString from 'query-string';

const asyncFunctionMiddleware = storeAPI => next => action => {
  console.log(action.type)
  if (action.type === 'update_item_list') {
    // Set the item list to display the loading 
    storeAPI.dispatch({ type: 'set_item_list_loading', payload: {isLoading: true} })
    const body = constructPOST(storeAPI.getState().main);
    
    requestSearchItemsPOST(body).then(result => {
      storeAPI.dispatch({ type: 'set_item_list', payload: {itemList: result.itemList} })
      storeAPI.dispatch({ type: 'set_context', payload: {context: result.context} })
    }).catch(error => { 
      storeAPI.dispatch({ type: 'set_item_list_error', payload: {hasError: true} })
    })
    
    storeAPI.dispatch({ type: 'set_item_list_loading', payload: {isLoading: false} })
  } else if (action.type === '@@router/LOCATION_CHANGE') {
    let params = queryString.parse(window.location.search);
    let state = storeAPI.getState().main;
    
    if (params.query && typeof params.query === 'string' && params.query !== state.query) {
      storeAPI.dispatch({ type: 'set_query', payload: {query: params.query} })
    } else if (state.query !== '') {
      storeAPI.dispatch({ type: 'set_query', payload: {query: ''} })
    }

    if (params.page && typeof params.page === 'string' && params.page !== state.page) {
      storeAPI.dispatch({ type: 'set_page', payload: {page: Number(params.page)} })
    } else if (state.page !== 1) {
      storeAPI.dispatch({ type: 'set_page', payload: {page: 1} })
    }

    if (params.bbox && typeof params.bbox === 'string' && params.bbox !== state.bbox) {
      const bboxFacets = params.bbox.split(',');
      const bboxDefaults = ['-180', '-90', '180', '90'];
      var i = 0;
      for (const name of ['westBbox', 'southBbox','eastBbox', 'northBbox']) {
        if (bboxFacets[i] !== bboxDefaults[i]) {
          storeAPI.dispatch({ type: 'set_bbox_facet', payload: {id: name, value: Number(bboxFacets[i])} })
        };        
        i++;
      };
    } else if (state.bbox !== []) {
      // storeAPI.dispatch({ type: 'set_bbox_facet', payload: {id: name, value: Number(bboxFacets[i])} })
    }
  
    if (params.datetime && typeof params.datetime === 'string' && params.datetime !== state.datetime) {
      const datetimeFacet = params.datetime.split(':');
      i = 0;
      for (const name of ['startTime', 'endTime']) {
        if (datetimeFacet[i] !== '..') {
          storeAPI.dispatch({ type: 'set_datetime_facet', payload: {id: name, value: datetimeFacet[i]} })
        };
        i++;
      };
    } else if (state.datetime !== []) {
      // storeAPI.dispatch({ type: 'set_bbox_facet', payload: {id: name, value: Number(bboxFacets[i])} })
    }

    storeAPI.dispatch({ type: 'update_item_list', payload: {updateItemList: true} })
  }
  return next(action)
}

function constructPOST(state) {

  const searchFacets = state.searchFacets;
  const bboxFacet = state.bboxFacet;
  const datetimeFacet = state.datetimeFacet;
  
  const bboxList = [
    `${(bboxFacet.westBbox !== '') ? bboxFacet.westBbox : '-180'}`,
    `${(bboxFacet.southBbox !== '') ? bboxFacet.southBbox : '-90'}`,
    `${(bboxFacet.eastBbox !== '') ? bboxFacet.eastBbox : '180'}`,
    `${(bboxFacet.northBbox !== '') ? bboxFacet.northBbox : '90'}`,
  ];

  const datetimeString = `${('startTime' in datetimeFacet) ? datetimeFacet.startTime:'..'}:${('endTime' in datetimeFacet) ? datetimeFacet.endTime : '..'}`;

  var filter = {};
  for (const facet of searchFacets) {
    if (facet.value !== undefined && facet.value !== []) {
      filter = {
        ...filter,
        [facet.id]: facet.value
      }
    }
  }
 
  const POSTbody = {
    ...(state.selectedCollection && {collections: [state.selectedCollection.id]}),
    ...((bboxList[0] !== '-180' || bboxList[1] !== '-90' || bboxList[2] !== '180' || bboxList[3] !== '90') && {bbox: bboxList}),
    ...(datetimeString !== '..:..' && {datetime: datetimeString}),
    ...(Object.entries(filter).length !== 0 && {filter: filter}),
    ...(state.query && {q: state.query}),
    ...((state.page && state.page !== 1) && {page: state.page}),
  }
  return POSTbody;
};

export default asyncFunctionMiddleware;