<template>
  <div class="home" id="app">
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),

  created () {
    this.$vuetify.theme.dark = true
  },
};
</script>
