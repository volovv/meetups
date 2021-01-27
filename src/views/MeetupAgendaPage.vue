<template>
  <meetup-agenda
    v-if="meetup.agenda && meetup.agenda.length"
    :agenda="meetup.agenda"
  />
</template>

<script>
import MeetupAgenda from "@/components/meetup/MeetupAgenda.vue";

export default {
  name: "MeetupAgendaPage",

  components: {
    MeetupAgenda
  },

  props: {
    meetup: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
