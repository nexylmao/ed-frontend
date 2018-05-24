<template>
    <div class="wrapper">
        <NavBar/>
        <Loading :active.sync="isLoading"/>
        <div class="content p-5">
            <h1>This is dashboard2!</h1>
        </div>
    </div>
</template>

<style scoped>
.content {
    color: white;
}
</style>


<script>
import NavBar from '@/components/Navbar';
import Loading from 'vue-loading-overlay';
import UserShow from '@/components/User';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'RegularData',
    components: {
        Loading, NavBar, UserShow
    },
    data () {
        return {
            isLoading: false,
            user : JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me')),
        }
    },
    created () {
        this.Loading = true;
    },
    mounted () {
        this.Loading = false;
    } 
}
</script>