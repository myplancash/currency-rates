import { getName } from "../store/user"
import { useSelector } from 'react-redux';
import { getCurrencyData, getDisplayLabel } from "../store/rates";

export function RateTable({ amount }) {
  const currencyData = useSelector(getCurrencyData);
  const displayLabel = useSelector(getDisplayLabel);
  const name = useSelector(getName)
  console.log(displayLabel)
  
  return (
    <table className="ExchangeRate-table">
      <tbody>
      
        {Object.values(currencyData).map(({code, rate}) => {
          // NOTE: normally avoid floating point math in JS
          const exchangeAmount = amount * rate || 0.0;
          return (
            <>
              <tr key={code}>
                <td>{code}</td>
                <td>
                  {exchangeAmount.toLocaleString("en", {
                    style: "currency",
                    currency: code,
                  })}
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>made by {name}</td>
        </tr>
      </tfoot>
    </table>
  );
}
