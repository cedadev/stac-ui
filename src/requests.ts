import { stacAPI } from './config';
import { Item, Facet, Collection } from './types';
// import {items_data, collection_data} from './data.js';

// async function requestPOST(requestBody: any): Promise<any> {
//   const response = await fetch(stacAPI, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//     },
//     body: JSON.stringify(requestBody),
//   });
//   const result = await response.json();
//   return result;
// }

async function requestGET(requestURL: any): Promise<any> {
    const response = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      }
    });
    const result = await response.json();
    console.log(result)
    return result;
  }

export async function requestSearchItems(query: string, facets: Facet[]): Promise<{success: boolean, itemList: Item[]}> {

  const requestURL = `${stacAPI}search?query=${query}`;
  console.log(requestURL)
  const response = await requestGET(requestURL);
  var itemList = response['features'].map( function(i: any) {
    return {
      id: i.id,
      bbox: i.bbox,
      properties: i.properties,
      assets: i.assets,
      collection_id: i.collection
    };
  });

  const result = {
    success: true,
    itemList: itemList
  };
  return result;
}

export async function requestItem(collection_id: string, item_id: string): Promise<{success: boolean, item: Item|undefined}> {

  const requestURL = `${stacAPI}collections/${collection_id}/items/${item_id}`;
  const response = await requestGET(requestURL);
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
    collection_id: response.collection
  };

  const result = {
    success: true,
    item: item
  };
  return result;
}

export async function requestCollection(collection_id: string): Promise<{success: boolean, collection: Collection|undefined}> {
   
  const requestURL = `${stacAPI}collections/${collection_id}`;
  const response = await requestGET(requestURL);
  const items = (await requestCollectionItems(collection_id)).items;
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
    items: items,
  };

  console.log(collection);
  
  const result = {
    success: true,
    collection: collection
  };
  return result;
}

export async function requestCollectionItems(collection_id: string): Promise<{success: boolean, items: Item[]}> {
  
  const requestURL = `${stacAPI}collections/${collection_id}/items`;
  const response = await requestGET(requestURL);
  var items = response['features'].map( function(i: any) {
    return {
      id: i.id,
      bbox: i.bbox,
      properties: i.properties,
      assets: i.assets,
      collection_id: i.collection
    };
  });
  
  const result = {
    success: true,
    items: items
  };
  return result;
}


export async function requestFacets(): Promise<{success: boolean, availableFacets: Facet[]}> {
  
  const requestURL = `${stacAPI}queryables`;
  const response = await requestGET(requestURL);
  var availableFacets = Object.keys(response.properties).map( function(key: string) {
    var value = response.properties[key];
      return {
        id: key,
        title: value.title,
        value: value.value,
      }
  });
  
  const result = {
    success: true,
    availableFacets: availableFacets
  };
  return result;
}

export async function requestCollectionList(): Promise<{success: boolean, collectionList: Collection[]}> {
  
  const requestURL = `${stacAPI}collections/`;
  const response = await requestGET(requestURL);
  var collectionList: Collection[] = await Promise.all(response.map( async function(c: any): Promise<Collection> {
    const items = (await requestCollectionItems(c.id)).items;
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
      items: items,
    };
  }));
  console.log(`collectionList: ${collectionList}`)
  
  const result = {
    success: true,
    collectionList: collectionList
  };
  return result;
}
