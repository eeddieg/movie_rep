<template>
  <b-container>
    <b-card-group>
      <b-card
        title="Search"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        class="mb-2"
      >
        <b-card-text>Browse reposiroty.</b-card-text>
        <b-button to="/dashboard/search" variant="primary">Browse</b-button>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Movies extends Vue {}
</script>

<style></style>
