<template>
  <div id="app">
    <v-app id="inspire">

      <header-bar />

      <v-main>
        <v-container>
          <v-row>
            <v-col>
              <router-view></router-view>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      
      <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import HeaderBar from '@/components/Header.vue';
export default {
  name: "Home",
  components: {
    HeaderBar,
  },
  data: () => ({
    authstatus: null,
  }),

  created () {
    this.$vuetify.theme.dark = true;
  },
};
</script>
