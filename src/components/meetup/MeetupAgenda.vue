<template>
  <div v-if="agenda && agenda.length" class="meetup-agenda">
    <meetup-agenda-item
      v-for="agendaItem in agenda"
      :key="agendaItem.id"
      :agendaItem="agendaItem"
    />
  </div>
</template>

<script>
import MeetupAgendaItem from "./MeetupAgendaItem";

export default {
  name: "MeetupAgenda",

  // components
  components: {
    MeetupAgendaItem
  },

  // props
  props: {
    agenda: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.meetup-agenda {
  margin: 0;
}
</style>
