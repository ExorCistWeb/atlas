"use strict";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

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
