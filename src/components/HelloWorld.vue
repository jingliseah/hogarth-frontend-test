<template>
  <v-container class="fill-height">
    <v-responsive>
      <h1 class="text-h5 text-md-h4 font-weight-light text-center mb-6">
        What to watch
      </h1>

      <div class="text-center d-flex justify-center align-center">
        <v-chip-group v-model="selectedGenre" multiple>
          <v-chip filter class="mr-2 px-6 hidden-xs" v-for="genre in genres">
            {{ genre.type }}
          </v-chip>
        </v-chip-group>

        <v-chip class="mr-2 px-6"> Filter </v-chip>
      </div>

      <v-row class="mt-10 pt-10">
        <v-col cols="6" sm="3" v-for="movie in movies">
          <v-card class="mx-auto">
            <v-img
              :height="$vuetify.display.mdAndUp ? 435 : 245"
              aspect-ratio="2/3"
              :src="'/src/assets/img/movie/' + movie.image + '.jpg'"
              cover
            ></v-img>

            <v-card-title class="text-subtitle-1">
              {{ movie.title }}
            </v-card-title>

            <v-card-subtitle class="text-caption text-md-body-2">
              {{ movie.genre }} &#183; {{ movie.year }}</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>

      <div class="text-body-2 text-md-body-1 mt-12 mt-md-16 text-center">
        {{ movies.length }} out of {{ movies.length }}
      </div>

      <v-row class="mt-6" align="center" justify="center">
        <v-col cols="auto">
          <v-btn>Load More</v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      selectedGenre: [],
      genres: [
        {
          type: "Action",
          active: false,
        },
        {
          type: "Comedy",
          active: false,
        },
        {
          type: "Drama",
          active: false,
        },
        {
          type: "Romance",
          active: false,
        },
        {
          type: "Thriller",
          active: false,
        },
        {
          type: "War",
          active: false,
        },
      ],
      // genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "War"],
      movies: [
        {
          title: "Spider-Man: Far From Home",
          genre: "Action",
          year: "2019",
          image: "Thumbnail-1",
        },
        {
          title: "Once Upon a Time... in Hollywood",
          genre: "Comedy",
          year: "2019",
          image: "Thumbnail-2",
        },
        {
          title: "1917",
          genre: "War",
          year: "2019",
          image: "Thumbnail-3",
        },
        {
          title: "Murder Mystery",
          genre: "Comedy",
          year: "2019",
          image: "Thumbnail-4",
        },
        {
          title: "Free Guy",
          genre: "Action",
          year: "2021",
          image: "Thumbnail-5",
        },
        {
          title: "The Black Phone",
          genre: "Thriller",
          year: "2021",
          image: "Thumbnail-6",
        },
        {
          title: "Finch",
          genre: "Drama",
          year: "2021",
          image: "Thumbnail-7",
        },
        {
          title: "Tar",
          genre: "Drama",
          year: "2022",
          image: "Thumbnail-8",
        },
        {
          title: "Crazy Rich Asians",
          genre: "Romance",
          year: "2018",
          image: "Thumbnail-9",
        },
        {
          title: "Tenet",
          genre: "Action",
          year: "2020",
          image: "Thumbnail-10",
        },
        {
          title: "Ava",
          genre: "Thriller",
          year: "2020",
          image: "Thumbnail-11",
        },
      ],
    };
  },
  methods: {},
  computed: {
    filteredMovies: () => {},
  },
  mounted() {},
  created() {},
};
</script>
