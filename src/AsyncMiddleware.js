import { requestSearchAssetsPOST, requestSearchItemsPOST, requestFacets } from './requests';
import queryString from 'query-string';
import constructPOST from './Functions/ConstructPOST';

const asyncFunctionMiddleware = storeAPI => next => action => {
  console.log(action.type)
  console.log(action)
  let state = storeAPI.getState().main;


  // UPDATE ASSET LIST
  if (action.type === 'update_asset_list') {
    const body = constructPOST(state);
    requestSearchAssetsPOST(body).then(result => {
      if (result.success) {
        storeAPI.dispatch({ type: 'set_asset_list', payload: {assetList: result.assetList} })
        storeAPI.dispatch({ type: 'set_context', payload: {context: result.context} })
        // storeAPI.dispatch({ type: 'update_search_facets', payload: {context: result.context} })
        storeAPI.dispatch({ type: 'set_list_error', payload: {hasError: false} })
      } else {
        throw new Error('Request failed');
      }
    }).catch(error => { 
      storeAPI.dispatch({ type: 'set_list_error', payload: {hasError: true} })
    })
  }


  // UPDATE ITEM LIST
  if (action.type === 'update_item_list') {
    const body = constructPOST(state);
    requestSearchItemsPOST(body).then(result => {
      if (result.success) {
        storeAPI.dispatch({ type: 'set_item_list', payload: {itemList: result.itemList} })
        storeAPI.dispatch({ type: 'set_context', payload: {context: result.context} })
        storeAPI.dispatch({ type: 'update_search_facets', payload: {context: result.context} })
        storeAPI.dispatch({ type: 'set_list_error', payload: {hasError: false} })
      } else {
        throw new Error('Request failed');
      }
    }).catch(error => { 
      storeAPI.dispatch({ type: 'set_list_error', payload: {hasError: true} })
    })
  }


  // UPDATE SEARCH FACETS
  if (action.type === 'update_search_facets') {
    requestFacets(state.collection?.id, action.payload.context?.collections.toString()).then(result => {
      
      if (result.success) {
        const properties = result.availableFacets;
        // Remove bbox and datetime as these are handled seperately.
        delete properties.bbox;
        delete properties.datetime;

        const availableFacets = [];
        for (const key in properties) {
          const f = properties[key];
          let availableFacet = {
            id: key,
            title: f.title,
            type: f.type,
            options: f.enum,
          }
          const searchFacet = state.searchFacets.find(f => f.id === key);
          if (searchFacet) {
            availableFacet = {
              ...availableFacet,
              value: searchFacet.value
            }
          }
          availableFacets.push(availableFacet);
        };
        storeAPI.dispatch({ type: 'set_search_facets', payload: {searchFacets: availableFacets} })
      } else {
        throw new Error('Request failed');
      }
    })
  }


  // UPDATE STATE FROM URL PARAMETERS
  if (action.type === '@@router/LOCATION_CHANGE' && window.location.search !== '' && action.payload.location?.state !== 'search_button') {
    let params = queryString.parse(window.location.search);
    
    if (params.q && typeof params.q === 'string' && params.q !== state.query) {
      storeAPI.dispatch({ type: 'set_query', payload: {query: params.q} })
    } else if (state.q !== '') {
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
      if (startTime) {
        storeAPI.dispatch({ type: 'set_datetime_facet', payload: {id: 'startTime', value: new Date(startTime[0].substring(-1))} })
      };

      const endTime = params.datetime.match(':\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z');
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

export default asyncFunctionMiddleware;