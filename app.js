"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const api = window.SteadyAPI;

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
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
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
    const isOpen = Boolean($("#main-nav")?.classList.contains("is-open"));
    menuButton.textContent = isOpen ? "×" : "☰";
    menuButton.setAttribute("aria-expanded", String(isOpen));
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

  initStudentShell();
  const authForm = $("[data-auth]");
  initAuthExperience(authForm);
  authForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const submit = $('button[type="submit"]', authForm);
    const mode = authForm.dataset.auth;
    if (!validateAuthForm(authForm, mode)) return;
    const formData = Object.fromEntries(new FormData(authForm).entries());
    delete formData.confirm_password;
    delete formData.terms;
    formData.email = String(formData.email || "").trim().toLowerCase();
    if (formData.name) formData.name = String(formData.name).trim();
    const selectedPlan = new URLSearchParams(location.search).get("plan");
    if (mode === "register" && selectedPlan) formData.plan = selectedPlan;
    clearFormMessage(authForm);
    setBusy(submit, true);
    try {
      if (api?.isConfigured) {
        if (mode === "register") await api.auth.register(formData);
        else await api.auth.login(formData);
      } else {
        await new Promise(resolve => setTimeout(resolve, 450));
      }
      location.href = mode === "register" ? "onboarding.html" : "dashboard.html";
    } catch (error) {
      const message = getAuthErrorMessage(error, mode);
      showFormMessage(authForm, message, "error");
      applyApiFieldErrors(authForm, error?.details);
    } finally {
      setBusy(submit, false);
    }
  });
  $("#forgot-password")?.addEventListener("click", async () => {
    const email = $('input[name="email"]', authForm)?.value.trim();
    if (!email || !isValidEmail(email)) {
      setFieldError(authForm, "email", !email ? "Укажи email аккаунта" : "Проверь формат email");
      return;
    }
    try {
      if (api?.isConfigured) await api.auth.requestPasswordReset(email);
      showToast("Если аккаунт существует, письмо для восстановления уже отправлено");
    } catch (error) {
      showFormMessage(authForm, error.message, "error");
    }
  });

  initFeaturePills();
  initReveal();
  initOnboarding();
  initDiagnostic();
  initLesson();
  initMap();
  initAppUI();
  initProfilePage();
  initAchievementSlider();
  initMentorPage();
  initExam();
  initDashboard();
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

function setBusy(button, state) {
  if (!button) return;
  button.classList.toggle("is-loading", state);
  button.disabled = state;
  button.setAttribute("aria-busy", String(state));
}

function clearFormMessage(form) {
  const block = $("[data-form-status]", form);
  if (block) {
    block.className = "form-message";
    block.textContent = "";
    return;
  }
  $(".form-message", form)?.remove();
}

function showFormMessage(form, message, type = "error") {
  clearFormMessage(form);
  const reserved = $("[data-form-status]", form);
  if (reserved) {
    reserved.className = `form-message is-visible is-${type}`;
    reserved.textContent = message;
    return;
  }
  const block = document.createElement("div");
  block.className = `form-message is-visible is-${type}`;
  block.setAttribute("role", type === "error" ? "alert" : "status");
  block.textContent = message;
  form.insertBefore(block, $('button[type="submit"]', form));
}

function initAuthExperience(form) {
  if (!form) return;
  $$('[data-password-toggle]', form).forEach(button => button.addEventListener('click', () => {
    const input = button.closest('.auth-input')?.querySelector('input');
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Скрыть' : 'Показать';
    button.setAttribute('aria-label', show ? 'Скрыть пароль' : 'Показать пароль');
  }));

  $$('input', form).forEach(input => {
    input.addEventListener('input', () => {
      clearFieldError(input.closest('.auth-field'));
      clearFormMessage(form);
      if (input.name === 'password') updatePasswordStrength(form, input.value);
    });
    input.addEventListener('blur', () => validateSingleAuthField(form, input));
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value || '').trim());
}

function setFieldError(form, name, message) {
  const field = $(`[data-field="${name}"]`, form);
  if (!field) return;
  field.classList.add('has-error');
  const input = $('input', field);
  input?.setAttribute('aria-invalid', 'true');
  const error = $('.field-error', field);
  if (error) error.textContent = message;
}

function clearFieldError(field) {
  if (!field) return;
  field.classList.remove('has-error');
  $('input', field)?.removeAttribute('aria-invalid');
  const error = $('.field-error', field);
  if (error) error.textContent = '';
}

function validateSingleAuthField(form, input) {
  const name = input?.name;
  const value = String(input?.value || '').trim();
  if (name === 'name' && value.length < 2) setFieldError(form, name, 'Укажи имя — минимум 2 символа');
  if (name === 'email' && !isValidEmail(value)) setFieldError(form, name, value ? 'Проверь формат email' : 'Укажи email');
  if (name === 'password' && value.length < 8) setFieldError(form, name, 'Пароль должен содержать минимум 8 символов');
  if (name === 'confirm_password' && value !== $('input[name="password"]', form)?.value) setFieldError(form, name, 'Пароли не совпадают');
}

function validateAuthForm(form, mode) {
  $$('.auth-field', form).forEach(clearFieldError);
  clearFormMessage(form);
  let valid = true;
  const fail = (name, message) => { setFieldError(form, name, message); valid = false; };
  const email = $('input[name="email"]', form)?.value.trim() || '';
  const password = $('input[name="password"]', form)?.value || '';
  if (!isValidEmail(email)) fail('email', email ? 'Проверь формат email' : 'Укажи email');
  if (password.length < 8) fail('password', 'Пароль должен содержать минимум 8 символов');
  if (mode === 'register') {
    const name = $('input[name="name"]', form)?.value.trim() || '';
    const confirm = $('input[name="confirm_password"]', form)?.value || '';
    if (name.length < 2) fail('name', 'Укажи имя — минимум 2 символа');
    if (confirm !== password) fail('confirm_password', 'Пароли не совпадают');
    if (!$('input[name="terms"]', form)?.checked) fail('terms', 'Нужно принять политику конфиденциальности');
  }
  if (!valid) {
    $('.auth-field.has-error input', form)?.focus();
    showFormMessage(form, 'Проверь отмеченные поля', 'error');
  }
  return valid;
}

