/** URL адрес API */
import { API_URL } from "@/apiService";

export const ImageService = {
  /**
   * Загружает файл на сервер и получает
   * https://course-vue.javascript.ru/api/#/Images/ImagesController_uploadImage
   * @param {File} file - файл, который требуется загрузить
   * @return {Promise<Object>} - объект с ID изображения
   */
  // eslint-disable-next-line no-unused-vars
  uploadImage(file) {
    return fetch(`${API_URL}/images/upload`, {
      method: "POST",
      body: file
    }).then(res => res.json());
  },

  /**
   * Возвращает ссылку на изображение по ID
   * @param id - ID изображения
   * @return {string} - ссылка на изображение
   */
  getImageURL(id) {
    return id !== null ? `${API_URL}/images/${id}` : null;
  }
};
