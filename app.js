const pageRoot = document.getElementById("pageRoot");
const modalLayer = document.getElementById("modalLayer");
const toastRegion = document.getElementById("toastRegion");
let billingTab = "overview";
let contextChatStarted = false;
let currentPage = "overview";
let currentMode = "crm";
let campaignStep = 1;
let recipientSource = "paste";
let campaignDraft = {
  name: "Новая Telegram-рассылка",
  channel: "Telegram · @northstar_support",
  recipients: "",
  count: 0,
  message:
    "Здравствуйте, {{имя}}! Делимся новостями и специальным предложением для наших клиентов.",
  fileName: "",
  schedule: "now",
  scheduleAt: "",
};
let contacts = [
  [
    "АК",
    "Анна Крылова",
    "anna.krylova@mail.ru",
    "Telegram",
    "Клиент",
    "Сегодня, 10:42",
  ],
  [
    "МС",
    "Михаил Соколов",
    "+7 916 204-18-52",
    "WhatsApp",
    "Лид",
    "Сегодня, 09:18",
  ],
  [
    "ЕВ",
    "Елена Волкова",
    "elena.v@company.ru",
    "Telegram",
    "Клиент",
    "Вчера, 18:05",
  ],
  [
    "ДП",
    "Дмитрий Павлов",
    "+7 903 511-09-77",
    "WhatsApp",
    "Новый",
    "Вчера, 16:32",
  ],
  [
    "ОВ",
    "Ольга Белова",
    "olga.b@inbox.ru",
    "Telegram",
    "Клиент",
    "Вчера, 14:11",
  ],
];
let deals = [
  {
    id: "d1",
    title: "Подключение отдела продаж",
    person: "Анна Крылова",
    value: 285000,
    stage: "Новый запрос",
    date: "Сегодня",
    channel: "Telegram",
    next: "Подготовить первичное предложение",
  },
  {
    id: "d2",
    title: "Годовой тариф",
    person: "Михаил Соколов",
    value: 420000,
    stage: "Новый запрос",
    date: "Сегодня",
    channel: "WhatsApp",
    next: "Назначить знакомство",
  },
  {
    id: "d3",
    title: "Расширение лицензий",
    person: "Елена Волкова",
    value: 165000,
    stage: "В работе",
    date: "Завтра",
    channel: "Telegram",
    next: "Отправить расчёт",
  },
  {
    id: "d4",
    title: "Внедрение CRM",
    person: "Дмитрий Павлов",
    value: 610000,
    stage: "В работе",
    date: "15 апр",
    channel: "WhatsApp",
    next: "Согласовать состав проекта",
  },
  {
    id: "d5",
    title: "Поддержка команды",
    person: "Ольга Белова",
    value: 98000,
    stage: "На согласовании",
    date: "16 апр",
    channel: "Telegram",
    next: "Ожидаем решение",
  },
  {
    id: "d6",
    title: "Пилотный проект",
    person: "Сергей Морозов",
    value: 240000,
    stage: "На согласовании",
    date: "17 апр",
    channel: "Telegram",
    next: "Уточнить сроки запуска",
  },
  {
    id: "d7",
    title: "Лицензии на год",
    person: "Наталья Орлова",
    value: 320000,
    stage: "Успешно завершено",
    date: "Вчера",
    channel: "WhatsApp",
    next: "Передать в сопровождение",
  },
  {
    id: "d8",
    title: "Консультация",
    person: "Павел Егоров",
    value: 45000,
    stage: "Закрыто без сделки",
    date: "12 апр",
    channel: "Telegram",
    next: "Повторный контакт в июне",
  },
];

const integrationData = [
  {
    name: "WhatsApp Business",
    category: "Мессенджеры",
    icon: "bi-whatsapp",
    tone: "whatsapp",
    desc: "Диалоги с клиентами и отправка шаблонных сообщений.",
    connected: true,
    detail: "Основной номер · +7 999 120-45-67",
  },
  {
    name: "Telegram",
    category: "Мессенджеры",
    icon: "bi-telegram",
    tone: "telegram",
    desc: "Личные диалоги и рассылки подписчикам.",
    connected: true,
    detail: "@northstar_support",
  },
  {
    name: "Telegram Bot",
    category: "Мессенджеры",
    icon: "bi-robot",
    tone: "bot",
    desc: "Автоматические ответы, формы и триггерные сообщения.",
    connected: false,
  },
  {
    name: "Bitrix24",
    category: "CRM-системы",
    icon: "bi-boxes",
    tone: "bitrix",
    desc: "Синхронизация лидов, сделок, контактов и событий.",
    connected: true,
    detail: "northstar.bitrix24.ru",
  },
  {
    name: "amoCRM",
    category: "CRM-системы",
    icon: "bi-hexagon",
    tone: "amo",
    desc: "Контакты, сделки и история общения в одной карточке.",
    connected: false,
  },
  {
    name: "ВКонтакте",
    category: "Мессенджеры",
    icon: "bi-chat-dots",
    tone: "vk",
    desc: "Сообщения сообщества и уведомления подписчикам.",
    connected: false,
  },
  {
    name: "Email",
    category: "Каналы",
    icon: "bi-envelope",
    tone: "email",
    desc: "Почтовый канал для сервисных и массовых писем.",
    connected: false,
  },
  {
    name: "Webhook",
    category: "Другие сервисы",
    icon: "bi-braces",
    tone: "webhook",
    desc: "Передавайте события в собственные сервисы и системы.",
    connected: false,
  },
];

const labels = {
  overview: "Главная",
  inbox: "Диалоги",
  contacts: "Контакты",
  pipeline: "Сделки",
  campaigns: "Рассылки",
  integrations: "Интеграции",
  automation: "Сценарии",
  accounting: "Бухгалтерия",
  settings: "Настройки",
  assistant: "AI-ассистент",
};
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

function setPage(page) {
  if (page !== "assistant" && currentMode === "ai") {
    currentMode = "crm";
    document
      .querySelectorAll(".mode-option")
      .forEach((option) =>
        option.classList.toggle("selected", option.dataset.mode === "crm"),
      );
  }
  currentPage = page;
  document.getElementById("crumb").textContent =
    page === "assistant" ? "AI-ассистент" : labels[page] || "Главная";
  document
    .querySelectorAll(".nav-link[data-page]")
    .forEach((link) =>
      link.classList.toggle("active", link.dataset.page === page),
    );
  document.body.classList.toggle("ai-page-active", currentMode === "ai");
  pageRoot.innerHTML =
    currentMode === "ai"
      ? renderAssistant()
      : (pages[page] || pages.overview)();
  document.getElementById("sidebar").classList.remove("mobile-open");
  updateContextAssistant();
  if (page === "campaigns") wireCampaign();
  if (page === "pipeline") wirePipeline();
  if (page === "accounting") mountAccountingPage();
}

function setMode(mode) {
  currentMode = mode;
  if (mode === "ai") setContextChatOpen(false);
  document
    .querySelectorAll(".mode-option")
    .forEach((option) =>
      option.classList.toggle("selected", option.dataset.mode === mode),
    );
  setPage(
    mode === "ai"
      ? "assistant"
      : currentPage === "assistant"
        ? "overview"
        : currentPage,
  );
}
function countRecipients(value) {
  const parts = campaignDraft.channel.startsWith("WhatsApp")
    ? value.split(/[\n,;]+/)
    : value.split(/[\n,;\s]+/);
  return parts.filter((item) => item.trim()).length;
}

function pageHeader(_eyebrow, title, _description, actions = "") {
  return `<div class="page-heading"><h1>${title}</h1><div class="heading-actions">${actions}</div></div>`;
}
function iconButton(icon, title, action = "") {
  return `<button class="icon-button" title="${title}" ${action ? `data-action="${action}"` : ""}><i class="bi ${icon}"></i></button>`;
}
function renderOverview() {
  return `${pageHeader("ПОНЕДЕЛЬНИК, 14 АПРЕЛЯ", "Доброе утро, Мария", "Все важные события и каналы вашей команды в одном месте.", `<button class="button button-secondary" data-page-go="integrations"><i class="bi bi-plug"></i> Интеграции</button><button class="button button-primary" data-page-go="campaigns"><i class="bi bi-plus-lg"></i> Создать рассылку</button>`)}
  <section class="metric-grid"><article class="metric"><span>Активные диалоги</span><strong>186</strong><small class="trend up"><i class="bi bi-arrow-up-right"></i> 12,4% <span>за 30 дней</span></small><i class="bi bi-chat-square-text metric-icon"></i></article><article class="metric"><span>Контакты</span><strong>${contacts.length + 1243}</strong><small class="trend up"><i class="bi bi-arrow-up-right"></i> 8,1% <span>за 30 дней</span></small><i class="bi bi-people metric-icon"></i></article><article class="metric"><span>Доставлено за месяц</span><strong>12 840</strong><small class="trend up"><i class="bi bi-arrow-up-right"></i> 6,2% <span>к прошлому месяцу</span></small><i class="bi bi-send metric-icon"></i></article><article class="metric"><span>Подключено каналов</span><strong>3 <span class="metric-total">/ 8</span></strong><small><button class="inline-action" data-page-go="integrations">Настроить каналы <i class="bi bi-arrow-right"></i></button></small><i class="bi bi-plug metric-icon"></i></article></section>
  <div class="overview-grid"><section class="panel activity-panel"><div class="panel-head"><div><h2>Активность рассылок</h2><p>Доставка сообщений по каналам</p></div><button class="select-control">Последние 7 дней <i class="bi bi-chevron-down"></i></button></div><div class="chart-legend"><span><i class="legend-dot sent"></i>Отправлено</span><span><i class="legend-dot delivered"></i>Доставлено</span></div><div class="bar-chart"><div class="chart-labels"><span>4 000</span><span>3 000</span><span>2 000</span><span>1 000</span><span>0</span></div><div class="chart-bars"><div class="chart-lines"><i></i><i></i><i></i><i></i><i></i></div>${[
    ["Пн", 53, 44],
    ["Вт", 70, 61],
    ["Ср", 62, 53],
    ["Чт", 82, 72],
    ["Пт", 74, 65],
    ["Сб", 42, 35],
    ["Вс", 57, 49],
  ]
    .map(
      ([day, a, b]) =>
        `<div class="bar-group"><div class="bars"><i style="height:${a}%"></i><i style="height:${b}%"></i></div><small>${day}</small></div>`,
    )
    .join(
      "",
    )}</div></div><div class="chart-foot"><span>Всего за период</span><strong>8 420 сообщений</strong><span class="positive-text">95,2% доставлено</span></div></section>
  <section class="panel channel-panel"><div class="panel-head"><div><h2>Подключённые каналы</h2><p>Статус синхронизации</p></div><button class="text-link" data-page-go="integrations">Все каналы <i class="bi bi-arrow-right"></i></button></div><div class="channel-list">${integrationData
    .filter((x) => x.connected)
    .map(
      (item) =>
        `<div class="channel-row"><span class="service-icon ${item.tone}"><i class="bi ${item.icon}"></i></span><span class="channel-copy"><strong>${item.name}</strong><small>${item.detail}</small></span><span class="live-state"><i></i>Активен</span></div>`,
    )
    .join(
      "",
    )}</div><button class="button button-secondary button-wide" data-page-go="integrations"><i class="bi bi-plus-lg"></i> Подключить канал</button></section>
  <section class="panel table-panel"><div class="panel-head"><div><h2>Последние кампании</h2><p>Статус и результат отправки</p></div><button class="text-link" data-page-go="campaigns">Все рассылки <i class="bi bi-arrow-right"></i></button></div>${campaignTable()}</section>
  <section class="panel task-panel"><div class="panel-head"><div><h2>Нужно внимания</h2><p>События, которые требуют решения</p></div><span class="attention-count">3</span></div><div class="attention-list"><button data-page-go="integrations"><span class="attention-icon amber"><i class="bi bi-arrow-repeat"></i></span><span><strong>Синхронизация с amoCRM</strong><small>Подключите аккаунт, чтобы обновлять сделки</small></span><i class="bi bi-chevron-right"></i></button><button data-page-go="inbox"><span class="attention-icon blue"><i class="bi bi-chat-dots"></i></span><span><strong>8 диалогов без ответа</strong><small>Самый ранний: 24 минуты назад</small></span><i class="bi bi-chevron-right"></i></button><button data-page-go="campaigns"><span class="attention-icon green"><i class="bi bi-check2-circle"></i></span><span><strong>Кампания завершена</strong><small>«Апрельское обновление» · отчёт готов</small></span><i class="bi bi-chevron-right"></i></button></div></section></div>`;
}

