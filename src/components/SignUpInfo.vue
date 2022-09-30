<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field
          label="Mobile Phone"
          v-model="fields.mobilePhone.value"
          v-mask="'+############'"
          :error-messages="fields.mobilePhone.error"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field
          v-model="fields.email.value"
          label="E-mail"
          :error-messages="fields.email.error"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field
          v-model="fields.password.value"
          :error-messages="fields.password.error"
          label="Password"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field
          v-model="fields.repeatPassword.value"
          :error-messages="fields.repeatPassword.error"
          label="RepeatPassword"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import maimMixin from "@/mixins/Mixin";
export default {
  name: "Sign-up-info",
  emits: ["valid"],
  mixins: [maimMixin],
  props: {
    schema: {
      type: Object,
      required: true,
    },
    checkSignUp: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    isValid: true,
    fields: {
      mobilePhone: {
        value: "+375123456789",
        error: "",
      },
      email: {
        value: "abc@maionez.ru",
        error: "",
      },
      password: {
        value: "12345678",
        error: "",
      },
      repeatPassword: {
        value: "12345678",
        error: "",
      },
    },
    // schema: {
    //   mobilePhone: {
    //     required: true,
    //     regExp: "^\\+375\\d{9}$",
    //   },
    //   email: {
    //     required: true,
    //     regExp:
    //       "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
    //   },
    //   password: {
    //     required: true,
    //     minLength: "8",
    //     maxLength: "20",
    //   },
    //   repeatPassword: {
    //     required: true,
    //     minLength: "8",
    //     maxLength: "20",
    //   },
    // },
  }),
  methods: {},
  watch: {
    checkSignUp() {
      this.check();
      if (this.isValid) {
        this.$emit("valid", this.fields);
      }
    },
  },
};
</script>
