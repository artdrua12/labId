<template>
  <v-card class="mx-auto my-10" max-width="344">
    <v-img
      src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
      height="200px"
    ></v-img>

    <v-card-title> А.С Пушкин </v-card-title>

    <v-card-subtitle> Муза</v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange lighten-2" text> Explore </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          Вот муза, резвая болтунья, Которую ты столь любил. Раскаялась моя
          шалунья, Придворный тон ее пленил; Ее всевышний осенил Своей небесной
          благодатью — Она духовному занятью Опасной жертвует игрой. Не
          удивляйся, милый мой, Ее израильскому платью, — Прости ей прежние
          грехи И под заветною печатью Прими опасные стихи.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
  }),
};
</script>
