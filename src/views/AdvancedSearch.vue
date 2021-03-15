<template>
  <b-container fluid>
    <h1>Movie Images</h1>
    <b-form @submit.prevent="onSubmitAdvanced" @reset.prevent="reset">
      <b-card bg-variant="dark" class="card">
        <b-form-group
          label="Search criteria"
          class="mb-0"
          label-class="font-weight-bold pt-0"
          label-cols-lg="3"
          label-size="lg"
        >
          <b-form-group
            id="input-movie-title"
            label="Movie title:"
            label-for="input-1"
            label-align-sm="right"
            label-cols-sm="3"
          >
            <b-form-input
              id="movie-title-input"
              v-model="movie.query"
              type="text"
              placeholder="Enter movie title"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Image base url"
            v-slot="{ ariaDescribedby }"
            label-align-sm="center"
          >
            <b-dropdown
              id="image-base-url"
              dropright
              :text="`${baseUrl.text}`"
              variant="light"
              class="m-2"
            >
              <b-dropdown-item
                v-for="url in imageBaseUrl"
                :key="url.value"
                :aria-describedby="ariaDescribedby"
                :id="`${url.value}`"
                :text="`${url.text}`"
                @click="onUrlChange(url)"
              >
                {{ url.text }}
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>

          <b-form-group
            label="Image size"
            v-slot="{ ariaDescribedby }"
            label-align-sm="center"
          >
            <b-dropdown
              id="image-size-category"
              dropright
              :text="`${imgSizeObj.text}`"
              variant="light"
              class="m-2"
            >
              <b-dropdown-item
                v-for="(size, key) in sizes"
                :key="key"
                :aria-describedby="ariaDescribedby"
                :id="`${size.value}`"
                :text="`${size.text}`"
                @click="setSizeCategoryName(size.text)"
              >
                {{ size.text }}
              </b-dropdown-item>
            </b-dropdown>
          </b-form-group>
          <b-form-radio-group
            class="pt-2"
            :options="this.images.backdrop_sizes"
            v-model="imgSizeName"
            v-show="this.sizes[0].isVisible"
          ></b-form-radio-group>
          <b-form-radio-group
            class="pt-2"
            :options="this.images.logo_sizes"
            v-model="imgSizeName"
            v-show="this.sizes[1].isVisible"
          ></b-form-radio-group>
          <b-form-radio-group
            class="pt-2"
            :options="this.images.poster_sizes"
            v-model="imgSizeName"
            v-show="this.sizes[2].isVisible"
          ></b-form-radio-group>
          <b-form-radio-group
            class="pt-2"
            :options="this.images.profile_sizes"
            v-model="imgSizeName"
            v-show="this.sizes[3].isVisible"
          ></b-form-radio-group>
          <b-form-radio-group
            class="pt-2"
            :options="this.images.still_sizes"
            v-model="imgSizeName"
            v-show="this.sizes[4].isVisible"
          ></b-form-radio-group>

          <b-button type="submit" variant="primary">Search</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-container>
            {{ imageUrl }}
          </b-container>
        </b-form-group>
      </b-card>
    </b-form>

    <b-container id="results" v-show="movieQueryResult.results.length !== 0">
      <h4>Results</h4>
      {{ movieQueryResult.page }}
      <b-card-group columns>
        <b-card
          id="card"
          v-for="(movie, index) in movieQueryResult.results"
          :key="index"
          :title="`${movie.title}`"
        >
          <b-img-lazy
            :src="`${imageUrl + movie.poster_path}`"
            img-alt="Image"
            fluid-grow
          ></b-img-lazy>
        </b-card>
      </b-card-group>
    </b-container>

<!--     <b-container id="results" v-show="movieQueryResult.results.length !== 0">
      <h4>Results</h4>
      {{ movieQueryResult.page }}
      <b-card-group columns>
        <b-card
          id="card"
          v-for="(movie, index) in movieQueryResult.results"
          :key="index"
          :title="`${movie.title}`"
        >
          <b-img-lazy
            :src="`${ imageUrl + movie.poster_path}`"
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
    </b-container> -->

  </b-container>
</template>

