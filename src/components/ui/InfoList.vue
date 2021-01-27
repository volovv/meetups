<template>
  <ul v-if="list.length" class="info-list">
    <slot :list="list">
      <li v-for="listItem in list" :key="listItem.id">
        <app-icon
          v-if="listItem.icon"
          icon="listItem.icon"
          class="info-list__icon"
        />
        {{ listItem.text }}
      </li>
    </slot>
  </ul>
</template>

<script>
import AppIcon from "@/components/ui/AppIcon";

export default {
  name: "InfoList",

  components: {
    AppIcon
  },

  props: {
    list: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.info-list {
  margin: 0;
  padding: 0;
}

.info-list li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.info-list li:last-child {
  margin: 0;
}

.info-list__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
