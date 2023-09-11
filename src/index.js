import React from "react";
import ReactDOM from "react-dom";
import { ExchangeRate } from "./components/ExchangeRate";
import "./style.css";
import { store } from './store/store';
import { Provider } from 'react-redux';
import { getInitialRatesThunk } from './store/rates';

//rather than use the useEffect() hook
store.dispatch(getInitialRatesThunk)

ReactDOM.render(
  <Provider store={store}>
    <ExchangeRate />
  </Provider>, 
  document.getElementById("root")
);
