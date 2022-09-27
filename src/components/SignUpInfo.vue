<template>
  <v-container>
    <masked-input mask="\+\1 (111) 1111-11" placeholder="Phone" />
  </v-container>
</template>

<script>
  import MaskedInput from "vue-masked-input";
export default {
  name: "Sign-up-info",

  data: () => ({}),
  components: {
    MaskedInput,
  },
};
</script>
