<template>
  <form class="form" @submit.prevent="submit">
    <form-group
      v-for="(field, index) in localFields"
      :key="field.id"
      :label="field.title"
    >
      <component
        :is="field.component"
        :name="field.field"
        v-bind="field.props"
        :[field.model.prop]="field[field.model.prop]"
        @[field.model.event]="change($event, index, field)"
      >
        {{ field.label }}
      </component>
    </form-group>

    <div class="form__buttons">
      <primary-button tag="button" type="submit">{{
        submitText
      }}</primary-button>
    </div>

    <slot name="form-append" />
  </form>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { nanoid } from "nanoid";
import FormGroup from "@/components/ui/forms/FormGroup";
import AppInput from "@/components/ui/forms/AppInput";
import AppCheckbox from "@/components/ui/forms/AppCheckbox";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

export default {
  name: "AuthForm",

  components: {
    FormGroup,
    AppInput,
    AppCheckbox,
    PrimaryButton
  },

  props: {
    fields: {
      type: Array,
      required: true
    },
    submitText: {
      type: String,
      default: "Submit"
    }
  },

  data() {
    return {
      invalidFields: [],
      prevInvalidFields: []
    };
  },

  computed: {
    localFields() {
      let fields = cloneDeep(this.fields);

      fields = fields.map(field => {
        field.value = "";
        field.id = nanoid();

        return field;
      });

      return fields;
    }
  },

  methods: {
    change($event, index, field) {
      this.$set(this.localFields[index], field.model.prop, $event);
    },
    submit() {
      // получить массив неправильно заполненных полей
      this.invalidFields = this.getInvalidFields();

      // если есть поля, непрошедшие валидацию, то показать ошибку
      if (this.invalidFields.length) {
        this.showInvalidMessage();
      } else {
        // удалить предыдущие сообщения об ошибках
        this.removeInvalidMessages();
        this.$emit("submit", this.localFields);
      }
    },
    // получить невалидные поля
    getInvalidFields() {
      let invalidFields = [];

      // проход по всем полям формы
      for (let field of this.localFields) {
        // если не указаны правила валидации для поля, то пропустим его
        if (!field.validate || !field.validate.length) {
          continue;
        }

        // проход по всем правилам валидации
        field.validate.forEach(validate => {
          let nameValidate = validate.rule;
          nameValidate =
            nameValidate[0].toUpperCase() + nameValidate.substring(1);

          // если не нашелся обработчик такого правила, то идем дальше
          if (!this[`check${nameValidate}Field`]) {
            return;
          }

          // проверка поля по указанному правилу
          if (!this[`check${nameValidate}Field`](field)) {
            invalidFields.push({
              name: field.field,
              message:
                validate.message || `Неправильно заполнено поле ${field.title}`
            });
          }
        });
      }

      return invalidFields;
    },
    // показать сообщение об ошибке заполнения формы, если есть
    showInvalidMessage() {
      if (!this.invalidFields.length) {
        return;
      }

      // удалить предыдущие сообщения об ошибках
      this.removeInvalidMessages();

      // показать ошибку
      this.$toaster.error(
        this.invalidFields[0].message,
        `auth_${this.invalidFields[0].name}_invalid`
      );

      // сохранить выведенное сообщение
      this.prevInvalidFields = this.invalidFields;
    },
    // удалить сообщения об ошибках
    removeInvalidMessages() {
      for (let field of this.prevInvalidFields) {
        this.$toaster.removeToast(`auth_${field.name}_invalid`);
      }
    },
    // проверка на обязательно заполненное поле
    checkRequiredField(field) {
      return !!field.value;
    },
    // проверка на правильность заплнения email-поля
    checkEmailField(field) {
      const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      return re.test(field.value);
    },
    // проверка на надежность пароля
    checkPasswordStrengthField(field) {
      return field.value.length > 5;
    },
    // проверка на обязательно заполненное поле - checkbox
    checkRequiredCheckboxField(field) {
      return !!field.checked;
    },
    // проверка на совпадение полей
    checkPasswordConfirmField(field) {
      if (!field.validate) {
        return true;
      }

      const currentValidate = field.validate.find(
        validate => validate.rule === "passwordConfirm"
      );

      if (
        !currentValidate ||
        !currentValidate.params ||
        !currentValidate.params.nameConfirmField
      ) {
        return true;
      }

      const confirmField = this.localFields.find(
        field => field.field === currentValidate.params.nameConfirmField
      );

      if (confirmField && confirmField.value !== field.value) {
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped></style>
