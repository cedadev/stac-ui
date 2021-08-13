import { stacAPI } from './config';
import { Item, Facet, Collection } from './types';
// import {items_data, collection_data} from './data.js';

async function requestGET(requestURL: string): Promise<any> {
  console.log(requestURL)
  const response = await fetch(requestURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
  const result = await response.json();
  return result;
}

export async function requestSearchItems(url: string): Promise<{success: boolean, itemList: Item[]}> {

  const requestURL = `${stacAPI}search${url}`;
  const response = await requestGET(requestURL);
  const collectionList: Collection[]= [];
  const itemList: Item[] = [];

  for (const i of response['features']) {
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
    itemList: itemList
  };
  return result;
}

export async function requestItem(collection_id: string, item_id: string): Promise<{success: boolean, item: Item|undefined}> {

  const requestURL = `${stacAPI}collections/${collection_id}/items/${item_id}`;
  const response = await requestGET(requestURL);
  const collection: Collection = (await requestCollection(collection_id)).collection;
  const item: Item = {
    id: response.id,
    bbox: response.bbox,
    properties: response.properties,
    assets: Object.keys(response.assets).map( function(key: string) {
      var value = response.assets[key];
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
}

export async function requestCollection(collection_id: string): Promise<{success: boolean, collection: Collection}> {
   
  const requestURL = `${stacAPI}collections/${collection_id}`;
  const response = await requestGET(requestURL);
  var collection: Collection = {
    id: response.id,
    title: response.title,
    description: response.description,
    temporal: {
      interval: response.extent.temporal.interval[0],
    },
    spatial: {
      bbox: response.extent.spatial.bbox[0],
    },properties: {
      license: response.license,
      keywords: response.keywords,
      platform: response.summaries.platform,
      flight_number: response.summaries.flight_number,
    },
  };

  const result = {
    success: true,
    collection: collection
  };
  return result;
}

export async function requestCollectionItems(collection: Collection): Promise<{success: boolean, items: Item[]}> {
  
  const requestURL = `${stacAPI}collections/${collection.id}/items`;
  const response = await requestGET(requestURL);
  var items = response['features'].map( function(i: any) {
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
    items: items
  };
  return result;
}


export async function requestFacets(collection?:string): Promise<{success: boolean, availableFacets: Facet[]}> {
  
  const requestURL = collection ? `${stacAPI}collections/${collection}/queryables` : `${stacAPI}queryables`;
  const response = await requestGET(requestURL);
  const properties = response['properties'];
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
}

export async function requestCollectionList(): Promise<{success: boolean, collectionList: Collection[]}> {
  
  const requestURL = `${stacAPI}collections`;
  const response = await requestGET(requestURL);
  var collectionList: Collection[] = await Promise.all(response.map( async function(c: any): Promise<Collection> {
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
        platform: c.summaries.platform,
        flight_number: c.summaries.flight_number,
      },
    };
  }));
  
  
  const result = {
    success: true,
    collectionList: collectionList
  };
  return result;
}
