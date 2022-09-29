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
              v-model="dateFormatted"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              readonly
              :error-messages="fields.birthday.error"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fields.birthday.value"
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
          v-model="fields.ocean.value"
          :items="schema.ocean.oneOf"
          :error-messages="fields.ocean.error"
          label="Your Favorite Ocean"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-radio-group v-model="fields.sex.value" row>
          <v-radio label="Man" color="indigo" value="man"></v-radio>
          <v-radio label="Woman" color="red" value="woman"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="4">
        <v-row cols="12">
          <v-col v-for="i in schema.hobby.anyOf" :key="i">
            <v-checkbox
              v-model="fields.hobby.value"
              :label="i"
              :value="i"
              hide-details="true"
              :error-messages="fields.hobby.error"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  name: "Personal-info",
  emits: ["validPersonal"],
  props: {
    checkPersonal: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    activePicker: null,
    menu: false,
    isValid: true,
    fields: {
      firstName: {
        value: "firstName",
        error: "",
      },
      lastName: {
        value: "lastName",
        error: "",
      },
      birthday: {
        value: "",
        error: "",
      },
      ocean: {
        value: "",
        error: "",
      },
      sex: {
        value: "man",
        error: "",
      },
      hobby: {
        value: null,
        error: "",
      },
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
    difference(d1, d2) {
      let m = moment(d1);
      return m.diff(d2, "years");
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    checkRegular(field) {
      let normalize = this.schema?.[field]?.regExp.replace(/\\/g, "\\");
      return new RegExp(normalize).test(this.fields[field].value);
    },
    checkLength(field) {
      const strLen = String(this.fields[field].value).length || 0;
      const min = +this.schema[field]?.minLength;
      const max = +this.schema[field]?.maxLength;

      return { isError: strLen <= max && strLen >= min, min, max };
    },
    checkAge(field) {
      if (this.fields[field].value) {
        const age = this.difference(new Date(), this.fields[field].value);
        const min = +this.schema[field]?.minAge;
        const max = +this.schema[field]?.maxAge;
        return { isError: age <= max && age >= min, min, max };
      } else {
        return { isError: false, min: 0, max: 0 };
      }
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
      const checkObj = this.checkLength(field);
      if (checkObj.isError) {
        this.fields[field].error = "";
      } else {
        this.isValid = false;
        this.fields[
          field
        ].error = `"Length from  ${checkObj.min} to ${checkObj.max}"`;
      }
    },
    isErrorAge(field) {
      const checkObj = this.checkAge(field);
      if (checkObj.error) {
        this.fields[field].error = "";
      } else if (checkObj.max > 0) {
        this.isValid = false;
        this.fields[
          field
        ].error = `"Ange from  ${checkObj.min} to ${checkObj.max}"`;
      } else {
        this.isErrorRequired(field);
      }
    },
    isErrorRepeatField(field) {
      const shortField = (field.split("repeat")[1] || "").toLowerCase();
      if (this.fields[field].value === this.fields[shortField].value) {
        this.fields[field].error = "";
      } else {
        this.isValid = false;
        this.fields[
          field
        ].error = `"This string does not match the ${shortField}"`;
      }
    },
    isErrorRequired(field) {
      if (this.fields[field].value) {
        this.fields[field].error = "";
      } else {
        this.isValid = false;
        this.fields[field].error = "This field is required!";
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
        } else if ("maxAge" in this.schema[keys[i]]) {
          this.isErrorAge(keys[i]);
          console.log("age");
        } else if ("maxLength" in this.schema[keys[i]]) {
          this.isErrorLenght(keys[i]);
        } else {
          this.isErrorRequired(keys[i]);
        }
      }
    },
  },
  computed: {
    dateFormatted() {
      if (!this.fields.birthday.value) return null;
      const [year, month, day] = this.fields.birthday.value.split("-");
      return `${day}-${month}-${year}`;
      // return moment(this.fields.birthday.value).format("DD-MM-YYYY");
    },
  },
  watch: {
    checkPersonal() {
      this.check();
      if (this.isValid) {
        this.$emit("validPersonal", 1);
      }
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
};
</script>