function updatePasswordStrength(form, password) {
  const meter = $('[data-password-strength]', form);
  if (!meter) return;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Za-zА-Яа-я]/.test(password) && /\d/.test(password)) score++;
  if (/[^A-Za-zА-Яа-я0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  meter.dataset.score = String(score);
  const labels = ['Минимум 8 символов', 'Можно надёжнее', 'Хороший пароль', 'Надёжный пароль', 'Очень надёжный пароль'];
  const label = $('span', meter);
  if (label) label.textContent = labels[score];
}

function getAuthErrorMessage(error, mode) {
  if (error?.status === 401) return 'Неверный email или пароль. Проверь данные и попробуй ещё раз.';
  if (error?.status === 409) return 'Аккаунт с таким email уже существует. Попробуй войти.';
  if (error?.status === 422) return 'Некоторые данные заполнены неверно. Проверь отмеченные поля.';
  if (error?.status === 429) return 'Слишком много попыток. Подожди немного и повтори вход.';
  if (error?.status === 0) return 'Нет соединения с сервером. Проверь интернет и попробуй снова.';
  return error?.message || (mode === 'register' ? 'Не удалось создать аккаунт' : 'Не удалось выполнить вход');
}

function applyApiFieldErrors(form, details) {
  const errors = details?.errors || details?.detail?.errors;
  if (!errors || typeof errors !== 'object') return;
  Object.entries(errors).forEach(([name, value]) => {
    const message = Array.isArray(value) ? value[0] : value;
    if (typeof message === 'string') setFieldError(form, name, message);
  });
}

function initFeaturePills() {
  const buttons = $$("[data-feature]");
  const description = $("#feature-description");
  if (!buttons.length || !description) return;
  const details = {
    "AI-наставник": {
      benefit: "Разбирает причину ошибки, а не просто показывает правильный ответ",
      metric: "24/7"
    },
    "Карта знаний": {
      benefit: "Показывает, какая базовая тема блокирует сразу несколько заданий",
      metric: "200+ связей"
    },
    "План до цели": {
      benefit: "Перестраивается после каждого ответа и оставляет только нужные шаги",
      metric: "1 маршрут"
    },
    "Миссии на 15 минут": {
      benefit: "Короткий сценарий: разминка, практика, повторение и мини-проверка",
      metric: "15–20 мин"
    },
    "Игровые уровни": {
      benefit: "Опыт начисляется за реальные навыки, регулярность и закрытые пробелы",
      metric: "+180 XP"
    },
    "Серия дней": {
      benefit: "Напоминает о достижимом минимуме и помогает не терять учебный ритм",
      metric: "12 дней"
    },
    "Голосовой помощник": {
      benefit: "Можно уточнять, перебивать и просить другой пример обычными словами",
      metric: "1 диалог"
    },
    "История ошибок": {
      benefit: "Отличает невнимательность от пробела в формуле и неверной стратегии",
      metric: "6 типов"
    },
    "Прогноз результата": {
      benefit: "Показывает вклад каждой темы в итоговый балл и реалистичный темп роста",
      metric: "73 → 78"
    },
    "Объяснить по-другому": {
      benefit: "Переключает объяснение на схему, бытовой пример или пошаговый разбор",
      metric: "4 формата"
    }
  };
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(item => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-selected", String(item === button));
    });
    description.textContent = button.dataset.feature;
    const title = button.textContent.trim();
    const detail = details[title] || details["AI-наставник"];
    setText("#feature-title", title);
    setText("#feature-benefit", detail.benefit);
    setText("#feature-metric", detail.metric);
    const icon = $("[data-icon]", button)?.dataset.icon || "sparkles";
    const explainerIcon = $(".feature-explainer__icon");
    if (explainerIcon) {
      explainerIcon.dataset.icon = icon;
      renderIcons(explainerIcon.parentElement);
    }
  }));
}

function initStudentShell() {
  const app = $(".steady-app-body .student-app");
  if (!app) return;
  const page = location.pathname.split("/").pop() || "dashboard.html";
  const active = page === "dashboard.html" ? "dashboard"
    : page === "map.html" ? "map"
    : page === "lesson.html" ? "lesson"
    : page === "exam.html" ? "exam"
    : page === "mentor.html" ? "mentor"
    : page === "profile.html" ? (location.hash === "#awards" ? "awards" : "profile")
    : "dashboard";
  const links = [
    ["dashboard", "dashboard.html", "home", "Сегодня"],
    ["map", "map.html", "route", "Карта знаний"],
    ["lesson", "lesson.html", "target", "Тренировка"],
    ["exam", "exam.html", "exam", "Пробный экзамен"],
    ["mentor", "mentor.html", "chat", "ИИ-наставник"],
    ["progress", "dashboard.html#stats", "chart", "Твой прогресс"],
    ["awards", "profile.html#awards", "trophy", "Достижения"],
    ["profile", "profile.html", "user", "Профиль"]
  ];
  const nav = links.map(([key, href, icon, label]) =>
    `<a class="${active === key ? "active" : ""}" href="${href}"><span class="sidebar-icon" data-icon="${icon}"></span><span>${label}</span>${active === key ? "<i></i>" : ""}</a>`
  ).join("");
  const sidebar = $(".app-sidebar", app);
  if (sidebar) sidebar.innerHTML = `
    <a class="steady-logo steady-logo--app" href="index.html"><span class="steady-logo__mark">{</span><span>СТЭДИ</span></a>
    <nav aria-label="Разделы кабинета">${nav}</nav>
    <div class="sidebar-quest"><span data-icon="flame"></span><div><b>12 дней подряд</b><small>До рекорда ещё 3 дня</small><i><em></em></i></div></div>
    <a class="app-profile${active === "profile" ? " active" : ""}" href="profile.html"><span>АА</span><div><b>Алексей</b><small>Уровень 12</small></div><span data-icon="arrow"></span></a>`;
  const mobile = $(".mobile-nav", app);
  if (mobile) mobile.innerHTML = `
    <a class="${active === "dashboard" ? "active" : ""}" href="dashboard.html"><span data-icon="home"></span><span>Сегодня</span></a>
    <a class="${active === "map" ? "active" : ""}" href="map.html"><span data-icon="route"></span><span>Карта</span></a>
    <a class="solve ${active === "lesson" ? "active" : ""}" href="lesson.html"><span data-icon="target"></span><em>Решать</em></a>
    <a class="${active === "mentor" ? "active" : ""}" href="mentor.html"><span data-icon="chat"></span><span>Стэди</span></a>
    <a class="${active === "profile" || active === "awards" ? "active" : ""}" href="profile.html"><span data-icon="user"></span><span>Профиль</span></a>`;
}

