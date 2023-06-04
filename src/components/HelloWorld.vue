<template>
  <v-container class="fill-height">
    <v-responsive>
      <h1 class="text-h5 text-md-h4 font-weight-light text-center mb-6">
        What to watch
      </h1>

      <div class="text-center d-flex justify-center align-center">
        <v-chip-group
          selected-class="border border-primary bg-primary-lighten-1 primary--text"
          v-model="filteredGenre"
          multiple
        >
          <v-chip
            border="primary"
            color="primary"
            class="mr-2 px-6 hidden-xs"
            v-for="genre in genres"
            :value="genre"
          >
            {{ genre }}
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
            <v-chip
              class="mr-2 px-6 d-flex justify-center align-center"
              :color="filterDropdown ? 'primary' : '#000'"
              v-bind="props"
            >
              <template v-slot:prepend>
                <icon-base v-if="!filterDropdown" icon-name="Filter" height="14"
                  ><icon-filter
                /></icon-base>
                <v-icon size="18" v-else>mdi-close</v-icon>
              </template>
              <span class="ml-1">Filter</span>
            </v-chip>
          </template>

          <v-sheet
            style="backdrop-filter: blur(12px)"
            class="rounded-xl"
            color="rgba(255, 255, 255, 0.9)"
            width="392"
          >
            <v-container class="pa-6">
              <v-row justify="space-between">
                <v-col
                  cols="12"
                  class="d-flex align-center justify-space-between"
                >
                  <p class="text-h5">By genre</p>
                  <div
                    class="text-right text-primary d-flex align-center justify-space-between hover:cursor-pointer"
                    @click="resetFilteredGenre()"
                  >
                    <span class="mr-1">Clear</span>
                    <v-icon size="24">mdi-close</v-icon>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  ><v-checkbox
                    v-for="genre in genres"
                    :key="genre"
                    v-model="selectedGenre"
                    :label="genre"
                    :value="genre"
                    class="mb-4"
                    hide-details
                    color="primary"
                  ></v-checkbox>
                  <v-divider></v-divider
                ></v-col>
              </v-row>

              <v-row justify="space-between">
                <v-col
                  cols="12"
                  class="d-flex align-center justify-space-between"
                >
                  <p class="text-h5">By year</p>
                  <div
                    class="text-right text-primary d-flex align-center justify-space-between hover:cursor-pointer"
                    @click="resetFilteredYear()"
                  >
                    <span class="mr-1">Clear</span>
                    <v-icon size="24">mdi-close</v-icon>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0">
                  <v-checkbox
                    v-for="year in years"
                    :key="year"
                    v-model="selectedYear"
                    :label="year"
                    :value="year"
                    class="mb-4"
                    hide-details
                    color="primary"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-divider class="my-6"></v-divider>

              <v-row align="center" justify="center">
                <v-col cols="6">
                  <v-btn
                    rounded="lg"
                    flat
                    :disabled="disabledClearAll == false ? null : true"
                    block
                    @click="clearFilter()"
                    >Clear All</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    class="text-primary"
                    color="primary-lighten-1"
                    rounded="lg"
                    flat
                    block
                    @click="applyFilter()"
                    >Apply</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-menu>
      </div>

      <v-row class="mt-10 pt-10">
        <v-col cols="6" sm="3" v-for="movie in loadedMovieList">
          <v-card flat class="mx-auto">
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
        {{ loadedMovieList.length }} out of {{ filteredMovieList.length }}
      </div>

      <v-row class="mt-6" align="center" justify="center">
        <v-col cols="auto">
          <v-btn
            v-if="currentPage !== totalPage"
            @click="loadMovieList()"
            class="text-primary px-6"
            color="primary-lighten-1"
            rounded="lg"
            flat
            block
            >Load More
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { thisExpression, throwStatement } from "@babel/types";
import { runInThisContext } from "vm";
import IconBase from "@/components/IconBase.vue";
import IconFilter from "@/components/icons/IconFilter.vue";
import _ from "lodash";

export default {
  components: { IconBase, IconFilter },
  data() {
    return {
      currentPage: 0,
      pageSize: 4,
      filterDropdown: false,
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "War"],
      years: ["2018", "2019", "2020", "2021", "2022"],
      movieList: [
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
      selectedGenre: [],
      selectedYear: [],
      loadedMovieList: [],
      filteredGenre: [],
      filteredYear: [],
      filteredMovieList: [],
    };
  },
  watch: {
    filteredGenre(val, newVal) {
      this.selectedGenre = this.filteredGenre;
      this.filterMovieList(val);
      this.loadMovieList();
    },
  },
  computed: {
    totalResult() {
      return this.filteredMovieList.length;
    },
    totalPage() {
      return Math.ceil(this.totalResult / this.pageSize);
    },
    disabledClearAll() {
      return (
        _.isEqual(this.filteredGenre, this.selectedGenre) &&
        _.isEqual(this.filteredYear, this.selectedYear)
      );
    },
  },
  methods: {
    loadMovieList() {
      // to cater for load more
      this.loadedMovieList = this.filteredMovieList.filter(
        (item, index) => index < this.loadedMovieList.length + this.pageSize
      );

      this.currentPage++;
    },
    filterMovieList(genres: any) {
      let data, finalData;

      //reset currentPage and loaded movie list
      this.currentPage = 0;
      this.loadedMovieList = [];

      if (genres && genres.length > 0) {
        data = this.movieList.filter((item) => genres.includes(item.genre));
      } else {
        data = this.movieList;
      }

      if (this.selectedYear.length > 0) {
        finalData = data.filter((item) =>
          this.selectedYear.includes(item.year)
        );
      } else {
        finalData = data;
      }

      this.filteredMovieList =
        genres && genres.length == 0 && this.selectedYear.length == 0
          ? this.movieList
          : finalData;
    },
    applyFilter() {
      this.filteredGenre = this.selectedGenre;
      this.filteredYear = this.selectedYear;
      this.filterDropdown = false;
      this.filterMovieList(this.selectedGenre);
      this.loadMovieList();
    },
    clearFilter() {
      this.selectedGenre = this.filteredGenre;
      this.selectedYear = this.filteredYear;
      this.filterDropdown = false;
    },
    resetFilteredGenre() {
      this.selectedGenre = [];
    },
    resetFilteredYear() {
      this.selectedYear = [];
    },
  },
  mounted() {
    this.filterMovieList(this.genres);
    this.loadMovieList();
  },
};
</script>
