<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
import { mapState } from 'vuex';
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar/>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created(){
    this.$store.dispatch('auth/autoLogin')
  },
  computed: {
    ...mapState('auth', ['autoLogout'])
  },
  watch: {
    autoLogout(curValue, oldValue){
      if(curValue && curValue != oldValue){
        this.$router.replace('/login')
      }
    }
  }
}
</script>