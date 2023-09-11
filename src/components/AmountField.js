import { useDispatch } from 'react-redux';
import { changeAmount } from '../store/rates'; 

export function AmountField({ amount }) {
  const dispatch = useDispatch()

  const onChange = (e) => {
    let newAmount = e.target.value;
    dispatch(changeAmount(newAmount))
  };

  return (
    <form className="ExchangeRate-form">
      <input
        aria-label="Amount in base currency"
        type="text"
        value={amount}
        onChange={onChange}
      />
    </form>
  );
}
