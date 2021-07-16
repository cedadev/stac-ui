import { stacAPI } from './config';
import { Item, Facet, Collection } from './types';
import {items_data, collection_data} from './data.js';

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
    console.log(response)
    const result = await response.json();
    return result;
  }

export async function requestSearchItems(query: string, facets: Facet[]): Promise<{success: boolean, itemList: Item[]}> {

  const requestURL = `${process.env.REACT_APP_API_URL}search?query=${query}`;
  // const response = await requestGET(requestURL);
  const result = {
    success: true,
    itemList: items_data
  };
  return result;
}

export async function requestItem(collection_id: string, item_id: string): Promise<{success: boolean, item: Item|undefined}> {

  // const result = await requestPOST(requestBody);
  const item = items_data.find(i => i.id === item_id);
  const result = {
    success: true,
    item: item
  };
  return result;
}

export async function requestCollection(collection_id: string): Promise<{success: boolean, collection: Collection|undefined}> {
   
  // const result = await requestPOST(requestBody);
  var items = (await requestCollectionItems(collection_id)).items;
  var collection = {...collection_data, ...{items: items}};
  const result = {
    success: true,
    collection: collection
  };
  return result;
}

export async function requestCollectionItems(collection_id: string): Promise<{success: boolean, items: Item[]}> {
  
  // const result = await requestPOST(requestBody);
  const items = items_data.filter(i => i.collection_id === collection_id);
  const result = {
    success: true,
    items: items
  };
  return result;
}


export async function requestFacets(): Promise<{success: boolean, availableFacets: Facet[]}> {
  
  // const result = await requestPOST(requestBody);
  const result = {
    success: true,
    availableFacets: []
  };
  return result;
}

export async function requestCollectionList(): Promise<{success: boolean, collectionList: Collection[]}> {
  
  // const result = await requestPOST(requestBody);
  const result = {
    success: true,
    collectionList: []
  };
  return result;
}
