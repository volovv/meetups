import axios from "axios";

/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

/**
 * Создает полный путь к api
 *
 * @param {String} url - исходный url
 * @return {String} - url, содержащий полный путь к API
 */
function getFullApiUrl(url) {
  return `${API_URL}/${url}`;
}

export default {
  async get(url) {
    const fullApiUrl = getFullApiUrl(url);
    const { data } = await axios.get(fullApiUrl);

    return data;
  },
  async post(url, postData) {
    const fullApiUrl = getFullApiUrl(url);
    const { data } = await axios.post(fullApiUrl, postData);

    return data;
  },
  async put(url, postData) {
    const fullApiUrl = getFullApiUrl(url);
    const { data } = await axios.put(fullApiUrl, postData);

    return data;
  },
  async delete(url) {
    const fullApiUrl = getFullApiUrl(url);
    const { data } = await axios.delete(fullApiUrl);

    return data;
  }
};
