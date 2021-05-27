import httpClient from "@/api/httpClient";

/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

/**
 * Возвращает ссылку на изображение по ID
 * @param id - ID изображения
 * @return {string} - ссылка на изображение
 */
export function getImageURL(id) {
  return id !== null ? `${API_URL}/images/${id}` : null;
}

/**
 * Загружает файл на сервер и получает
 * https://course-vue.javascript.ru/api/#/Images/ImagesController_uploadImage
 * @param {File} file - файл, который требуется загрузить
 * @return {Promise<Object>} - объект с ID изображения
 */
export function uploadImage(file) {
  return httpClient.post(`images/upload`, file);
}
