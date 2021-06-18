<template>
  <div id="app">
    <base-layout>
      <router-view />
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from "./components/layouts/BaseLayout";

export default {
  name: "App",
  components: { BaseLayout },

  metaInfo: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} | Meetups` : "Meetups";
    }
  }
};
</script>

<style></style>
