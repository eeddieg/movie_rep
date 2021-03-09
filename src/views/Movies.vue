<template>
  <b-container>
    <b-dropdown-header>Movies</b-dropdown-header>
    <b-dropdown-group v-for="g in this.genre" :key="g.id">
      <b-dropdown-item>{{ g.name }}</b-dropdown-item>
    </b-dropdown-group>

    <b-dropdown id="dropdown-genre" text="Genres" class="m-md-2">
      <b-dropdown-item v-for="genre in genres" :key="genre.id">
        {{ genre.name }}
      </b-dropdown-item>
    </b-dropdown>
    {{ genre }}
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Movies extends Vue {
  private genres: unknown;
  created() {
    this.$store.dispatch("queryGenre");
    this.genres = this.$store.getters.getGenre;
    console.log(this.genres);
  }
}
</script>

<style></style>
