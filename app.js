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
  authForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const submit = $('button[type="submit"]', authForm);
    const mode = authForm.dataset.auth;
    const formData = Object.fromEntries(new FormData(authForm).entries());
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
      showFormMessage(authForm, error.message || "Не удалось выполнить вход", "error");
    } finally {
      setBusy(submit, false);
    }
  });
  $("#forgot-password")?.addEventListener("click", async () => {
    const email = $('input[name="email"]', authForm)?.value.trim();
    if (!email) {
      showFormMessage(authForm, "Сначала укажи email аккаунта", "error");
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
  initProgressPage();
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
  $(".form-message", form)?.remove();
}

function showFormMessage(form, message, type = "error") {
  clearFormMessage(form);
  const block = document.createElement("div");
  block.className = `form-message is-visible is-${type}`;
  block.setAttribute("role", type === "error" ? "alert" : "status");
  block.textContent = message;
  form.insertBefore(block, $('button[type="submit"]', form));
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
    : page === "progress.html" ? "progress"
    : page === "profile.html" ? (location.hash === "#awards" ? "awards" : "profile")
    : "dashboard";
  const links = [
    ["dashboard", "dashboard.html", "home", "Главная"],
    ["map", "map.html", "route", "Карта знаний"],
    ["lesson", "lesson.html", "target", "Тренировка"],
    ["exam", "exam.html", "exam", "Пробный экзамен"],
    ["mentor", "mentor.html", "chat", "ИИ-наставник"],
    ["progress", "progress.html", "chart", "Твой прогресс"],
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
    <a class="${active === "dashboard" ? "active" : ""}" href="dashboard.html"><span data-icon="home"></span><span>Главная</span></a>
    <a class="${active === "progress" ? "active" : ""}" href="progress.html"><span data-icon="chart"></span><span>Прогресс</span></a>
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

function initLesson() {
  const input=$("#lesson-answer"), check=$("#answer-check"), hint=$("#hint-button");
  if (!input || !check) return;
  let taskId = $(".student-app")?.dataset.taskId || "demo-task";
  input.addEventListener("input", () => { check.disabled=!input.value.trim(); $("#lesson-answer-wrap").classList.remove("has-error"); $("#answer-error").classList.add("hidden"); });
  check.addEventListener("click", async () => {
    setBusy(check, true);
    try {
      if (api?.isConfigured) {
        const result = await api.missions.submitAnswer(taskId, {
          answer: input.value.trim(),
          elapsed_seconds: Number($("[data-elapsed-seconds]")?.dataset.elapsedSeconds || 0)
        });
        if (result?.correct) {
          $("#lesson-answer-wrap").classList.remove("has-error");
          $("#answer-error").classList.add("hidden");
          $("#error-message").classList.add("hidden");
          showToast(result.message || "Верно! Миссия продолжается");
        } else {
          $("#lesson-answer-wrap").classList.add("has-error");
          $("#answer-error").classList.remove("hidden");
          $("#error-message").classList.remove("hidden");
          const text = $("#error-message p");
          if (text && result?.explanation) text.textContent = result.explanation;
        }
      } else {
        $("#lesson-answer-wrap").classList.add("has-error");
        $("#answer-error").classList.remove("hidden");
        $("#error-message").classList.remove("hidden");
      }
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(check, false);
    }
  });
  const showHint=async()=>{
    $("#hint-message").classList.remove("hidden");
    if (!api?.isConfigured) return;
    try {
      const result = await api.missions.hint(taskId);
      const text = $("#hint-message p");
      if (text && result?.hint) text.textContent = result.hint;
    } catch (error) {
      showToast(error.message);
    }
  };
  hint?.addEventListener("click", showHint); $$('[data-hint]').forEach(btn=>btn.addEventListener("click",showHint));
  const uploadButton = $("#solution-upload");
  const uploadInput = $("#solution-file");
  uploadButton?.addEventListener("click", () => uploadInput?.click());
  uploadInput?.addEventListener("change", async () => {
    const file = uploadInput.files?.[0];
    if (!file) return;
    if (!api?.isConfigured) {
      showToast(`Фото «${file.name}» выбрано. После подключения API оно отправится на проверку`);
      return;
    }
    setBusy(uploadButton, true);
    try {
      const result = await api.missions.uploadSolution(taskId, file);
      showToast(result?.message || "Решение загружено и отправлено на проверку");
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(uploadButton, false);
      uploadInput.value = "";
    }
  });
  const send=async()=>{
    const field=$("#mentor-input");
    if(!field.value.trim())return;
    const message=field.value.trim();
    appendChatMessage($("#mentor-chat"), message, "user-message");
    field.value="";
    if (!api?.isConfigured) return;
    try {
      const result = await api.mentor.chat(message, { task_id: taskId, page: "lesson" });
      appendChatMessage($("#mentor-chat"), result?.message || result?.answer || "Я получил сообщение.", "mentor-message");
    } catch (error) {
      showToast(error.message);
    }
  };
  $("#mentor-send")?.addEventListener("click",send); $("#mentor-input")?.addEventListener("keydown",e=>{if(e.key==="Enter")send();});
  if (api?.isConfigured) {
    api.missions.current().then(mission => {
      const task = mission?.current_task || mission?.task || mission;
      if (!task) return;
      taskId = task.id || taskId;
      if ($(".student-app")) $(".student-app").dataset.taskId = taskId;
      setText(".lesson-task h1", task.content || task.question);
      const lessonTitle = $(".lesson-header>div>span");
      if (lessonTitle && mission?.title) lessonTitle.textContent = mission.title;
    }).catch(error => showToast(error.message));
  }
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

function initProgressPage() {
  const page = $("[data-progress-page]");
  if (!page) return;
  $$(".progress-period button", page).forEach(button => button.addEventListener("click", () => {
    $$(".progress-period button", page).forEach(item => item.classList.toggle("active", item === button));
    showToast(`Показана статистика: ${button.textContent.toLowerCase()}`);
  }));
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

function initExam() {
  const page = $("[data-exam-page]");
  if (!page) return;
  const start = $("#exam-start");
  let attemptId = null;
  let currentTaskId = "task-1";
  start?.addEventListener("click", async () => {
    setBusy(start, true);
    try {
      if (api?.isConfigured) {
        const result = await api.exams.start(page.dataset.examId || "ege-math-demo-04");
        attemptId = result?.attempt_id || result?.id;
        currentTaskId = result?.current_task?.id || currentTaskId;
      }
      $(".exam-overview")?.classList.add("hidden");
      $(".exam-workspace")?.classList.remove("hidden");
      $("#exam-answer")?.focus();
      showToast("Пробный экзамен начат. Ответы сохраняются автоматически");
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(start, false);
    }
  });
  $$(".exam-task-nav button").forEach((button, index) => button.addEventListener("click", () => {
    $$(".exam-task-nav button").forEach(item => item.classList.toggle("active", item === button));
    setText("#exam-task-number", `Задание ${index + 1}`);
    setText("#exam-task-progress", `${index + 1} из 19`);
    currentTaskId = button.dataset.taskId || `task-${index + 1}`;
  }));
  $("#exam-answer")?.addEventListener("input", event => {
    const save = $("#exam-save");
    if (save) save.disabled = !event.target.value.trim();
  });
  $("#exam-save")?.addEventListener("click", async () => {
    const save = $("#exam-save");
    setBusy(save, true);
    try {
      if (api?.isConfigured && attemptId) {
        await api.exams.saveAnswer(attemptId, currentTaskId, {answer: $("#exam-answer").value.trim()});
      }
      showToast("Ответ сохранён. Можно перейти к следующему заданию");
    } catch (error) {
      showToast(error.message);
    } finally {
      setBusy(save, false);
    }
  });
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
    const labels = ["Дата", "Операция", "Способ", "Сумма", "Статус"];
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      cell.dataset.label = labels[index];
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
