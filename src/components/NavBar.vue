<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <router-link v-if="isAuthenticated" class="nav-link active" to="/home">Home</router-link>
            <router-link v-if="!isAuthenticated" class="nav-link" to="/login">Login</router-link>
            <router-link v-if="!isAuthenticated" class="nav-link" to="/signup">Signup</router-link>
            <a href="#" v-if="isAuthenticated" @click.prevent="logout" class="nav-link">Logout</a>
        </div>
        </div>
    </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default{
    computed:{
        ...mapGetters('auth', ['isAuthenticated', 'currentUser'])
    },
    methods: {
        ...mapActions('auth', {
            logoutAction: 'logout'
        }),
        async logout(){
            await this.logoutAction()
            this.$router.replace('/login')
        }
    }
}
</script>