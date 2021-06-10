import axios from "axios";
import TopProgressBar from "@/plugins/TopProgressBar";

/** URL адрес API */
export const API_URL = process.env.VUE_APP_API_URL;

function getFullApiUrl(url) {
  return `${API_URL}/${url}`;
}

export default {
  async get(url) {
    const fullApiUrl = getFullApiUrl(url);

    TopProgressBar.start();

    return await axios
      .get(fullApiUrl)
      .then(response => {
        TopProgressBar.finish();
        return response.data;
      })
      .catch(error => {
        console.log(error);
        TopProgressBar.fail();
        return { error };
      });
  },
  async post(url, postData) {
    const fullApiUrl = getFullApiUrl(url);

    TopProgressBar.start();

    return await axios
      .post(fullApiUrl, postData)
      .then(response => {
        TopProgressBar.finish();
        return response.data;
      })
      .catch(error => {
        console.log(error);
        TopProgressBar.fail();
        return { error };
      });
  },
  async put(url, postData) {
    const fullApiUrl = getFullApiUrl(url);

    TopProgressBar.start();

    return await axios
      .put(fullApiUrl, postData)
      .then(response => {
        TopProgressBar.finish();
        return response.data;
      })
      .catch(error => {
        console.log(error);
        TopProgressBar.fail();
        return { error };
      });
  },
  async delete(url) {
    const fullApiUrl = getFullApiUrl(url);

    TopProgressBar.start();

    return await axios
      .delete(fullApiUrl)
      .then(response => {
        TopProgressBar.finish();
        return response.data;
      })
      .catch(error => {
        console.log(error);
        TopProgressBar.fail();
        return { error };
      });
  }
};