function initReveal() {
  const elements = $$(
    ".steady-section__head, .journey-route, .knowledge-showcase__map, .today-mission, .transformation-card, .price-card, .audience-grid article, .steady-benefits article"
  );
  if (!elements.length || !("IntersectionObserver" in window)) return;
  elements.forEach(element => element.classList.add("reveal-ready"));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  elements.forEach(element => observer.observe(element));
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
  const selections = [];
  const render = () => {
    $("#step-label").textContent = `Шаг ${step + 1} из ${steps.length}`;
    $("#step-title").textContent = steps[step].title;
    $("#step-subtitle").textContent = steps[step].subtitle;
    $("#onboarding-progress").style.width = `${((step + 1) / steps.length) * 100}%`;
    $("#step-next").textContent = step === steps.length - 1 ? "Начать диагностику →" : "Продолжить →";
    $("#choice-grid").innerHTML = steps[step].options.map((option, index) => `<button type="button" class="${index === selected ? "active" : ""}" ${option.includes("скоро") ? "disabled" : ""} data-choice="${index}"><span class="choice-text">${step === 2 ? option : index + 1}</span><b>${option}</b>${index === selected ? "<strong>✓</strong>" : ""}</button>`).join("");
    $$("[data-choice]").forEach(button => button.addEventListener("click", () => { selected = Number(button.dataset.choice); render(); }));
  };
  $("#step-next").addEventListener("click", async () => {
    selections[step] = steps[step].options[selected];
    if (step !== steps.length - 1) {
      step++;
      selected = selections[step] ? steps[step].options.indexOf(selections[step]) : 0;
      render();
      return;
    }
    const button = $("#step-next");
    setBusy(button, true);
    try {
      if (api?.isConfigured) {
        await api.student.updatePreferences({
          exam: selections[0],
          subject: selections[1],
          target_score: Number(String(selections[2]).replace(/\D/g, "")),
          daily_minutes: Number(String(selections[3]).match(/\d+/)?.[0]) || null
        });
      }
      location.href = "diagnostic.html";
    } catch (error) {
      showToast(error.message);
      setBusy(button, false);
    }
  });
  $("#step-back").addEventListener("click", () => { if (step === 0) location.href = "register.html"; else { step--; selected = 0; render(); } });
  render();
}

function initDiagnostic() {
  const input = $("#diagnostic-answer"), check = $("#diagnostic-check");
  if (!input || !check) return;
  const page = $("#diagnostic-page");
  const startedAt = performance.now();
  let confidence = null;
  input.addEventListener("input", () => check.disabled = !input.value.trim());
  $$(".confidence button").forEach(button => button.addEventListener("click", () => {
    $$(".confidence button").forEach(item => item.classList.toggle("active", item === button));
    confidence = button.textContent.trim();
  }));
  check.addEventListener("click", async () => {
    setBusy(check, true);
    try {
      if (api?.isConfigured) {
        const result = await api.diagnostics.submitAnswer(page.dataset.diagnosticTaskId, {
          answer: input.value.trim(),
          confidence,
          elapsed_seconds: Math.round((performance.now() - startedAt) / 1000)
        });
        hydrateDiagnosticResult(result?.result || result);
      }
      page.classList.add("hidden");
      $("#diagnostic-result").classList.remove("hidden");
      window.scrollTo(0,0);
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(check, false);
    }
  });
  let seconds = 154;
  setInterval(() => { seconds++; const m=String(Math.floor(seconds/60)).padStart(2,"0"), s=String(seconds%60).padStart(2,"0"); const timer=$("#timer"); if(timer) timer.textContent=`${m}:${s}`; },1000);
}

function hydrateDiagnosticResult(result) {
  if (!result) return;
  setText("#diagnostic-summary", result.summary);
  setText("#diagnostic-current-score", result.current_score);
  setText("#diagnostic-potential-score", result.potential_score);
  setText("#diagnostic-strength", result.strength);
  setText("#diagnostic-gap", result.main_gap);
  setText("#diagnostic-pace", result.recommended_pace);
}

