<template>
  <meetup-form-layout title="Создание митапа">
    <meetup-form
      :meetup="meetup"
      submitText="Создать"
      @cancel="cancel"
    ></meetup-form>
  </meetup-form-layout>
</template>

<script>
import MeetupFormLayout from "@/components/layouts/MeetupFormLayout";
import MeetupForm from "@/components/meetup/MeetupForm";

export default {
  name: "MeetupCreatePage",

  components: {
    MeetupFormLayout,
    MeetupForm
  },

  data() {
    return {
      meetup: {}
    };
  },

  methods: {
    // вернуться на главную страницу
    cancel() {
      this.$router
        .push({
          name: "index"
        })
        .catch(err => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
    }
  }
};
</script>

<style scoped></style>
