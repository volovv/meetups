import axios from "axios";

/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

function getFullApiUrl(url) {
  return `${API_URL}/${url}`;
}

export default {
  async get(url) {
    const fullApiUrl = getFullApiUrl(url);

    return await axios
      .get(fullApiUrl)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  async post(url, postData) {
    const fullApiUrl = getFullApiUrl(url);

    return await axios
      .post(fullApiUrl, postData)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  async put(url, postData) {
    const fullApiUrl = getFullApiUrl(url);

    return await axios
      .put(fullApiUrl, postData)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  async delete(url) {
    const fullApiUrl = getFullApiUrl(url);

    return await axios
      .delete(fullApiUrl)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
