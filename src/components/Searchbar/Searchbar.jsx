import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChangeInput = evt => {
    const { value } = evt.target;

    this.setState({ searchValue: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { searchValue } = this.state;
    this.props.onSubmit(searchValue);
  };

  render() {
    const { searchValue } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            value={searchValue}
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
          />
        </SearchForm>
      </Header>
    );
  }
}
