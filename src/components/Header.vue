<template>
  <div id="header">
    <navigation-drawer :drawer="drawer"/>
    <v-app-bar
      v-if="authenticated"
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Product Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>
        <v-toolbar-title 
          class="logout-poiter"
          @click="logOut()"
        >
          Logout <v-icon left>logout </v-icon>
        </v-toolbar-title>
      </span>
    </v-app-bar>
  </div>
</template>

<script>
import NavigationDrawer from '@/components/NavigationDrawer.vue'

export default {
  name: "HeaderBar",
  components: {
    NavigationDrawer
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    toggleDrawer(){
        this.drawer = !this.drawer;
    },
    logOut() {
      this.$store.commit("setAuthentication", false);
      this.$router.replace({name: "LoginForm"});
    }
  },

  computed: {
    authenticated () {
      let value = this.$store.state.auth.authenticated;
      return value
    }
  },
}
</script>

<style scoped>
.logout-poiter {
  cursor: pointer;
}
</style>