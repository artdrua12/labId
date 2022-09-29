<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <v-text-field
          label="First Name"
          v-model="fields.firstName.value"
          :error-messages="fields.firstName.error"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-text-field
          v-model="fields.lastName.value"
          label="Last Name"
          :error-messages="fields.lastName.error"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            locale="ru-ru"
            first-day-of-week="1"
            :active-picker.sync="activePicker"
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-select
          :items="schema.ocean.oneOf"
          label="Your Favorite Ocean"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-radio-group v-model="fields.radioGroup" row >
          <v-radio label="Man" color="indigo" value="man"></v-radio>
          <v-radio label="Woman" color="red" value="woman"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-row cols="12" >
          <v-col
            v-for="i in schema.hobby.anyOf"
            :key="i"
          >
            <v-checkbox
              v-model="fields.checkBox"
              :label="i"
              :value="i"
              hide-details="true"
              error-messages=""
            ></v-checkbox>
          </v-col>
        </v-row>
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
    activePicker: null,
    date: null,
    menu: false,

    isValid: true,
    fields: {
      firstName: {
        value: "abcdefgh",
        error: "",
      },
      lastName: {
        value: "hgfedcda",
        error: "",
      },
      radioGroup: "man",
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      checkBox: [],
    },
    schema: {
      firstName: {
        required: true,
        minLength: "2",
        maxLength: "30",
      },
      lastName: {
        required: true,
        minLength: "2",
        maxLength: "30",
      },
      birthday: {
        required: true,
        minAge: "18",
        maxAge: "90",
      },
      ocean: {
        required: true,
        oneOf: ["Atlantic", "Pacific", "Indian", "Arctic"],
      },
      hobby: {
        required: true,
        anyOf: ["Sport", "Beauty", "IT", "Pets"],
      },
      sex: {
        required: true,
      },
    },
  }),
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
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
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
