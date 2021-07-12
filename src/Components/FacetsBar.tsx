import React from 'react';
import { Facet } from '../types';


interface Props {
    facets: Facet[];
    handleChange: (e: any) => void;
}

class FacetBar extends React.Component<Props, {}> {

  private buildFacetBar(): React.ReactElement {
    const FacetBar = (
        <>
          <h3>Facets</h3>
            <>
              <label >Start Date</label>
              <input type="date" name="startDate" max="3000-12-31" 
                min="1000-01-01" onChange={this.props.handleChange} />
            </>
            <>
              <label >End Date</label>
              <input type="date" name="startDate" max="3000-12-31" 
                min="1000-01-01" onChange={this.props.handleChange} />
            </>
        </>
      );

    return FacetBar;
  }

  public render(): React.ReactElement {
    return <>{this.buildFacetBar()}</>;
  }
}

export default (FacetBar);