function campaignTable() {
  const rows = [
    [
      "Апрельское обновление",
      "Telegram",
      "Завершена",
      "2 418",
      "96,4%",
      "Сегодня, 10:30",
    ],
    [
      "Напоминание о записи",
      "WhatsApp",
      "Отправляется",
      "842",
      "92,1%",
      "Сегодня, 09:45",
    ],
    [
      "Новые условия программы",
      "Telegram",
      "Завершена",
      "1 206",
      "94,8%",
      "Вчера, 16:20",
    ],
  ];
  return `<div class="data-wrap"><table class="data-table"><thead><tr><th>Название</th><th>Канал</th><th>Статус</th><th>Получатели</th><th>Доставка</th><th>Запуск</th></tr></thead><tbody>${rows.map((r) => `<tr><td><button class="table-title" data-page-go="campaigns">${r[0]}</button></td><td><span class="channel-cell"><i class="bi ${r[1] === "Telegram" ? "bi-telegram" : "bi-whatsapp"}"></i>${r[1]}</span></td><td><span class="status-pill ${r[2] === "Завершена" ? "complete" : "running"}"><i></i>${r[2]}</span></td><td>${r[3]}</td><td>${r[4]}</td><td class="muted-cell">${r[5]}</td></tr>`).join("")}</tbody></table></div>`;
}

function renderIntegrations() {
  return `${pageHeader("КАНАЛЫ И СИСТЕМЫ", "Интеграции", "Подключите сервисы, чтобы сообщения и данные клиентов были в одном рабочем пространстве.", `<button class="button button-secondary" data-action="sync"><i class="bi bi-arrow-repeat"></i> Синхронизировать</button>`)}
 <div class="integration-summary"><div class="summary-main"><span class="summary-check"><i class="bi bi-check-lg"></i></span><span><strong>3 сервиса подключено</strong><small>Данные синхронизируются автоматически</small></span></div><button class="text-link" data-action="sync">История синхронизации <i class="bi bi-arrow-right"></i></button></div>
 <div class="integration-toolbar"><div class="filter-tabs"><button class="filter-tab active" data-filter="Все">Все <span>8</span></button><button class="filter-tab" data-filter="Мессенджеры">Мессенджеры</button><button class="filter-tab" data-filter="CRM-системы">CRM-системы</button><button class="filter-tab" data-filter="Каналы">Каналы</button><button class="filter-tab" data-filter="Другие сервисы">Другие</button></div><label class="small-search"><i class="bi bi-search"></i><input id="integrationSearch" placeholder="Поиск сервисов" /></label></div>
 <div class="integration-grid" id="integrationGrid">${integrationData.map(integrationCard).join("")}</div>
 <section class="sync-panel"><div class="sync-panel-icon"><i class="bi bi-arrow-left-right"></i></div><div class="sync-panel-copy"><h2>Данные остаются согласованными</h2><p>Выберите, какие записи обновлять между StupidMonolog и подключёнными CRM. История изменений сохраняется в карточке контакта.</p></div><button class="button button-secondary" data-modal="syncSettings"><i class="bi bi-sliders"></i> Настроить синхронизацию</button></section>`;
}
function integrationCard(item) {
  return `<article class="integration-card" data-category="${item.category}" data-service="${item.name.toLowerCase()}"><div class="integration-card-top"><span class="service-icon ${item.tone}"><i class="bi ${item.icon}"></i></span><span class="integration-category">${item.category}</span></div><h2>${item.name}</h2><p>${item.desc}</p>${item.connected ? `<div class="integration-connected"><span class="live-state"><i></i>Подключено</span><span>${item.detail}</span></div><div class="integration-card-actions"><button class="button button-secondary" data-service-action="settings" data-service-name="${item.name}">Настроить</button><button class="icon-button" title="Дополнительные действия" data-service-action="menu" data-service-name="${item.name}"><i class="bi bi-three-dots"></i></button></div>` : `<div class="integration-disconnected"><span>Не подключено</span><button class="button button-primary" data-service-action="connect" data-service-name="${item.name}">Подключить</button></div>`}</article>`;
}

function renderCampaigns() {
  const data = [
    [
      "Апрельское обновление",
      "Telegram",
      "Завершена",
      "2 418",
      "96,4%",
      "14 апр, 10:30",
    ],
    [
      "Напоминание о записи",
      "WhatsApp",
      "Отправляется",
      "842",
      "92,1%",
      "14 апр, 09:45",
    ],
    [
      "Новые условия программы",
      "Telegram",
      "Завершена",
      "1 206",
      "94,8%",
      "13 апр, 16:20",
    ],
    ["Возврат клиентов", "WhatsApp", "Черновик", "—", "—", "Изменено 12 апр"],
  ];
  return `${pageHeader("КОММУНИКАЦИИ", "Рассылки", "Создавайте сообщения, выбирайте аудиторию и отслеживайте доставку.", `<button class="button button-secondary" data-action="campaign-template"><i class="bi bi-file-earmark-text"></i> Шаблоны</button><button class="button button-primary" data-action="new-campaign"><i class="bi bi-plus-lg"></i> Создать рассылку</button>`)}
 <div class="campaign-metrics"><div><span>Всего отправлено</span><strong>12 840</strong><small>за последние 30 дней</small></div><div><span>Средняя доставка</span><strong>94,6%</strong><small class="positive-text"><i class="bi bi-arrow-up-right"></i> 2,8% к прошлому месяцу</small></div><div><span>Активные кампании</span><strong>1</strong><small>отправка идёт сейчас</small></div></div>
 <section class="panel campaign-list-panel"><div class="campaign-list-head"><div class="filter-tabs"><button class="filter-tab active" data-campaign-filter="Все">Все кампании <span>24</span></button><button class="filter-tab" data-campaign-filter="Активные">Активные</button><button class="filter-tab" data-campaign-filter="Черновики">Черновики</button><button class="filter-tab" data-campaign-filter="Завершённые">Завершённые</button></div><div class="list-tools"><label class="small-search"><i class="bi bi-search"></i><input placeholder="Поиск рассылок" /></label><button class="icon-button" title="Фильтры"><i class="bi bi-funnel"></i></button></div></div><div class="data-wrap"><table class="data-table campaign-table"><thead><tr><th><input type="checkbox" aria-label="Выбрать все" /></th><th>Название кампании</th><th>Канал</th><th>Статус</th><th>Получатели</th><th>Доставлено</th><th>Дата запуска</th><th></th></tr></thead><tbody>${data.map((row, i) => `<tr data-campaign-status="${row[2]}"><td><input type="checkbox" aria-label="Выбрать кампанию" /></td><td><button class="table-title" data-action="campaign-report" data-name="${row[0]}">${row[0]}</button><small class="table-subline">Создала Мария Кузнецова</small></td><td><span class="channel-cell"><i class="bi ${row[1] === "Telegram" ? "bi-telegram" : "bi-whatsapp"}"></i>${row[1]}</span></td><td><span class="status-pill ${row[2] === "Завершена" ? "complete" : row[2] === "Черновик" ? "draft" : "running"}"><i></i>${row[2]}</span></td><td>${row[3]}</td><td>${row[4]}</td><td class="muted-cell">${row[5]}</td><td><button class="icon-button" title="Открыть меню"><i class="bi bi-three-dots"></i></button></td></tr>`).join("")}</tbody></table></div><div class="table-pagination"><span>Показано 4 из 24 кампаний</span><div><button class="icon-button" disabled><i class="bi bi-chevron-left"></i></button><button class="page-number active">1</button><button class="page-number">2</button><button class="page-number">3</button><button class="icon-button"><i class="bi bi-chevron-right"></i></button></div></div></section>`;
}

function renderContacts() {
  return `${pageHeader("КЛИЕНТСКАЯ БАЗА", "Контакты", "Контакты из всех каналов и подключённых CRM собраны в одном списке.", `<button class="button button-secondary" data-action="import-contacts"><i class="bi bi-upload"></i> Импортировать</button><button class="button button-primary" data-action="add-contact"><i class="bi bi-plus-lg"></i> Добавить контакт</button>`)}
 <div class="contact-metrics"><span><strong>1 248</strong> контактов</span><span><i class="bi bi-arrow-repeat"></i> Обновлено 2 минуты назад</span></div><section class="panel contacts-panel"><div class="contacts-toolbar"><div class="filter-tabs"><button class="filter-tab active">Все контакты <span>1 248</span></button><button class="filter-tab">Клиенты</button><button class="filter-tab">Лиды</button><button class="filter-tab">Без ответа</button></div><div class="list-tools"><label class="small-search"><i class="bi bi-search"></i><input id="contactSearch" placeholder="Имя, телефон или email" /></label><button class="button button-secondary" data-action="contact-filter"><i class="bi bi-funnel"></i> Фильтры</button></div></div><div class="data-wrap"><table class="data-table contact-table"><thead><tr><th><input type="checkbox" /></th><th>Контакт</th><th>Телефон / email</th><th>Канал</th><th>Статус</th><th>Последняя активность</th><th></th></tr></thead><tbody id="contactRows">${renderContactRows()}</tbody></table></div><div class="table-pagination"><span>Показано 5 из 1 248 контактов</span><div><button class="icon-button"><i class="bi bi-chevron-left"></i></button><button class="page-number active">1</button><button class="page-number">2</button><button class="page-number">3</button><button class="icon-button"><i class="bi bi-chevron-right"></i></button></div></div></section>`;
}
function renderContactRows() {
  return contacts
    .map(
      (row) =>
        `<tr><td><input type="checkbox" /></td><td><span class="contact-name"><i>${row[0]}</i><strong>${row[1]}</strong></span></td><td>${row[2]}</td><td><span class="channel-cell"><i class="bi ${row[3] === "Telegram" ? "bi-telegram" : "bi-whatsapp"}"></i>${row[3]}</span></td><td><span class="status-pill ${row[4] === "Клиент" ? "complete" : row[4] === "Лид" ? "running" : "draft"}"><i></i>${row[4]}</span></td><td class="muted-cell">${row[5]}</td><td><button class="icon-button" title="Открыть карточку" data-action="contact-card" data-name="${row[1]}"><i class="bi bi-chevron-right"></i></button></td></tr>`,
    )
    .join("");
}

