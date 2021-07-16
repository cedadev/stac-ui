import React, { Component} from 'react';

interface Props {
  bbox: number[];
}

class MapExtent extends Component <Props, {url:string}> {
    constructor(props:Props) {
      super(props);
      this.setMapUrl(this.props.bbox);
    } 

    public setMapUrl = async (bbox: number[]): Promise<void> => {
  
      let east:number, west:number, north:number, south:number;
      east = west = north = south = 0;
      if (bbox.length == 4) {
        east = bbox[0];
        west = bbox[2];
        north = bbox[1];
        south = bbox[3];
      } else if (bbox.length == 6) {
        east = bbox[0];
        west = bbox[3];
        north = bbox[1];
        south = bbox[4];
      } else {
        this.state = {
          url: ''
        };
      }
    
      const centre = `${(north + south)/2}, ${(east + west)/2}`;
      const max_edge = Math.max((Math.abs(north) + Math.abs(south)), (Math.abs(east) + Math.abs(west)));
    
      let zoom = '1';
      if(max_edge < 45) {
        zoom = '4';
      } else if (max_edge < 90) {
        zoom = '3';
      } else if (max_edge < 180) {
        zoom = '2';
      }
    
        
      this.state = {
        url: `http://maps.google.com/maps/api/staticmap?center=${centre}&zoom=${zoom}\
        &path=color:red|weight:4|${north},${west}|${north},${east}|${south},${east}|${south},${west}|${north},${west}\
        &size=300x256&key=${process.env.REACT_APP_GOOGLE_KEY}`
      };
    }

  public render(): React.ReactElement {
    return (<img src={this.state.url}/>);
  }
}

export default (MapExtent);