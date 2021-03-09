<template>
  <b-container id="cards" fluid>
    <h1>Home</h1>
    {{ page }}

    <b-card-group columns>
      <b-card
        id="card"
        v-for="movie in results"
        :key="movie.id"
        :title="`${movie.title}`"
      >
        <b-img-lazy
          :src="`${imageConfig.baseImgUrl + movie.poster_path}`"
          fluid-grow
        ></b-img-lazy>
        <b-card-text>{{ movie.overview }}</b-card-text>
        <ul>
          <li>Popularity: {{ movie.popularity }}</li>
          <li>Release date: {{ movie.release_date }}</li>
          <li>Vote average: {{ movie.vote_average }}</li>
          <li>Vote count: {{ movie.vote_count }}</li>
        </ul>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiCalls from "@/mixins/apiCalls";

@Component
export default class Home extends Vue {
  private page = 0;
  private results: unknown = [];
  private imageConfig = {
    baseImgUrl: "",
    imageConf: []
  };

  async beforeCreate() {
    await this.$store
      .dispatch("discoverMovies")
      .then(res => {
        this.page = res.page;
        this.results = res.results;
      })
      .catch(err => console.log(err));

    const conf = new ApiCalls().getImageConf();
    this.imageConfig = conf;
  }
}
</script>

<style scoped>
#cards{
  background-color: darkgrey;
}
</style>
