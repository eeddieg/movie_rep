/* eslint-disable @typescript-eslint/camelcase */
<template>
  <b-container fluid>
    <b-form @submit.prevent="onSubmitBasic" @reset.prevent="onReset">
      <b-form-group id="input-group-1" label="Movie title:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="movie.query"
          type="text"
          placeholder="Enter movie title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Movie language:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="movie.language"
          placeholder="Enter language"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <b-container id="resluts" v-show="movieQueryResult.results.length !== 0">
      <h4>Resluts</h4>
      {{ movieQueryResult.page }}
      <b-card-group columns>
        <b-card
          id="card"
          v-for="(movie, index) in movieQueryResult.results"
          :key="index"
          :title="`${movie.title}`"
        >
          <b-img-lazy
            :src="`${imageConfig.baseImgUrl + movie.backdrop_path}`"
            img-alt="Image"
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
  </b-container>
</template>

<script lang="ts">
import ApiCalls from "@/mixins/apiCalls";
import store from "@/store";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class BasicSearch extends Vue {
  public imageConfig = {
    baseImgUrl: "",
    imageConf: []
  };
  private movie = {
    query: "",
    language: "",
    page: "",
    include_adult: "",
    region: "",
    year: "",
    primary_release_year: ""
  };
  private movieQueryResult = {
    page: "",
    results: "",
    totalPages: "",
    totalResults: ""
  };

  constructor() {
    super();
    store.dispatch("configImageUrl").then(res => {
      this.imageConfig.baseImgUrl = res.baseImgUrl;
      this.imageConfig.imageConf = res.imageConf;
    });
  }

  private async onSubmitBasic() {
    let url = ApiCalls.QUERIES.SEARCH_MOVIE;

    Object.entries(this.movie).forEach(([key, value]) => {
      if (value !== "") {
        url += "&" + key + "=" + value;
      }
    });

    await axios
      .get(url)
      .then(res => {
        this.movieQueryResult.page = res.data.page;
        this.movieQueryResult.results = res.data.results;
        this.movieQueryResult.totalPages = res.data.total_pages;
        this.movieQueryResult.totalResults = res.data.total_results;
      })
      .catch(err => console.log(err));
  }

  private onReset() {
    this.movie.query = "";
    this.movie.language = "";
    this.movie.page = "";
    this.movie.include_adult = "";
    this.movie.region = "";
    this.movie.year = "";
    this.movie.primary_release_year = "";
  }
}
</script>

<style></style>
