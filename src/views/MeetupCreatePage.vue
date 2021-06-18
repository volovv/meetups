<template>
  <meetup-form-layout title="Создание митапа">
    <meetup-form
      :meetup="meetup"
      submitText="Создать"
      @submit="submit"
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
      meetup: {
        id: 0,
        title: "",
        description: "",
        imageId: null,
        date: new Date(),
        place: "",
        agenda: []
      }
    };
  },

  methods: {
    submit(meetup) {
      this.meetup = meetup;
    },
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
  },

  metaInfo: {
    title: "Создание митапа"
  }
};
</script>

<style scoped></style>
