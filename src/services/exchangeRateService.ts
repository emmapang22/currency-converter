const EXCHANGE_RATE_API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const API_ENDPOINT = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair`;

export const getCurrencyExchangeRate = async (
  firstCurrency: string = "SEK",
  secondCurrency: string = "USD",
  amount: string = "100", // 100 SEK
) => {
  if (!EXCHANGE_RATE_API_KEY) {
    throw new Error("Key is not defined");
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/${firstCurrency}/${secondCurrency}/${amount}`,
    );

    if (!response.ok)
      throw new Error(`Failed to fetch data: ${response.status}`);

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    throw new Error(`Could not get data from Exhange Rate API: ${error}`);
  }
};
