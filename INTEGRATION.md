# Интеграция frontend Стэди с backend

Верстка не зависит от backend-фреймворка. Для подключения достаточно реализовать
JSON API и указать его адрес в `config.js`.

```js
window.STEADY_CONFIG = {
  apiBaseUrl: "https://api.example.ru"
};
```

Если `apiBaseUrl` пустой, проект работает в демо-режиме и не отправляет сетевые
запросы. Токен доступа хранится под ключом `steady_access_token`. API-клиент также
отправляет `credentials: "include"`, поэтому можно перейти на защищённую
HttpOnly-cookie без переделки экранов.

## Общие правила

- Базовый префикс: `/api/v1`.
- Формат тела и ответа: JSON.
- Ошибка: `{ "message": "Понятный текст для пользователя", "errors": {} }`.
- Авторизация: `Authorization: Bearer <token>` и/или HttpOnly-cookie.
- Денежные значения передаются целым числом в рублях.
- Даты передаются в ISO 8601.
- Для production нужны HTTPS и CORS только для домена frontend.

## Контракты

### Авторизация

`POST /api/v1/auth/register`

```json
{ "name": "Алексей", "email": "alexey@example.ru", "password": "secret123" }
```

`POST /api/v1/auth/login`

```json
{ "email": "alexey@example.ru", "password": "secret123", "remember": "1" }
```

Оба метода могут вернуть:

```json
{ "access_token": "token", "user": { "id": 17, "name": "Алексей", "role": "student" } }
```

Допустимые роли продукта: `student`, `admin`. Админская часть в эту верстку не
включена и может быть реализована в WordPress.

Также используются:

- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/password/reset-request`

### Кабинет ученика

`GET /api/v1/student/dashboard`

```json
{
  "user": { "name": "Алексей", "goal_score": 85 },
  "balance": 350,
  "mission": {
    "id": 81,
    "title": "Подобие треугольников",
    "minutes": 18,
    "tasks_count": 6,
    "xp": 180,
    "progress_percent": 43
  },
  "forecast": { "current": 73, "next_week": 78, "goal": 85 }
}
```

Профиль:

- `GET /api/v1/student/profile`
- `PATCH /api/v1/student/profile`
- `PUT /api/v1/student/preferences`
- `GET /api/v1/student/knowledge-map?subject=math`

### Диагностика

- `GET /api/v1/diagnostics/current`
- `POST /api/v1/diagnostics`
- `POST /api/v1/diagnostics/tasks/{taskId}/answer`

Ответ диагностики использует поля `answer`, `confidence` и `elapsed_seconds`. После
последней задачи backend может вернуть объект `result`:

```json
{
  "result": {
    "summary": "Найдены 3 сильные темы и 2 важных пробела.",
    "current_score": 68,
    "potential_score": "78–82",
    "strength": "Уравнения и вычисления",
    "main_gap": "Подобие треугольников",
    "recommended_pace": "22 минуты в день"
  }
}
```

### Миссии и задачи

Локальный демонстрационный набор находится в `data/ege-89892516.json`. Каждый
элемент `tasks` содержит:

```json
{
  "id": "697335",
  "number": 1,
  "type": "short",
  "topic": "Планиметрия · Треугольники",
  "question": "Текст без разметки",
  "question_html": "Безопасная подготовленная разметка",
  "short_answer": "52",
  "answer": "52",
  "solution": "Текст эталонного решения",
  "image": "assets/tasks/89892516/task-01-question-01.svg",
  "images": ["assets/tasks/89892516/task-01-question-01.svg"]
}
```

У задач второй части `type` равен `extended`, `short_answer` равен `null`, а в
`answer` и `solution` находится эталонное развёрнутое решение. Это разделение
позволит следующему модулю ИИ анализировать ход мысли, не сводя вторую часть к
строковому сравнению.

- `GET /api/v1/missions/current`
- `POST /api/v1/missions/{missionId}/start`
- `POST /api/v1/tasks/{taskId}/answer`
- `POST /api/v1/tasks/{taskId}/hint`
- `POST /api/v1/tasks/{taskId}/solution-image` (`multipart/form-data`, поле `solution`)
- `GET /api/v1/exams`
- `POST /api/v1/exams/{examId}/start`
- `PUT /api/v1/exam-attempts/{attemptId}/tasks/{taskId}/answer`
- `POST /api/v1/exam-attempts/{attemptId}/finish`

Проверка ответа:

```json
{ "answer": "9", "elapsed_seconds": 74 }
```

```json
{
  "correct": false,
  "message": "Ответ пока не сходится",
  "explanation": "Ты верно нашёл коэффициент, но применил его в обратную сторону."
}
```

Подсказка:

```json
{ "level": 1 }
```

```json
{ "hint": "Сначала сравни соответствующие стороны AB и AD." }
```

### ИИ-наставник

`POST /api/v1/mentor/chat`

```json
{
  "message": "Объясни подобие проще",
  "context": { "task_id": "demo-similarity-001", "page": "lesson" }
}
```

```json
{ "message": "Представь две одинаковые фотографии разного размера..." }
```

Для контроля расходов лимиты, модель и длину истории нужно определять на backend.
Frontend намеренно не содержит ключ OpenAI и никогда не должен его получать.

### Уведомления

- `GET /api/v1/notifications`
- `POST /api/v1/notifications/{notificationId}/read`
- `POST /api/v1/notifications/read-all`

Список можно вернуть массивом либо объектом `{ "items": [] }`. Элемент:

```json
{
  "id": 25,
  "title": "Прогноз вырос",
  "message": "Текущий прогноз увеличился на 2 балла.",
  "icon": "target",
  "is_read": false,
  "time_label": "5 минут назад"
}
```

### Баланс и платежи

- `GET /api/v1/billing/balance` → `{ "balance": 350 }`
- `GET /api/v1/billing/subscription`
- `GET /api/v1/billing/transactions`
- `POST /api/v1/billing/payments`

```json
{ "amount": 500, "return_url": "https://stedy.ru/profile.html" }
```

```json
{ "payment_id": "pay_123", "confirmation_url": "https://payment.example/..." }
```

Баланс меняется только после подтверждённого webhook платёжной системы. Frontend
не считает переход на платёжную страницу успешной оплатой.

## События и устойчивые селекторы

Для интеграции можно использовать существующие ID и `data-*` атрибуты:

- `[data-auth]` — формы входа и регистрации;
- `[data-dashboard]` — кабинет;
- `[data-task-id]` — текущая задача;
- `[data-balance]`, `[data-balance-value]` — баланс;
- `[data-notifications]` — уведомления;
- `[data-profile-toggle]` — меню аккаунта;
- `#profile-form`, `#profile-save` — профиль;
- `#global-chat-*`, `#mentor-*` — ИИ-чат.

Не вставляйте ответы API через `innerHTML`. Текущая реализация использует
`textContent`, чтобы пользовательские и AI-тексты не исполнялись как HTML.
