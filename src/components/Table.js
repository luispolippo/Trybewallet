import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionDeleteExpense, actionEditExpense } from '../actions';
import TableButtons from './TableButtons';

class Table extends Component {
  constructor(props) {
    super(props);
    this.getConvertedValue = this.getConvertedValue.bind(this);
    this.getExchangeCurrencyName = this.getExchangeCurrencyName.bind(this);
    this.getExchangeValue = this.getExchangeValue.bind(this);
  }

  getExchangeCurrencyName({ currency, exchangeRates }) {
    const usedCurrency = exchangeRates[currency];
    const { name } = usedCurrency;
    return name.split('/')[0];
  }

  getConvertedValue({ currency, exchangeRates, value }) {
    const usedCurrency = exchangeRates[currency];
    if (!usedCurrency) return '';
    const { ask } = usedCurrency;
    const exchangeValue = this.convertToNumber(ask);
    return (value * exchangeValue).toFixed(2);
  }

  getExchangeValue({ currency, exchangeRates }) {
    const usedCurrency = exchangeRates[currency];
    if (!usedCurrency) return '';
    const { ask } = usedCurrency;
    const exchangeValue = this.convertToNumber(ask);
    return exchangeValue.toFixed(2);
  }

  convertToNumber(string) {
    return Number(string);
  }

  render() {
    const { expenses, removeExpense, editExpense } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{expense.value}</td>
                  <td>{this.getExchangeCurrencyName(expense)}</td>
                  <td>{this.getExchangeValue(expense)}</td>
                  <td>{this.getConvertedValue(expense)}</td>
                  <td>Real</td>
                  <TableButtons
                    removeExpense={ removeExpense }
                    expenseId={ expense.id }
                    expense={ expense }
                    editExpense={ editExpense }
                  />
                </tr>
              ))
            }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(actionDeleteExpense(id)),
  editExpense: (expense) => dispatch(actionEditExpense(expense)),
});

Table.propTypes = {
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  removeExpense: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
