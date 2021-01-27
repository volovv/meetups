<template>
  <p v-if="description" class="meetup-description">{{ description }}</p>
</template>

<script>
export default {
  name: "MeetupDescription",

  props: {
    description: {
      type: String,
      required: false
    }
  }
};
</script>

<style scoped>
.meetup-description {
  padding-top: 33px;
}
</style>
