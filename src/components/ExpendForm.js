import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { actionAddExpenses, actionFetchCurrency } from '../actions';
import Select from './Select';
import FormCSS from '../styles/ExpendForm.module.css';

class ExpendForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleOnClick() {
    const { getExchangeRate, addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expenseObject = {
      value,
      description,
      currency,
      method,
      tag,
    };
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
    });
    await getExchangeRate();
    addExpense(expenseObject);
  }

  render() {
    const { isLoading } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <section className={ FormCSS.section }>
        {isLoading && (<h1>Loading...</h1>)}
        <h3>Adição de despesas</h3>
        <Input
          handleChange={ this.handleOnChange }
          value={ value }
          description={ description }
        />
        <Select
          method={ method }
          tag={ tag }
          currency={ currency }
          handleChange={ this.handleOnChange }
        />
        <button
          type="button"
          onClick={ this.handleOnClick }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getExchangeRate: () => dispatch(actionFetchCurrency()),
  addExpense: (payload) => dispatch(actionAddExpenses(payload)),
});

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
});

ExpendForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getExchangeRate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpendForm);
