<template>
  <b-container fluid>
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
            id="dropdown-dropright"
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
              @click="imgSizeName = size.text"
            >
              {{ size.text }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>

        
          <!-- RADIO WORKING -->
          <!-- <b-form-radio-group
            class="pt-2"
            :options="['Backdrop', 'Logo', 'Poster', 'Profile', 'Still']"
            :aria-describedby="ariaDescribedby"
            v-model="imgSize"
          ></b-form-radio-group> -->

          <!-- DROPDOWN WORKING -->
          <!-- <b-dropdown
            id="dropdown-dropright"
            dropright
            :text="`${size.text}`"
            variant="light"
            class="m-2"
          >
            <b-dropdown-item
              v-for="(size, key) in sizes"
              :key="key"
              :aria-describedby="ariaDescribedby"
              @click="imgSize = size.value"
            >
              {{ size.text }}
            </b-dropdown-item>
          </b-dropdown> -->


        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-container>
          {{}}
        </b-container>
      </b-form-group>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  computed: {
    ...mapGetters({ config: "getConfig" })
  }
})
export default class AdvancedSearch extends Vue {
  public images = {
    backdrop_sizes: [],
    base_url: "",
    logo_sizes: [],
    poster_sizes: [],
    profile_sizes: [],
    secure_base_url: "",
    still_sizes: [],
  };
  private imageUrl = "";
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
  onUrlChange(obj: { text: string; value: string }) {
    this.baseUrl.text = obj.text;
    this.baseUrl.value = obj.value;
  }
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
  @Watch("imgSizeName")
  onimgSizeNameChange() {
    console.log("INSIDE");
    this.imgSizeObj.text = this.imgSizeName;

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
  };

  private setImageSizeDropdownVisibility(text: string) {
    for (let i = 0; i < this.sizes.length; i++) {
      if (this.sizes[i].text === text) {
        this.sizes[i].isVisible = true;
      } else {
        this.sizes[i].isVisible = false;
      }
    }
  }

  private movie = {
    query: "",
    language: "",
    page: "",
    include_adult: "",
    region: "",
    year: "",
    primary_release_year: "",
  };
  private movieQueryResult = {
    page: "",
    results: "",
    totalPages: "",
    totalResults: "",
  };

  created() {
    const res = this.$store.getters.getConfig;

    this.images.backdrop_sizes = res.images.backdrop_sizes;
    this.images.base_url = res.images.base_url;
    this.images.logo_sizes = res.images.logo_sizes;
    this.images.poster_sizes = res.images.poster_sizes;
    this.images.profile_sizes = res.images.profile_sizes;
    this.images.secure_base_url = res.images.secure_base_url;
    this.images.still_sizes = res.images.still_sizes;

    console.log("CONF: ");
    console.log(this.images);
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
