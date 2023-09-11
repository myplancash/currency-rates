// import { useEffect } from "react";
import { RateTable } from "./RateTable";
import { useSelector } from "react-redux";
import { CurrencyCodePicker } from "./CurrencyCodePicker";
import { AmountField } from "./AmountField";

import { 
  getAmount,
  getCurrencyCode,
  getCurrencyData,
} from '../store/rates';

export function ExchangeRate() {
  /* const [amount, setAmount] = useState("1.50");
  const [currencyCode, setCurrencyCode] = useState("USD"); */
  const amount = useSelector(getAmount)
  const currencyCode = useSelector(getCurrencyCode)
  const currencyData = useSelector(getCurrencyData)

  // const dispatch = useDispatch();
  // const [currencyData, setCurrencyData] = useState({ USD: 1.0 });

  // fetch the exchange rates each time currency code changes
  /* useEffect(() => {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      setCurrencyData(rates);
    });
  }, [currencyCode]);
   */

  /* useEffect(() => {
    dispatch(changeCurrencyCode(currencyCode))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 */
  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates{" "}
          <CurrencyCodePicker 
            currencyCode={currencyCode}
          />
        </h1>
      </section>
      <section>
        <AmountField amount={amount}/>
      </section>
      <section>
        <RateTable currencyData={currencyData} amount={amount} />
      </section>
    </>
  );
}
