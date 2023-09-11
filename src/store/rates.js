import { getExchangeRates } from "../api";

const initialState = {
  amount: "19.50",
  currencyCode: "USD",
  currencyData: { USD: { displayLabel: "US Dollars", code: "USD", rate: 1.0 }},
  supportedCurrencies: ["USD", "EUR", "JPY", "CAD", "GBP", "MXN"]
}

export function ratesReducer(state = initialState, action) {
  switch(action.type) {
    case AMOUNT_CHANGED:
      return {
        ...state,
        amount: action.payload
      }
    case CURRENCY_CODE_CHANGED:
      return {
        ...state,
        currencyCode: action.payload
      }
    case LABEL_RECEIVED: {
      const { currencyCode, displayLabel } = action.payload
      return {
        ...state,
        currencyData: {
          [currencyCode]: {
            ...state.currencyData[currencyCode],
            displayLabel
          } 
        }
      }
    }
    case RATES_RECEIVED: {
      const codes = Object.keys(action.payload).concat(state.currencyCode)
      const currencyData = {};

      for(let code in action.payload) {
        currencyData[code] = {code, rate: action.payload[code]}
      }
      return {
        ...state,
        currencyData,
        supportedCurrencies: codes
      }
    }
    default:
      return state
  }
} 

// STATE SELECTORS functions
export const getAmount = (state) => state.rates.amount
export const getCurrencyCode = (state) => state.rates.currencyCode
export const getCurrencyData = (state) => state.rates.currencyData
export const getSupportedCurrencies = (state) => state.rates.supportedCurrencies
export const getDisplayLabel = (state, currencyCode) => {
  const match = state.rates.currencyData[currencyCode]
  if(match) return match.displayLabel
}


// ACTION TYPES CONSTANTS
export const AMOUNT_CHANGED = "rates/amount"
export const CURRENCY_CODE_CHANGED = "rates/currencyCode"
export const RATES_RECEIVED = "rates/currencyData"
export const LABEL_RECEIVED = "rates/labelReceived"


// ACTION CREATORS
export const changeAmount = (amount) => ({
  type: AMOUNT_CHANGED,
  payload: amount
})

// make the API call so we can update this list to ensure only currency code found in our response are actually included in our ddropdown list

export const changeCurrencyCode = (currencyCode) => (dispatch, getState) => {
  const state = getState();
  const supportedCurrencies = getSupportedCurrencies(state)
  dispatch({
    type: CURRENCY_CODE_CHANGED,
    payload: currencyCode
  })
  getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
    dispatch({
      type: RATES_RECEIVED,
      payload: rates
    })
  })
}

//middleware thunk 
export function getInitialRatesThunk(dispatch, getState) {
  const state = getState();
  const currencyCode = getCurrencyCode(state);
  dispatch(changeCurrencyCode(currencyCode))
}