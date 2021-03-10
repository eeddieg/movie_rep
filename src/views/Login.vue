<template>
  <b-container fluid="sm" class="border border-dark .ml-3">
    <b-form @submit.prevent="onSubmit" class=".ml-3">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="username"
          type="text"
          placeholder="Enter username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-container>
      Not a member? Register
      <router-link to="/register">here</router-link>
    </b-container>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  private username = "";
  private password = "";

  onSubmit() {
    const form = {
      username: this.username,
      password: this.password
    };
    this.$store
      .dispatch("validateUser", form)
      .then(() => {
        if (this.$store.getters.isAuth) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/login");
        }
      })
      .catch(err => console.error(err));
  }
}
</script>

<style>
* {
  padding-top: 5px;
  padding-bottom: 10px;
}
</style>
