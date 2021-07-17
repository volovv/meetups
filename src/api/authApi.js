import httpClient from "@/api/httpClient";

/**
 * Получение авторизованного пользователя
 * @return {Promise} - объект с данными пользователя
 */
export function fetchUser() {
  return httpClient.get("auth/user");
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - значение, с которым завершился promise
 */
export function login(email, password) {
  return httpClient.post("auth/login", {
    email,
    password
  });
}

/**
 * Выполняет logout пользователя
 * @return {Promise} - значение, с которым завершился promise
 */
export function logout() {
  return httpClient.post("auth/logout");
}

/**
 * Выполняет регистрацию пользователя и возвращает результат
 * @param {Object} user - данные пользователя
 * @return {Promise} - значение, с которым завершился promise
 */
export async function register(user) {
  const { email, fullname, password } = { ...user };

  return httpClient.post("auth/register", {
    email,
    fullname,
    password
  });
}
