import httpClient from "@/api/httpClient";

/**
 * Получает список митапов с API
 * @return {Promise} - объект со списком митапов
 */
export function fetchMeetups() {
  return httpClient.get("meetups");
}

/**
 * Получает данные митапа по его ID с API
 * @param {Number} meetupId
 * @return {Promise} - объект с данными митапа
 */
export function fetchMeetup(meetupId) {
  return httpClient.get(`meetups/${meetupId}`);
}

/**
 * Создает митап через API
 * @param {Object} meetup
 * @return {Promise} - объект с данными митапа
 */
export function createMeetup(meetup) {
  return httpClient.post(`meetups`, meetup);
}

/**
 * Обновляет митап через API
 * @param {Object} meetup
 * @return {Promise} - объект с данными митапа
 */
export function updateMeetup(meetup) {
  return httpClient.put(`meetups`, meetup);
}

/**
 * Удаляет митап по его ID с API
 * @param {Number} meetupId
 * @return {Promise} - пустой ответ со статусом 200
 */
export function deleteMeetup(meetupId) {
  return httpClient.delete(`meetups`, meetupId);
}

/**
 * Добавление текущего пользователя в список участников митапа
 * @param {Number} meetupId
 * @return {Promise} - пустой ответ со статусом 200
 */
export function attend(meetupId) {
  return httpClient.put(`meetups/${meetupId}/participation`);
}

/**
 * Удаление текущего пользователя в список участников митапа
 * @param {Number} meetupId
 * @return {Promise} - пустой ответ со статусом 200
 */
export function leave(meetupId) {
  return httpClient.delete(`meetups/${meetupId}/participation`);
}
