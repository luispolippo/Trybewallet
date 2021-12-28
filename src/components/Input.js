import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { handleChange, value, description } = this.props;
    return (
      <div>
        <input
          type="text"
          value={ value }
          name="value"
          data-testid="value-input"
          onChange={ handleChange }
          placeholder="0.00"
        />
        <input
          type="text"
          value={ description }
          name="description"
          data-testid="description-input"
          onChange={ handleChange }
          placeholder="Descrição da despesa"
        />
      </div>
    );
  }
}

Input.propTypes = {
  description: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  description: '',
  value: '',
};

export default Input;
