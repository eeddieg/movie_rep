<template>
  <b-container>
    <h1>Dashboard</h1>
    <hr />
    <b-container>
      <Search />
    </b-container>

    <!--     <b-card-group columns>
      <b-card
        title="Movies"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Browse movie reposiroty.</b-card-text>
        <b-button to="/dashboard/movies" variant="primary">Browse</b-button>
      </b-card>

      <b-card
        title="TV Series"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Browse tv series.</b-card-text>
        <b-button to="/dashboard/series" variant="primary">Browse</b-button>
      </b-card>

      <b-card
        title="Companies"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Browse by companies.</b-card-text>
        <b-button to="/companies" variant="primary">Browse</b-button>
      </b-card>
    </b-card-group> -->

    <router-view />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "./Search.vue";
@Component({
  components: {
    Search
  }
})
export default class Dashboard extends Vue {}
</script>

<style></style>
