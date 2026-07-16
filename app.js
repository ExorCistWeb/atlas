"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const icons = {
  home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V21h14V10.5M9 21v-7h6v7"/>',
  route:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  exam:'<path d="M6 3h12a2 2 0 0 1 2 2v16H4V5a2 2 0 0 1 2-2Z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  chat:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.4-5A8 8 0 1 1 21 15Z"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"/>',
  wallet:'<path d="M3 6h15a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6Z"/><path d="M3 8V5a2 2 0 0 1 2-2h12M15 12h7v4h-7a2 2 0 0 1 0-4Z"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H3v-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V3h4v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 .6 1h1v4h-.09a1.7 1.7 0 0 0-1.51 1Z"/>',
  logout:'<path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
  sparkles:'<path d="m12 3-1.2 3.3L7.5 7.5l3.3 1.2L12 12l1.2-3.3 3.3-1.2-3.3-1.2L12 3ZM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14ZM19 13l-.7 1.8-1.8.7 1.8.7.7 1.8.7-1.8 1.8-.7-1.8-.7L19 13Z"/>',
  bulb:'<path d="M9 18h6M10 22h4M8.5 15.5A7 7 0 1 1 15.5 15.5c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z"/>',
  upload:'<path d="M12 16V3M7 8l5-5 5 5M4 14v7h16v-7"/>',
  send:'<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  flame:'<path d="M12 22c4 0 7-3 7-7 0-3-2-6-5-9 0 3-2 5-4 6 0-4-1-7-3-10 0 5-4 8-4 13 0 4 4 7 9 7Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>'
};

function renderIcons(root = document) {
  $$('[data-icon]', root).forEach(element => {
    const name = element.dataset.icon;
    if (icons[name]) element.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => $(".loading-screen")?.classList.add("hide"), 180);

  const menuButton = $("[data-menu]");
  menuButton?.addEventListener("click", () => {
    $("#main-nav")?.classList.toggle("is-open");
    menuButton.textContent = $("#main-nav")?.classList.contains("is-open") ? "×" : "☰";
  });

  $$(".faq-item").forEach(item => item.addEventListener("click", () => {
    const wasOpen = item.classList.contains("is-open");
    $$(".faq-item").forEach(other => { other.classList.remove("is-open"); const mark = $("i", other); if (mark) mark.textContent = "+"; });
    if (!wasOpen) { item.classList.add("is-open"); const mark = $("i", item); if (mark) mark.textContent = "−"; }
  }));

  $$("[data-billing]").forEach(button => button.addEventListener("click", () => {
    const period = button.dataset.billing;
    $$("[data-billing]").forEach(el => el.classList.toggle("active", el === button));
    $$(`[data-${period}]`).forEach(price => price.textContent = price.dataset[period]);
  }));

  $$("[data-toast]").forEach(element => element.addEventListener("click", () => showToast(element.dataset.toast)));

  const authForm = $("[data-auth]");
  authForm?.addEventListener("submit", event => {
    event.preventDefault();
    location.href = authForm.dataset.auth === "register" ? "onboarding.html" : "dashboard.html";
  });

  initOnboarding();
  initDiagnostic();
  initLesson();
  initMap();
  initAppUI();
  initProfilePage();
  renderIcons();
});

