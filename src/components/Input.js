import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormCSS from '../styles/ExpendForm.module.css';

class Input extends Component {
  render() {
    const { handleChange, value, description } = this.props;
    return (
      <div className={ FormCSS.inputsContainer }>
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