const dealStages = [
  "Новый запрос",
  "В работе",
  "На согласовании",
  "Успешно завершено",
  "Закрыто без сделки",
];
function renderPipeline() {
  const total = deals.reduce((sum, deal) => sum + deal.value, 0);
  return `${pageHeader("ПРОДАЖИ", "Сделки", "Перемещайте сделки по этапам. Откройте карточку, чтобы увидеть клиента и продолжить общение.", `<button class="button button-secondary" data-action="pipeline-help"><i class="bi bi-info-circle"></i> Как это работает</button><button class="button button-primary" data-action="new-deal"><i class="bi bi-plus-lg"></i> Новая сделка</button>`)}<div class="pipeline-summary"><span><strong>${deals.length}</strong> сделок в работе</span><span>Общая сумма <strong>₽ ${total.toLocaleString("ru-RU")}</strong></span><span class="pipeline-tip"><i class="bi bi-hand-index-thumb"></i> Перетащите карточку, чтобы изменить этап</span></div><div class="kanban-board">${dealStages
    .map((stage, index) => {
      const stageDeals = deals.filter((deal) => deal.stage === stage);
      const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
      return `<section class="kanban-column" data-drop-stage="${stage}"><header><span class="stage-mark stage-${index}"></span><strong>${stage}</strong><span class="stage-count">${stageDeals.length}</span><button class="icon-button" title="Меню этапа"><i class="bi bi-three-dots"></i></button></header><div class="stage-total">₽ ${value.toLocaleString("ru-RU")}</div><div class="deal-list">${stageDeals
        .map(
          (deal) =>
            `<article class="deal-card" draggable="true" data-deal-id="${deal.id}" data-action="deal-detail"><div class="deal-card-top"><span>${deal.title}</span><button class="icon-button" title="Действия" data-action="deal-menu" data-deal-id="${deal.id}"><i class="bi bi-three-dots"></i></button></div><strong class="deal-value">₽ ${deal.value.toLocaleString("ru-RU")}</strong><div class="deal-client"><i>${deal.person
              .split(" ")
              .map((x) => x[0])
              .slice(0, 2)
              .join(
                "",
              )}</i><span>${deal.person}</span></div><div class="deal-next"><small>СЛЕДУЮЩИЙ ШАГ</small><span>${deal.next}</span></div><footer><span><i class="bi ${deal.channel === "Telegram" ? "bi-telegram" : "bi-whatsapp"}"></i>${deal.channel}</span><span><i class="bi bi-calendar3"></i>${deal.date}</span></footer></article>`,
        )
        .join(
          "",
        )}<button class="add-deal" data-action="new-deal" data-stage="${stage}"><i class="bi bi-plus"></i> Добавить сделку</button></div></section>`;
    })
    .join("")}</div>`;
}

function showContactDetail(name) {
  const contact = contacts.find((row) => row[1] === name) || [
    String(name || "Клиент")
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name || "Клиент",
    "Данные не синхронизированы",
    "Telegram",
    "Лид",
    "Нет активности",
  ];
  modalLayer.innerHTML = `<section class="contact-detail-modal"><header class="detail-header"><div><div class="eyebrow">КАРТОЧКА КЛИЕНТА</div><h2>${esc(contact[1])}</h2></div><div class="detail-header-actions"><button class="button button-secondary" data-action="edit-contact"><i class="bi bi-pencil"></i> Изменить</button>${iconButton("bi-x-lg", "Закрыть", "close-modal")}</div></header><div class="detail-grid"><aside class="detail-info"><div class="detail-avatar">${esc(contact[0])}</div><strong>${esc(contact[1])}</strong><span class="status-pill complete"><i></i>${esc(contact[4])}</span><div class="detail-fields"><div><small>Телефон / email</small><strong>${esc(contact[2])}</strong></div><div><small>Предпочитаемый канал</small><strong><i class="bi ${contact[3] === "Telegram" ? "bi-telegram telegram-text" : "bi-whatsapp whatsapp-text"}"></i> ${contact[3]}</strong></div><div><small>Ответственный</small><strong>Мария Кузнецова</strong></div><div><small>Последняя активность</small><strong>${esc(contact[5])}</strong></div><div><small>Источник</small><strong>${contact[3]} · синхронизирован</strong></div></div><div class="detail-related"><small>СДЕЛКИ</small>${
    deals
      .filter((deal) => deal.person === contact[1])
      .map(
        (deal) =>
          `<button class="related-deal" data-action="deal-detail" data-deal-id="${deal.id}"><span>${esc(deal.title)}</span><strong>₽ ${deal.value.toLocaleString("ru-RU")}</strong></button>`,
      )
      .join("") || '<span class="empty-related">Пока нет сделок</span>'
  }<button class="text-link" data-action="new-deal-for-contact" data-name="${esc(contact[1])}"><i class="bi bi-plus"></i> Добавить сделку</button></div></aside><section class="detail-conversation"><div class="detail-tabs"><button class="active" data-detail-tab="messages">Переписка</button><button data-detail-tab="activity">Активность</button><button data-detail-tab="notes">Заметки</button></div><div class="detail-message-list"><div class="thread-date">Сегодня, 14 апреля</div><div class="message incoming">Здравствуйте! Можно уточнить детали предложения?<small>10:42</small></div><div class="message outgoing">Конечно. Я собрала информацию по вашему проекту. Удобно обсудить сегодня после обеда?<small>10:48 · Доставлено</small></div><div class="message incoming">Да, давайте в 15:00<small>10:51</small></div></div><div class="detail-composer"><textarea id="contactReply" placeholder="Напишите сообщение клиенту…"></textarea><div><span><i class="bi bi-${contact[3] === "Telegram" ? "telegram" : "whatsapp"}"></i> Отправка через ${contact[3]}</span><button class="button button-primary" data-action="send-contact-message"><i class="bi bi-send"></i> Отправить</button></div></div></section></div></section>`;
  modalLayer.classList.add("open");
  modalLayer.setAttribute("aria-hidden", "false");
}

function renderInbox() {
  const messages = [
    [
      "АК",
      "Анна Крылова",
      "Telegram",
      "Подскажите, пожалуйста, можно перенести запись на пятницу?",
      "10:42",
      "new",
    ],
    [
      "МС",
      "Михаил Соколов",
      "WhatsApp",
      "Спасибо, получил предложение. Обсудим с командой.",
      "10:18",
      "new",
    ],
    [
      "ЕВ",
      "Елена Волкова",
      "Telegram",
      "Да, такой вариант мне подходит",
      "09:54",
      "",
    ],
    [
      "ДП",
      "Дмитрий Павлов",
      "WhatsApp",
      "Добрый день! Есть новости по заказу?",
      "09:32",
      "new",
    ],
    [
      "ОВ",
      "Ольга Белова",
      "Telegram",
      "Документы отправила на почту",
      "Вчера",
      "",
    ],
  ];
  return `${pageHeader("ЕДИНОЕ ОКНО", "Диалоги", "Переписки из мессенджеров и подключённых каналов.", `<button class="button button-secondary" data-page-go="integrations"><i class="bi bi-plug"></i> Управление каналами</button>`)}<div class="inbox-layout panel"><aside class="inbox-list"><div class="inbox-list-head"><h2>Входящие <span>8</span></h2><button class="icon-button"><i class="bi bi-sliders"></i></button></div><label class="small-search"><i class="bi bi-search"></i><input placeholder="Поиск диалогов" /></label><div class="inbox-filters"><button class="selected">Все</button><button>Неназначенные</button><button>Мои</button></div>${messages.map((m, i) => `<button class="conversation ${i === 0 ? "selected" : ""}"><i class="contact-initial">${m[0]}</i><span class="conversation-copy"><span><strong>${m[1]}</strong><small>${m[4]}</small></span><small class="conversation-channel"><i class="bi ${m[2] === "Telegram" ? "bi-telegram" : "bi-whatsapp"}"></i>${m[2]}</small><span class="conversation-message">${m[3]}</span></span>${m[5] ? '<b class="unread-dot"></b>' : ""}</button>`).join("")}</aside><section class="conversation-view"><div class="conversation-header"><i class="contact-initial">АК</i><span><strong>Анна Крылова</strong><small><i class="bi bi-telegram"></i> Telegram · Контакт синхронизирован</small></span><div class="conversation-actions"><button class="button button-secondary" data-action="assign"><i class="bi bi-person-plus"></i> Назначить</button><button class="icon-button" title="Карточка контакта"><i class="bi bi-layout-sidebar"></i></button><button class="icon-button" title="Еще"><i class="bi bi-three-dots"></i></button></div></div><div class="message-thread"><div class="thread-date">Сегодня, 14 апреля</div><div class="message incoming">Здравствуйте! Подскажите, пожалуйста, можно перенести запись на пятницу?<small>10:42</small></div><div class="message outgoing">Здравствуйте, Анна! Да, конечно. На какое время вам будет удобно?<small>10:47 · Доставлено</small></div><div class="message incoming">После обеда, примерно в 15:00<small>10:51</small></div><div class="thread-hint"><i class="bi bi-stars"></i> AI может подготовить ответ с учётом истории общения</div></div><div class="reply-box"><textarea placeholder="Напишите сообщение…"></textarea><div><div><button class="icon-button" title="Прикрепить файл"><i class="bi bi-paperclip"></i></button><button class="icon-button" title="Шаблоны"><i class="bi bi-file-earmark-text"></i></button><button class="icon-button" title="AI-помощник" data-mode="ai"><i class="bi bi-stars"></i></button></div><button class="button button-primary" data-action="send-reply">Отправить <i class="bi bi-arrow-up"></i></button></div></div></section><aside class="contact-aside"><div class="contact-profile"><i class="contact-initial large">АК</i><h3>Анна Крылова</h3><span>Клиент с 18 марта 2025</span></div><div class="profile-fields"><div><small>Телефон</small><strong>+7 999 567-12-31</strong></div><div><small>Email</small><strong>anna.krylova@mail.ru</strong></div><div><small>Ответственный</small><strong>Мария Кузнецова</strong></div><div><small>Источник</small><strong>Telegram</strong></div></div><button class="button button-secondary button-wide" data-action="contact-card">Открыть карточку клиента</button></aside></div>`;
}

