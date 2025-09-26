<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <div v-if="apiError" class="alert alert-danger">{{ constant.errorMessage[apiError.message] ?? 'Something went wrong! try again later' }}</div>
        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <form @submit.prevent="handleLogin()">
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
            <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import constant from '@/store/constant'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
    data(){
        return{
            email: '',
            password: '',
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
      ...mapActions('auth', ['login']),
      async handleLogin(){
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

        if (Object.keys(this.errors).length === 0) {
          const response = await this.login({email: this.email, password: this.password});
          if(response){
            this.successMessage = 'Signin successful! Redirecting...';
            setTimeout(() => this.$router.replace('/'), 500)
          }
        }
      }
    }
}
</script>
