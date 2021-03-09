<template>
  <b-container>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/">Home</router-link>
        </b-nav-item>
        <b-nav-item v-show="isAuth">
          <router-link to="/dashboard">Dashboard</router-link>
        </b-nav-item>
        <b-nav-item-dropdown text="User" left v-show="isAuth">
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item>
          <router-link to="/login" v-show="!isAuth">
            Login / Register
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/about">About</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
@Component({
  computed: {
    ...mapGetters(["isAuth"])
  }
})
export default class NavbarUser extends Vue {}
</script>

<style scoped>
a {
  color: rgba(255, 255, 255, 0.5);
}
</style>
