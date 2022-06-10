function constructPOST(state: any): object {

  const searchFacets = state.searchFacets;
  const bboxFacet = state.bboxFacet;
  const datetimeFacet = state.datetimeFacet;
  const pathname = window.location.pathname;

  const item_regex = '\/collections\/(?<collection>.*)\/items\/(?<item>.*)';
  const collection_regex = '\/collections\/(?<collection>.*)';
  let item, collection = null, match;
  if ((match = pathname.match(item_regex)) !== null && match.groups) {
    collection = match.groups.collection;
    item = match.groups.item;
  } else if ((match = pathname.match(collection_regex)) !== null && match.groups) {
    collection = match.groups.collection;
  }
  
  const bboxList = [
    `${(bboxFacet.westBbox !== '') ? bboxFacet.westBbox : '-180'}`,
    `${(bboxFacet.southBbox !== '') ? bboxFacet.southBbox : '-90'}`,
    `${(bboxFacet.eastBbox !== '') ? bboxFacet.eastBbox : '180'}`,
    `${(bboxFacet.northBbox !== '') ? bboxFacet.northBbox : '90'}`,
  ];

  const datetimeString = `${(datetimeFacet.startTime) ? datetimeFacet.startTime.toISOString() : '..'}/${(datetimeFacet.endTime) ? datetimeFacet.endTime.toISOString() : '..'}`;

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
    } else if (facet.value !== undefined && facet.value.length > 1) {
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
    ...(collection && {collections: [collection]}),
    ...(item && {items: [item]}),
    ...((bboxList[0] !== '-180' || bboxList[1] !== '-90' || bboxList[2] !== '180' || bboxList[3] !== '90') && {bbox: bboxList}),
    ...(datetimeString !== '..:..' && {datetime: datetimeString}),
    ...(filters.length !== 0 && {filter: {"and":filters}}),
    ...(state.query && {q: state.query}),
    ...((state.page && state.page !== 1) && {page: state.page}),
  }
  return POSTbody;
};

export default constructPOST;