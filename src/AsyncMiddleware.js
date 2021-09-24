import { requestSearchItemsPOST } from './requests';
import queryString from 'query-string';

const asyncFunctionMiddleware = storeAPI => next => action => {
  console.log(action.type)
  if (action.type === 'update_item_list') {
    // Set the item list to display loading 
    storeAPI.dispatch({ type: 'set_item_list_loading', payload: {isLoading: true} })
    const body = constructPOST(storeAPI.getState().main);
    
    requestSearchItemsPOST(body).then(result => {
      if (result.success) {
        storeAPI.dispatch({ type: 'set_item_list', payload: {itemList: result.itemList} })
        storeAPI.dispatch({ type: 'set_context', payload: {context: result.context} })
      } else {
        throw 'Request failed';
      }
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
      const startTime = params.datetime.match('\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z:');
      console.log(startTime)
      if (startTime) {
        storeAPI.dispatch({ type: 'set_datetime_facet', payload: {id: 'startTime', value: new Date(startTime[0].substring(-1))} })
      };

      const endTime = params.datetime.match(':\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z');
      console.log(endTime)
      if (endTime) {
        storeAPI.dispatch({ type: 'set_datetime_facet', payload: {id: 'endTime', value: new Date(endTime[0].substring(1))} })
      };
    } else if (state.datetime !== []) {
      storeAPI.dispatch({ type: 'set_datetime_facet', payload: {id: 'startTime', value: null} })
      storeAPI.dispatch({ type: 'set_datetime_facet', payload: {id: 'endTime', value: null} })
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

  const datetimeString = `${(datetimeFacet.startTime) ? datetimeFacet.startTime:'..'}:${(datetimeFacet.startTime) ? datetimeFacet.endTime : '..'}`;

  var filters = [];
  for (const facet of searchFacets) {
    if (facet.value !== undefined && facet.value.length === 1) {
      filters.push(
        {
          "eq": [
            {"property": facet.id},
            facet.value[0]
          ]
        }
      )
    } else if (facet.value !== undefined && facet.value !== []) {
      var facet_filters = [];
      for (const value of facet.value) {
        facet_filters.push(
          {
            "eq": [
              {"property": facet.id},
              value
            ]
          }
        )
      }
      filters.push(
        {
          "or": facet_filters
        }
      )
    }
  }
 
  const POSTbody = {
    ...(state.selectedCollection && {collections: [state.selectedCollection.id]}),
    ...((bboxList[0] !== '-180' || bboxList[1] !== '-90' || bboxList[2] !== '180' || bboxList[3] !== '90') && {bbox: bboxList}),
    ...(datetimeString !== '..:..' && {datetime: datetimeString}),
    ...(filters.length !== 0 && {filter: {"and":filters}}),
    ...(state.query && {q: state.query}),
    ...((state.page && state.page !== 1) && {page: state.page}),
  }
  return POSTbody;
};

export default asyncFunctionMiddleware;