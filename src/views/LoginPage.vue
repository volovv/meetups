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

import { login } from "@/api/authApi";
import { getLoginFieldSpecifications } from "@/authService";
import { withProcessingResponse, showToasterMessage } from "@/helpers";

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
      const result = await withProcessingResponse(login)(
        email.value,
        password.value
      );

      if (result.success) {
        return showToasterMessage({
          status: "success",
          message: `Вы зашли под именем ${result.success.fullname}`
        });
      }

      if (result.error) {
        return showToasterMessage({
          status: "error",
          message: result.error.message
        });
      }
    }
  },

  fieldSpecifications: getLoginFieldSpecifications(),

  metaInfo: {
    title: "Вход"
  }
};
</script>

<style scoped></style>
