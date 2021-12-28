// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER } from '../actions/actionTypes';

const initialState = {
  email: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
