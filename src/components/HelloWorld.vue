<template>
  <v-container class="fill-height">
    <v-responsive>
      <h1 class="text-h5 text-md-h4 font-weight-light text-center mb-6">
        What to watch
      </h1>

      <div class="text-center d-flex justify-center align-center">
        <v-chip-group v-model="selectedTabGenre" multiple>
          <v-chip
            filter
            class="mr-2 px-6 hidden-xs"
            v-for="genre in genres"
            :value="genre.type"
          >
            {{ genre.type }}
          </v-chip>
        </v-chip-group>

        <v-menu
          v-model="filterDropdown"
          location="bottom center"
          :close-on-content-click="false"
          width="392"
        >
          <template v-slot:activator="{ props }">
            <!-- <v-btn color="primary" dark > Dropdown </v-btn> -->
            <v-chip class="mr-2 px-6" v-bind="props"> Filter </v-chip>
          </template>

          <v-sheet
            style="backdrop-filter: blur(12px)"
            class="rounded-lg"
            color="rgba(255, 255, 255, 0.9)"
          >
            <v-container>
              <v-row justify="space-between">
                <v-col cols="3">
                  <p>By genre</p>
                </v-col>
                <v-col cols="3">
                  <div class="text-right" @click="resetFilteredGenre()">
                    Clear
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  ><v-checkbox
                    v-for="genre in genres"
                    :key="genre.type"
                    v-model="selectedGenre"
                    :label="genre.type"
                    :value="genre.type"
                    class="my-0 shrink"
                  ></v-checkbox>
                  <v-divider></v-divider
                ></v-col>
              </v-row>
              <v-row justify="space-between">
                <v-col cols="3">
                  <p>By year</p>
                </v-col>
                <v-col cols="3">
                  <div class="text-right" @click="resetFilteredYear()">
                    Clear
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-checkbox
                    v-for="year in years"
                    :key="year"
                    v-model="selectedYear"
                    :label="year"
                    :value="year"
                  ></v-checkbox>
                  <v-divider></v-divider
                ></v-col>
              </v-row>

              <v-row class="mt-6" align="center" justify="center">
                <v-col cols="auto">
                  <v-btn @click="clearFilter()">Clear All</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn @click="applyFilter()">Apply</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-menu>
      </div>

      <v-row class="mt-10 pt-10">
        <v-col cols="6" sm="3" v-for="movie in filteredMovies">
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
        {{ filteredMovies.length }} out of {{ moviesList.length }}
      </div>

      <v-row class="mt-6" align="center" justify="center">
        <v-col cols="auto">
          <v-btn
            v-if="filteredMovies.length != moviesList.length"
            @click="loadMovieList()"
            >Load More</v-btn
          >
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { thisExpression, throwStatement } from "@babel/types";
import { runInThisContext } from "vm";

export default {
  data() {
    return {
      filterDropdown: false,
      selectedTabGenre: [],
      selectedGenre: [],
      selectedYear: [],
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
      years: ["2018", "2019", "2020", "2021", "2022"],
      moviesList: [
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
      filteredMovies: [],
    };
  },
  watch: {
    selectedTabGenre(val, newVal) {
      this.selectedGenre = this.selectedTabGenre;
      this.filterMovieList(val);
    },
  },
  computed: {},
  methods: {
    loadMovieList() {
      // current length + 4
      this.filteredMovies = this.moviesList.filter(
        (item, index) => index < this.filteredMovies.length + 4
      );
    },
    filterMovieList(genres) {
      let data, finalData;

      if (genres.length > 0) {
        data = this.moviesList.filter((item) => genres.includes(item.genre));
      } else {
        data = this.moviesList;
      }

      if (this.selectedYear.length > 0) {
        finalData = data.filter((item) =>
          this.selectedYear.includes(item.year)
        );
      } else {
        finalData = data;
      }

      this.filteredMovies =
        genres.length == 0 && this.selectedYear.length == 0
          ? this.moviesList
          : finalData;
    },
    applyFilter() {
      this.selectedTabGenre = this.selectedGenre;
      this.filterDropdown = false;
      this.filterMovieList(this.selectedGenre);
    },
    clearFilter() {
      this.selectedGenre = [];
      this.selectedYear = [];
    },
    resetFilteredGenre() {
      this.selectedGenre = [];
    },
    resetFilteredYear() {
      this.selectedYear = [];
    },
  },
  mounted() {
    this.loadMovieList();
  },
  created() {},
};
</script>
