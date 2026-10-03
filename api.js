(() => {
  const config = window.STUPIDMONOLOG_CONFIG;

  async function get(path) {
    const response = await fetch(`${config.apiBaseUrl}${path}`, {
      headers: { Accept: "application/json" },
      credentials: "include",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || `Ошибка запроса (${response.status})`);
    }

    return data;
  }

  window.crmApi = {
    get,
    accounting: {
      getExchangeRates() {
        const query = new URLSearchParams({
          base: "RUB",
          quotes: "USD,KZT",
          source: "bestchange",
        });

        return get(`/accounting/exchange-rates?${query}`);
      },
    },
  };
})();
