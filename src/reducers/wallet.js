// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSES,
  REQUEST_SUCESS,
  REQUEST_BEGIN,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDIT,
  ADD_CURRENCIES,
} from '../actions/actionTypes';

const initialState = {
  idExpense: -1,
  currencies: [],
  expenses: [],
  exchangeRates: {},
  isLoading: false,
  editableExpense: '',
  isEditing: false,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      idExpense: state.idExpense + 1,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          exchangeRates: state.exchangeRates,
          id: state.idExpense + 1,
        },
      ],
    };
  case REQUEST_SUCESS:
    return { ...state, exchangeRates: action.payload, isLoading: false };
  case REQUEST_BEGIN:
    return { ...state, isLoading: true };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.id)],
    };
  case EDIT_EXPENSE:
    return { ...state, editableExpense: action.expense, isEditing: true };
  case SUBMIT_EDIT: {
    return {
      ...state,
      expenses: action.expense,
      isEditing: false,
      editableExpense: '',
    };
  }
  case ADD_CURRENCIES:
    return { ...state, currencies: [...action.currencies] };
  default:
    return state;
  }
};

export default wallet;
