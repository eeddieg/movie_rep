<template>
  <b-container id="app">
    <Navbar />
    <router-view />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  created() {
    this.$store.dispatch("createGuestSession");
    this.$store.dispatch("fetchConfig");
  }

  beforeDestroy() {
    this.$store.dispatch("deleteSession");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>
