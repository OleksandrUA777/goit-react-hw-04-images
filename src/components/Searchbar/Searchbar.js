import PropTypes from 'prop-types';

import { useState } from 'react';
import { Form, Icon, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();

    onSubmit(value);
    setValue('');
  };
  const handleInputChange = event => {
    setValue(event.currentTarget.value);
  };
  return (
    <header className="searchbar">
      <Form className="form" onSubmit={handleFormSubmit}>
        <button type="submit" className="button">
          <Icon />
        </button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleInputChange}
        />
      </Form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
