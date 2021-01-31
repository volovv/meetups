<template>
  <auth-layout title="Вход">
    <auth-form
      :fields="$options.fieldSpecifications"
      submitText="Войти"
      @submit="login"
    >
      <template #form-append>
        <div class="form__append">
          Нет аккаунта?
          <router-link :to="{ name: 'register' }" class="link"
            >Зарегистрируйтесь</router-link
          >
        </div>
      </template>
    </auth-form>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthForm from "@/components/AuthForm";

import { login } from "@/apiService";
import { getLoginFieldSpecifications } from "@/authService";

export default {
  name: "LoginPage",

  components: {
    AuthLayout,
    AuthForm
  },

  methods: {
    async login(fields) {
      const email = fields.find(field => field.field === "email");
      const password = fields.find(field => field.field === "password");

      // получить результат запроса
      let result = await login(email.value, password.value);

      // при ошибке показать сообщение
      if (result.error) {
        alert(result.message);
        // иначе вывести полное имя
      } else if (result.fullname) {
        alert(result.fullname);
      }
    }
  },

  fieldSpecifications: getLoginFieldSpecifications()
};
</script>

<style scoped></style>
