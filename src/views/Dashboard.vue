<template>
    <div class="wrapper">
        <NavBar/>
        <Loading :active.sync="isLoading"/>
        <div class="container-fluid">

        </div>
    </div>
</template>

<script>
import NavBar from '@/components/Navbar';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'Dashboard',
    components: {
        Loading, NavBar
    },
    data () {
        return {
            isLoading: false
        }
    }
}
</script>

<style scoped>

</style>
