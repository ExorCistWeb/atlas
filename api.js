(function () {
  "use strict";

  const API_META = document.querySelector('meta[name="api-base-url"]');
  const runtimeBase = window.STEADY_CONFIG?.apiBaseUrl;
  const storedBase = localStorage.getItem("steady_api_base_url");
  const baseUrl = String(runtimeBase || API_META?.content || storedBase || "").replace(/\/+$/, "");
  const tokenKey = "steady_access_token";

  class APIError extends Error {
    constructor(message, status, details) {
      super(message);
      this.name = "APIError";
      this.status = status;
      this.details = details;
    }
  }

  function getToken() {
    return localStorage.getItem(tokenKey);
  }

  function setToken(token) {
    if (token) localStorage.setItem(tokenKey, token);
    else localStorage.removeItem(tokenKey);
  }

  async function request(path, options = {}) {
    if (!baseUrl) throw new APIError("API URL не настроен", 0);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeout || 15000);
    const token = getToken();
    const headers = new Headers(options.headers || {});
    headers.set("Accept", "application/json");
    if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
        credentials: "include",
        body: options.body instanceof FormData || typeof options.body === "string"
          ? options.body
          : options.body
            ? JSON.stringify(options.body)
            : undefined,
        signal: controller.signal
      });

      const contentType = response.headers.get("content-type") || "";
      const payload = response.status === 204
        ? null
        : contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      if (!response.ok) {
        const message = payload?.message || payload?.detail || `Ошибка запроса (${response.status})`;
        throw new APIError(message, response.status, payload);
      }

      return payload;
    } catch (error) {
      if (error.name === "AbortError") throw new APIError("Сервер не ответил вовремя", 408);
      if (error instanceof APIError) throw error;
      throw new APIError("Не удалось связаться с сервером", 0, error);
    } finally {
      clearTimeout(timeout);
    }
  }

  const api = {
    baseUrl,
    isConfigured: Boolean(baseUrl),
    getToken,
    setToken,
    request,
    APIError,

    auth: {
      async register(data) {
        const result = await request("/api/v1/auth/register", { method: "POST", body: data });
        if (result?.access_token) setToken(result.access_token);
        return result;
      },
      async login(data) {
        const result = await request("/api/v1/auth/login", { method: "POST", body: data });
        if (result?.access_token) setToken(result.access_token);
        return result;
      },
      me() {
        return request("/api/v1/auth/me");
      },
      requestPasswordReset(email) {
        return request("/api/v1/auth/password/reset-request", { method: "POST", body: { email } });
      },
      async logout() {
        try {
          return await request("/api/v1/auth/logout", { method: "POST" });
        } catch (error) {
          return null;
        } finally {
          setToken(null);
        }
      }
    },

    student: {
      dashboard() {
        return request("/api/v1/student/dashboard");
      },
      profile() {
        return request("/api/v1/student/profile");
      },
      updateProfile(data) {
        return request("/api/v1/student/profile", { method: "PATCH", body: data });
      },
      updatePreferences(data) {
        return request("/api/v1/student/preferences", { method: "PUT", body: data });
      },
      knowledgeMap(subject) {
        const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
        return request(`/api/v1/student/knowledge-map${query}`);
      }
    },

    diagnostics: {
      current() {
        return request("/api/v1/diagnostics/current");
      },
      start(data = {}) {
        return request("/api/v1/diagnostics", { method: "POST", body: data });
      },
      submitAnswer(taskId, data) {
        return request(`/api/v1/diagnostics/tasks/${encodeURIComponent(taskId)}/answer`, { method: "POST", body: data });
      }
    },

    missions: {
      current() {
        return request("/api/v1/missions/current");
      },
      start(missionId) {
        return request(`/api/v1/missions/${encodeURIComponent(missionId)}/start`, { method: "POST" });
      },
      submitAnswer(taskId, data) {
        return request(`/api/v1/tasks/${encodeURIComponent(taskId)}/answer`, { method: "POST", body: data });
      },
      hint(taskId, level = 1) {
        return request(`/api/v1/tasks/${encodeURIComponent(taskId)}/hint`, { method: "POST", body: { level } });
      },
      uploadSolution(taskId, file) {
        const form = new FormData();
        form.append("solution", file);
        return request(`/api/v1/tasks/${encodeURIComponent(taskId)}/solution-image`, { method: "POST", body: form, timeout: 30000 });
      }
    },

    exams: {
      list() {
        return request("/api/v1/exams");
      },
      start(examId) {
        return request(`/api/v1/exams/${encodeURIComponent(examId)}/start`, { method: "POST" });
      },
      saveAnswer(attemptId, taskId, data) {
        return request(`/api/v1/exam-attempts/${encodeURIComponent(attemptId)}/tasks/${encodeURIComponent(taskId)}/answer`, { method: "PUT", body: data });
      },
      finish(attemptId) {
        return request(`/api/v1/exam-attempts/${encodeURIComponent(attemptId)}/finish`, { method: "POST" });
      }
    },

    mentor: {
      chat(message, context = {}) {
        return request("/api/v1/mentor/chat", { method: "POST", body: { message, context } });
      }
    },

    notifications: {
      list() {
        return request("/api/v1/notifications");
      },
      markRead(notificationId) {
        return request(`/api/v1/notifications/${encodeURIComponent(notificationId)}/read`, { method: "POST" });
      },
      markAllRead() {
        return request("/api/v1/notifications/read-all", { method: "POST" });
      }
    },

    billing: {
      balance() {
        return request("/api/v1/billing/balance");
      },
      createPayment(amount, returnUrl = location.href) {
        return request("/api/v1/billing/payments", { method: "POST", body: { amount, return_url: returnUrl } });
      },
      subscription() {
        return request("/api/v1/billing/subscription");
      },
      transactions() {
        return request("/api/v1/billing/transactions");
      }
    }
  };

  window.SteadyAPI = api;
})();
