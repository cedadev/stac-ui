import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


interface Props {
    handleQueryChange: (e: any) => void;
    handleSearch: (e: any) => void;
}

class SearchBar extends React.Component<Props, {}> {

  private buildSearchBar(): React.ReactElement {
    const SearchBar = (
      <>
        <h2>CEDA Search</h2>
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