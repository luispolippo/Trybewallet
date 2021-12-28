import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Select extends Component {
  render() {
    const { method, tag, handleChange, currency, currencyCoins } = this.props;
    return (
      <div>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ handleChange }
          >
            {
              currencyCoins.map((coin, index) => (
                <option key={ index } value={ coin }>{coin}</option>
              ))
            }
          </select>
        </label>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyCoins: state.wallet.currencies,
});

Select.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyCoins: PropTypes.objectOf(PropTypes.object).isRequired,
  handleChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Select);
