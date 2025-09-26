<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Signup</h3>
          <hr />
        </div>
        <div v-if="apiError" class="alert alert-danger">{{ constant.errorMessage[apiError.message] ?? 'Something went wrong! try again later' }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <form @submit.prevent="handleSignup()">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
            <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword"
              v-model="password"
            />
            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="confirmPassword"
            />
            <small v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</small>
          </div>
          <button type="submit" class="btn btn-primary">Signup</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '@/store/constant'
import { mapActions, mapState } from 'vuex'

export default {
    data(){
        return{
            email: null,
            password: null,
            confirmPassword: null,
            errors: {},
            successMessage: null
        }
    },
    computed: {
      ...mapState('auth', ['apiError']),
      constant() {
        return constant
      }
    },
    methods: {
        ...mapActions('auth', ['signup']),
        
        async handleSignup(){
          this.errors = {}
          if (!this.email) {
              this.errors.email = 'Email is required.'
          } else if (!/\S+@\S+\.\S+/.test(this.email)) {
              this.errors.email = 'Enter a valid email.'
          }

          if (!this.password) {
              this.errors.password = 'Password is required.'
          } else if (this.password.length < 6) {
              this.errors.password = 'Password min length should be 6.'
          }

          if (!this.confirmPassword) {
              this.errors.confirmPassword = 'Confirm password is required.'
          } else if (this.confirmPassword.length < 6) {
              this.errors.confirmPassword = 'Confirm password min length should be 6.'
          } else if (this.password !== this.confirmPassword) {
              this.errors.confirmPassword = 'Both password not matching.'
          }

          if (Object.keys(this.errors).length === 0) {
            const response = await this.signup({email: this.email, password: this.password});
            if(response){
              this.successMessage = 'Signup successful! Redirecting...';
              setTimeout(() => this.$router.push('/login'), 500)
            }
          }
        }
    }
}
</script>