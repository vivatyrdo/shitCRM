(() => {
  const config = window.STUPIDMONOLOG_CONFIG || { apiBaseUrl: '/api/v1', demoMode: true };
  const storageKey = 'stupidmonolog.accounting.settings';
  const defaultSettings = {
    currency: 'RUB',
    updateMode: 'bestchange',
    ratesRubPerUnit: { RUB: 1, USD: 92.4, KZT: 0.19 },
    updatedAt: '2026-10-03T10:00:00.000Z'
  };

  const copy = value => JSON.parse(JSON.stringify(value));

  function getCachedSettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return {
        ...copy(defaultSettings),
        ...stored,
        updateMode: stored.updateMode === 'manual' ? 'manual' : 'bestchange',
        ratesRubPerUnit: { ...defaultSettings.ratesRubPerUnit, ...stored.ratesRubPerUnit }
      };
    } catch {
      return copy(defaultSettings);
    }
  }

  function saveCachedSettings(settings) {
    const next = { ...getCachedSettings(), ...copy(settings), updatedAt: new Date().toISOString() };
    localStorage.setItem(storageKey, JSON.stringify(next));
    return next;
  }

  async function request(path, options = {}) {
    if (config.demoMode) {
      if (path === '/accounting/settings' && (!options.method || options.method === 'GET')) {
        return getCachedSettings();
      }
      if (path === '/accounting/settings' && options.method === 'PUT') {
        return saveCachedSettings(options.body);
      }
      if (path.startsWith('/accounting/exchange-rates?') && (!options.method || options.method === 'GET')) {
        const settings = getCachedSettings();
        return {
          source: 'bestchange',
          demo: true,
          baseCurrency: 'RUB',
          ratesRubPerUnit: settings.ratesRubPerUnit,
          updatedAt: settings.updatedAt
        };
      }
      throw new Error(`Нет демо-обработчика для ${path}`);
    }

    const response = await fetch(`${config.apiBaseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include'
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(payload?.message || `Ошибка запроса (${response.status})`);
    }
    return payload;
  }

  window.crmApi = {
    request,
    accounting: {
      getCachedSettings,
      getSettings: () => request('/accounting/settings'),
      saveSettings: settings => request('/accounting/settings', { method: 'PUT', body: settings }),
      getExchangeRates: ({ base = 'RUB', quotes = ['USD', 'KZT'] } = {}) => {
        const query = new URLSearchParams({ base, quotes: quotes.join(','), source: 'bestchange' });
        return request(`/accounting/exchange-rates?${query}`);
      }
    }
  };
})();
