<template>
  <v-dialog v-model="dialog" max-width="340">
    <v-card>
      <v-card-title class="text-h5  pa-0 pb-10">
        <v-toolbar color="primary"  class="d-flex justify-center" dark>Information</v-toolbar>
      </v-card-title>

      <v-card-text>
        <v-row v-for="item in keysInfo" :key="item.value">
          <v-col class="py-0">{{ item }}: </v-col>
          <v-col class="py-0">{{ info[item].value }}</v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Ok </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog-show",
  props: {
    initialDialog: {
      type: Boolean,
      required: true,
    },
    info: {
      require: true,
    },
  },

  data: () => ({
    dialog: false,
  }),
  computed: {
    keysInfo() {
      return Object.keys(this.info);
    },
  },
  watch: {
    initialDialog() {
      this.dialog = true;
    },
  },
};
</script>

<style>
</style>