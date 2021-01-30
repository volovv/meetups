<template>
  <div class="filters-panel">
    <div class="filters-panel__col">
      <slot
        name="left-col"
        :filter="localFilter"
        :view="localView"
        :changeFilter="changeFilter"
        :changeView="changeView"
      >
        <form-check
          :options="$options.dateFilterOptions"
          v-model="localFilter.date"
          @change="changeFilter"
        ></form-check>
      </slot>
    </div>

    <div class="filters-panel__col">
      <slot
        name="right-col"
        :filter="localFilter"
        :view="localView"
        :changeFilter="changeFilter"
        :changeView="changeView"
      >
        <form-group :inline="true">
          <app-input
            id="filters-panel__search"
            type="text"
            placeholder="Поиск"
            :small="true"
            :rounded="true"
            v-model="localFilter.search"
            @change="changeFilter"
          >
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </form-group>

        <div v-if="localView" class="form-group form-group_inline">
          <page-tabs :selected.sync="localView"></page-tabs>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import PageTabs from "@/components/PageTabs";
import FormCheck from "@/components/ui/forms/FormCheck";
import FormGroup from "@/components/ui/forms/FormGroup";
import AppInput from "@/components/ui/forms/AppInput";
import AppIcon from "@/components/ui/AppIcon";

export default {
  name: "MeetupsFilter",

  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" }
  ],

  components: {
    PageTabs,
    FormCheck,
    FormGroup,
    AppInput,
    AppIcon
  },

  props: {
    filter: {
      type: Object,
      required: true
    },
    view: {
      type: String,
      required: false
    }
  },

  computed: {
    localFilter() {
      return { ...this.filter };
    },
    localView: {
      get() {
        return this.view;
      },
      set(value) {
        this.changeView(value);
      }
    }
  },

  methods: {
    changeFilter() {
      this.$emit("update:filter", { ...this.localFilter });
    },
    changeView(view) {
      this.$emit("update:view", view);
    }
  }
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search > .form-control {
    max-width: 100%;
  }
}
</style>
