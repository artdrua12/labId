<template>
  <div>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1">
        SignUpInfo
        <small>Please fill in the information </small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12">
          <sign-up-info :checkSignUp="checkSignUp" @valid="step = $event" />
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
        <v-card color="grey lighten-1" class="mb-12" >
          <personal-info :checkSignUp="checkPersonal" @valid="step = $event" />
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
  </div>
</template>

<script>
import SignUpInfo from "../components/SignUpInfo";
import PersonalInfo from "../components/PersonalInfo";

export default {
  name: "Home-view",
  data() {
    return {
      step: 1,
      checkSignUp: true,
      checkPersonal: true,
    };
  },
  methods: {},

  components: {
    SignUpInfo,
    PersonalInfo,
  },
};
</script>
