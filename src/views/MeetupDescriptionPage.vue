<template>
  <meetup-description
    v-if="meetup.description"
    :description="meetup.description"
  />
</template>

<script>
import MeetupDescription from "@/components/meetup/MeetupDescription.vue";

export default {
  name: "MeetupDescriptionPage",

  components: {
    MeetupDescription
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
