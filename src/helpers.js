import TopProgressBar from "@/plugins/TopProgressBar";
import Toaster from "@/plugins/Toaster";

/**
 * Добавляет отображение загрузки с TopProgressBar для выполнения промиса
 *
 * @param {Promise} promise - исходный промис
 * @return {Promise} - значение, с которым завершился promise
 */
export function withTopProgressBar(func) {
  return async (...args) => {
    TopProgressBar.start();

    try {
      return await func(...args);
    } catch (err) {
      TopProgressBar.fail();
      throw err;
    } finally {
      TopProgressBar.finish();
    }
  };
}

/**
 * Добавляет обработку ответа от сервера
 *
 * @param {Promise} promise - исходный промис
 * @return {Promise} - значение, с которым завершился promise
 */
export function withResultResponse(func) {
  return async (...args) => {
    try {
      return {
        success: await func(...args),
        error: null
      };
    } catch (error) {
      const errorData = error && error.response && error.response.data;
      const errorStatus = error.response.status;

      if (errorStatus >= 400 && errorStatus < 500 && errorStatus !== 404) {
        return {
          success: null,
          error: errorData
        };
      }

      throw error;
    }
  };
}

/**
 * Возвращает промис с отображением прогресс-бара и обработкой ответа сервера
 *
 * @param {Promise} promise - исходный промис
 * @return {Promise} - значение, с которым завершился promise
 */
export function withProcessingResponse(func) {
  return async (...args) => {
    return await withResultResponse(withTopProgressBar(func))(...args);
  };
}

/**
 * Показывает тост с успешным результатом или ошибкой
 *
 * @param {Promise} promise - исходный промис
 */
export function showToasterMessage({ status, message = "" }) {
  // показать сообщение
  if (status === "success") {
    Toaster.success(message);
    return;
  }

  // при ошибке показать сообщение
  if (status === "error") {
    Toaster.error(message);
    return;
  }
}
