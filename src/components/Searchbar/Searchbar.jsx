import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  Input,
  Button,
  SerchFormBtnLabel,
} from './Searchbar.styled';

export default class SearchingBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="serchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <Button type="submit">
            <SerchFormBtnLabel>Search</SerchFormBtnLabel>
          </Button>
        </SearchForm>
      </SearchBar>
    );
  }
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
