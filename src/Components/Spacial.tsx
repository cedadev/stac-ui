import React from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import MapExtent from "../Components/MapExtent";

interface Props {
  bbox: number[];
}

class Spacial extends React.Component<Props, {}> {

  public render(): React.ReactElement {
    if (this.props.bbox.length === 4) {
      return (
        <ListGroup>
          <h5>Geographic Extent</h5>
          <ListGroup.Item
              id="spacial-list-item"
            >
              <MapExtent bbox={this.props.bbox}/>
              <table style={{margin:'auto'}}>
                <tbody>
                  <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}><Badge className='badge-secondary'>{`${this.props.bbox[1].toFixed(4)}°`}</Badge></td>
                  <td></td>
                  </tr>
                  <tr>
                    <td style={{textAlign: 'center'}}><Badge className='badge-secondary'>{`${this.props.bbox[0].toFixed(4)}°`}</Badge></td>
                    <td></td>
                    <td style={{textAlign: 'center'}}><Badge className='badge-secondary'>{`${this.props.bbox[2].toFixed(4)}°`}</Badge></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style={{textAlign: 'center'}}><Badge className='badge-secondary'>{`${this.props.bbox[3].toFixed(4)}°`}</Badge></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </ListGroup.Item>
        </ListGroup>
      );
    } else {
      return (
        <></>
      );
    }
    
  }
}

export default (Spacial);
