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

      <b-container fluid v-show="selectedTab === 'Basic search'">
        <BasicSearch />
      </b-container>

      <b-container fluid v-show="selectedTab === 'Advanced search'">
        <AdvancedSearch />
      </b-container>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BasicSearch from "./BasicSearch.vue";
import AdvancedSearch from "./AdvancedSearch.vue";

@Component({
  components: {
    AdvancedSearch,
    BasicSearch
  }
})
export default class Movies extends Vue {
  private tabs = ["Basic search", "Advanced search"];
  private selectedTab = "Basic search";
}
</script>
