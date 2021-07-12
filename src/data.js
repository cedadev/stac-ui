const items_data = [{
  id: 'e51bff4c0c383366fcb422983f5b1de3',
  bbox: [
    -28.7914,
    38.4686,
    -0.61,
    52.079
  ],
  properties: {
    "platform": "faam",
    "datetime": "2005-01-05T00:00:00",
    "flight_number": "b069",
    "datacentre": "BADC"
  },
  assets: [
    {
      id: "192f789129a658e0799ddd9443578288",
      title: ".ftpaccess.20150331-173831",
      href: "http://data.ceda.ac.uk/badc/faam/data/2005/b069-jan-05/.ftpaccess.20150331-173831",
      type: "text/plain",
      roles: ["data"],
      collection_id: "WH5qEHoBZp5aDdjsfMv-",
    },
    {
      id: "484e391c3216f99c3b89c364765d0f3a",
      title: "00README",
      href: "http://data.ceda.ac.uk/badc/faam/data/2005/b069-jan-05/00README",
      type: "text/plain",
      roles: ["metadata"],
      collection_id: "WH5qEHoBZp5aDdjsfMv-",
    },
    {
      id: "e64c94f00a6b9f6f6dba9053fbe490af",
      title: "flight-track_faam_20050105_b069.kml",
      href: "http://data.ceda.ac.uk/badc/faam/data/2005/b069-jan-05/flight-track_faam_20050105_b069.kml",
      type: "application/xml",
      roles: ["data"],
      collection_id: "WH5qEHoBZp5aDdjsfMv-",
    },
  ],
  collection_id: 'WH5qEHoBZp5aDdjsfMv-',
},]

const collection_data = {
  id: 'WH5qEHoBZp5aDdjsfMv-',
  title: 'FAAM',
  description: "The FAAM is a large atmospheric research BAE-146 aircraft, run jointly by the NERC and the UK Met Office. \
    It has been in operation since March 2004 and is at the scientists' disposal through a scheme of project selection. \
    FAAM is the result of a collaboration between the Met Office(TM) and the Natural Environment Research Council (NERC) \
    and has been established as part of the National Centre for Atmospheric Science (NCAS) to provide an aircraft measurement \
    platform for use by all the UK atmospheric research community on campaigns throughout the world. The modified BAE 146 aircraft \
    is owned by BAE Systems and operated for them by Directflight. The Home Base is at Cranfield University, Bedfordshire.",
  properties: {
    license: " ",
    bbox: [
      -28.7914,
      38.4686,
      -0.61,
      52.079
    ],
    temporal: [
      "2005-01-05T09:12:58",
      "2005-01-05T17:15:31"
    ],

    keywords: [
      "RICO",
      "FAAM",
      "airborne",
      "atmospheric measurements"
    ],
    platform: [
      "faam"
    ],
    flight_number: [
      "b069"
    ]
  }
}

export {items_data, collection_data};