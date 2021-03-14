<template>
  <b-container id="cards" fluid>
    <h1>Home</h1>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
    >
      <b-carousel-slide
        v-for="(movie, index) in carousel"
        :key="index"
        :caption="`${movie.title}`"
        :img-src="`${imageConfig.baseImgUrl + movie.backdrop_path}`"
      ></b-carousel-slide>
    </b-carousel>

    <b-card
      :title="`${selectedTab}`"
      body-class="text-center"
      header-tag="nav"
      class="d-flex align-items-center justify-content-center"
    >
      <template #header>
        <b-nav card-header tabs>
          <b-nav-item
            v-for="(tab, index) in tabs"
            :key="index"
            @click="selectedTab = tab"
            :class="{ activeTab: selectedTab === tab }"
          >
            <h4>{{ tab }}</h4>
          </b-nav-item>
        </b-nav>
      </template>

      <b-card-body v-show="selectedTab === 'Discover movies'">
        {{ discover.page }}
        <b-card-group columns>
          <b-card
            id="card"
            v-for="movie in discover.movies"
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
      </b-card-body>
      <b-card-body v-show="selectedTab === 'Trending movies'">
        {{ trending.page }}
        <b-card-group columns>
          <b-card
            id="card"
            v-for="movie in trending.movies"
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
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiCalls from "@/mixins/apiCalls";

@Component
export default class Home extends Vue {
  private tabs = ["Discover movies", "Trending movies"];
  private selectedTab = "";
  private discover = {
    page: 0,
    movies: []
  };
  private trending = {
    page: 0,
    movies: []
  };
  private carousel = [];
  private imageConfig = {
    baseImgUrl: "",
    imageConf: []
  };

  async beforeCreate() {
    await this.$store
      .dispatch("discoverMovies")
      .then(res => {
        this.discover.page = res.page;
        this.discover.movies = res.results;
      })
      .catch(err => console.log(err));

    await this.$store
      .dispatch("fetchTrending")
      .then(res => {
        this.trending.page = res.page;
        this.trending.movies = res.results;
      })
      .catch(err => console.log(err));

    this.carousel = this.discover.movies.concat(this.trending.movies);

    const conf = new ApiCalls().getImageConf();
    this.imageConfig = conf;
  }
}
</script>

<style scoped>
#cards {
  background-color: darkgrey;
}
</style>
