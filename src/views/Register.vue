<template>
  <b-container fluid="sm" class="border border-dark .ml-3">
    <section id="register-form">
      <!--Title-->
      <h2 class="section-heading mb-4 h2">
        Register / Sign up form
      </h2>
      <section>
        <form class="text-center border border-light p-5">
          <p class="h4 mb-4">Sign up</p>

          <div class="form-row mb-4">
            <div class="col">
              <!-- First name -->
              <input
                type="text"
                id="firstName"
                class="form-control"
                placeholder="First name"
              />
            </div>
            <div class="col">
              <!-- Last name -->
              <input
                type="text"
                id="lastName"
                class="form-control"
                placeholder="Last name"
              />
            </div>
          </div>

          <!-- E-mail -->
          <input
            type="email"
            id="email"
            class="form-control mb-4"
            placeholder="E-mail"
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            aria-describedby="passwordHelpBlock"
          />
          <small id="passwordHelpBlock" class="form-text text-muted mb-4">
            At least 8 characters and 1 digit
          </small>

          <!-- Phone number -->
          <input
            type="text"
            id="phonePassword"
            class="form-control"
            placeholder="Phone number"
            aria-describedby="phoneHelpBlock"
          />
          <small id="phoneHelpBlock" class="form-text text-muted mb-4">
            Optional - for two step authentication
          </small>

          <!-- Newsletter -->
          <div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="newsletter"
            />
            <label class="custom-control-label" for="newsletter">
              Subscribe to our Newsletter.
            </label>
          </div>

          <!-- Sign up button -->
          <button
            class="btn btn-info my-4 btn-block waves-effect waves-light"
            type="submit"
          >
            Sign in
          </button>

          <!-- Social register -->
          <p>or sign up with:</p>

          <a type="button" class="light-blue-text mx-2">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a type="button" class="light-blue-text mx-2">
            <i class="fab fa-twitter"></i>
          </a>
          <a type="button" class="light-blue-text mx-2">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a type="button" class="light-blue-text mx-2">
            <i class="fab fa-github"></i>
          </a>

          <hr />

          <!-- Terms of service -->
          <p>
            By clicking <em>Sign up</em> you agree to our
            <a href="" target="_blank">terms of service</a>
          </p>
        </form>
      </section>
    </section>
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
    /* this.$store
      .dispatch("login", form)
      .then(() => this.$router.push("/user"))
       .catch((err) => console.error(err));
    */
  }
}
</script>

<style>
* {
  padding-top: 5px;
  padding-bottom: 10px;
}
</style>
