<template>
    <div class="wrapper">
        <profile-show :profile="passUser" :backOnClose="false"/>
        <profiles-list/>
        <create-profile/>
        <facility-show/>
        <NavBar/>
        <Loading :active.sync="isLoading"/>
        <div class="content py-5 px-1 px-md-2 px-lg-3 px-xl-3 container-fluid">
            <v-dialog/>
            <div class="row pl-5">
                <div class="column col-12 col-sm-8 col-md-4 col-lg-3 col-xl-3">
                    <div class="mb-5 text-white">
                        <h3>Users</h3>
                    </div>
                    <div class="my-3">
                        <button @click="() => {setToMe(); showUser();}" class="btn btn-success w-100 h-100 p-3">
                            <h4>Show me</h4>
                        </button>
                    </div>
                    <div class="my-3 bg-success">
                        <form @submit.prevent="() => {setToTextBox(); showUser();}">
                            <button class="btn btn-success w-100 h-100 p-3">
                                <h4>Show {{'user'}} !</h4>
                            </button>
                            <input required type="text" name="username" id="usrnm" class="m-3" placeholder="type username here" :v-bind="passUser">
                        </form>
                    </div>
                    <div class="my-3">
                        <button @click="() => {showUsers();}" class="btn btn-success w-100 h-100 p-3">
                            <h4>Show all users!</h4>
                        </button>
                    </div>
                    <div class="my-3 bg-success">
                        <form @submit.prevent="() => {showTypeUser()}">
                            <button class="btn btn-success w-100 h-100 p-3">
                                <h4>Show {{'users'}} !</h4>
                            </button>
                            <select required id="acctype" class="m-3">
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                                <option value="Profesor">Profesor</option>
                                <option value="Moderator">Moderator</option>
                                <option v-if="user.accountType !== 'Student' && user.accountType !== 'Parent'" value="Administrator">Administrator</option>
                            </select>
                        </form>
                    </div>
                    <div class="my-3">
                        <button @click="() => {createUser();}" class="btn btn-success w-100 h-100 p-3">
                            <h4>Create user!</h4>
                        </button>
                    </div>
                </div>
                <div class="column col-12 col-sm-8 col-md-4 col-lg-3 col-xl-3">
                    <div class="mb-5 text-white">
                        <h3>Facilities</h3>
                    </div>
                    <div class="my-3">
                        <form class="bg-success" @submit.prevent="() => {showFacility();}">
                            <button class="btn btn-success w-100 h-100 p-3">
                                <h4>Show facility</h4>
                            </button>
                            <input required type="text" name="shortname" id="shrtnm" class="m-3" placeholder="type facility shortname here" :v-bind="passFacility">
                        </form>
                    </div>
                </div>
                <div class="column col-12 col-sm-8 col-md-4 col-lg-3 col-xl-3">
                    <div class="mb-5 text-white">
                        <h3>School Years</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.column {
    max-height: 85vh;
    position: relative;
    overflow-y: scroll;
}

.content {
    color: white;
    padding-left: 50px;
}
</style>


<script>
import ProfileShow from '@/components/User';
import ProfilesList from '@/components/Users';
import CreateProfile from '@/components/CreateUser';

import FacilityShow from '@/components/Facility';

import NavBar from '@/components/Navbar';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'RegularData',
    components: {
        CreateProfile, ProfileShow, ProfilesList, Loading, NavBar, FacilityShow
    },
    data () {
        return {
            user : JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me')),
            passFacility : '',
            passUser: {},
            isLoading: false
        }
    },
    methods: {
        showFacility () {
            this.$modal.show('facility-view', {facility: $('#shrtnm').val()});
        },
        createUser () {
            this.$modal.show('create-user');
        },
        showUsers () {
            this.$modal.show('list-profiles', {all: true});
        },
        setToTextBox () {
            this.passUser = $('#usrnm').val();
        },
        setToMe () {
            this.passUser = JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'));
        },
        showUser () {
            this.$modal.show('profile-show');
        },
        showTypeUser () {
            this.$modal.show('list-profiles', {all: false, type: document.getElementById('acctype').value});
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