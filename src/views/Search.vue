<template>
  <b-container fluid>
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
            {{ tab }}
          </b-nav-item>
        </b-nav>
      </template>

      <b-container fluid>
        <b-form
          @submit.prevent="onSubmitBasic"
          @reset.prevent="onReset"
          v-show="selectedTab === 'Basic search'"
        >
          <b-form-group
            id="input-group-1"
            label="Movie title:"
            label-for="input-1"
          >
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
      </b-container>

      <!-- ADVANCED -->
      <b-container
        class="border"
        fluid
        v-show="selectedTab === 'Advanced search'"
      >
        Advanced search form here
      </b-container>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import ApiCalls from "@/mixins/apiCalls";
import axios from "node_modules/axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Movies extends Vue {
  private tabs = ["Basic search", "Advanced search"];
  private selectedTab = "Basic search";
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
