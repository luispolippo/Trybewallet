// Coloque aqui suas actions
import {
  SET_USER,
  ADD_EXPENSES,
  REQUEST_SUCESS,
  REQUEST_BEGIN,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SUBMIT_EDIT,
  ADD_CURRENCIES,
} from './actionTypes';
import fetchApi from '../services/apiEconomia';

export const actionSetUser = (email) => ({
  type: SET_USER,
  email,
});

export const actionAddExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

const actionRequestSucess = (payload) => ({
  type: REQUEST_SUCESS,
  payload,
});

const actionRequestBegin = () => ({
  type: REQUEST_BEGIN,
});

export const actionFetchCurrency = () => async (dispatch) => {
  dispatch(actionRequestBegin());
  const result = await fetchApi();
  dispatch(actionRequestSucess(result));
};

export const actionDeleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const actionEditExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const actionSubmitEdit = (expense) => ({
  type: SUBMIT_EDIT,
  expense,
});

export const actionAddCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  currencies,
});
