<template>
  <auth-layout title="Регистрация">
    <auth-form
      :fields="$options.fieldSpecifications"
      submitText="Зарегистрироваться"
      @submit="register"
    >
      <template #form-append>
        <div class="form__append">
          Уже есть аккаунт?
          <router-link :to="{ name: 'login' }" class="link"
            >Войдите</router-link
          >
        </div>
      </template>
    </auth-form>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layouts/AuthLayout";
import AuthForm from "@/components/AuthForm";

import { register } from "@/apiService";
import { getRegisterFieldSpecifications } from "@/authService";

export default {
  name: "RegisterPage",

  components: {
    AuthLayout,
    AuthForm
  },

  methods: {
    async register(fields) {
      const email = fields.find(field => field.field === "email");
      const name = fields.find(field => field.field === "name");
      const password = fields.find(field => field.field === "password");

      // получить результат запроса
      let result = await register(email.value, name.value, password.value);

      // при ошибке показать сообщение
      if (result.error) {
        alert(result.message);
        // иначе вывести bl пользователя
      } else if (result.id) {
        alert(result.id);
      }
    }
  },

  fieldSpecifications: getRegisterFieldSpecifications()
};
</script>

<style scoped></style>
