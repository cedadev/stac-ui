import React from 'react';
import { Facet } from '../types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import Grid from '@material-ui/core/Grid';
import FormControl from 'react-bootstrap/FormControl';


interface Props {
    handleQueryChange: (e: any) => void;
    handleSearch: (e: any) => void;
}

class SearchBar extends React.Component<Props, {}> {

  private buildSearchBar(): React.ReactElement {
    const SearchBar = (
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={this.props.handleQueryChange}
          />
          <InputGroup.Append>
          <Button variant="outline-secondary" onClick={this.props.handleSearch}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </>
    );

    return SearchBar;
  }

  public render(): React.ReactElement {
    return <>{this.buildSearchBar()}</>;
  }
}

export default (SearchBar);