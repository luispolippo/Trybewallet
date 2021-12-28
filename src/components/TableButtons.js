import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TableButtons extends Component {
  render() {
    const { removeExpense, expenseId, expense, editExpense } = this.props;
    return (
      <td>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => editExpense(expense) }
        >
          Editar
        </button>
        <button
          type="button"
          onClick={ () => removeExpense(expenseId) }
          data-testid="delete-btn"
        >
          Excluir
        </button>
      </td>
    );
  }
}

TableButtons.propTypes = {
  editExpense: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
  expenseId: PropTypes.number.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default TableButtons;
