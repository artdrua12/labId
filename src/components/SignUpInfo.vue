<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field
          label="Mobile Phone"
          v-model="fields.mobilePhone.value"
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
          v-model="password"
          :counter="10"
          label="Password"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-text-field
          v-model="repeatPassword"
          :counter="10"
          label="RepeatPassword"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="check"> Continue </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Sign-up-info",

  data: () => ({
    fields: {
      mobilePhone: {
        value: "+375123456789",
        error: "",
      },
      email: {
        value: "abc@maionez.ru",
        error: "",
      },
    },
    password: "",
    repeatPassword: "",
    shema: {
      mobilePhone: {
        required: true,
        regExp: "^\\+375\\d{9}$",
      },
      password: {
        required: true,
        minLength: "8",
        maxLength: "20",
      },
      email: {
        required: true,
        regExp:
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
      },
    },
  }),
  methods: {
    checkRegular(field) {
      let normalize = this.shema?.[field]?.regExp.replace(/\\/g, "\\");
      return new RegExp(normalize).test(this.fields[field].value);
    },
    isError(field) {
      if (this.checkRegular(field)) {
        this.fields[field].error = "";
      } else {
        this.fields[field].error = "No falid";
      }
    },
    check() {
      let d = ["mobilePhone", "email"];
      for (let i = 0; i < d.length; i++) {
        this.isError(d[i]);
      }
    },
  },

  components: {},
};
</script>
