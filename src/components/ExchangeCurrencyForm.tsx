import { currenciesList } from "../data/currencies";
import { getCurrencyExchangeRate } from "../services/exchangeRateService";
import { useState } from "react";

type ExchangeRate = {
  conversion_result: number;
};

export default function ExchangeCurrencyForm() {
  const [firstCurrency, setFirstCurrency] = useState("SEK");
  const [firstAmount, setFirstAmount] = useState("");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [secondAmount, setSecondAmount] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const data: ExchangeRate = await getCurrencyExchangeRate(
      firstCurrency,
      secondCurrency,
      firstAmount,
    );

    setSecondAmount(String(parseFloat(data.conversion_result.toFixed(4))));
  };

  const handleSwitchCurrency = () => {
    setFirstCurrency(secondCurrency);
    setFirstAmount(secondAmount);
    setSecondCurrency(firstCurrency);
    setSecondAmount(firstAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <fieldset>
        <legend>Från</legend>
        <label htmlFor="firstCurrency" className="sr-only">
          Välj valuta
        </label>
        <select
          name="firstCurrency"
          id="firstCurrency"
          value={firstCurrency}
          onChange={(e) => setFirstCurrency(e.target.value)}
        >
          {currenciesList.map((c) => (
            <option value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor="amount" className="sr-only">
          Belopp
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Belopp"
          value={firstAmount}
          onChange={(e) => setFirstAmount(e.target.value)}
        />
      </fieldset>

      <button type="button" onClick={handleSwitchCurrency}>
        Change
      </button>

      <fieldset>
        <legend>Till</legend>

        <label htmlFor="secondCurrency" className="sr-only">
          Välj valuta
        </label>
        <select
          name="secondCurrency"
          id="secondCurrency"
          value={secondCurrency}
          onChange={(e) => setSecondCurrency(e.target.value)}
        >
          {currenciesList.map((c) => (
            <option value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor="convertedAmount" className="sr-only">
          Belopp
        </label>
        <input
          type="number"
          name="convertedAmount"
          id="convertedAmount"
          placeholder="Belopp"
          readOnly
          value={secondAmount}
        />
      </fieldset>

      <button>Omvandla</button>
    </form>
  );
}
