<template>
  <div>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1">
        SignUpInfo
        <small>Please fill in the information </small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12">
          <sign-up-info
            :schema="schema"
            :checkSignUp="checkSignUp"
            @valid="validSignUp"
          />
        </v-card>
        <v-btn color="primary" @click="checkSignUp = !checkSignUp">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">
        PersonalInfo
        <small>Please fill in the information </small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-12">
          <personal-info
            :schema="schema"
            :checkPersonal="checkPersonal"
            @validPersonal="validPersonal"
          />
        </v-card>
        <v-btn color="primary" @click="step = 1">
          Change SignUp Information
        </v-btn>
        <v-btn
          text
          color="primary"
          class="ml-5"
          @click="checkPersonal = !checkPersonal"
        >
          Complete
        </v-btn>
      </v-stepper-content>
    </v-stepper>
    <modal-window :info="info" :initialDialog="dialog"></modal-window>
  </div>
</template>

<script>
import SignUpInfo from "../components/SignUpInfo";
import PersonalInfo from "../components/PersonalInfo";
import ModalWindow from "../components/ModalWindow";

export default {
  name: "Home-view",
  data() {
    return {
      step: 1,
      checkSignUp: true,
      checkPersonal: true,
      dialog: true,
      infoSignIn: {},
      info: {},
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
    };
  },
  methods: {
    validSignUp(infoSignIn) {
      this.step = 2;
      this.infoSignIn = infoSignIn;
    },
    validPersonal(infoPersonal) {
      this.dialog = !this.dialog;
      this.info = { ...this.infoSignIn, ...infoPersonal };
    },
  },

  components: {
    SignUpInfo,
    PersonalInfo,
    ModalWindow,
  },
};
</script>