async function initLesson() {
  const shell = $("[data-task-dataset]");
  const input = $("#lesson-answer");
  const extendedInput = $("#lesson-extended-answer");
  const check = $("#answer-check");
  if (!shell || !input || !extendedInput || !check) return;

  const storageKey = "stedy-ege-89892516-progress";
  const saved = readStoredObject(storageKey);
  let tasks = [];
  let currentIndex = Math.max(0, Number(new URLSearchParams(location.search).get("task") || saved.current || 1) - 1);
  let hasRendered = false;

  const feedback = $("#lesson-feedback");
  const solution = $("#lesson-solution");
  const drawer = $("#lesson-task-drawer");

  const currentTask = () => tasks[currentIndex];
  const currentValue = () => currentTask()?.type === "extended" ? extendedInput.value.trim() : input.value.trim();

  const saveProgress = () => {
    const task = currentTask();
    if (!task) return;
    saved.current = currentIndex + 1;
    saved.answers ||= {};
    saved.answers[task.id] ||= {};
    saved.answers[task.id].value = currentValue();
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) {}
  };

  const updateSavedState = (message = "Ответ не сохранён") => setText("#lesson-saved-state", message);

  const updateNavState = () => {
    $$("#lesson-task-nav button").forEach((button, index) => {
      const state = saved.answers?.[tasks[index]?.id];
      button.classList.toggle("active", index === currentIndex);
      button.classList.toggle("is-correct", state?.correct === true);
      button.classList.toggle("is-attempted", Boolean(state?.value) && state?.correct !== true);
      button.setAttribute("aria-current", index === currentIndex ? "step" : "false");
    });
  };

  const renderTask = index => {
    if (!tasks.length) return;
    if (hasRendered) saveProgress();
    currentIndex = Math.min(Math.max(index, 0), tasks.length - 1);
    const task = currentTask();
    const taskState = saved.answers?.[task.id] || {};
    const isExtended = task.type === "extended";

    setText("#lesson-task-number", `Задание ${task.number}`);
    setText("#lesson-task-type", isExtended ? "Развёрнутое решение" : "Краткий ответ");
    setText("#lesson-topic", task.topic);
    setText("#lesson-progress-label", `${task.number} из ${tasks.length}`);
    $("#lesson-progress-bar").style.width = `${(task.number / tasks.length) * 100}%`;
    $("#lesson-question").innerHTML = task.question_html || `<p>${escapeHtml(task.question)}</p>`;

    input.classList.toggle("hidden", isExtended);
    input.parentElement.classList.toggle("hidden", isExtended);
    extendedInput.classList.toggle("hidden", !isExtended);
    input.value = isExtended ? "" : (taskState.value || "");
    extendedInput.value = isExtended ? (taskState.value || "") : "";
    setText("#lesson-answer-label", isExtended ? "Твоё решение" : "Твой ответ");
    input.placeholder = "Введи число или выражение";
    check.textContent = isExtended ? "Сохранить решение" : "Проверить ответ";
    check.disabled = !currentValue();
    $("#lesson-answer-wrap").classList.remove("has-error", "has-success");
    feedback.className = "lesson-feedback hidden";
    feedback.textContent = "";
    $("#hint-message").classList.add("hidden");
    $("#error-message").classList.add("hidden");
    solution.classList.add("hidden");
    $("#lesson-solution-content").innerHTML = task.solution_html || `<p>${escapeHtml(task.solution)}</p>`;
    $("#solution-reveal").textContent = "Показать разбор";
    $("#lesson-prev").disabled = currentIndex === 0;
    $("#lesson-next").disabled = currentIndex === tasks.length - 1;
    updateSavedState(taskState.value ? (taskState.correct ? "Ответ верный" : "Черновик сохранён") : "Ответ не сохранён");
    updateNavState();
    saved.current = currentIndex + 1;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) {}
    history.replaceState(null, "", `${location.pathname}?task=${task.number}`);
    hasRendered = true;
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const showHint = () => {
    const task = currentTask();
    if (!task) return;
    $("#hint-message p").textContent = `Определи ключевую связь в теме «${task.topic}». Выпиши известные величины отдельно и сделай только один следующий шаг — без попытки решить всё сразу.`;
    $("#hint-message").classList.remove("hidden");
    $("#hint-message").scrollIntoView({behavior: "smooth", block: "nearest"});
  };

  const revealSolution = () => {
    if (!currentValue()) {
      showToast("Сначала запиши свою попытку — так разбор будет полезнее");
      (currentTask()?.type === "extended" ? extendedInput : input).focus();
      return;
    }
    const nowHidden = !solution.classList.contains("hidden");
    solution.classList.toggle("hidden", nowHidden);
    $("#solution-reveal").textContent = nowHidden ? "Показать разбор" : "Скрыть разбор";
    if (!nowHidden) solution.scrollIntoView({behavior: "smooth", block: "nearest"});
  };

  const onInput = () => {
    check.disabled = !currentValue();
    $("#lesson-answer-wrap").classList.remove("has-error", "has-success");
    feedback.className = "lesson-feedback hidden";
    updateSavedState(currentValue() ? "Черновик изменён" : "Ответ не сохранён");
  };
  input.addEventListener("input", onInput);
  extendedInput.addEventListener("input", onInput);

  check.addEventListener("click", () => {
    const task = currentTask();
    if (!task || !currentValue()) return;
    saved.answers ||= {};
    saved.answers[task.id] ||= {};
    saved.answers[task.id].value = currentValue();

    if (task.type === "extended") {
      saved.answers[task.id].correct = null;
      feedback.className = "lesson-feedback is-info";
      feedback.textContent = "Решение сохранено. Его можно сравнить с эталоном или позже отправить ИИ на анализ.";
      updateSavedState("Решение сохранено");
      showToast("Решение сохранено");
    } else if (lessonAnswersMatch(currentValue(), task.short_answer)) {
      saved.answers[task.id].correct = true;
      $("#lesson-answer-wrap").classList.add("has-success");
      feedback.className = "lesson-feedback is-success";
      feedback.textContent = "Верно. Отличная работа — можно переходить дальше.";
      $("#error-message").classList.add("hidden");
      updateSavedState("Ответ верный");
      showToast("Верно! Ответ сохранён");
    } else {
      saved.answers[task.id].correct = false;
      $("#lesson-answer-wrap").classList.add("has-error");
      feedback.className = "lesson-feedback is-error";
      feedback.textContent = "Пока не сходится. Проверь вычисления и формат ответа.";
      $("#error-message p").textContent = "Сверь исходные данные с условием и проверь последний переход. Если застрял — возьми подсказку или открой разбор.";
      $("#error-message").classList.remove("hidden");
      updateSavedState("Попытка сохранена");
    }
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) {}
    updateNavState();
  });

  $("#hint-button")?.addEventListener("click", showHint);
  $$('[data-hint]').forEach(button => button.addEventListener("click", showHint));
  $("#solution-reveal")?.addEventListener("click", revealSolution);
  $("#lesson-prev")?.addEventListener("click", () => renderTask(currentIndex - 1));
  $("#lesson-next")?.addEventListener("click", () => renderTask(currentIndex + 1));
  $("#lesson-list-toggle")?.addEventListener("click", () => drawer?.classList.toggle("is-open"));
  $("#lesson-list-close")?.addEventListener("click", () => drawer?.classList.remove("is-open"));

  const uploadButton = $("#solution-upload");
  const uploadInput = $("#solution-file");
  uploadButton?.addEventListener("click", () => uploadInput?.click());
  uploadInput?.addEventListener("change", () => {
    const file = uploadInput.files?.[0];
    if (!file) return;
    saved.answers ||= {};
    saved.answers[currentTask().id] ||= {};
    saved.answers[currentTask().id].attachment = file.name;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (_) {}
    showToast(`Фото «${file.name}» прикреплено к черновику`);
    uploadInput.value = "";
  });

  try {
    const response = await fetch(shell.dataset.taskDataset, {cache: "no-store"});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.tasks) || !data.tasks.length) throw new Error("В JSON нет заданий");
    tasks = data.tasks;
    currentIndex = Math.min(currentIndex, tasks.length - 1);
    const nav = $("#lesson-task-nav");
    nav.innerHTML = "";
    tasks.forEach((task, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = task.number;
      button.title = task.topic;
      button.addEventListener("click", () => { renderTask(index); drawer?.classList.remove("is-open"); });
      nav.appendChild(button);
    });
    renderTask(currentIndex);
  } catch (error) {
    $("#lesson-question").innerHTML = '<div class="lesson-load-error"><b>Не удалось загрузить задания</b><p>Открой сайт через локальный сервер или проверь файл data/ege-89892516.json.</p><button type="button" onclick="location.reload()">Попробовать снова</button></div>';
    check.disabled = true;
    showToast("Не удалось загрузить базу заданий");
  }
}

function readStoredObject(key) {
  try { return JSON.parse(localStorage.getItem(key) || "{}") || {}; }
  catch (_) { return {}; }
}

function lessonAnswersMatch(given, expected) {
  const normalize = value => String(value ?? "").trim().toLowerCase().replace(/\s+/g, "").replace(/−/g, "-");
  const left = normalize(given);
  const right = normalize(expected);
  const leftNumber = Number(left.replace(",", "."));
  const rightNumber = Number(right.replace(",", "."));
  if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) return Math.abs(leftNumber - rightNumber) < 1e-9;
  return left === right;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[character]);
}

function appendChatMessage(container, text, className) {
  if (!container || !text) return;
  const bubble=document.createElement("div");
  bubble.className=className;
  if (className === "mentor-message") {
    const paragraph=document.createElement("p");
    paragraph.textContent=text;
    bubble.appendChild(paragraph);
  } else {
    bubble.textContent=text;
  }
  container.appendChild(bubble);
  container.scrollTop=container.scrollHeight;
}

