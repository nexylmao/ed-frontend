<template>
    <div class="wrapper">
        <TokenCheck/>
        <nav id="sidebar" class="overlay" v-bind:class="{ active: isActive }">
            <div class="left float-left py-2 dropdown">
                <h4 class="m-auto border-1">Menu</h4>
                <h4 v-for="button in buttons" v-bind:key="button.text" class="m-auto border-1">{{button.text}}</h4>
            </div>
            <div class="right float-left py-2 dropdown">
                <button v-on:click="onClick" type="button" class="btn btn-dark navbar-btn p-0">
                    <icon class="my-1" name="menu"></icon>
                </button>
                <a v-for="button in buttons" v-bind:key="button.text" :href="button.link" class="btn navbar-btn p-0">
                    <icon class="my-1" :name="button.iconname"></icon>
                </a>
            </div>
            <div class="bottom footer-copyright text-left m-0 px-2 py-3">
                <a title="Realtime application protection" href="https://www.sqreen.io/?utm_source=badge"><img style="width:109px;height:36px" src="https://s3-eu-west-1.amazonaws.com/sqreen-assets/badges/20171107/sqreen-dark-badge.svg" alt="Sqreen | Runtime Application Protection" /></a>
                <br/>
                <small>Elektronski dnevnik</small><br/>
                © 2018 V.N.
                <a href="https://github.com/nexylmao/"> github.com</a>
            </div>
        </nav>
    </div>
</template>

<script>
import customIcon from 'vue-icon/lib/vue-feather.esm'
import TokenCheck from './TokenCheck';

export default {
    name: 'Navbar',
    components: {
        TokenCheck
    },
    data () {
        return {
            user : JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me')),
            isActive : true,
            buttons : [
                {
                    text: 'Home',
                    iconname: 'home',
                    link: '/#/dashboard'
                },
                {
                    text: 'Data',
                    iconname: 'database',
                    link: '/#/dashboard2'
                },
                {
                    text: 'Profile',
                    iconname: 'user',
                    link: '/#/user'
                },
                {
                    text: 'Logout',
                    iconname: 'log-out',
                    link: '/#/logout'
                }
            ]
        }
    },
    methods : {
        onClick () {
            this.isActive = !this.isActive;
        }
    }
}
</script>

<style>
.wrapper {
    display: block;
}
</style>


<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

h4 {
    width: 200px;
    height: 50px;
    text-align: center;
    padding-top: 10px;
}

button {
    width: 50px;
    height: 50px;
}

a {
    width: 50px;
    height: 50px;
}

.icon {
    color:crimson;
    width: 40px;
    margin: auto;
}
.icon:hover {
    color: red;
}

.left {
    color: white;
    width: 200px;
    max-width: 200px;
    height: 85%;
}

.right {
    color: white;
    width: 50px;
    max-width: 50px;
    height: 85%;
}

.bottom {
    color: white;
    width: 250px;
    max-width: 250px;
    height: 15%;
}

body {
    font-family: 'Poppins', sans-serif;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

.navbar {
    max-height: 10vh;
    width: 100%;
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

#sidebar {
    position: fixed;
    min-width: 250px;
    max-width: 250px;
    height: 100vh;
    background: #111111;
    color: #ffffff;
    transition: all 0.3s;
    z-index: 9999;
}

#sidebar.active {
    margin-left: -200px;
}

.overlay {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
}

#content {
    padding: 20px;
    max-height: 100vh;
    max-width: 50%;
    transition: all 0.3s;
}

</style>