function renderAutomation() {
  return `${pageHeader("АВТОМАТИЗАЦИЯ", "Сценарии", "Автоматизируйте повторяющиеся действия между каналами и CRM.", `<button class="button button-primary" data-action="new-automation"><i class="bi bi-plus-lg"></i> Новый сценарий</button>`)}<div class="automation-banner"><span class="banner-icon"><i class="bi bi-diagram-3"></i></span><div><strong>Свяжите события с действиями</strong><p>Например, создайте контакт в CRM, когда человек впервые написал в Telegram.</p></div><button class="button button-secondary" data-action="new-automation">Создать сценарий</button></div><div class="scenario-grid"><article class="scenario-card"><div class="scenario-top"><span class="scenario-icon blue"><i class="bi bi-chat-left-dots"></i></span><span class="live-state"><i></i>Активен</span></div><h2>Новый диалог → Bitrix24</h2><p>Создать лид и прикрепить источник обращения</p><div class="scenario-flow"><span><i class="bi bi-telegram"></i> Telegram</span><i class="bi bi-arrow-right"></i><span><i class="bi bi-boxes"></i> Bitrix24</span></div><small>Сработал 24 раза за 7 дней</small></article><article class="scenario-card"><div class="scenario-top"><span class="scenario-icon green"><i class="bi bi-person-check"></i></span><span class="live-state"><i></i>Активен</span></div><h2>Новая сделка → контакт</h2><p>Синхронизировать профиль клиента и сделку</p><div class="scenario-flow"><span><i class="bi bi-boxes"></i> Bitrix24</span><i class="bi bi-arrow-right"></i><span><i class="bi bi-people"></i> Контакты</span></div><small>Сработал 8 раз за 7 дней</small></article><article class="scenario-card scenario-add" data-action="new-automation"><span><i class="bi bi-plus-lg"></i></span><strong>Добавить сценарий</strong><small>Начните с простого шаблона</small></article></div>`;
}
function renderAccounting() {
  return `${pageHeader("ФИНАНСЫ", "Бухгалтерия", "", `<button class="button button-secondary" data-action="billing-export"><i class="bi bi-download"></i> Выгрузить отчёт</button>`)}<div class="billing-tabs"><button class="${billingTab === "overview" ? "active" : ""}" data-billing-tab="overview"><i class="bi bi-grid"></i> Обзор</button><button class="${billingTab === "plans" ? "active" : ""}" data-billing-tab="plans"><i class="bi bi-card-list"></i> Тарифы</button><button class="${billingTab === "payments" ? "active" : ""}" data-billing-tab="payments"><i class="bi bi-credit-card"></i> Оплаты</button><button class="${billingTab === "currency" ? "active" : ""}" data-billing-tab="currency"><i class="bi bi-currency-exchange"></i> Валюта</button></div><div id="billingContent">${billingContent()}</div>`;
}
function billingContentMarkup() {
  if (billingTab === "plans")
    return `<div class="current-plan-banner"><div><span class="plan-label">ТЕКУЩИЙ ТАРИФ</span><h2>Команда</h2><p>Для команды, которая работает с клиентами каждый день</p></div><div class="plan-price"><strong>14 900 ₽</strong><span>в месяц · до 10 пользователей</span><button class="button button-primary" data-action="plan-manage">Управлять тарифом</button></div></div><div class="plan-grid"><article class="plan-card"><span>Базовый</span><h3>4 900 ₽ <small>/ месяц</small></h3><p>Для небольшой команды</p><ul><li>До 3 пользователей</li><li>Контакты и сделки</li><li>2 интеграции</li></ul><button class="button button-secondary" data-action="plan-change" data-plan="Базовый">Выбрать тариф</button></article><article class="plan-card current"><span class="current-plan-tag">Текущий</span><span>Команда</span><h3>14 900 ₽ <small>/ месяц</small></h3><p>Для ежедневной работы с клиентами</p><ul><li>До 10 пользователей</li><li>Все каналы и рассылки</li><li>Синхронизация с CRM</li></ul><button class="button button-secondary" data-action="plan-manage">Ваш тариф</button></article><article class="plan-card"><span>Бизнес</span><h3>По запросу</h3><p>Для нескольких команд и филиалов</p><ul><li>Без ограничений по участникам</li><li>Приоритетная поддержка</li><li>Гибкие права доступа</li></ul><button class="button button-secondary" data-action="plan-change" data-plan="Бизнес">Связаться с нами</button></article></div>`;
  const paymentRows = [
    [
      "14 сен 2026",
      "Подписка «Команда»",
      "14 900 ₽",
      "Оплачено",
      "VISA ·· 4821",
    ],
    [
      "14 авг 2026",
      "Подписка «Команда»",
      "14 900 ₽",
      "Оплачено",
      "VISA ·· 4821",
    ],
    [
      "14 июл 2026",
      "Подписка «Команда»",
      "14 900 ₽",
      "Оплачено",
      "VISA ·· 4821",
    ],
    [
      "14 июн 2026",
      "Подписка «Команда»",
      "14 900 ₽",
      "Оплачено",
      "VISA ·· 4821",
    ],
  ];
  if (billingTab === "payments")
    return `<section class="panel payments-panel"><div class="billing-section-head"><div><h2>История оплат</h2><p>Платёжные документы за последние месяцы</p></div><button class="button button-secondary" data-action="payment-method"><i class="bi bi-credit-card"></i> Способ оплаты</button></div><div class="data-wrap"><table class="data-table"><thead><tr><th>Дата</th><th>Описание</th><th>Сумма</th><th>Статус</th><th>Способ оплаты</th><th></th></tr></thead><tbody>${paymentRows.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td><strong>${row[2]}</strong></td><td><span class="status-pill complete"><i></i>${row[3]}</span></td><td>${row[4]}</td><td><button class="icon-button" title="Скачать квитанцию" data-action="payment-receipt" data-date="${row[0]}"><i class="bi bi-download"></i></button></td></tr>`).join("")}</tbody></table></div></section>`;
  return `<div class="billing-metrics"><article class="billing-metric"><span>Стоимость тарифа</span><strong>14 900 ₽</strong><small>Следующее списание 14 окт 2026</small><i class="bi bi-wallet2"></i></article><article class="billing-metric"><span>Оплачено с начала года</span><strong>134 100 ₽</strong><small class="positive-text"><i class="bi bi-check-circle"></i> Все платежи учтены</small><i class="bi bi-graph-up-arrow"></i></article><article class="billing-metric"><span>Пользователи</span><strong>7 <small>/ 10</small></strong><small>3 свободных места в тарифе</small><i class="bi bi-people"></i></article><article class="billing-metric"><span>Каналы</span><strong>3 <small>/ 8</small></strong><small>WhatsApp, Telegram, Bitrix24</small><i class="bi bi-plug"></i></article></div><div class="billing-overview-grid"><section class="panel billing-current"><div class="billing-section-head"><div><span class="plan-label">ВАШ ТАРИФ</span><h2>Команда</h2></div><span class="live-state"><i></i>Активен</span></div><div class="billing-price"><strong>14 900 ₽</strong><span>/ месяц</span></div><p>Следующее списание: <strong>14 октября 2026</strong></p><div class="billing-usage"><div><span>Пользователи тарифа</span><span>7 из 10</span></div><div class="usage-track"><i style="width:70%"></i></div></div><div class="billing-card-actions"><button class="button button-primary" data-action="plan-manage">Управлять тарифом</button><button class="button button-secondary" data-billing-tab="plans">Все тарифы</button></div></section><section class="panel billing-chart-panel"><div class="billing-section-head"><div><h2>Расходы по месяцам</h2><p>Оплаты за текущий год</p></div><span class="chart-unit">₽</span></div><div class="billing-bars">${[
    ["Янв", 60],
    ["Фев", 60],
    ["Мар", 60],
    ["Апр", 60],
    ["Май", 60],
    ["Июн", 60],
    ["Июл", 60],
    ["Авг", 60],
    ["Сен", 60],
    ["Окт", 0],
    ["Ноя", 0],
    ["Дек", 0],
  ]
    .map(
      ([m, v], i) =>
        `<div><i style="height:${v || 5}%" class="${i < 9 ? "paid-bar" : "future-bar"}"></i><small>${m}</small></div>`,
    )
    .join(
      "",
    )}</div></section><section class="panel payments-panel billing-recent"><div class="billing-section-head"><div><h2>Последние оплаты</h2><p>История списаний по тарифу</p></div><button class="text-link" data-billing-tab="payments">Все оплаты <i class="bi bi-arrow-right"></i></button></div><div class="data-wrap"><table class="data-table"><thead><tr><th>Дата</th><th>Описание</th><th>Сумма</th><th>Статус</th><th></th></tr></thead><tbody>${paymentRows
    .slice(0, 3)
    .map(
      (row) =>
        `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td><span class="status-pill complete"><i></i>${row[3]}</span></td><td><button class="icon-button" title="Квитанция" data-action="payment-receipt" data-date="${row[0]}"><i class="bi bi-download"></i></button></td></tr>`,
    )
    .join("")}</tbody></table></div></section></div>`;
}
function billingContent() {
  if (billingTab === "currency") return renderCurrencySettings();
  return billingContentMarkup();
}
function renderCurrencySettings() {
  return `<section class="panel currency-settings"><div class="currency-settings-head"><div><h2>Курсы валют</h2><p>Данные загружаются из backend.</p></div><button class="button button-secondary" data-action="refresh-currency-rates"><i class="bi bi-arrow-repeat"></i> Обновить</button></div><div class="currency-rates-head"><div><h3>Курс к рублю</h3><p>Стоимость одной единицы валюты в RUB.</p></div><span id="currencyRatesStatus" role="status">Загрузка курсов…</span></div><div class="currency-rate-grid"><div class="form-label">1 USD =<strong id="usdRate">— RUB</strong></div><div class="form-label">1 KZT =<strong id="kztRate">— RUB</strong></div></div></section>`;
}
function mountAccountingPage() {
  if (billingTab === "currency") loadCurrencyRates();
}
async function loadCurrencyRates() {
  const status = document.getElementById("currencyRatesStatus");
  if (!status) return;
  status.textContent = "Загрузка курсов…";
  try {
    const data = await window.crmApi.accounting.getExchangeRates();
    const rates = data?.ratesRubPerUnit;
    if (
      !Number.isFinite(Number(rates?.USD)) ||
      Number(rates.USD) <= 0 ||
      !Number.isFinite(Number(rates?.KZT)) ||
      Number(rates.KZT) <= 0
    )
      throw new Error("Backend вернул некорректные курсы");
    document.getElementById("usdRate").textContent = `${rates.USD} RUB`;
    document.getElementById("kztRate").textContent = `${rates.KZT} RUB`;
    status.textContent = data.updatedAt
      ? `Обновлено: ${new Date(data.updatedAt).toLocaleString("ru-RU")}`
      : "Курсы обновлены";
  } catch (error) {
    status.textContent = `Не удалось загрузить курсы: ${error.message}`;
  }
}
function switchBillingTab(tab) {
  billingTab = tab;
  const host = document.getElementById("billingContent");
  if (!host) return;
  document
    .querySelectorAll("[data-billing-tab]")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.billingTab === tab),
    );
  host.innerHTML = billingContent();
  if (tab === "currency") loadCurrencyRates();
}
function renderSettings() {
  return `${pageHeader("РАБОЧЕЕ ПРОСТРАНСТВО", "Настройки", "Параметры команды, доступов и данных.", `<button class="button button-primary" data-action="save-settings">Сохранить изменения</button>`)}<section class="panel settings-panel"><nav><button class="selected">Основное</button><button>Участники</button><button>Роли и доступы</button><button>Уведомления</button></nav><div class="settings-content"><h2>Основные настройки</h2><p>Название и параметры рабочего пространства</p><label class="form-label">Название пространства<input value="Northstar Studio" /></label><label class="form-label">Часовой пояс<select><option>UTC+5 · Астана</option><option>UTC+3 · Москва</option></select></label><div class="setting-row"><span><strong>Синхронизировать контакты</strong><small>Обновлять данные между подключёнными системами</small></span><button class="toggle on" data-action="toggle" aria-label="Переключить"></button></div><div class="setting-row"><span><strong>Показывать AI-подсказки</strong><small>Предлагать ответы и следующие шаги в диалогах</small></span><button class="toggle on" data-action="toggle" aria-label="Переключить"></button></div></div></section>`;
}

function renderAssistant() {
  return `<div class="ai-workspace"><aside class="ai-history"><div class="ai-history-top"><h2>AI-ассистент</h2><button class="icon-button" title="Новый диалог" data-action="new-chat"><i class="bi bi-plus-lg"></i></button></div><button class="button button-primary button-wide" data-action="new-chat"><i class="bi bi-plus-lg"></i> Новый диалог</button><div class="ai-history-label">Недавние</div><button class="history-item selected"><i class="bi bi-chat-left-text"></i><span>Рассылка для клиентов</span></button><button class="history-item"><i class="bi bi-chat-left-text"></i><span>Сделки без активности</span></button><button class="history-item"><i class="bi bi-chat-left-text"></i><span>Синхронизация контактов</span></button></aside><section class="ai-main"><div class="ai-main-head"><span class="ai-online"><i></i> AI-помощник</span><button class="button button-secondary" data-page-go="campaigns"><i class="bi bi-send"></i> К рассылкам</button></div><div class="ai-thread"><div class="assistant-intro"><span class="ai-mark"><i class="bi bi-stars"></i></span><h1>Что нужно сделать?</h1><p>Опишите задачу своими словами. Я подготовлю действие и покажу, что будет выполнено.</p></div><div class="assistant-message"><span class="ai-mark small"><i class="bi bi-stars"></i></span><div><strong>Здравствуйте, Мария</strong><p>Могу помочь с контактами, диалогами, интеграциями и рассылками. Например, можно попросить подготовить Telegram-кампанию, а я проведу вас через выбор аудитории и текста.</p></div></div><div id="aiResponse"></div><div class="suggestion-row"><button data-ai-prompt="Создай рассылку в Telegram"><i class="bi bi-send"></i> Создать рассылку</button><button data-ai-prompt="Покажи диалоги без ответа"><i class="bi bi-chat-square-text"></i> Диалоги без ответа</button><button data-ai-prompt="Проверь синхронизацию CRM"><i class="bi bi-arrow-left-right"></i> Проверить синхронизацию</button></div></div><div class="ai-composer"><textarea id="aiInput" placeholder="Напишите, что нужно сделать…" rows="2"></textarea><div class="composer-bottom"><span><i class="bi bi-shield-check"></i> Перед запуском я покажу все параметры</span><button class="button button-primary" data-action="send-ai">Отправить <i class="bi bi-arrow-up"></i></button></div></div></section><aside class="ai-context"><div class="ai-context-head"><h3>Контекст</h3><button class="icon-button" title="Настройки контекста"><i class="bi bi-sliders"></i></button></div><div class="context-block"><small>ПОДКЛЮЧЁННЫЕ КАНАЛЫ</small><div class="context-channel"><i class="bi bi-telegram telegram-text"></i><span>Telegram</span><b>Активен</b></div><div class="context-channel"><i class="bi bi-whatsapp whatsapp-text"></i><span>WhatsApp</span><b>Активен</b></div></div><div class="context-block"><small>ПОСЛЕДНИЕ ДАННЫЕ</small><div class="context-stat"><span>Контакты</span><strong>1 248</strong></div><div class="context-stat"><span>Активные диалоги</span><strong>186</strong></div><div class="context-stat"><span>Синхронизация</span><strong class="positive-text">В порядке</strong></div></div><button class="button button-secondary button-wide" data-page-go="integrations"><i class="bi bi-plug"></i> Настроить подключения</button></aside></div>`;
}

const pages = {
  overview: renderOverview,
  integrations: renderIntegrations,
  campaigns: renderCampaigns,
  contacts: renderContacts,
  pipeline: renderPipeline,
  inbox: renderInbox,
  automation: renderAutomation,
  accounting: renderAccounting,
  settings: renderSettings,
};

function wirePipeline() {
  document.querySelectorAll(".deal-card").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.dealId);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
  });
  document.querySelectorAll("[data-drop-stage]").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", (event) => {
      if (!column.contains(event.relatedTarget))
        column.classList.remove("drag-over");
    });
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("drag-over");
      const deal = deals.find(
        (item) => item.id === event.dataTransfer.getData("text/plain"),
      );
      if (deal && deal.stage !== column.dataset.dropStage) {
        deal.stage = column.dataset.dropStage;
        setPage("pipeline");
        toast(`Сделка перемещена: ${deal.stage}`);
      }
    });
  });
}

function showDealForm(stage = dealStages[0], person = "") {
  modalLayer.innerHTML = `<div class="modal compact-modal"><div class="modal-head"><div><span class="modal-icon"><i class="bi bi-kanban"></i></span><h2>Новая сделка</h2></div>${iconButton("bi-x-lg", "Закрыть", "close-modal")}</div><label class="form-label">Название сделки<input id="dealName" placeholder="Например, годовой тариф" /></label><label class="form-label">Клиент<select id="dealPerson">${contacts.map((contact) => `<option ${contact[1] === person ? "selected" : ""}>${esc(contact[1])}</option>`).join("")}</select></label><label class="form-label">Сумма<input id="dealValue" type="number" min="0" placeholder="150000" /></label><label class="form-label">Этап<select id="dealStage">${dealStages.map((item) => `<option ${item === stage ? "selected" : ""}>${item}</option>`).join("")}</select></label><label class="form-label">Следующий шаг<input id="dealNext" placeholder="Что нужно сделать дальше?" /></label><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Отмена</button><button class="button button-primary" data-action="save-new-deal">Создать сделку</button></div></div>`;
  modalLayer.classList.add("open");
  modalLayer.setAttribute("aria-hidden", "false");
}

function showDealDetail(id) {
  const deal = deals.find((item) => item.id === id);
  if (!deal) return;
  modalLayer.innerHTML = `<div class="modal compact-modal deal-detail-modal"><div class="modal-head"><div><span class="eyebrow">СДЕЛКА · ${esc(deal.stage)}</span><h2>${esc(deal.title)}</h2></div>${iconButton("bi-x-lg", "Закрыть", "close-modal")}</div><div class="deal-detail-value">₽ ${deal.value.toLocaleString("ru-RU")}</div><div class="detail-fields"><div><small>Клиент</small><strong>${esc(deal.person)}</strong></div><div><small>Следующий шаг</small><strong>${esc(deal.next)}</strong></div><div><small>Канал</small><strong>${esc(deal.channel)}</strong></div><div><small>Дата</small><strong>${esc(deal.date)}</strong></div></div><label class="form-label stage-change-label">Этап<select id="dealStageChange">${dealStages.map((stage) => `<option ${stage === deal.stage ? "selected" : ""}>${stage}</option>`).join("")}</select></label><div class="deal-detail-actions"><button class="button button-secondary" data-action="update-deal-stage" data-deal-id="${deal.id}"><i class="bi bi-arrow-left-right"></i> Изменить этап</button><button class="button button-secondary" data-action="contact-card" data-name="${esc(deal.person)}"><i class="bi bi-person-vcard"></i> Карточка клиента</button><button class="button button-primary" data-action="open-client-chat" data-name="${esc(deal.person)}"><i class="bi bi-chat-square-text"></i> Написать клиенту</button></div></div>`;
  modalLayer.classList.add("open");
  modalLayer.setAttribute("aria-hidden", "false");
}

function wireCampaign() {
  document.querySelectorAll("[data-campaign-filter]").forEach((button) =>
    button.addEventListener("click", () => {
      document
        .querySelectorAll("[data-campaign-filter]")
        .forEach((x) => x.classList.remove("active"));
      button.classList.add("active");
      const f = button.dataset.campaignFilter;
      document
        .querySelectorAll("[data-campaign-status]")
        .forEach(
          (row) =>
            (row.hidden =
              f === "Все"
                ? false
                : f === "Активные"
                  ? row.dataset.campaignStatus === "Завершена" ||
                    row.dataset.campaignStatus === "Черновик"
                  : f === "Черновики"
                    ? row.dataset.campaignStatus !== "Черновик"
                    : row.dataset.campaignStatus !== "Завершена"),
        );
    }),
  );
}

function openCampaignWizard() {
  campaignStep = 1;
  recipientSource = "paste";
  campaignDraft = {
    name: "Новая Telegram-рассылка",
    channel: "Telegram · @northstar_support",
    recipients: "",
    count: 0,
    message:
      "Здравствуйте, {{имя}}! Делимся новостями и специальным предложением для наших клиентов.",
    fileName: "",
    schedule: "now",
    scheduleAt: "",
  };
  renderCampaignWizard();
}
function renderCampaignWizard() {
  const steps = [
    ["Аудитория", "Получатели"],
    ["Сообщение", "Текст"],
    ["Проверка", "Запуск"],
  ];
  let body = "";
  if (campaignStep === 1)
    body = `<div class="wizard-fields"><label class="form-label">Название рассылки<input id="campaignName" value="${esc(campaignDraft.name)}" /></label><label class="form-label">Канал отправки<select id="campaignChannel"><option ${campaignDraft.channel.startsWith("Telegram") ? "selected" : ""}>Telegram · @northstar_support</option><option ${campaignDraft.channel.startsWith("WhatsApp") ? "selected" : ""}>WhatsApp Business · +7 999 120-45-67</option></select></label><div class="form-label">Кому отправить</div><div class="recipient-tabs"><button class="${recipientSource === "paste" ? "active" : ""}" data-recipient="paste"><i class="bi bi-clipboard"></i> Вставить список</button><button class="${recipientSource === "file" ? "active" : ""}" data-recipient="file"><i class="bi bi-upload"></i> Загрузить файл</button><button class="${recipientSource === "segment" ? "active" : ""}" data-recipient="segment"><i class="bi bi-people"></i> Сегмент</button><button class="${recipientSource === "subscribers" ? "active" : ""}" data-recipient="subscribers"><i class="bi bi-person-check"></i> Подписчики</button></div>${recipientSource === "paste" ? `<label class="form-label">${campaignDraft.channel.startsWith("Telegram") ? "Telegram ID или username" : "Номера телефонов"}<textarea id="recipientText" class="recipient-input" placeholder="${campaignDraft.channel.startsWith("Telegram") ? "Например:\n123456789\n@anna_krylova\n@client_team" : "+7 999 123-45-67\n+7 999 987-65-43"}">${esc(campaignDraft.recipients)}</textarea><small class="field-help">${campaignDraft.channel.startsWith("Telegram") ? "Один Telegram ID или username на строку. Номера телефонов для Telegram не подходят." : "Один номер телефона на строку, в международном формате."}</small></label>` : recipientSource === "file" ? `<label class="upload-box"><input id="recipientFile" type="file" accept=".csv,.txt,.xlsx" /><i class="bi bi-cloud-arrow-up"></i><strong>${campaignDraft.fileName ? `Выбран файл: ${esc(campaignDraft.fileName)}` : "Перетащите файл сюда или выберите на устройстве"}</strong><small>CSV, XLSX или TXT · до 10 МБ</small></label><div id="fileName" class="field-help"></div>` : recipientSource === "segment" ? `<label class="form-label">Выберите сохранённый сегмент<select id="audienceSegment"><option>Клиенты без покупки 30 дней · 486</option><option>Активные клиенты · 1 024</option><option>Все контакты с Telegram · 612</option></select></label>` : `<div class="subscriber-choice"><i class="bi bi-info-circle"></i><span>Отправка будет доступна пользователям, которые уже запускали вашего Telegram-бота или писали в подключённый аккаунт.</span></div><div class="audience-count"><span>Подписчики канала</span><strong>612</strong></div>`}<div class="audience-count"><span>Получателей будет включено</span><strong id="recipientCount">${recipientSource === "subscribers" ? "612" : recipientSource === "segment" ? "486" : campaignDraft.count}</strong></div></div>`;
  if (campaignStep === 2)
    body = `<div class="wizard-fields"><label class="form-label">Текст сообщения<textarea id="messageText" class="message-input" placeholder="Напишите сообщение для получателей…">${esc(campaignDraft.message)}</textarea><small class="field-help">Можно использовать переменную {{имя}} для персонального обращения.</small></label><div class="message-tools"><button class="button button-secondary" data-action="attach-message"><i class="bi bi-paperclip"></i> Прикрепить файл</button><button class="button button-secondary" data-action="test-message"><i class="bi bi-send-check"></i> Тестовое сообщение</button></div><div class="message-preview"><div class="preview-label">ПРЕДВАРИТЕЛЬНЫЙ ПРОСМОТР</div><div class="telegram-preview"><small>StupidMonolog</small><p>Здравствуйте, Анна! Делимся новостями и специальным предложением для наших клиентов.</p><span>10:42 <i class="bi bi-check2-all"></i></span></div></div><div class="schedule-block"><div class="schedule-heading"><strong>Когда отправить?</strong><small>Выберите удобное время запуска</small></div><label class="schedule-option"><input type="radio" name="scheduleMode" value="now" ${campaignDraft.schedule === "now" ? "checked" : ""}><span><strong>Сразу</strong><small>Начать после подтверждения</small></span></label><label class="schedule-option"><input type="radio" name="scheduleMode" value="later" ${campaignDraft.schedule === "later" ? "checked" : ""}><span><strong>Запланировать</strong><small>Выбрать дату и время отправки</small></span></label>${campaignDraft.schedule === "later" ? `<div class="schedule-fields"><label class="form-label">Дата<input id="scheduleDate" type="date" value="${esc(campaignDraft.scheduleAt.split("T")[0] || "")}" /></label><label class="form-label">Время<input id="scheduleTime" type="time" value="${esc(campaignDraft.scheduleAt.split("T")[1] || "10:00")}" /></label></div>` : ""}</div><label class="check-row"><input type="checkbox" checked /> Отправлять в разрешённое время и соблюдать интервалы между сообщениями</label></div>`;
  if (campaignStep === 3)
    body = `<div class="review-block"><div class="review-status"><span><i class="bi bi-check-lg"></i></span><div><strong>Проверьте рассылку перед запуском</strong><small>${campaignDraft.schedule === "later" ? "Кампания начнёт отправляться в выбранное время." : "После запуска сообщения начнут отправляться выбранной аудитории."}</small></div></div><div class="review-grid"><div><small>Название</small><strong>${esc(campaignDraft.name)}</strong></div><div><small>Канал</small><strong><i class="bi ${campaignDraft.channel.startsWith("Telegram") ? "bi-telegram telegram-text" : "bi-whatsapp whatsapp-text"}"></i> ${campaignDraft.channel.startsWith("Telegram") ? "Telegram" : "WhatsApp Business"}</strong></div><div><small>Получатели</small><strong>${campaignDraft.count || 0} контактов</strong></div><div><small>Время отправки</small><strong>${campaignDraft.schedule === "later" ? esc(campaignDraft.scheduleAt.replace("T", " в ")) : "Сразу после запуска"}</strong></div></div><div class="review-message"><small>ТЕКСТ СООБЩЕНИЯ</small><p>${esc(campaignDraft.message)}</p></div><label class="check-row"><input type="checkbox" id="confirmCampaign" /> Я проверил аудиторию и текст сообщения</label></div>`;
  modalLayer.innerHTML = `<div class="modal campaign-wizard"><div class="modal-head"><div><div class="eyebrow">НОВАЯ КАМПАНИЯ</div><h2>Создать рассылку</h2></div>${iconButton("bi-x-lg", "Закрыть", "close-modal")}</div><div class="wizard-steps">${steps.map((s, i) => `<div class="wizard-step ${campaignStep === i + 1 ? "current" : campaignStep > i + 1 ? "done" : ""}"><span>${campaignStep > i + 1 ? '<i class="bi bi-check-lg"></i>' : i + 1}</span><small>${s[0]}</small></div>`).join("")}</div><div class="wizard-content">${body}</div><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Отмена</button>${campaignStep > 1 ? '<button class="button button-secondary" data-action="wizard-back">Назад</button>' : ""}<button class="button button-primary" data-action="wizard-next">${campaignStep === 3 ? "Запустить рассылку" : "Продолжить"} <i class="bi ${campaignStep === 3 ? "bi-send" : "bi-arrow-right"}"></i></button></div></div>`;
  modalLayer.classList.add("open");
  modalLayer.setAttribute("aria-hidden", "false");
  modalLayer.querySelectorAll("[data-recipient]").forEach((button) =>
    button.addEventListener("click", () => {
      saveCampaignDraft();
      recipientSource = button.dataset.recipient;
      renderCampaignWizard();
    }),
  );
  const file = modalLayer.querySelector("#recipientFile");
  if (file)
    file.addEventListener("change", () => {
      campaignDraft.fileName = file.files[0]?.name || "";
      campaignDraft.count = file.files[0] ? 320 : 0;
      document.getElementById("fileName").textContent = campaignDraft.fileName
        ? `${campaignDraft.fileName} · предварительно найдено 320 записей`
        : "";
      document.getElementById("recipientCount").textContent =
        campaignDraft.count;
    });
  const recipients = modalLayer.querySelector("#recipientText");
  if (recipients)
    recipients.addEventListener("input", () => {
      campaignDraft.recipients = recipients.value;
      campaignDraft.count = countRecipients(recipients.value);
      document.getElementById("recipientCount").textContent =
        campaignDraft.count;
    });
  modalLayer
    .querySelector("#campaignName")
    ?.addEventListener("input", saveCampaignDraft);
  modalLayer
    .querySelector("#campaignChannel")
    ?.addEventListener("change", () => {
      saveCampaignDraft();
      if (campaignDraft.channel.startsWith("WhatsApp"))
        recipientSource = "paste";
      renderCampaignWizard();
    });
  modalLayer
    .querySelector("#messageText")
    ?.addEventListener("input", saveCampaignDraft);
  modalLayer.querySelectorAll('[name="scheduleMode"]').forEach((input) =>
    input.addEventListener("change", () => {
      saveCampaignDraft();
      campaignDraft.schedule = input.value;
      renderCampaignWizard();
    }),
  );
  modalLayer
    .querySelector("#scheduleDate")
    ?.addEventListener("change", saveCampaignDraft);
  modalLayer
    .querySelector("#scheduleTime")
    ?.addEventListener("change", saveCampaignDraft);
}

function saveCampaignDraft() {
  const name = modalLayer.querySelector("#campaignName"),
    channel = modalLayer.querySelector("#campaignChannel"),
    recipients = modalLayer.querySelector("#recipientText"),
    message = modalLayer.querySelector("#messageText"),
    count = modalLayer.querySelector("#recipientCount"),
    date = modalLayer.querySelector("#scheduleDate"),
    time = modalLayer.querySelector("#scheduleTime");
  if (name) campaignDraft.name = name.value;
  if (channel) campaignDraft.channel = channel.value;
  if (recipients) {
    campaignDraft.recipients = recipients.value;
    campaignDraft.count = countRecipients(recipients.value);
  }
  if (message) campaignDraft.message = message.value;
  if (count && recipientSource === "segment")
    campaignDraft.count = Number(count.textContent) || 486;
  if (recipientSource === "subscribers") campaignDraft.count = 612;
  if (date || time)
    campaignDraft.scheduleAt = `${date?.value || campaignDraft.scheduleAt.split("T")[0] || ""}T${time?.value || campaignDraft.scheduleAt.split("T")[1] || "10:00"}`;
  const schedule = modalLayer.querySelector('[name="scheduleMode"]:checked');
  if (schedule) campaignDraft.schedule = schedule.value;
}

function closeModal() {
  modalLayer.classList.remove("open");
  modalLayer.setAttribute("aria-hidden", "true");
  modalLayer.innerHTML = "";
}
function showModal(title, description, icon = "bi-info-circle", actions = "") {
  modalLayer.innerHTML = `<div class="modal compact-modal"><div class="modal-head"><div><span class="modal-icon"><i class="bi ${icon}"></i></span><h2>${title}</h2></div>${iconButton("bi-x-lg", "Закрыть", "close-modal")}</div><p>${description}</p>${actions || '<div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Закрыть</button></div>'}</div>`;
  modalLayer.classList.add("open");
  modalLayer.setAttribute("aria-hidden", "false");
}
function toast(message, icon = "bi-check-circle") {
  const element = document.createElement("div");
  element.className = "toast";
  element.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
  toastRegion.append(element);
  setTimeout(() => element.remove(), 3200);
}
function updateContextAssistant() {
  const label =
    currentMode === "ai" ? "AI-ассистент" : labels[currentPage] || "Главная";
  document.getElementById("assistantPageContext").textContent = label;
  const ideas = {
    overview: [
      "Что требует внимания сегодня?",
      "Сводка по рассылкам за неделю",
    ],
    campaigns: [
      "Помоги подготовить рассылку",
      "Какие кампании сейчас активны?",
    ],
    contacts: ["Найди клиентов без ответа", "Добавить нового клиента"],
    pipeline: ["Какие сделки требуют внимания?", "Создать новую сделку"],
    inbox: ["Подготовь ответ клиенту", "Покажи диалоги без ответа"],
    integrations: ["Проверь статус подключений", "Как синхронизировать CRM?"],
    accounting: ["Покажи историю оплат", "Сравни доступные тарифы"],
    automation: ["Создай простой сценарий", "Какие автоматизации активны?"],
    settings: [
      "Помоги настроить рабочее пространство",
      "Какие настройки важны?",
    ],
    assistant: ["Создай рассылку в Telegram", "Найди сделки без активности"],
  };
  document.getElementById("contextChatSuggestions").innerHTML = (
    ideas[currentPage] || ideas.overview
  )
    .map(
      (text) =>
        `<button data-context-prompt="${esc(text)}">${esc(text)}</button>`,
    )
    .join("");
}
function setContextChatOpen(open) {
  const panel = document.getElementById("contextAssistant");
  panel.classList.toggle("open", open);
  panel.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("context-chat-open", open);
  if (open) {
    updateContextAssistant();
    if (!contextChatStarted) {
      appendContextMessage(
        `Я вижу страницу «${labels[currentPage] || "AI-ассистент"}». Спросите о данных на экране или поручите подготовить следующее действие.`,
        "assistant",
      );
      contextChatStarted = true;
    }
    document.getElementById("contextChatInput").focus();
  }
}
function appendContextMessage(text, role) {
  const message = document.createElement("div");
  message.className = `context-message ${role}`;
  message.textContent = text;
  document.getElementById("contextChatMessages").append(message);
  message.scrollIntoView({ block: "nearest" });
}
function sendContextChat(event) {
  event.preventDefault();
  const input = document.getElementById("contextChatInput"),
    text = input.value.trim();
  if (!text) return;
  appendContextMessage(text, "user");
  input.value = "";
  const context = labels[currentPage] || "AI-ассистент";
  const replies = {
    campaigns: [
      "Для этой рассылки сначала проверим аудиторию, затем текст и время отправки. Перед запуском покажу итоговые параметры.",
      "Создать рассылку",
      "new-campaign",
    ],
    contacts: [
      "Могу помочь найти нужных клиентов, импортировать список или открыть новую карточку.",
      "Добавить контакт",
      "add-contact",
    ],
    pipeline: [
      "Посмотрим сделки по этапам и следующим шагам. Новую сделку можно сразу назначить ответственному.",
      "Создать сделку",
      "new-deal",
    ],
    inbox: [
      "Могу подготовить ответ с учётом переписки. Проверьте текст перед отправкой клиенту.",
      "Открыть диалоги",
      "go-inbox",
    ],
    integrations: [
      "Проверим каналы, статус соединения и обмен данными.",
      "Открыть интеграции",
      "go-integrations",
    ],
    accounting: [
      "Здесь можно посмотреть начисления, тариф и историю платежей.",
      "Открыть оплаты",
      "billing-payments",
    ],
    automation: [
      "Можно связать событие в канале с действием в CRM и проверить шаги до включения.",
      "Создать сценарий",
      "new-automation",
    ],
    overview: [
      "На главной собраны активность, каналы и задачи команды. Могу перейти к любому рабочему разделу.",
      "Открыть рассылки",
      "go-campaigns",
    ],
  };
  const reply = replies[currentPage] || [
    "Опишите желаемый результат, и я подскажу следующий шаг на этой странице.",
    "Открыть раздел",
    "go-overview",
  ];
  const line = document.createElement("div");
  line.className = "context-reply";
  const p = document.createElement("p");
  p.textContent = `Контекст: ${context}. ${reply[0]}`;
  const button = document.createElement("button");
  button.className = "button button-secondary";
  button.textContent = reply[1];
  button.dataset.contextAction = reply[2];
  line.append(p, button);
  document.getElementById("contextChatMessages").append(line);
  line.scrollIntoView({ block: "nearest" });
}

document.addEventListener("click", (event) => {
  const mode = event.target.closest("[data-mode]");
  if (mode) {
    setMode(mode.dataset.mode);
    return;
  }
  const nav = event.target.closest("[data-page]");
  if (nav) {
    setPage(nav.dataset.page);
    return;
  }
  const go = event.target.closest("[data-page-go]");
  if (go) {
    setMode("crm");
    setPage(go.dataset.pageGo);
    return;
  }
  const action = event.target.closest("[data-action]");
  if (!action) return;
  const type = action.dataset.action;
  if (type === "sidebar")
    document.getElementById("sidebar").classList.toggle("mobile-open");
  if (type === "toggle-context-chat") {
    setContextChatOpen(
      !document.getElementById("contextAssistant").classList.contains("open"),
    );
  }
  if (type === "close-context-chat") setContextChatOpen(false);
  if (type === "sync")
    showModal(
      "Синхронизация завершена",
      "Проверены Telegram, WhatsApp Business и Bitrix24. Все подключённые данные актуальны.",
      "bi-arrow-repeat",
    );
  if (type === "new-campaign") openCampaignWizard();
  if (type === "close-modal") closeModal();
  if (type === "wizard-back") {
    campaignStep = Math.max(1, campaignStep - 1);
    renderCampaignWizard();
  }
  if (type === "wizard-next") {
    saveCampaignDraft();
    if (
      campaignStep === 1 &&
      recipientSource === "paste" &&
      !document.getElementById("recipientText")?.value.trim()
    ) {
      toast(
        campaignDraft.channel.startsWith("Telegram")
          ? "Добавьте Telegram ID или username"
          : "Добавьте хотя бы один номер телефона",
        "bi-exclamation-circle",
      );
      return;
    }
    if (
      campaignStep === 1 &&
      recipientSource === "file" &&
      !campaignDraft.fileName
    ) {
      toast("Выберите файл со списком получателей", "bi-exclamation-circle");
      return;
    }
    if (
      campaignStep === 2 &&
      !document.getElementById("messageText")?.value.trim()
    ) {
      toast("Добавьте текст сообщения", "bi-exclamation-circle");
      return;
    }
    if (
      campaignStep === 2 &&
      campaignDraft.schedule === "later" &&
      (!campaignDraft.scheduleAt ||
        Number.isNaN(new Date(campaignDraft.scheduleAt).getTime()) ||
        new Date(campaignDraft.scheduleAt) <= new Date())
    ) {
      toast("Выберите будущие дату и время отправки", "bi-exclamation-circle");
      return;
    }
    if (campaignStep < 3) {
      campaignStep++;
      renderCampaignWizard();
      return;
    }
    if (!document.getElementById("confirmCampaign")?.checked) {
      toast("Подтвердите, что проверили рассылку", "bi-exclamation-circle");
      return;
    }
    const isScheduled = campaignDraft.schedule === "later";
    closeModal();
    toast(
      isScheduled
        ? `Рассылка запланирована на ${campaignDraft.scheduleAt.replace("T", " в ")}`
        : "Рассылка добавлена в очередь отправки",
      "bi-send-check",
    );
    return;
  }
  if (type === "campaign-report")
    showModal(
      action.dataset.name,
      "Отчёт кампании: доставлено 2 418 сообщений (96,4%), прочитано 1 842 (76,2%), ответили 216 получателей (8,9%).",
      "bi-bar-chart",
    );
  if (type === "connect") {
    const item = integrationData.find(
      (x) => x.name === action.dataset.serviceName,
    );
    item.connected = true;
    item.detail =
      item.name === "Telegram Bot" ? "@northstar_bot" : "Подключение настроено";
    setPage("integrations");
    toast(`${item.name}: подключение активно`);
  }
  if (type === "settings" || type === "menu")
    showModal(
      action.dataset.serviceName,
      "Настройки подключения и синхронизации сервиса.",
      "bi-sliders",
      `<div class="setting-row"><span><strong>Синхронизация включена</strong><small>Обновлять контакты и историю сообщений</small></span><button class="toggle on" data-action="toggle"></button></div><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Готово</button></div>`,
    );
  if (type === "new-chat") {
    setMode("ai");
    toast("Новый диалог готов");
  }
  if (type === "send-ai") sendAi();
  if (type === "send-reply") {
    const input = document.querySelector(".reply-box textarea");
    if (input?.value.trim()) {
      toast("Сообщение отправлено");
      input.value = "";
    } else toast("Введите текст сообщения", "bi-exclamation-circle");
  }
  if (type === "test-message")
    showModal(
      "Тестовое сообщение",
      "Выберите, куда отправить тест. Telegram: @northstar_support. Тест получит только текущий пользователь.",
      "bi-send-check",
      `<div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Отмена</button><button class="button button-primary" data-action="send-test">Отправить тест</button></div>`,
    );
  if (type === "send-test") {
    closeModal();
    toast("Тестовое сообщение отправлено");
  }
  if (type === "attach-message")
    showModal(
      "Прикрепить файл",
      "Перетащите изображение или документ в редактор сообщения.",
      "bi-paperclip",
    );
  if (type === "campaign-template")
    showModal(
      "Шаблоны рассылок",
      "Выберите шаблон: обновление клиентов, напоминание или возврат аудитории.",
      "bi-file-earmark-text",
    );
  if (type === "import-contacts")
    showModal(
      "Импорт контактов",
      "Загрузите CSV или XLSX, чтобы добавить контакты. Дубликаты будут отмечены до импорта.",
      "bi-upload",
      `<label class="upload-box"><input type="file" accept=".csv,.xlsx" /><i class="bi bi-cloud-arrow-up"></i><strong>Выберите файл для импорта</strong><small>CSV или XLSX · до 10 МБ</small></label><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Отмена</button></div>`,
    );
  if (type === "add-contact")
    showModal(
      "Новый контакт",
      "Добавьте основные данные клиента.",
      "bi-person-plus",
      `<label class="form-label">Имя<input id="newContactName" placeholder="Имя и фамилия" /></label><label class="form-label">Телефон или email<input placeholder="Контактные данные" /></label><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Отмена</button><button class="button button-primary" data-action="save-contact">Добавить контакт</button></div>`,
    );
  if (type === "save-contact") {
    const name = document.getElementById("newContactName")?.value.trim();
    if (!name) {
      toast("Введите имя контакта", "bi-exclamation-circle");
      return;
    }
    contacts.unshift([
      name
        .split(" ")
        .map((x) => x[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      name,
      "Новый контакт",
      "Telegram",
      "Новый",
      "Только что",
    ]);
    closeModal();
    setPage("contacts");
    toast("Контакт добавлен");
  }
  if (type === "contact-card") showContactDetail(action.dataset.name || "");
  if (type === "deal-detail" || type === "deal-menu")
    showDealDetail(action.dataset.dealId);
  if (type === "update-deal-stage") {
    const deal = deals.find((item) => item.id === action.dataset.dealId),
      stage = document.getElementById("dealStageChange")?.value;
    if (deal && stage) {
      deal.stage = stage;
      closeModal();
      setPage("pipeline");
      toast(`Этап сделки изменён: ${stage}`);
    }
  }
  if (type === "new-deal") showDealForm(action.dataset.stage || dealStages[0]);
  if (type === "new-deal-for-contact")
    showDealForm(dealStages[0], action.dataset.name || "");
  if (type === "save-new-deal") {
    const title = document.getElementById("dealName")?.value.trim(),
      value = Number(document.getElementById("dealValue")?.value),
      person = document.getElementById("dealPerson")?.value,
      stage = document.getElementById("dealStage")?.value,
      next = document.getElementById("dealNext")?.value.trim();
    if (!title || !value) {
      toast("Добавьте название и сумму сделки", "bi-exclamation-circle");
      return;
    }
    deals.unshift({
      id: `d${Date.now()}`,
      title,
      person,
      value,
      stage,
      date: "Сегодня",
      channel: "Telegram",
      next: next || "Связаться с клиентом",
    });
    closeModal();
    setPage("pipeline");
    toast("Сделка добавлена");
  }
  if (type === "open-client-chat") showContactDetail(action.dataset.name || "");
  if (type === "send-contact-message") {
    const input = document.getElementById("contactReply"),
      message = input?.value.trim();
    if (!message) {
      toast("Напишите сообщение клиенту", "bi-exclamation-circle");
      return;
    }
    const list = document.querySelector(".detail-message-list"),
      bubble = document.createElement("div");
    bubble.className = "message outgoing";
    bubble.textContent = message;
    const time = document.createElement("small");
    time.textContent = "Только что · Отправлено";
    bubble.append(time);
    list.append(bubble);
    input.value = "";
    list.scrollTop = list.scrollHeight;
    toast("Сообщение добавлено в переписку", "bi-send-check");
  }
  if (type === "pipeline-help")
    showModal(
      "Как работать со сделками",
      "Перетащите карточку в следующий этап. Откройте сделку, чтобы увидеть клиента, сумму и следующий шаг. Написать клиенту можно прямо из карточки.",
      "bi-kanban",
    );
  if (type === "edit-contact") toast("Режим редактирования карточки клиента");
  if (type === "contact-filter")
    showModal(
      "Фильтры контактов",
      "Выберите канал, статус или дату последней активности.",
      "bi-funnel",
    );
  if (type === "assign")
    showModal(
      "Назначить диалог",
      "Выберите сотрудника: Мария Кузнецова, Алексей Смирнов или Ирина Волкова.",
      "bi-person-plus",
    );
  if (type === "new-automation")
    showModal(
      "Новый сценарий",
      "Начните с шаблона: новый диалог, изменение сделки или новый контакт.",
      "bi-diagram-3",
    );
  if (type === "save-settings") {
    toast("Настройки сохранены");
  }
  if (type === "refresh-currency-rates") {
    loadCurrencyRates();
  }
  if (type === "billing-export")
    toast("Отчёт по оплатам подготовлен", "bi-download");
  if (type === "payment-receipt")
    showModal(
      "Квитанция об оплате",
      `Платёж за ${action.dataset.date} · тариф «Команда» · 14 900 ₽. В макете квитанция показана как пример.`,
      "bi-receipt",
    );
  if (type === "payment-method")
    showModal(
      "Способ оплаты",
      "Основной способ оплаты: VISA ·· 4821. Изменение платёжных данных будет доступно в настройках аккаунта.",
      "bi-credit-card",
    );
  if (type === "plan-manage" || type === "plan-change")
    showModal(
      type === "plan-manage"
        ? "Тариф «Команда»"
        : `Тариф «${action.dataset.plan}»`,
      "В макете можно показать сравнение условий и подтверждение смены тарифа. Реальные платежи не выполняются.",
      "bi-card-checklist",
    );
  if (type === "toggle") action.classList.toggle("on");
});

document.addEventListener("input", (event) => {
  if (event.target.id === "integrationSearch") {
    const query = event.target.value.toLowerCase();
    document
      .querySelectorAll(".integration-card")
      .forEach((card) => (card.hidden = !card.dataset.service.includes(query)));
  }
  if (event.target.id === "contactSearch") {
    const q = event.target.value.toLowerCase();
    document.getElementById("contactRows").innerHTML = renderContactRows();
    document
      .querySelectorAll("#contactRows tr")
      .forEach(
        (row) => (row.hidden = !row.textContent.toLowerCase().includes(q)),
      );
  }
});
document.addEventListener("click", (event) => {
  const serviceAction = event.target.closest("[data-service-action]");
  if (serviceAction) {
    const name = serviceAction.dataset.serviceName;
    const type = serviceAction.dataset.serviceAction;
    if (type === "connect") {
      const item = integrationData.find((x) => x.name === name);
      if (item) {
        item.connected = true;
        item.detail =
          item.name === "Telegram Bot"
            ? "@northstar_bot"
            : "Подключение настроено";
        setPage("integrations");
        toast(`${item.name}: подключение активно`);
      }
    } else
      showModal(
        name,
        "Настройки подключения, направления обмена и синхронизации данных.",
        "bi-sliders",
        `<div class="setting-row"><span><strong>Обновлять контакты</strong><small>Изменения будут появляться в обеих системах</small></span><button class="toggle on" data-action="toggle"></button></div><div class="setting-row"><span><strong>Передавать историю сообщений</strong><small>Добавлять события канала в карточку клиента</small></span><button class="toggle on" data-action="toggle"></button></div><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Готово</button></div>`,
      );
    return;
  }
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    document
      .querySelectorAll("[data-filter]")
      .forEach((x) => x.classList.remove("active"));
    filter.classList.add("active");
    document
      .querySelectorAll(".integration-card")
      .forEach(
        (card) =>
          (card.hidden =
            filter.dataset.filter !== "Все" &&
            card.dataset.category !== filter.dataset.filter),
      );
  }
  const prompt = event.target.closest("[data-ai-prompt]");
  if (prompt) {
    const input = document.getElementById("aiInput");
    input.value = prompt.dataset.aiPrompt;
    input.focus();
  }
  const billing = event.target.closest("[data-billing-tab]");
  if (billing) {
    switchBillingTab(billing.dataset.billingTab);
  }
  const contextPrompt = event.target.closest("[data-context-prompt]");
  if (contextPrompt) {
    const input = document.getElementById("contextChatInput");
    input.value = contextPrompt.dataset.contextPrompt;
    input.focus();
  }
  const contextAction = event.target.closest("[data-context-action]");
  if (contextAction) {
    const action = contextAction.dataset.contextAction;
    if (action === "new-campaign") openCampaignWizard();
    else if (action === "add-contact")
      showModal(
        "Новый контакт",
        "Добавьте основные данные клиента.",
        "bi-person-plus",
        `<label class="form-label">Имя<input id="newContactName" placeholder="Имя и фамилия" /></label><label class="form-label">Телефон или email<input placeholder="Контактные данные" /></label><div class="modal-actions"><button class="button button-secondary" data-action="close-modal">Отмена</button><button class="button button-primary" data-action="save-contact">Добавить контакт</button></div>`,
      );
    else if (action === "new-deal") showDealForm();
    else if (action === "new-automation")
      showModal(
        "Новый сценарий",
        "Начните с шаблона: новый диалог, изменение сделки или новый контакт.",
        "bi-diagram-3",
      );
    else if (action === "billing-payments") switchBillingTab("payments");
    else if (action.startsWith("go-")) {
      setMode("crm");
      setPage(action.slice(3));
    }
    return;
  }
  const genericTab = event.target.closest(
    ".filter-tab:not([data-filter]):not([data-campaign-filter])",
  );
  if (genericTab) {
    genericTab.parentElement
      .querySelectorAll(".filter-tab")
      .forEach((button) => button.classList.remove("active"));
    genericTab.classList.add("active");
  }
  const detailTab = event.target.closest("[data-detail-tab]");
  if (detailTab) {
    document
      .querySelectorAll("[data-detail-tab]")
      .forEach((button) =>
        button.classList.toggle("active", button === detailTab),
      );
    const thread = document.querySelector(".detail-message-list");
    if (thread) {
      const tab = detailTab.dataset.detailTab;
      thread.innerHTML =
        tab === "messages"
          ? '<div class="thread-date">Сегодня, 14 апреля</div><div class="message incoming">Здравствуйте! Можно уточнить детали предложения?<small>10:42</small></div><div class="message outgoing">Конечно. Я собрала информацию по вашему проекту. Удобно обсудить сегодня после обеда?<small>10:48 · Доставлено</small></div><div class="message incoming">Да, давайте в 15:00<small>10:51</small></div>'
          : tab === "activity"
            ? '<div class="detail-activity"><strong>История активности</strong><p>Сегодня, 10:51 · Клиент ответил в Telegram</p><p>Сегодня, 10:48 · Мария отправила сообщение</p><p>18 марта · Контакт создан и синхронизирован</p></div>'
            : '<label class="form-label">Заметка о клиенте<textarea class="client-note" placeholder="Запишите важные детали для команды…">Предпочитает получать предложения в Telegram. Удобное время для связи: после обеда.</textarea></label>';
    }
  }
  const pageNumber = event.target.closest(".page-number");
  if (pageNumber) {
    pageNumber.parentElement
      .querySelectorAll(".page-number")
      .forEach((button) => button.classList.remove("active"));
    pageNumber.classList.add("active");
  }
  const headerIcon = event.target.closest(".topbar-tools .icon-button");
  if (headerIcon) {
    toast(
      headerIcon.title === "Справка"
        ? "Справочный центр скоро будет доступен"
        : "Новых уведомлений нет",
      headerIcon.title === "Справка" ? "bi-question-circle" : "bi-bell",
    );
  }
  const headerDots = event.target.closest(".user-profile>.icon-button");
  if (headerDots)
    showModal(
      "Профиль Марии",
      "Владелец рабочего пространства · настройки профиля и выход из аккаунта.",
      "bi-person",
    );
  const dashboardSelect = event.target.closest(".select-control");
  if (dashboardSelect)
    showModal(
      "Период отчёта",
      "Данные на графике показаны за последние 7 дней. Выберите период в панели отчётов.",
      "bi-calendar3",
    );
});
function sendAi() {
  const input = document.getElementById("aiInput");
  if (!input?.value.trim()) {
    input?.focus();
    toast("Напишите, что нужно сделать", "bi-exclamation-circle");
    return;
  }
  const response = document.getElementById("aiResponse");
  const message = input.value.trim();
  response.innerHTML = `<div class="user-message">${esc(message)}</div><div class="assistant-message"><span class="ai-mark small"><i class="bi bi-stars"></i></span><div><strong>Подготовил следующий шаг</strong><p>Для Telegram-рассылки выберите аудиторию: вставьте Telegram ID или username, загрузите файл или используйте сегмент контактов. Затем добавьте текст и проверьте параметры перед запуском.</p><button class="button button-primary" data-action="new-campaign"><i class="bi bi-send"></i> Перейти к созданию рассылки</button></div></div>`;
  input.value = "";
}
const globalSearch = document.querySelector(".global-search");
const searchInput = document.getElementById("searchInput");
globalSearch.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 850px)").matches) {
    globalSearch.classList.add("search-open");
    searchInput.focus();
  }
});
searchInput.addEventListener("blur", () =>
  globalSearch.classList.remove("search-open"),
);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    globalSearch.classList.add("search-open");
    searchInput.focus();
  }
  if (event.key === "Escape") {
    closeModal();
    globalSearch.classList.remove("search-open");
    searchInput.blur();
  }
  if (
    event.key === "Enter" &&
    event.target.id === "aiInput" &&
    !event.shiftKey
  ) {
    event.preventDefault();
    sendAi();
  }
});
searchInput.addEventListener("input", (event) => {
  if (event.target.value.trim())
    toast(`Поиск: ${event.target.value.trim()}`, "bi-search");
});
document
  .getElementById("contextChatForm")
  .addEventListener("submit", sendContextChat);
document
  .getElementById("contextChatInput")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      document.getElementById("contextChatForm").requestSubmit();
    }
  });
setPage("overview");
