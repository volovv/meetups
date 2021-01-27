<template>
  <info-list v-if="list" :list="list">
    <template #default v-slot="list">
      <li v-for="listItem in list" :key="listItem.id">
        <app-icon :icon="listItem.icon" class="info-list__icon" />
        {{ listItem.text }}
      </li>
      <li v-if="date">
        <app-icon icon="cal-lg" class="info-list__icon" />
        <time :datetime="dateOnlyString">{{ localDate }}</time>
      </li>
    </template>
  </info-list>
</template>

<script>
import AppIcon from "@/components/ui/AppIcon";
import InfoList from "@/components/ui/InfoList";

export default {
  name: "MeetupInfo",

  components: {
    AppIcon,
    InfoList
  },

  props: {
    organizer: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  },

  computed: {
    // дата для вывода на страницу
    localDate() {
      return this.date.toLocaleString(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    },
    // дата для вывода в datetime
    dateOnlyString() {
      const YYYY = this.date.getUTCFullYear();
      const MM = (this.date.getUTCMonth() + 1).toString().padStart(2, "0");
      const DD = this.date
        .getUTCDate()
        .toString()
        .padStart(2, "0");
      return `${YYYY}-${MM}-${DD}`;
    },
    list() {
      let id = 0;

      return [
        {
          id: id++,
          icon: "user",
          text: this.organizer
        },
        {
          id: id++,
          icon: "map",
          text: this.place
        }
      ];
    }
  }
};
</script>

<style scoped></style>
