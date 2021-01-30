<template>
  <div class="container">
    <meetups-filter :filter.sync="filter" :view.sync="view"></meetups-filter>

    <fade-transition>
      <template v-if="filteredMeetups && filteredMeetups.length">
        <component :is="`meetups-${view}`" :meetups="filteredMeetups" />
      </template>
      <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
    </fade-transition>
  </div>
</template>

<script>
import { fetchMeetups, getMeetupCoverLink } from "@/apiService";
import MeetupsList from "@/components/meetups/MeetupsList";
import MeetupsCalendar from "@/components/meetups/MeetupsCalendar";
import MeetupsFilter from "@/components/meetups/MeetupsFilter";
import AppEmpty from "@/components/meetups/AppEmpty";
import FadeTransition from "@/components/ui/transition/FadeTransition";

const defaultQueryParams = {
  view: "list",
  search: "",
  date: "all",
  participation: "all"
};

const replaceRoutes = ["view"];

export default {
  name: "MeetupsPage",

  components: {
    MeetupsList,
    MeetupsCalendar,
    MeetupsFilter,
    AppEmpty,
    FadeTransition
  },

  data() {
    return {
      rawMeetups: [],
      filter: {
        date: defaultQueryParams.date,
        participation: defaultQueryParams.participation,
        search: defaultQueryParams.search
      },
      view: defaultQueryParams.view
    };
  },

  computed: {
    routeQuery() {
      return this.$route.query;
    },
    meetups() {
      return this.rawMeetups.map(meetup => {
        const meetupDate = new Date(meetup.date);
        return {
          ...meetup,
          cover: meetup.imageId ? getMeetupCoverLink(meetup) : undefined,
          date: meetupDate,
          localDate: meetupDate.toLocaleString(navigator.language, {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          dateOnlyString: meetupDate.toISOString().split("T")
        };
      });
    },
    filteredMeetups() {
      const now = new Date();

      const dateFilter = meetup => {
        const meetupDate = new Date(meetup.date);

        return (
          this.filter.date === "all" ||
          (this.filter.date === "past" && meetupDate <= now) ||
          (this.filter.date === "future" && meetupDate > now)
        );
      };

      const participationFilter = meetup =>
        this.filter.participation === "all" ||
        (this.filter.participation === "organizing" && meetup.organizing) ||
        (this.filter.participation === "attending" && meetup.attending);

      const searchFilter = meetup =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(" ")
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter(
        meetup =>
          dateFilter(meetup) &&
          participationFilter(meetup) &&
          searchFilter(meetup)
      );
    }
  },

  watch: {
    routeQuery: {
      immediate: true,
      handler(value) {
        this.filter = Object.fromEntries(
          Object.keys(this.filter).map(key => [
            key,
            value[key] || defaultQueryParams[key]
          ])
        );

        this.view = value["view"] || defaultQueryParams["view"];
      }
    },

    filter: {
      handler(newValue, oldValue) {
        this.changeQueryParams(newValue, oldValue);
      },
      deep: true
    },

    view: {
      handler(newValue, oldValue) {
        this.changeQueryParams({ view: newValue }, { view: oldValue });
      }
    }
  },

  mounted() {
    this.fetchMeetups();
  },

  methods: {
    async fetchMeetups() {
      this.rawMeetups = await fetchMeetups();
    },
    changeQueryParams(newRoute, oldRoute) {
      let routeChangeFunction = this.getRouteChangeFunction(newRoute, oldRoute)
        ? "replace"
        : "push";

      this.$router[routeChangeFunction]({
        query: Object.fromEntries(
          Object.entries({ ...this.filter, view: this.view }).filter(
            ([key, value]) => value !== defaultQueryParams[key]
          )
        )
      }).catch(err => {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        }
      });
    },
    getRouteChangeFunction(newRoute, oldRoute) {
      // сохраним все измененные параметры
      let changesQuery = [];
      for (let key in newRoute) {
        if (newRoute[key] !== oldRoute[key]) {
          changesQuery.push(key);
        }
      }

      // если все измененные параметры находятся в массиве replaceRoutes,
      // то заменям в истории, а не добавляем
      let replace = changesQuery.every(item => {
        return replaceRoutes.includes(item);
      });

      return replace;
    }
  }
};
</script>

<style scoped></style>
