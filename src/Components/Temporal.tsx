import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
  interval: string[];
}

class Temporal extends React.Component<Props, {}> {

  public render(): React.ReactElement {
      return (
        <ListGroup>
          <h5>Temporal Range</h5>
          <ListGroup.Item
              id="temporal-list-item"
            >
              {this.props.interval.length === 2 ? 
              <>
                Start Time: <code>{`${this.props.interval[0]}`}</code><br/>
                End Time: <code>{`${this.props.interval[1]}`}</code>
              </> 
              : 
              <>
                Time: <code>{`${this.props.interval[0]}`}</code>
              </>
              }
            </ListGroup.Item>
        </ListGroup>
      );    
  }
}

export default (Temporal);