import { REACT_APP_STAC_API } from './config';
import { Item, Facet, Collection, Context } from './types';
// import {items_data, collection_data} from './data.js';


async function requestGET(requestURL: string): Promise<any> {
  console.log('requestURL', requestURL)
  const response = await fetch(requestURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  }).then(async function(response) {
    const result = await response.json();
    return {ok: response.ok, result:result};
  }).catch(error => {
    return {ok: false, result:error};
  });
  return response;
};

async function requestPOST(requestBody: any): Promise<any> {
  console.log('RequestBody: ', requestBody)
  const response = await fetch(`${REACT_APP_STAC_API}search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(requestBody),
  }).then(async function(response) {
    const result = await response.json();
    return {ok: response.ok, result:result};
  }).catch(error => {
    return {ok: false, result:error};
  });
  return response;
};

export async function requestSearchItems(url: string): Promise<{success: boolean, itemList: Item[], context:Context}> {

  const requestURL = `${REACT_APP_STAC_API}search${url}`;
  const response = await requestGET(requestURL);
  const collectionList: Collection[]= [];
  const itemList: Item[] = [];

  if (response.ok && response.result.features) {
    for (const i of response.result.features) {
      var collection = collectionList.find(c => c.id === i.collection);
      if (!collection) {
        collection = (await requestCollection(i.collection)).collection;
        collectionList.push(collection);
      };
      itemList.push({
        id: i.id,
        bbox: i.bbox,
        properties: i.properties,
        assets: i.assets,
        collection: collection
      });
    };
  
    const result = {
      success: true,
      itemList: itemList,
      context: response.result.context
    };
    return result;
  } else {
    return {success: false, itemList: response.ok, context: response.ok}
  };  
};

export async function requestSearchItemsPOST(body: any): Promise<{success: boolean, itemList: Item[], context:Context}> {

  const response = await requestPOST(body);
  const collectionList: Collection[]= [];
  const itemList: Item[] = [];

  if (response.ok) {
    for (const i of response.result.features) {
      var collection = collectionList.find(c => c && c.id === i.collection);
      if (!collection) {
        collection = (await requestCollection(i.collection)).collection;
        collectionList.push(collection);
      };
      itemList.push({
        id: i.id,
        bbox: i.bbox,
        properties: i.properties,
        assets: i.assets,
        collection: collection
      });
    };

    const result = {
      success: true,
      itemList: itemList,
      context: response.result.context
    };
    return result;
  } else {
    return {success: false, itemList: response.ok, context: response.ok}
  };
};

export async function requestItem(collection_id: string, item_id: string): Promise<{success: boolean, item: Item|undefined}> {

  const requestURL = `${REACT_APP_STAC_API}collections/${collection_id}/items/${item_id}`;
  const response = await requestGET(requestURL);
  const collection: Collection = (await requestCollection(collection_id)).collection;
  if (response.ok) {
    const item: Item = {
      id: response.result.id,
      bbox: response.result.bbox,
      properties: response.result.properties,
      assets: Object.keys(response.result.assets).map( function(key: string) {
        var value = response.result.assets[key];
        return {
          id: key,
          title: value.title,
          href: value.href,
          type: value.type,
          roles: value.roles,
        }
      }),
      collection: collection
    };
    const result = {
      success: true,
      item: item
    };
    return result;
  } else {
    return {success: false, item: undefined}
  };
};

export async function requestCollection(collection_id: string): Promise<{success: boolean, collection: Collection}> {
   
  const requestURL = `${REACT_APP_STAC_API}collections/${collection_id}`;
  const response = await requestGET(requestURL);
  if (response.ok) {
    var collection: Collection = {
      id: response.result.id,
      title: response.result.title,
      description: response.result.description,
      temporal: {
        interval: response.result.extent.temporal.interval[0],
      },
      spatial: {
        bbox: response.result.extent.spatial.bbox[0],
      },properties: {
        license: response.result.license,
        keywords: response.result.keywords,
        ...response.result.summaries
      },
    };

    const result = {
      success: true,
      collection: collection
    };
    return result;
  } else {
    return {success: false, collection: response.ok}
  };
};

export async function requestCollectionItems(collection: Collection): Promise<{success: boolean, items: Item[], context: Context}> {
  
  const requestURL = `${REACT_APP_STAC_API}collections/${collection.id}/items`;
  const response = await requestGET(requestURL);
  if (response.ok && response.result.features) {
    var items = response.result.features.map( function(i: any) {
      return {
        id: i.id,
        bbox: i.bbox,
        properties: i.properties,
        assets: i.assets,
        collection: collection
      };
    });
    
    const result = {
      success: true,
      items: items,
      context: response.result.context
    };
    return result;
  } else {
    return {success: false, items: response.ok, context: response.ok}
  };
};


export async function requestFacets(collection?:string, collections?:string): Promise<{success: boolean, availableFacets: Facet[]}> {
  let requestURL: string

  // Set the request URL based on whether collection id or collections query param set
  if (collection){
    requestURL = `${REACT_APP_STAC_API}collections/${collection}/queryables`
  } else if (collections) {
    requestURL = `${REACT_APP_STAC_API}queryables?collections=${collections}`
  } else {
    requestURL = `${REACT_APP_STAC_API}queryables`
  }

  const response = await requestGET(requestURL);
  if (response.ok) {
    const properties = response.result.properties;
    // Remove bbox and datetime as these are handled seperately.
    delete properties.bbox;
    delete properties.datetime;

    const availableFacets = [];
    for (const key in properties) {
      const f = properties[key];
      availableFacets.push({
        id: key,
        title: f.title,
        type: f.type,
        options: f.enum,
      });
    };
    
    const result = {
      success: true,
      availableFacets: availableFacets
    };
    return result;
  } else {
    return {success: false, availableFacets: response.ok}
  };
};

export async function requestCollectionList(): Promise<{success: boolean, collectionList: Collection[], context: Context}> {
  
  const requestURL = `${REACT_APP_STAC_API}collections`;
  const response = await requestGET(requestURL);
  if (response.ok) {
    var collectionList: Collection[] = await Promise.all(response.result.collections.map( async function(c: any): Promise<Collection> {
      return {
        id: c.id,
        title: c.title,
        description: c.description,
        temporal: {
          interval: c.extent.temporal.interval[0],
        },
        spatial: {
          bbox: c.extent.spatial.bbox[0],
        },
        properties: {
          license: c.license,
          keywords: c.keywords,
        },
      };
    }));
    
    const result = {
      success: true,
      collectionList: collectionList,
      context: response.result.context,
    };
    return result;
  } else {
    return {success: false, collectionList: response.ok, context: response.ok}
  };
};
