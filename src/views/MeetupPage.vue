<template>
  <div v-if="meetup" class="bg-white">
    <meetup-cover :link="coverLink" :title="meetup.title" />

    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="meetup" />
          </content-tabs>
        </div>

        <div class="meetup__aside">
          <meetup-info
            :organizer="meetup.organizer"
            :place="meetup.place"
            :date="date"
          />

          <div class="meetup__aside-buttons">
            <primary-button tag="button">Участвовать</primary-button> /
            <secondary-button tag="button">Отменить участие</secondary-button>
            <primary-button tag="router-link" :to="{ name: 'meetup-edit' }"
              >Редактировать</primary-button
            >
            <danger-button tag="button">Удалить</danger-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchMeetup, getMeetupCoverLink } from "@/apiService";
import ContentTabs from "@/components/ui/ContentTabs";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton";
import DangerButton from "@/components/ui/buttons/DangerButton";
import MeetupCover from "@/components/meetup/MeetupCover.vue";
import MeetupInfo from "@/components/meetup/MeetupInfo.vue";

export default {
  name: "MeetupPage",

  components: {
    ContentTabs,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
    MeetupCover,
    MeetupInfo
  },

  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      meetup: null,
      tabs: [
        { to: { name: "meetup-description" }, text: "Описание" },
        { to: { name: "meetup-agenda" }, text: "Программа" }
      ]
    };
  },

  computed: {
    // ссылка на изображение
    coverLink() {
      if (!this.meetup || !this.meetup.imageId) {
        return "";
      }

      return getMeetupCoverLink(this.meetup);
    },
    date() {
      if (!this.meetup || !this.meetup.date) {
        return;
      }

      // дата проведения митапа в формате Date
      return new Date(this.meetup.date);
    }
  },

  mounted() {
    // Получение данных митапа
    this.getMeetup();
  },

  methods: {
    // Получение данных митапа
    async getMeetup() {
      this.meetup = await fetchMeetup(this.meetupId);
    }
  }
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-buttons > .button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }

  .meetup__empty {
    height: 340px;
  }
}
</style>
