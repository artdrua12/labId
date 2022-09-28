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
          v-model="fields.password.value"
          :error-messages="fields.password.error"
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
      password: {
        value: "ab22",
        error: "",
      },
    },
    repeatPassword: "",
    schema: {
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
      let normalize = this.schema?.[field]?.regExp.replace(/\\/g, "\\");
      return new RegExp(normalize).test(this.fields[field].value);
    },
    isErrorRegEx(field) {
      if (this.checkRegular(field)) {
        this.fields[field].error = "";
      } else {
        this.fields[field].error = "No valid";
      }
    },
    isErrorLenght(field) {
      let strLen = String(this.fields[field].value).length || 0;
      let min = "";
      let max = "";
      let keys = Object.keys(this.schema[field]);

      for (let i = 0; i < keys.length; i++) {
        if (keys[i].match("min")) {
          min = +this.schema[field][keys[i]];
        } else if (keys[i].match("max")) {
          max = +this.schema[field][keys[i]];
        }
      }

      if (strLen <= max && strLen >= min) {
        this.fields[field].error = "";
      } else {
        this.fields[field].error = `"Length from  ${min} to ${max}"`;
      }
    },
    check() {
      let array = ["mobilePhone", "email", "password"];
      for (let i = 0; i < array.length; i++) {
        if ("regExp" in this.schema[array[i]]) {
          this.isErrorRegEx(array[i]);
        } else {
          this.isErrorLenght(array[i]);
        }
      }
    },
  },

  components: {},
};
</script>