function initMap() {
  const nodes=$$("[data-topic]"); if(!nodes.length)return;
  nodes.forEach(node=>node.addEventListener("click",()=>{ nodes.forEach(n=>n.classList.remove("is-active")); node.classList.add("is-active"); const [name,score,color,impact]=node.dataset.topic.split("|"); $("#topic-name").textContent=name; $("#topic-score").textContent=`${score}%`; $("#topic-meter").style.width=`${score}%`; $("#topic-impact").textContent=impact; $("#topic-description").textContent=`Освоено на ${score}%. Этот навык влияет на несколько заданий первой и второй части.`; $("#topic-status").textContent=color==="green"?"Навык освоен":color==="yellow"?"Нужно повторение":"Критический пробел"; }));
  $$(".knowledge-filters button").forEach(button=>button.addEventListener("click",()=>{
    $$(".knowledge-filters button").forEach(el=>el.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter || "all";
    nodes.forEach(node => {
      const visible = filter === "all"
        || (filter === "weak" && node.classList.contains("knowledge-node--red"))
        || (filter === "repeat" && node.classList.contains("knowledge-node--yellow"));
      node.classList.toggle("is-filtered-out", !visible);
    });
    const firstVisible = nodes.find(node => !node.classList.contains("is-filtered-out"));
    if (firstVisible) firstVisible.click();
    showToast(`Показаны: ${button.textContent.toLowerCase()}`);
  }));
  if (api?.isConfigured) {
    api.student.knowledgeMap().then(payload => {
      const topics = Array.isArray(payload) ? payload : payload?.topics;
      if (!Array.isArray(topics)) return;
      nodes.forEach(node => {
        const currentName = node.dataset.topic.split("|")[0];
        const topic = topics.find(item => item.name === currentName || item.slug === node.dataset.slug);
        if (!topic) return;
        const score = Number(topic.score ?? topic.mastery_percent);
        const color = topic.status || (score >= 70 ? "green" : score >= 45 ? "yellow" : "red");
        const impact = topic.impact_label || topic.score_impact || node.dataset.topic.split("|")[3];
        node.dataset.topic = `${topic.name || currentName}|${score}|${color}|${impact}`;
        const scoreNode = $("b", node);
        if (scoreNode && Number.isFinite(score)) scoreNode.textContent = `${score}%`;
        node.classList.remove("knowledge-node--green", "knowledge-node--yellow", "knowledge-node--red");
        node.classList.add(`knowledge-node--${color}`);
      });
    }).catch(error => showToast(error.message));
  }
}

function getBalance() {
  const raw = localStorage.getItem("steady_balance");
  if (raw === null || raw === "") return 350;
  const stored = Number(raw);
  return Number.isFinite(stored) && stored >= 0 ? stored : 350;
}

function updateBalance(value) {
  localStorage.setItem("steady_balance", String(value));
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
      <nav><a href="profile.html"><span data-icon="user"></span>Личный кабинет</a><a href="profile.html#subscription"><span data-icon="card"></span>Подписка «Базовый»</a><a href="profile.html#settings"><span data-icon="settings"></span>Настройки</a><button type="button" id="account-logout"><span data-icon="logout"></span>Выйти</button></nav>
    </section>
    <div class="modal-backdrop" id="balance-modal"><section class="ui-modal" aria-label="Пополнение баланса">
      <div class="modal-title"><div><h2>Пополнить баланс</h2><p>Средства можно использовать для дополнительных проверок и функций ИИ.</p></div><button type="button" class="modal-close" data-modal-close>×</button></div>
      <div class="balance-current"><span>Текущий баланс<strong data-balance-value>${getBalance().toLocaleString("ru-RU")} ₽</strong></span><span data-icon="wallet"></span></div>
      <span class="amount-label">Выберите сумму</span><div class="amount-grid"><button type="button" data-amount="300">300 ₽</button><button type="button" class="active" data-amount="500">500 ₽</button><button type="button" data-amount="1000">1 000 ₽</button><button type="button" data-amount="2000">2 000 ₽</button></div>
      <label class="custom-amount"><input type="number" id="custom-amount" min="100" max="50000" placeholder="Другая сумма"><span>₽</span></label>
      <span class="amount-label">Способ оплаты</span><label class="payment-method"><span data-icon="card"></span><div><b>Банковская карта</b><small>Мир, Visa или Mastercard</small></div><input type="radio" checked></label>
      <button type="button" class="button button--primary" id="balance-submit">Перейти к оплате · 500 ₽</button><p class="modal-note">Оплата проходит на защищённой странице платёжного сервиса.</p>
    </section></div>
    <button type="button" class="app-chat-launcher" id="global-chat-open" aria-label="Открыть ИИ-наставника"><span data-icon="chat"></span><i></i></button>
    <section class="global-chat" id="global-chat" aria-label="Чат с ИИ-наставником">
      <header class="global-chat__head"><div class="global-chat__person"><span data-icon="sparkles"></span><div><b>Стэди</b><small>Персональный ИИ-наставник · онлайн</small></div></div><button type="button" id="global-chat-close" aria-label="Свернуть чат"><span data-icon="close"></span></button></header>
      <div class="global-chat__body" id="global-chat-body"><div class="global-chat__hello">Привет! Я вижу твой маршрут и последние результаты. Могу объяснить тему, подобрать тренировку или помочь разобраться с планом на сегодня.</div><div class="global-chat__quick"><button type="button">Что решать сегодня?</button><button type="button">Объясни подобие</button><button type="button">Как набрать 85?</button></div></div>
      <div class="global-chat__input"><input id="global-chat-input" placeholder="Задай вопрос Стэди"><button type="button" id="global-chat-send"><span data-icon="send"></span></button></div>
    </section>`;
  document.body.appendChild(overlays);
  $$('[data-toast]', overlays).forEach(element => element.addEventListener("click", () => showToast(element.dataset.toast)));
  updateBalance(getBalance());

  const notificationButton = $("[data-notifications]");
  const profileButton = $("[data-profile-toggle]");
  notificationButton?.addEventListener("click", event => { event.stopPropagation(); $("#profile-popover").classList.remove("open"); $("#notifications-popover").classList.toggle("open"); });
  profileButton?.addEventListener("click", event => { event.stopPropagation(); $("#notifications-popover").classList.remove("open"); $("#profile-popover").classList.toggle("open"); });
  $("#notifications-read")?.addEventListener("click", async () => {
    try {
      if (api?.isConfigured) await api.notifications.markAllRead();
      $$(".notification-item.unread").forEach(item => item.classList.remove("unread"));
      notificationButton?.classList.add("all-read");
      showToast("Все уведомления прочитаны");
    } catch (error) {
      showToast(error.message);
    }
  });
  document.addEventListener("click", event => { if (!event.target.closest(".ui-popover") && !event.target.closest("[data-notifications]") && !event.target.closest("[data-profile-toggle]")) $$(".ui-popover").forEach(popover => popover.classList.remove("open")); });

  let selectedAmount = 500;
  const openBalance = () => { $("#balance-modal").classList.add("open"); $("#profile-popover").classList.remove("open"); };
  $("[data-balance]")?.addEventListener("click", openBalance);
  $$("[data-open-balance]").forEach(button => button.addEventListener("click", openBalance));
  $$("[data-modal-close]").forEach(button => button.addEventListener("click", () => $("#balance-modal").classList.remove("open")));
  $("#balance-modal")?.addEventListener("click", event => { if (event.target.id === "balance-modal") event.target.classList.remove("open"); });
  $$("[data-amount]").forEach(button => button.addEventListener("click", () => { selectedAmount = Number(button.dataset.amount); $$("[data-amount]").forEach(item => item.classList.toggle("active", item === button)); $("#custom-amount").value = ""; $("#balance-submit").textContent = `Перейти к оплате · ${selectedAmount.toLocaleString("ru-RU")} ₽`; }));
  $("#custom-amount")?.addEventListener("input", event => { const amount = Number(event.target.value); if (amount >= 100) { selectedAmount = amount; $$("[data-amount]").forEach(item => item.classList.remove("active")); $("#balance-submit").textContent = `Перейти к оплате · ${selectedAmount.toLocaleString("ru-RU")} ₽`; } });
  $("#balance-submit")?.addEventListener("click", async () => {
    const submit = $("#balance-submit");
    setBusy(submit, true);
    try {
      if (api?.isConfigured) {
        const payment = await api.billing.createPayment(selectedAmount);
        const paymentUrl = payment?.confirmation_url || payment?.payment_url || payment?.url;
        if (paymentUrl) {
          location.href = paymentUrl;
          return;
        }
        $("#balance-modal").classList.remove("open");
        showToast("Платёж создан. Ожидаем подтверждение");
      } else {
        await new Promise(resolve => setTimeout(resolve, 350));
        updateBalance(getBalance() + selectedAmount);
        $("#balance-modal").classList.remove("open");
        showToast(`Демо-баланс пополнен на ${selectedAmount.toLocaleString("ru-RU")} ₽`);
      }
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(submit, false);
    }
  });

  const globalChat = $("#global-chat");
  const launcher = $("#global-chat-open");
  const isLesson = Boolean($(".mentor-panel"));
  const isMentorPage = Boolean($("[data-mentor-page]"));
  if (isMentorPage) {
    globalChat.remove();
    launcher.remove();
  } else if (isLesson) {
    globalChat.remove(); launcher.remove();
    const reopen = document.createElement("button"); reopen.type="button"; reopen.className="app-chat-launcher lesson-chat-reopen"; reopen.innerHTML='<span data-icon="chat"></span><i></i>'; document.body.appendChild(reopen);
    $(".mentor-head>button")?.setAttribute("aria-label","Свернуть чат");
    $(".mentor-head>button")?.addEventListener("click", () => document.body.classList.add("lesson-chat-hidden"));
    reopen.addEventListener("click", () => document.body.classList.remove("lesson-chat-hidden"));
  } else {
    const openGlobalChat = () => {
      globalChat.classList.add("open");
      setTimeout(() => $("#global-chat-input")?.focus(), 120);
    };
    launcher?.addEventListener("click", openGlobalChat);
    $("#dashboard-chat-open")?.addEventListener("click", openGlobalChat);
    $('a[href="#assistant"]')?.addEventListener("click", event => {
      event.preventDefault();
      openGlobalChat();
    });
    $("#global-chat-close")?.addEventListener("click", () => globalChat.classList.remove("open"));
    const sendGlobal = async () => {
      const field=$("#global-chat-input");
      if(!field.value.trim())return;
      const message=field.value.trim();
      appendChatMessage($("#global-chat-body"), message, "user-message");
      field.value="";
      if (!api?.isConfigured) {
        window.setTimeout(() => appendChatMessage($("#global-chat-body"), "В демо-режиме я показываю интерфейс чата. После подключения API здесь появится персональный ответ по твоему маршруту.", "global-chat__hello"), 350);
        return;
      }
      try {
        const result = await api.mentor.chat(message, { page: location.pathname.split("/").pop() || "dashboard" });
        appendChatMessage($("#global-chat-body"), result?.message || result?.answer || "Я получил сообщение.", "global-chat__hello");
      } catch (error) {
        showToast(error.message);
      }
    };
    $("#global-chat-send")?.addEventListener("click",sendGlobal); $("#global-chat-input")?.addEventListener("keydown",event=>{if(event.key==="Enter")sendGlobal();});
    $$(".global-chat__quick button").forEach(button => button.addEventListener("click", () => { $("#global-chat-input").value = button.textContent; sendGlobal(); }));
  }
  $("#account-logout")?.addEventListener("click", async () => {
    if (api?.isConfigured) await api.auth.logout();
    else api?.setToken(null);
    location.href = "login.html";
  });
  hydrateAppChrome();
  renderIcons(overlays);
}

function initProfilePage() {
  if (!$(".profile-page")) return;
  updateBalance(getBalance());
  $("#profile-save")?.addEventListener("click", async () => {
    const button = $("#profile-save");
    const fields = Object.fromEntries($$("#profile-form [name]").map(field => [field.name, field.value.trim()]));
    setBusy(button, true);
    try {
      const profile = api?.isConfigured ? await api.student.updateProfile(fields) : fields;
      const name = profile?.name || fields.name;
      $$("[data-user-name], [data-profile-name]").forEach(element => element.textContent = name);
      showToast(api?.isConfigured ? "Данные профиля сохранены" : "Изменения сохранены в демо-режиме");
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(button, false);
    }
  });
  $$(".switch").forEach(button => button.addEventListener("click", () => { button.classList.toggle("active"); button.setAttribute("aria-pressed", String(button.classList.contains("active"))); }));
  $("[data-share-achievement]")?.addEventListener("click", async () => {
    const shareData = {
      title: "Мой прогресс в Стэди",
      text: "12 дней подряд, уровень «Тактик» и ещё один небольшой шаг к 85 баллам!",
      url: location.href.split("#")[0]
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        showToast("Текст достижения скопирован");
      } else showToast("Функция публикации будет доступна в мобильном браузере");
    } catch (error) {
      if (error.name !== "AbortError") showToast("Не удалось открыть публикацию");
    }
  });
  $("#transactions-load")?.addEventListener("click", async () => {
    const button = $("#transactions-load");
    if (!api?.isConfigured) {
      showToast("В демо показаны последние операции");
      return;
    }
    setBusy(button, true);
    try {
      const payload = await api.billing.transactions();
      const items = Array.isArray(payload) ? payload : payload?.items;
      if (Array.isArray(items)) renderTransactions(items);
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(button, false);
    }
  });
}

function initAchievementSlider() {
  const track = $(".achievement-scroll");
  if (!track || track.closest(".achievement-slider")) return;
  const wrapper = document.createElement("div");
  wrapper.className = "achievement-slider";
  track.parentNode.insertBefore(wrapper, track);
  wrapper.appendChild(track);
  const controls = document.createElement("div");
  controls.className = "achievement-slider__controls";
  controls.innerHTML = `<button type="button" data-achievement-prev aria-label="Предыдущее достижение">←</button><span><b>1</b> / ${track.children.length}</span><button type="button" data-achievement-next aria-label="Следующее достижение">→</button>`;
  wrapper.appendChild(controls);
  const move = direction => {
    const card = $("article", track);
    track.scrollBy({left: direction * ((card?.getBoundingClientRect().width || 230) + 12), behavior:"smooth"});
  };
  $("[data-achievement-prev]", controls).addEventListener("click", () => move(-1));
  $("[data-achievement-next]", controls).addEventListener("click", () => move(1));
  track.addEventListener("scroll", () => {
    const card = $("article", track);
    const step = (card?.getBoundingClientRect().width || 230) + 12;
    $("b", controls).textContent = String(Math.min(track.children.length, Math.round(track.scrollLeft / step) + 1));
  }, {passive:true});
}

function initMentorPage() {
  const page = $("[data-mentor-page]");
  if (!page) return;
  const input = $("#mentor-page-input");
  const body = $("#mentor-page-chat");
  const send = async () => {
    const message = input?.value.trim();
    if (!message) return;
    appendChatMessage(body, message, "user-message");
    input.value = "";
    if (!api?.isConfigured) {
      window.setTimeout(() => appendChatMessage(body, "Вижу, что тема «Подобие» сейчас сильнее всего влияет на твой результат. Можем разобрать её на схеме, найти ошибку в последней задаче или составить короткую тренировку.", "mentor-message"), 300);
      return;
    }
    try {
      const result = await api.mentor.chat(message, {page:"mentor", context:"knowledge-map"});
      appendChatMessage(body, result?.message || result?.answer || "Давай разберём это вместе.", "mentor-message");
    } catch (error) { showToast(error.message); }
  };
  $("#mentor-page-send")?.addEventListener("click", send);
  input?.addEventListener("keydown", event => { if (event.key === "Enter") send(); });
  $$("[data-mentor-prompt]").forEach(button => button.addEventListener("click", () => { input.value = button.textContent.trim(); send(); }));
}

async function initExam() {
  const page = $("[data-exam-page]");
  if (!page) return;
  const start = $("#exam-start");
  const input = $("#exam-answer");
  const save = $("#exam-save");
  const feedback = $("#exam-feedback");
  let tasks = [];
  let currentIndex = 0;
  let answers = {};
  let timerId = null;
  let secondsLeft = 20 * 60;

  const shuffle = items => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  };

  const saveDraft = () => {
    const task = tasks[currentIndex];
    if (task && input) answers[task.id] = input.value.trim();
  };

  const updateExamNav = () => {
    $$("#exam-task-nav button").forEach((button, index) => {
      const task = tasks[index];
      button.classList.toggle("active", index === currentIndex);
      button.classList.toggle("is-answered", Boolean(answers[task?.id]));
      button.setAttribute("aria-current", index === currentIndex ? "step" : "false");
    });
  };

  const renderExamTask = index => {
    if (!tasks.length) return;
    saveDraft();
    currentIndex = Math.min(Math.max(index, 0), tasks.length - 1);
    const task = tasks[currentIndex];
    setText("#exam-task-number", `Задание ${task.number}`);
    setText("#exam-task-topic", task.topic);
    setText("#exam-task-progress", `${currentIndex + 1} из ${tasks.length}`);
    $("#exam-question").innerHTML = task.question_html || `<p>${escapeHtml(task.question)}</p>`;
    input.value = answers[task.id] || "";
    save.disabled = !input.value.trim();
    save.innerHTML = currentIndex === tasks.length - 1
      ? 'Завершить пробник <span data-icon="check"></span>'
      : 'Сохранить и далее <span data-icon="arrow"></span>';
    renderIcons(save);
    $("#exam-prev").disabled = currentIndex === 0;
    feedback.className = "lesson-feedback hidden";
    feedback.textContent = "";
    updateExamNav();
    input.focus();
  };

  const finishExam = () => {
    saveDraft();
    clearInterval(timerId);
    const score = tasks.reduce((total, task) => total + Number(lessonAnswersMatch(answers[task.id], task.short_answer)), 0);
    $(".exam-workspace")?.classList.add("hidden");
    $("#exam-result")?.classList.remove("hidden");
    setText("#exam-result-title", `${score} из ${tasks.length} — ${score === 3 ? "отличный результат" : score === 2 ? "хороший темп" : "есть что повторить"}`);
    setText("#exam-result-copy", score === 3
      ? "Все ответы верные. Можно пройти новую случайную подборку."
      : "Посмотри правильные ответы и попробуй ещё раз с новой подборкой.");
    const resultList = $("#exam-result-tasks");
    resultList.innerHTML = "";
    tasks.forEach((task, index) => {
      const correct = lessonAnswersMatch(answers[task.id], task.short_answer);
      const row = document.createElement("div");
      row.className = correct ? "is-correct" : "is-wrong";
      const number = document.createElement("span");
      number.textContent = String(index + 1);
      const copy = document.createElement("div");
      const title = document.createElement("b");
      title.textContent = task.topic;
      const detail = document.createElement("small");
      detail.textContent = correct ? `Верно: ${task.short_answer}` : `Твой ответ: ${answers[task.id] || "—"} · Верный: ${task.short_answer}`;
      copy.append(title, detail);
      row.append(number, copy);
      resultList.appendChild(row);
    });
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const startTimer = () => {
    clearInterval(timerId);
    secondsLeft = 20 * 60;
    const draw = () => {
      const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
      const seconds = String(secondsLeft % 60).padStart(2, "0");
      setText("#exam-timer", `${minutes}:${seconds}`);
      if (secondsLeft <= 0) finishExam();
      secondsLeft--;
    };
    draw();
    timerId = setInterval(draw, 1000);
  };

  start?.addEventListener("click", async () => {
    setBusy(start, true);
    try {
      const response = await fetch(page.dataset.taskDataset, {cache: "no-store"});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const pool = data.tasks.filter(task => task.type === "short");
      if (pool.length < 3) throw new Error("Недостаточно заданий для пробника");
      tasks = shuffle(pool).slice(0, 3);
      answers = {};
      currentIndex = 0;
      const nav = $("#exam-task-nav");
      nav.innerHTML = "";
      tasks.forEach((task, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = String(index + 1);
        button.title = task.topic;
        button.addEventListener("click", () => renderExamTask(index));
        nav.appendChild(button);
      });
      $(".exam-overview")?.classList.add("hidden");
      $(".exam-workspace")?.classList.remove("hidden");
      renderExamTask(0);
      startTimer();
      showToast("Случайная подборка из трёх заданий готова");
    } catch (error) {
      showToast("Не удалось загрузить задания. Попробуй обновить страницу");
    } finally {
      setBusy(start, false);
    }
  });
  input?.addEventListener("input", event => {
    if (tasks[currentIndex]) answers[tasks[currentIndex].id] = event.target.value.trim();
    save.disabled = !event.target.value.trim();
    feedback.className = "lesson-feedback hidden";
    updateExamNav();
  });
  save?.addEventListener("click", () => {
    saveDraft();
    updateExamNav();
    if (currentIndex === tasks.length - 1) finishExam();
    else renderExamTask(currentIndex + 1);
  });
  $("#exam-prev")?.addEventListener("click", () => renderExamTask(currentIndex - 1));
  $("#exam-restart")?.addEventListener("click", () => location.reload());
}

function renderTransactions(items) {
  const body = $("#transactions-body");
  if (!body) return;
  body.innerHTML = "";
  items.forEach(item => {
    const row = document.createElement("tr");
    const values = [
      item.date_label || item.created_at || "—",
      item.title || item.type_label || "Операция",
      item.method_label || item.method || "—",
      item.amount_label || `${Number(item.amount || 0).toLocaleString("ru-RU")} ₽`,
      item.status_label || item.status || "Выполнено"
    ];
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 4) cell.className = "payment-status";
      row.appendChild(cell);
    });
    body.appendChild(row);
  });
}

async function hydrateAppChrome() {
  if (!api?.isConfigured) return;
  try {
    const [balancePayload, notificationsPayload] = await Promise.all([
      api.billing.balance().catch(() => null),
      api.notifications.list().catch(() => null)
    ]);
    const balance = Number(balancePayload?.balance ?? balancePayload?.amount);
    if (Number.isFinite(balance)) updateBalance(balance);
    const notifications = Array.isArray(notificationsPayload)
      ? notificationsPayload
      : notificationsPayload?.items;
    if (Array.isArray(notifications) && notifications.length) renderNotificationList(notifications);
  } catch (error) {
    console.warn("Не удалось обновить интерфейс кабинета", error);
  }
}

function renderNotificationList(notifications) {
  const list = $(".notification-list");
  if (!list) return;
  list.innerHTML = "";
  notifications.slice(0, 8).forEach(notification => {
    const article = document.createElement("article");
    article.className = `notification-item${notification.read_at || notification.is_read ? "" : " unread"}`;
    article.dataset.notificationId = notification.id || "";
    const icon = document.createElement("span");
    icon.className = "notification-item__icon";
    icon.dataset.icon = notification.icon || "sparkles";
    const copy = document.createElement("div");
    const title = document.createElement("b");
    const text = document.createElement("p");
    const time = document.createElement("time");
    title.textContent = notification.title || "Новое уведомление";
    text.textContent = notification.message || notification.text || "";
    time.textContent = notification.time_label || notification.created_at_label || "";
    copy.append(title, text, time);
    article.append(icon, copy);
    article.addEventListener("click", async () => {
      if (!article.classList.contains("unread")) return;
      if (api?.isConfigured && notification.id) await api.notifications.markRead(notification.id).catch(() => null);
      article.classList.remove("unread");
    });
    list.appendChild(article);
  });
  renderIcons(list);
}

async function initDashboard() {
  if (!$("[data-dashboard]")) return;
  const now = new Date();
  const dateText = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(now);
  const dateNode = $("#dashboard-date");
  if (dateNode) dateNode.textContent = dateText.charAt(0).toUpperCase() + dateText.slice(1);
  const hour = now.getHours();
  const greeting = hour < 6 ? "Доброй ночи" : hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";
  if ($("#dashboard-greeting")) $("#dashboard-greeting").textContent = greeting;
  if (!api?.isConfigured) return;

  try {
    const data = await api.student.dashboard();
    const user = data?.user || data?.student || {};
    const mission = data?.mission || data?.current_mission || {};
    const forecast = data?.forecast || {};
    const name = user.first_name || user.name;
    if (name) $$("[data-user-name]").forEach(element => element.textContent = name);
    setText("#dashboard-minutes", formatMinutes(mission.minutes ?? data?.today_minutes));
    setText("#mission-title", mission.title);
    setText("#mission-minutes", formatMinutes(mission.minutes));
    setText("#mission-tasks", formatCount(mission.tasks_count ?? mission.tasks, ["задача", "задачи", "задач"]));
    const xp = Number(mission.xp);
    if (Number.isFinite(xp)) setText("#mission-xp", `+${xp} XP`);
    const progress = Math.max(0, Math.min(100, Number(mission.progress_percent ?? mission.progress)));
    if (Number.isFinite(progress)) {
      $("#mission-progress")?.style.setProperty("width", `${progress}%`);
      setText("#mission-progress-label", `${progress}%`);
    }
    setText("#forecast-current", forecast.current ?? forecast.score);
    setText("#forecast-next", forecast.next_week ?? forecast.next);
    setText("#forecast-goal", forecast.goal ?? user.goal_score);
    const balance = Number(data?.balance);
    if (Number.isFinite(balance)) updateBalance(balance);
  } catch (error) {
    showToast(error.message);
  }
}

function setText(selector, value) {
  if (value === undefined || value === null || value === "") return;
  const element = $(selector);
  if (element) element.textContent = value;
}

function formatMinutes(value) {
  const minutes = Number(value);
  if (!Number.isFinite(minutes)) return value;
  return `${minutes} ${plural(minutes, ["минута", "минуты", "минут"])}`;
}

function formatCount(value, forms) {
  const count = Number(value);
  if (!Number.isFinite(count)) return value;
  return `${count} ${plural(count, forms)}`;
}

function plural(number, forms) {
  const value = Math.abs(number) % 100;
  const last = value % 10;
  if (value > 10 && value < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}
