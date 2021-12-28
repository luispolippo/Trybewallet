import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionSetUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateInputs();
    });
  }

  handleOnClick() {
    const { history, submit } = this.props;
    const { email } = this.state;
    submit(email);
    history.push('/carteira');
  }

  validateInputs() {
    const { email, password } = this.state;
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com/i;
    const passwordMinimumLength = 6;
    const isEmailOk = regexEmail.test(email);
    const isPasswordOk = password.length >= passwordMinimumLength;
    if (isEmailOk && isPasswordOk) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { isDisable, email, password } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="email-input"
          placeholder="email"
          name="email"
          value={ email }
          onChange={ this.handleOnChange }
        />
        <input
          type="text"
          data-testid="password-input"
          placeholder="senha"
          name="password"
          value={ password }
          onChange={ this.handleOnChange }
        />
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.handleOnClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (email) => dispatch(actionSetUser(email)),
});

Login.propTypes = {
  submit: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
