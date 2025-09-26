<template>
    <div>
        <h1>Welcome, {{ isAuthenticated ? currentUser.email : 'Guest User' }}</h1>
        <hr/>
        <h4>Post Details</h4>
        <hr/>
        <ul>
            <li v-for="post in posts[0]" :key="post.id">
                <div>
                    <div>Title: {{ post.title }} </div>
                    <div>Description: {{ post.body }} </div>
                    
                    <div>Views: {{ post.views }} </div>
                    <div>createdAt: {{ post.createdAt }} </div>
                </div>
                <hr/>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default{
    data(){
        return{
            posts: []
        }
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated','currentUser'])
    },
    mounted(){
        axios
        .get('https://inline-bf708-default-rtdb.firebaseio.com/posts.json')
        .then(response => this.formatPost(response.data))
    },
    methods: {
        formatPost(response){
            for(let key in response){
                this.posts.push({...response[key], id: key})
            }
        }
    }
}
</script>