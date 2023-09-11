import { useDispatch, useSelector } from 'react-redux';
import { changeCurrencyCode, getSupportedCurrencies } from "../store/rates";

export function CurrencyCodePicker({currencyCode}) {
  const  dispatch = useDispatch();
  const supportedCurrencies = useSelector(getSupportedCurrencies)

  const onChange = (e) => {
    const newCurrency = e.target.value;
    dispatch(changeCurrencyCode(newCurrency))
  }

  return (
    <select className="currencyCode" value={currencyCode} onChange={onChange}>
      {supportedCurrencies.map((code) => (
        <option value={code}>
          {code}
        </option>
      ))}
    </select>
  );
}
