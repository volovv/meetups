<template>
  <meetup-form-layout title="Редактирование митапа">
    <meetup-form
      v-if="meetup"
      :meetup="meetup"
      submitText="Сохранить"
      @submit="submit"
      @cancel="cancel"
    ></meetup-form>
  </meetup-form-layout>
</template>

<script>
import { fetchMeetup } from "@/api/meetupsApi";
import MeetupFormLayout from "@/components/layouts/MeetupFormLayout";
import MeetupForm from "@/components/meetup/MeetupForm";

export default {
  name: "MeetupEditPage",

  components: {
    MeetupFormLayout,
    MeetupForm
  },

  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      meetup: null
    };
  },

  mounted() {
    // Получение данных митапа
    this.getMeetup();
  },

  methods: {
    // Получение данных митапа
    async getMeetup() {
      this.meetup = await fetchMeetup(this.meetupId);
    },
    submit(meetup) {
      this.meetup = meetup;
    },
    // вернуться на страницу редактируемого митапа
    cancel() {
      this.$router
        .push({
          name: "meetup",
          props: {
            meetupId: this.meetup.id
          }
        })
        .catch(err => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
    }
  },

  metaInfo() {
    return {
      title: `Редактирование митапа ${this.meetup && this.meetup.title}`
    };
  }
};
</script>

<style scoped></style>
