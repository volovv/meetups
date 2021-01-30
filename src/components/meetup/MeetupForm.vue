<template>
  <form class="form meetup-form" @submit.prevent="submit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <form-group label="Название">
          <app-input v-model="localMeetup.title" />
        </form-group>
        <form-group label="Дата">
          <app-input type="date" v-model="meetupDateFormat" />
        </form-group>
        <form-group label="Место">
          <app-input v-model="localMeetup.place" />
        </form-group>
        <form-group label="Описание">
          <app-input
            :multiline="true"
            v-model="localMeetup.description"
            rows="3"
          />
        </form-group>
        <form-group label="Изображение">
          <image-uploader v-model="localMeetup.imageId" />
        </form-group>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        :agendaItem.sync="localMeetup.agenda[index]"
        @remove="removeAgendaItem(agendaItem.id)"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <secondary-button :block="true" tag="button" @click="cancel"
          >Отмена</secondary-button
        >
        <primary-button :block="true" tag="button" type="submit">{{
          submitText
        }}</primary-button>
      </div>
    </div>
  </form>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import { nanoid } from "nanoid";
import MeetupAgendaItemForm from "./MeetupAgendaItemForm.vue";
import FormGroup from "@/components/ui/forms/FormGroup";
import AppInput from "@/components/ui/forms/AppInput";
import ImageUploader from "@/components/ui/forms/ImageUploader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/components/ui/buttons/SecondaryButton";
import { buildAgendaItem } from "@/meetupService";

export default {
  name: "MeetupForm",

  components: {
    ImageUploader,
    FormGroup,
    AppInput,
    PrimaryButton,
    SecondaryButton,
    MeetupAgendaItemForm
  },

  props: {
    meetup: {
      type: Object,
      required: true
    },
    submitText: {
      type: String,
      default: "Submit"
    }
  },

  data() {
    return {
      localMeetup: cloneDeep(this.meetup)
    };
  },

  computed: {
    meetupDateFormat: {
      get() {
        return this.getDateFormat(this.localMeetup.date);
      },
      set(date) {
        this.localMeetup.date = date;
      }
    }
  },

  methods: {
    cancel() {
      this.$emit("cancel");
    },
    submit() {
      this.$emit("submit", cloneDeep(this.localMeetup));
    },
    addAgendaItem() {
      let newAgendaItem = buildAgendaItem();
      newAgendaItem.id = nanoid();
      const agendaItemsLength = this.localMeetup.agenda.length;

      if (agendaItemsLength > 0) {
        newAgendaItem.startsAt = this.localMeetup.agenda[
          agendaItemsLength - 1
        ].endsAt;
      }

      this.localMeetup.agenda = [...this.localMeetup.agenda, newAgendaItem];
    },
    removeAgendaItem(id) {
      const index = this.localMeetup.agenda.findIndex(
        agendaItem => agendaItem.id === id
      );
      this.localMeetup.agenda.splice(index, 1);
    },
    getDateFormat(value) {
      const date = new Date(value) || new Date();
      const YYYY = date.getUTCFullYear();
      const MM = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const DD = date
        .getUTCDate()
        .toString()
        .padStart(2, "0");

      return `${YYYY}-${MM}-${DD}`;
    }
  }
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
