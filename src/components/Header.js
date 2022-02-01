import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderCSS from '../styles/Header.module.css';

class Header extends Component {
  constructor() {
    super();
    this.convertAndSumExpends = this.convertAndSumExpends.bind(this);
  }

  convertAndSumExpends() {
    const { expenses } = this.props;
    let convertedValues = [];
    if (expenses.length === 0) return 0;
    expenses.forEach((expense) => {
      const momentCurrency = expense.exchangeRates[expense.currency];
      if (!momentCurrency) return 0;
      const { ask } = momentCurrency;
      const convertedCurrencyValue = expense.value * ask;
      convertedValues.push(convertedCurrencyValue.toFixed(2));
    });
    convertedValues = this.convertToNumber(convertedValues);
    const sumOfValues = convertedValues.reduce((acc, curr) => acc + curr, 0);
    return sumOfValues.toFixed(2);
  }

  convertToNumber(stringArray) {
    return stringArray.map((string) => Number(string));
  }

  render() {
    const { email } = this.props;
    const totalValue = this.convertAndSumExpends();
    return (
      <header className={ HeaderCSS.header }>
        <div className={ HeaderCSS.titleContainer }>
          <h2>Trybewallet</h2>
        </div>
        <div className={ HeaderCSS.infoContainer }>
          <p>
            Email:
            <span data-testid="email-field">{email}</span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">{totalValue}</span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps)(Header);
