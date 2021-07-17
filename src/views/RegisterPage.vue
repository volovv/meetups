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

import { register } from "@/api/authApi";
import { getRegisterFieldSpecifications } from "@/authService";
import { withProcessingResponse, showToasterMessage } from "@/helpers";

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
      const result = await withProcessingResponse(register)({
        email: email.value,
        fullname: name.value,
        password: password.value
      });

      if (result.success) {
        return showToasterMessage({
          status: "success",
          message: `Вы успешно зарегистрированы под именем ${result.success.fullname}`
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

  fieldSpecifications: getRegisterFieldSpecifications(),

  metaInfo: {
    title: "Регистрация"
  }
};
</script>

<style scoped></style>
