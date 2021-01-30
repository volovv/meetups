<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button
        title="Тип"
        v-model="localAgendaItem.type"
        :options="agendaItemTypes"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            :value="localAgendaItem.startsAt"
            @input="changeTime($event, 'startsAt', 'endsAt')"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
          />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="field in $options.fieldSpecifications[localAgendaItem.type]"
      :key="field.id"
      :label="field.title"
    >
      <component
        :is="field.component"
        :name="field.field"
        v-bind="field.props"
        :[field.model.prop]="localAgendaItem[field.field]"
        @[field.model.event]="localAgendaItem[field.field] = $event"
      ></component>
    </form-group>
  </div>
</template>

<script>
import DropdownButton from "@/components/ui/forms/DropdownButton";
import FormGroup from "@/components/ui/forms/FormGroup";
import AppInput from "@/components/ui/forms/AppInput";
import AppIcon from "@/components/ui/AppIcon";

import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
  getAgendaIconsMap
} from "@/meetupService";

/**
 *
 * @param {String} time - текущее время в формате HH:MM
 * @param {Number} deltaMinutes - время сдвига в минутах
 * @returns {String} сдвинутое на deltaMinutes время в формате HH:MM
 */
function shiftTime(time, deltaMinutes) {
  if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(time)) {
    throw new Error("Time must be in HH:MM format");
  }

  const timeInMinutes = getTimeInMinutes(time);
  let newTimeInMinutes = (timeInMinutes + deltaMinutes) % (24 * 60);
  // если получилось отрицательное значение,
  // значит возьмем кол-во минут в пред.сутках
  if (newTimeInMinutes < 0) {
    newTimeInMinutes = 24 * 60 + newTimeInMinutes;
  }

  const hours = (newTimeInMinutes / 60).toFixed(0).padStart(2, "0");
  const minutes = Math.abs(newTimeInMinutes % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}`;
}

/**
 *
 * @param {String} time - текущее время в формате HH:MM
 * @returns {String} переданное в time время в минутах
 */
function getTimeInMinutes(time) {
  const [h, m] = time.split(":").map(x => parseInt(x, 10));
  const timeInMinutes = h * 60 + m;

  return timeInMinutes;
}

export default {
  name: "MeetupAgendaItemForm",

  components: {
    AppIcon,
    AppInput,
    DropdownButton,
    FormGroup
  },

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      agendaItemTypes: this.getAgendaItemTypes()
    };
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler(newValue) {
        this.$emit("update:agendaItem", newValue);
      }
    }
  },

  methods: {
    remove() {
      this.$emit("remove", this.localAgendaItem.id);
    },
    changeTime(newValue, field, fieldToChange) {
      const minutesStart = getTimeInMinutes(this.localAgendaItem.startsAt);
      const minutesEnd = getTimeInMinutes(this.localAgendaItem.endsAt);
      const delta = minutesEnd - minutesStart;

      this.localAgendaItem[field] = newValue;
      this.localAgendaItem[fieldToChange] = shiftTime(
        this.localAgendaItem[field],
        delta
      );
    },
    getAgendaItemTypes() {
      let types = getAgendaItemTypes();
      const icons = getAgendaIconsMap();

      types.map(option => {
        option.icon = icons[option.value];

        return option;
      });

      return types;
    }
  },

  fieldSpecifications: getAgendaItemsFieldSpecifications()
};
</script>

<style scoped></style>
