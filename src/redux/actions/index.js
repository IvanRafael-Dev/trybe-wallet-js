export const currenciesFetchUrl = 'https://economia.awesomeapi.com.br/json/all';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_CURRENCIES_FAIL = 'SET_CURRENCIES_FAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SET_EDITING_EXPENSE = 'SET_EDITING_EXPENSE';
export const FINISH_EDITING_EXPENSE = 'FINISH_EDITING_EXPENSE';
export const SET_TOTAL_VALUE = 'SET_TOTAL_VALUE';

export const setLoginEmail = (email) => ({
  type: SET_EMAIL,
  email,
});

export const setCurrenciesOnSuccess = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const setCurrenciesOnFail = (currencies) => ({
  type: SET_CURRENCIES_FAIL,
  currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});

export const setEditingExpense = (expense) => ({
  type: SET_EDITING_EXPENSE,
  expense,
});

export const finishEditingExpense = (expense) => ({
  type: FINISH_EDITING_EXPENSE,
  expense,
});

export const setTotalValue = () => ({
  type: SET_TOTAL_VALUE,
});

export const dispatchEditedExpense = (expense) => (dispatch) => {
  dispatch(finishEditingExpense(expense));
  dispatch(setTotalValue());
};

export const dispatchDeleteExpense = (expenseId) => (dispatch) => {
  dispatch(deleteExpense(expenseId));
  dispatch(setTotalValue());
};

export const addExpenseFetchingCurrencies = (expense) => async (dispatch) => {
  try {
    const response = await fetch(currenciesFetchUrl);
    const currencies = await response.json();
    dispatch(addExpense({ ...expense, exchangeRates: currencies }));
    dispatch(setTotalValue());
  } catch (error) {
    console.log(error);
    dispatch(setCurrenciesOnFail(error));
  }
};

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch(currenciesFetchUrl);
    const currencies = await response.json();
    delete currencies.USDT;
    const currenciesKeysArray = Object.keys(currencies);
    dispatch(setCurrenciesOnSuccess(currenciesKeysArray));
  } catch (error) {
    dispatch(setCurrenciesOnFail(error));
  }
};
