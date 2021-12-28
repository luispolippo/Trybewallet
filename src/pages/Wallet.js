import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpendForm from '../components/ExpendForm';
import Table from '../components/Table';
import EditExpendForm from '../components/EditExpendForm';
import { actionAddCurrencies, actionFetchCurrency } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getExchangeRate } = this.props;
    await getExchangeRate();
    this.setupCurrencyCoins();
  }

  setupCurrencyCoins() {
    const { exchangeRates, getCurrencies } = this.props;
    const coinsArray = Object.keys(exchangeRates);
    const coinsArrayFiltered = coinsArray.filter((coin) => coin !== 'USDT');
    getCurrencies(coinsArrayFiltered);
  }

  render() {
    const { isEditing } = this.props;
    return (
      <main>
        <Header />
        {
          isEditing ? <EditExpendForm /> : <ExpendForm />
        }
        <Table />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  getExchangeRate: () => dispatch(actionFetchCurrency()),
  getCurrencies: (currencies) => dispatch(actionAddCurrencies(currencies)),
});

Wallet.propTypes = {
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  getExchangeRate: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
