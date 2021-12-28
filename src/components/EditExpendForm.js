import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionSubmitEdit } from '../actions';
import Input from './Input';
import Select from './Select';

class EditExpendForm extends Component {
  constructor(props) {
    super(props);
    const { expense } = this.props;
    const { value, description, method, tag, currency } = expense;
    this.state = {
      value,
      description,
      method,
      tag,
      currency,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleOnClick() {
    const { value, description, method, tag, currency } = this.state;
    const { expense, submitEdit, expenses } = this.props;
    const { id, exchangeRates } = expense;
    const index = expenses.findIndex((exp) => exp.id === id);
    const editObj = {
      value,
      description,
      method,
      tag,
      currency,
      id,
      exchangeRates,
    };
    const newExpenses = [
      ...expenses.slice(0, index),
      editObj,
      ...expenses.slice(index + 1),
    ];
    submitEdit(newExpenses);
  }

  render() {
    const { value, description, method, tag, currency } = this.state;
    return (
      <section>
        <h3>Edição de despesas</h3>
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
          Editar despesa
        </button>
      </section>
    );
  }
}

EditExpendForm.propTypes = {
  expense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expense: state.wallet.editableExpense,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  submitEdit: (expense) => dispatch(actionSubmitEdit(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpendForm);