<script lang="ts">
import ApiCalls from "../mixins/apiCalls";
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class AdvancedSearch extends Vue {
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
  public images = {
    backdrop_sizes: [],
    base_url: "",
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    secure_base_url: "",
    still_sizes: []
  };
  private imageUrl = "";
  private imgSizeCategoryName = "";
  private imgSizeName = "";
  private imageBaseUrl = [
    {
      text: "Base",
      value: "http://image.tmdb.org/t/p/"
    },
    {
      text: "Secure",
      value: "https://image.tmdb.org/t/p/"
    }
  ];
  private baseUrl = {
    text: "Select an option",
    value: ""
  };
  private sizes = [
    {
      text: "Backdrop",
      value: "backdrop_sizes",
      isVisible: false
    },
    {
      text: "Logo",
      value: "logo_sizes",
      isVisible: false
    },
    {
      text: "Poster",
      value: "poster_sizes",
      isVisible: false
    },
    {
      text: "Profile",
      value: "profile_sizes",
      isVisible: false
    },
    {
      text: "Still",
      value: "still_sizes",
      isVisible: false
    }
  ];

  private imgSizeObj = {
    text: "Select image size",
    value: "",
    isVisible: true
  };

  private async onSubmitAdvanced() {
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

  protected createImageUrl() {
    this.imageUrl = this.baseUrl.value + this.imgSizeName;
  }

  protected setSizeCategoryName(name: string) {
    this.imgSizeName = "";
    this.imgSizeCategoryName = name;
    this.createImageUrl();
  }

  @Watch("imgSizeName")
  onImgSizeNameChange() {
    this.createImageUrl();
  }

  @Watch("imgSizeCategoryName")
  protected onImgSizeCategoryName() {
    this.imgSizeObj.text = this.imgSizeCategoryName;

    switch (this.imgSizeObj.text) {
      case "Select image size":
        this.imgSizeObj.value = "";
        this.setImageSizeDropdownVisibility("");
        break;
      case "Backdrop":
        this.imgSizeObj.value = "backdrop_sizes";
        this.setImageSizeDropdownVisibility("Backdrop");
        break;
      case "Logo":
        this.imgSizeObj.value = "logo_sizes";
        this.setImageSizeDropdownVisibility("Logo");
        break;
      case "Poster":
        this.imgSizeObj.value = "profile_sizes";
        this.setImageSizeDropdownVisibility("Poster");
        break;
      case "Profile":
        this.imgSizeObj.value = "backdrop_sizes";
        this.setImageSizeDropdownVisibility("Profile");
        break;
      case "Still":
        this.imgSizeObj.value = "still_sizes";
        this.setImageSizeDropdownVisibility("Still");
        break;
    }
  }

  private setImageSizeDropdownVisibility(text: string) {
    for (let i = 0; i < this.sizes.length; i++) {
      if (this.sizes[i].text === text) {
        this.sizes[i].isVisible = true;
      } else {
        this.sizes[i].isVisible = false;
      }
    }
  }

  protected onUrlChange(obj: { text: string; value: string }) {
    this.baseUrl.text = obj.text;
    this.baseUrl.value = obj.value;
    this.createImageUrl();
  }

  protected selectImagesize(obj: {
    text: string;
    value: string;
    isVisible: boolean;
  }) {
    console.log("HOVER:");
    this.imgSizeObj.text = obj.text;
    this.imgSizeObj.value = obj.value;
    console.log(this.imgSizeObj.text);
    console.log(this.imgSizeObj.value);

    switch (this.imgSizeObj.text) {
      case "Backdrop":
        this.imgSizeObj.value = "backdrop_sizes";
        this.setImageSizeDropdownVisibility("Backdrop");
        break;
      case "Logo":
        this.imgSizeObj.value = "logo_sizes";
        this.setImageSizeDropdownVisibility("Logo");
        break;
      case "Poster":
        this.imgSizeObj.value = "profile_sizes";
        this.setImageSizeDropdownVisibility("Poster");
        break;
      case "Profile":
        this.imgSizeObj.value = "backdrop_sizes";
        this.setImageSizeDropdownVisibility("Profile");
        break;
      case "Still":
        this.imgSizeObj.value = "still_sizes";
        this.setImageSizeDropdownVisibility("Still");
        break;
    }
  }

  created() {
    const res = this.$store.getters.getConfig;

    this.images.backdrop_sizes = res.images.backdrop_sizes;
    this.images.base_url = res.images.base_url;
    this.images.logo_sizes = res.images.logo_sizes;
    this.images.poster_sizes = res.images.poster_sizes;
    this.images.profile_sizes = res.images.profile_sizes;
    this.images.secure_base_url = res.images.secure_base_url;
    this.images.still_sizes = res.images.still_sizes;
  }

  private reset() {
    this.images.backdrop_sizes = [];
    this.images.base_url = "";
    this.images.logo_sizes = [];
    this.images.poster_sizes = [];
    this.images.profile_sizes = [];
    this.images.secure_base_url = "";
    this.images.still_sizes = [];

    this.movie = {
      query: "",
      language: "",
      page: "",
      include_adult: "",
      region: "",
      year: "",
      primary_release_year: "",
    };

    this.movieQueryResult = {
      page: "",
      results: "",
      totalPages: "",
      totalResults: "",
    };

    this.setImageSizeDropdownVisibility("");

    this.imgSizeObj = {
      text: "Select image size",
      value: "",
      isVisible: true,
    };

    this.imageUrl = "";
    this.imgSizeCategoryName = "";
    this.imgSizeName = "";
    this.baseUrl = {
      text: "Select an option",
      value: "",
    };
  }

  beforeDestroy() {
    this.reset();
  }
}
</script>

<style scoped>
a {
  color: white;
}
.card-body {
  color: white;
}
</style>
