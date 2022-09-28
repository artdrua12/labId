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
export default {
  name: "Sign-up-info",
  emits: ["valid"],
  props: {
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
    schema: {
      mobilePhone: {
        required: true,
        regExp: "^\\+375\\d{9}$",
      },
      email: {
        required: true,
        regExp:
          "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
      },
      password: {
        required: true,
        minLength: "8",
        maxLength: "20",
      },
      repeatPassword: {
        required: true,
        minLength: "8",
        maxLength: "20",
      },
    },
  }),
  methods: {
    checkRegular(field) {
      let normalize = this.schema?.[field]?.regExp.replace(/\\/g, "\\");
      return new RegExp(normalize).test(this.fields[field].value);
    },
    checkLength(field) {
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

      return { isError: strLen <= max && strLen >= min, min, max };
    },
    isErrorRegEx(field) {
      if (this.checkRegular(field)) {
        this.fields[field].error = "";
      } else {
        this.isValid = false;
        this.fields[field].error = "No valid";
      }
    },
    isErrorLenght(field) {
      let checkObj = this.checkLength(field);
      if (checkObj.isError) {
        this.fields[field].error = "";
      } else {
        this.isValid = false;
        this.fields[
          field
        ].error = `"Length from  ${checkObj.min} to ${checkObj.max}"`;
      }
    },
    isErrorRepeatField(field) {
      let shortField = (field.split("repeat")[1] || "").toLowerCase();
      if (this.fields[field].value === this.fields[shortField].value) {
        this.fields[field].error = "";
      } else {
        this.isValid = false;
        this.fields[field].error = "This string does not match the password";
      }
    },
    check() {
      let keys = Object.keys(this.fields);
      this.isValid = true;
      for (let i = 0; i < keys.length; i++) {
        if ("regExp" in this.schema[keys[i]]) {
          this.isErrorRegEx(keys[i]);
        } else if (keys[i].match("repeat")) {
          this.isErrorRepeatField(keys[i]);
        } else {
          this.isErrorLenght(keys[i]);
        }
      }
    },
  },
  watch: {
    checkSignUp() {
      this.check();
      if (this.isValid) {
        this.$emit("valid", 2);
      }
    },
  },
};
</script>