function showToast(message) {
  const toast = $("#toast");
  if (!toast || !message) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function initOnboarding() {
  const shell = $("[data-onboarding]");
  if (!shell) return;
  const steps = [
    { title:"К какому экзамену готовимся?", subtitle:"Настроим задания и критерии проверки", options:["ЕГЭ","ОГЭ"] },
    { title:"Какой предмет выбираешь?", subtitle:"Начнём с одного, остальные можно добавить позже", options:["Профильная математика","Русский язык — скоро","Информатика — скоро"] },
    { title:"Какой балл хочешь получить?", subtitle:"Цель можно будет изменить в любой момент", options:["60+","70+","80+","90+"] },
    { title:"Сколько времени удобно заниматься?", subtitle:"Система соберёт реалистичный, а не идеальный план", options:["15 минут в день","30 минут в день","45 минут в день","По-разному"] }
  ];
  let step = 0, selected = 0;
  const render = () => {
    $("#step-label").textContent = `Шаг ${step + 1} из ${steps.length}`;
    $("#step-title").textContent = steps[step].title;
    $("#step-subtitle").textContent = steps[step].subtitle;
    $("#onboarding-progress").style.width = `${((step + 1) / steps.length) * 100}%`;
    $("#step-next").textContent = step === steps.length - 1 ? "Начать диагностику →" : "Продолжить →";
    $("#choice-grid").innerHTML = steps[step].options.map((option, index) => `<button type="button" class="${index === selected ? "active" : ""}" ${option.includes("скоро") ? "disabled" : ""} data-choice="${index}"><span class="choice-text">${step === 2 ? option : index + 1}</span><b>${option}</b>${index === selected ? "<strong>✓</strong>" : ""}</button>`).join("");
    $$("[data-choice]").forEach(button => button.addEventListener("click", () => { selected = Number(button.dataset.choice); render(); }));
  };
  $("#step-next").addEventListener("click", () => { if (step === steps.length - 1) location.href = "diagnostic.html"; else { step++; selected = 0; render(); } });
  $("#step-back").addEventListener("click", () => { if (step === 0) location.href = "register.html"; else { step--; selected = 0; render(); } });
  render();
}

function initDiagnostic() {
  const input = $("#diagnostic-answer"), check = $("#diagnostic-check");
  if (!input || !check) return;
  input.addEventListener("input", () => check.disabled = !input.value.trim());
  check.addEventListener("click", () => { $("#diagnostic-page").classList.add("hidden"); $("#diagnostic-result").classList.remove("hidden"); window.scrollTo(0,0); });
  let seconds = 154;
  setInterval(() => { seconds++; const m=String(Math.floor(seconds/60)).padStart(2,"0"), s=String(seconds%60).padStart(2,"0"); const timer=$("#timer"); if(timer) timer.textContent=`${m}:${s}`; },1000);
}

function initLesson() {
  const input=$("#lesson-answer"), check=$("#answer-check"), hint=$("#hint-button");
  if (!input || !check) return;
  input.addEventListener("input", () => { check.disabled=!input.value.trim(); $("#lesson-answer-wrap").classList.remove("has-error"); $("#answer-error").classList.add("hidden"); });
  check.addEventListener("click", () => { $("#lesson-answer-wrap").classList.add("has-error"); $("#answer-error").classList.remove("hidden"); $("#error-message").classList.remove("hidden"); });
  const showHint=()=>$("#hint-message").classList.remove("hidden");
  hint?.addEventListener("click", showHint); $$('[data-hint]').forEach(btn=>btn.addEventListener("click",showHint));
  const send=()=>{ const field=$("#mentor-input"); if(!field.value.trim())return; const bubble=document.createElement("div"); bubble.className="user-message"; bubble.textContent=field.value.trim(); $("#mentor-chat").appendChild(bubble); field.value=""; $("#mentor-chat").scrollTop=$("#mentor-chat").scrollHeight; };
  $("#mentor-send")?.addEventListener("click",send); $("#mentor-input")?.addEventListener("keydown",e=>{if(e.key==="Enter")send();});
}

function initMap() {
  const nodes=$$("[data-topic]"); if(!nodes.length)return;
  nodes.forEach(node=>node.addEventListener("click",()=>{ nodes.forEach(n=>n.classList.remove("is-active")); node.classList.add("is-active"); const [name,score,color,impact]=node.dataset.topic.split("|"); $("#topic-name").textContent=name; $("#topic-score").textContent=`${score}%`; $("#topic-meter").style.width=`${score}%`; $("#topic-impact").textContent=impact; $("#topic-description").textContent=`Освоено на ${score}%. Этот навык влияет на несколько заданий первой и второй части.`; $("#topic-status").textContent=color==="green"?"Навык освоен":color==="yellow"?"Нужно повторение":"Критический пробел"; }));
  $$(".knowledge-filters button").forEach(button=>button.addEventListener("click",()=>{ $$(".knowledge-filters button").forEach(el=>el.classList.remove("active")); button.classList.add("active"); showToast(`Фильтр «${button.textContent}» применён`); }));
}

function getBalance() {
  const raw = localStorage.getItem("atlas_balance");
  if (raw === null || raw === "") return 350;
  const stored = Number(raw);
  return Number.isFinite(stored) && stored >= 0 ? stored : 350;
}

function updateBalance(value) {
  localStorage.setItem("atlas_balance", String(value));
  $$('[data-balance-value]').forEach(element => element.textContent = `${value.toLocaleString("ru-RU")} ₽`);
}

function initAppUI() {
  if (!$(".student-app")) return;
  const overlays = document.createElement("div");
  overlays.innerHTML = `
    <section class="ui-popover notifications-popover" id="notifications-popover" aria-label="Уведомления">
      <div class="popover-head"><h3>Уведомления</h3><button type="button" id="notifications-read">Прочитать все</button></div>
      <div class="notification-list">
        <article class="notification-item unread"><span class="notification-item__icon" data-icon="sparkles"></span><div><b>Карта знаний обновлена</b><p>ИИ нашёл новую связь между подобием и заданиями второй части.</p><time>5 минут назад</time></div></article>
        <article class="notification-item unread"><span class="notification-item__icon" data-icon="flame"></span><div><b>Серия продолжается</b><p>Сегодня достаточно 12 минут, чтобы сохранить серию из 8 дней.</p><time>Сегодня, 09:20</time></div></article>
        <article class="notification-item"><span class="notification-item__icon" data-icon="target"></span><div><b>Прогноз вырос на 2 балла</b><p>Отличная работа с уравнениями за последнюю неделю.</p><time>Вчера</time></div></article>
      </div>
    </section>
    <section class="ui-popover profile-popover" id="profile-popover" aria-label="Меню профиля">
      <div class="profile-summary"><span>А</span><div><b>Алексей</b><small>alexey@example.ru</small></div></div>
      <div class="profile-balance-mini"><span>Текущий баланс<strong data-balance-value>${getBalance().toLocaleString("ru-RU")} ₽</strong></span><button type="button" data-open-balance>Пополнить</button></div>
      <nav><a href="profile.html"><span data-icon="user"></span>Личный кабинет</a><a href="profile.html#subscription"><span data-icon="card"></span>Подписка «Фокус»</a><a href="profile.html#settings"><span data-icon="settings"></span>Настройки</a><button type="button" data-toast="Демонстрационный выход из аккаунта"><span data-icon="logout"></span>Выйти</button></nav>
    </section>
    <div class="modal-backdrop" id="balance-modal"><section class="ui-modal" aria-label="Пополнение баланса">
      <div class="modal-title"><div><h2>Пополнить баланс</h2><p>Средства можно использовать для дополнительных проверок и функций ИИ.</p></div><button type="button" class="modal-close" data-modal-close>×</button></div>
      <div class="balance-current"><span>Текущий баланс<strong data-balance-value>${getBalance().toLocaleString("ru-RU")} ₽</strong></span><span data-icon="wallet"></span></div>
      <span class="amount-label">Выберите сумму</span><div class="amount-grid"><button type="button" data-amount="300">300 ₽</button><button type="button" class="active" data-amount="500">500 ₽</button><button type="button" data-amount="1000">1 000 ₽</button><button type="button" data-amount="2000">2 000 ₽</button></div>
      <label class="custom-amount"><input type="number" id="custom-amount" min="100" max="50000" placeholder="Другая сумма"><span>₽</span></label>
      <span class="amount-label">Способ оплаты</span><label class="payment-method"><span data-icon="card"></span><div><b>Банковская карта</b><small>Мир, Visa или Mastercard</small></div><input type="radio" checked></label>
      <button type="button" class="button button--primary" id="balance-submit">Перейти к оплате · 500 ₽</button><p class="modal-note">Демонстрационная форма. Платёжный шлюз подключается на backend.</p>
    </section></div>
    <button type="button" class="app-chat-launcher" id="global-chat-open" aria-label="Открыть ИИ-наставника"><span data-icon="chat"></span><i></i></button>
    <section class="global-chat" id="global-chat" aria-label="Чат с ИИ-наставником">
      <header class="global-chat__head"><div class="global-chat__person"><span data-icon="sparkles"></span><div><b>AtlasAI</b><small>Персональный ИИ-наставник · онлайн</small></div></div><button type="button" id="global-chat-close" aria-label="Свернуть чат"><span data-icon="close"></span></button></header>
      <div class="global-chat__body" id="global-chat-body"><div class="global-chat__hello">Привет! Я вижу твой маршрут и последние результаты. Могу объяснить тему, подобрать тренировку или помочь разобраться с планом на сегодня.</div><div class="global-chat__quick"><button type="button">Что решать сегодня?</button><button type="button">Объясни подобие</button><button type="button">Как набрать 85?</button></div></div>
      <div class="global-chat__input"><input id="global-chat-input" placeholder="Задай вопрос AtlasAI"><button type="button" id="global-chat-send"><span data-icon="send"></span></button></div>
    </section>`;
  document.body.appendChild(overlays);
  $$('[data-toast]', overlays).forEach(element => element.addEventListener("click", () => showToast(element.dataset.toast)));
  updateBalance(getBalance());

  const notificationButton = $("[data-notifications]");
  const profileButton = $("[data-profile-toggle]");
  notificationButton?.addEventListener("click", event => { event.stopPropagation(); $("#profile-popover").classList.remove("open"); $("#notifications-popover").classList.toggle("open"); });
  profileButton?.addEventListener("click", event => { event.stopPropagation(); $("#notifications-popover").classList.remove("open"); $("#profile-popover").classList.toggle("open"); });
  $("#notifications-read")?.addEventListener("click", () => { $$(".notification-item.unread").forEach(item => item.classList.remove("unread")); notificationButton?.classList.add("all-read"); showToast("Все уведомления прочитаны"); });
  document.addEventListener("click", event => { if (!event.target.closest(".ui-popover") && !event.target.closest("[data-notifications]") && !event.target.closest("[data-profile-toggle]")) $$(".ui-popover").forEach(popover => popover.classList.remove("open")); });

  let selectedAmount = 500;
  const openBalance = () => { $("#balance-modal").classList.add("open"); $("#profile-popover").classList.remove("open"); };
  $("[data-balance]")?.addEventListener("click", openBalance);
  $$("[data-open-balance]").forEach(button => button.addEventListener("click", openBalance));
  $$("[data-modal-close]").forEach(button => button.addEventListener("click", () => $("#balance-modal").classList.remove("open")));
  $("#balance-modal")?.addEventListener("click", event => { if (event.target.id === "balance-modal") event.target.classList.remove("open"); });
  $$("[data-amount]").forEach(button => button.addEventListener("click", () => { selectedAmount = Number(button.dataset.amount); $$("[data-amount]").forEach(item => item.classList.toggle("active", item === button)); $("#custom-amount").value = ""; $("#balance-submit").textContent = `Перейти к оплате · ${selectedAmount.toLocaleString("ru-RU")} ₽`; }));
  $("#custom-amount")?.addEventListener("input", event => { const amount = Number(event.target.value); if (amount >= 100) { selectedAmount = amount; $$("[data-amount]").forEach(item => item.classList.remove("active")); $("#balance-submit").textContent = `Перейти к оплате · ${selectedAmount.toLocaleString("ru-RU")} ₽`; } });
  $("#balance-submit")?.addEventListener("click", () => { updateBalance(getBalance() + selectedAmount); $("#balance-modal").classList.remove("open"); showToast(`Баланс пополнен на ${selectedAmount.toLocaleString("ru-RU")} ₽`); });

  const globalChat = $("#global-chat");
  const launcher = $("#global-chat-open");
  const isLesson = Boolean($(".mentor-panel"));
  if (isLesson) {
    globalChat.remove(); launcher.remove();
    const reopen = document.createElement("button"); reopen.type="button"; reopen.className="app-chat-launcher lesson-chat-reopen"; reopen.innerHTML='<span data-icon="chat"></span><i></i>'; document.body.appendChild(reopen);
    $(".mentor-head>button")?.setAttribute("aria-label","Свернуть чат");
    $(".mentor-head>button")?.addEventListener("click", () => document.body.classList.add("lesson-chat-hidden"));
    reopen.addEventListener("click", () => document.body.classList.remove("lesson-chat-hidden"));
  } else {
    launcher?.addEventListener("click", () => globalChat.classList.add("open"));
    $("#global-chat-close")?.addEventListener("click", () => globalChat.classList.remove("open"));
    const sendGlobal = () => { const field=$("#global-chat-input"); if(!field.value.trim())return; const bubble=document.createElement("div"); bubble.className="user-message"; bubble.textContent=field.value.trim(); $("#global-chat-body").appendChild(bubble); field.value=""; $("#global-chat-body").scrollTop=$("#global-chat-body").scrollHeight; };
    $("#global-chat-send")?.addEventListener("click",sendGlobal); $("#global-chat-input")?.addEventListener("keydown",event=>{if(event.key==="Enter")sendGlobal();});
    $$(".global-chat__quick button").forEach(button => button.addEventListener("click", () => { $("#global-chat-input").value = button.textContent; sendGlobal(); }));
  }
  renderIcons(overlays);
}

function initProfilePage() {
  if (!$(".profile-page")) return;
  updateBalance(getBalance());
  $("#profile-save")?.addEventListener("click", () => showToast("Данные профиля сохранены"));
  $$(".switch").forEach(button => button.addEventListener("click", () => { button.classList.toggle("active"); button.setAttribute("aria-pressed", String(button.classList.contains("active"))); }));
}
