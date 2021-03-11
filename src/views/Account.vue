<template>
  <b-container>
    <b-card
      no-body
      :img-src="`${account.avatar.tmdb.avatar_path}`"
      img-alt="Image"
      img-top
    >
      <b-card-body>
        <b-card-title>Account info</b-card-title>
        <b-card-sub-title class="mb-2">Personal details</b-card-sub-title>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item>
          Username: {{ account.username }} (<strong>{{ account.id }})</strong>
        </b-list-group-item>
        <b-list-group-item>
          Name: <strong>{{ account.name }}</strong>
        </b-list-group-item>
        <b-list-group-item>
          Language: <strong>{{ account.iso_639_1 }}</strong>
        </b-list-group-item>
        <b-list-group-item>
          Country: <strong>{{ account.iso_3166_1 }}</strong>
        </b-list-group-item>
      </b-list-group>

      <b-card-body>
        <router-link to="/">Home |</router-link>
        <router-link to="/dashboard"> Back to main page</router-link>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { Component, Vue } from "vue-property-decorator";
@Component({
  computed: {
    ...mapGetters({ account: "getAccount" })
  }
})
export default class Account extends Vue {
  created() {
    this.$store.dispatch("fetchAccountInfo");
  }
}
</script>

<style scoped></style>
