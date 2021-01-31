const common = {
  title: "",
  field: "",
  component: "app-input",
  model: { prop: "value", event: "input" },
  props: {}
};

export const getLoginFieldSpecifications = () => {
  return [
    {
      ...common,
      title: "Email",
      field: "email",
      props: {
        placeholder: "demo@email"
      },
      validate: [
        {
          rule: "required",
          message: "Требуется ввести Email"
        }
      ]
    },
    {
      ...common,
      title: "Пароль",
      field: "password",
      props: {
        type: "password",
        autocomplete: "off",
        placeholder: "password"
      },
      validate: [
        {
          rule: "required",
          message: "Требуется ввести пароль"
        }
      ]
    }
  ];
};

export const getRegisterFieldSpecifications = () => {
  return [
    {
      ...common,
      title: "Email",
      field: "email",
      validate: [
        {
          rule: "required",
          message: "Требуется ввести Email"
        }
      ]
    },
    {
      ...common,
      title: "Имя",
      field: "name",
      validate: [
        {
          rule: "required",
          message: "Требуется ввести полное имя"
        }
      ]
    },
    {
      ...common,
      title: "Пароль",
      field: "password",
      props: {
        type: "password",
        autocomplete: "off"
      },
      validate: [
        {
          rule: "required",
          message: "Требуется ввести пароль"
        }
      ]
    },
    {
      ...common,
      title: "Повтор пароля",
      field: "passwordConfirm",
      props: {
        type: "password",
        autocomplete: "off"
      },
      validate: [
        {
          rule: "passwordConfirm",
          message: "Пароли не совпадают",
          params: {
            nameConfirmField: "password"
          }
        }
      ]
    },
    {
      ...common,
      field: "agree",
      component: "app-checkbox",
      model: { prop: "checked", event: "change" },
      props: {
        label: "Я согласен с условиями"
      },
      validate: [
        {
          rule: "requiredCheckbox",
          message: "Требуется согласиться с условиями"
        }
      ]
    }
  ];
};
