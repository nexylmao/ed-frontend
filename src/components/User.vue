<template>
    <modal name="profile-show" height="75%" :adaptive="true" @before-open="beforeOpen" @opened="onOpened" @closed="onClose">
        <Loading :active.sync="loading"/>
        <edit-me/>
        <edit-user :profile="profile"/>
        <v-dialog/>
        <facility-edit :profile="profile" :user="CurrentUser"/>
        <b-nav class="bg-dark">
            <b-btn class="btn-dark" @click="$modal.hide('profile-show')">
                <icon name="x"></icon>
            </b-btn>
            <b-navbar-brand class="mx-auto">{{profile.username}}</b-navbar-brand>
            <b-btn v-if="profile.accountType !== 'Administrator' && (CurrentUser.accountType === 'Administrator' || (CurrentUser.accountType === 'Moderator' && (profile.facility === '' || profile.facility === CurrentUser.facility) && (profile.accountType !== 'Administrator' && profile.accountType !== 'Administrator')))"
                    class="btn-dark" title="Change users facility"
                    @click="$modal.show('edit-user-facility')" >
                <icon name="home"></icon>
            </b-btn>
            <b-btn v-if="CurrentUser.username === profile.username"
                    class="btn-dark" title="Edit your data"
                    @click="$modal.show('edit-me')">
                <icon name="edit-2"></icon>
            </b-btn>
            <b-btn v-if="CurrentUser.accountType === 'Administrator' || (CurrentUser.accountType === 'Moderator' && CurrentUser.facility === profile.facility && (profile.accountType !== 'Administrator' && profile.accountType !== 'Administrator'))"
                    class="btn-dark" title="Edit users data"
                    @click="$modal.show('edit-user')">
                <icon name="edit"></icon>
            </b-btn>
        </b-nav>
        <div id="background" class="w-100 h-100 py-3 text-center align-middle jumbotron">
            <div id="picture" class="mx-auto my-3"></div>
            <div class="title">
                <h2>{{profile.fullname}} | <i class="text-danger">{{profile.accountType}}</i><h2 v-if="profile.accountType !== 'Administrator'">{{profile.facility}}</h2></h2>
            </div>
            <div class="container">
                <div class="col-6">
                    <small>
                        email : {{profile.email}}
                    </small>
                    <br/>
                    <small v-if="profile.class && profile.class !== ''">
                        class : {{profile.class}}
                    </small>
                    <small v-else> this person doesn't have a homeclass</small>
                </div>
                <div class="col-6">
                    <div v-if="profile.accountType === 'Parent'">
                        <small>chilren : </small>
                        <br/>
                        <small :v-for="child in profile.children">
                            {{child}}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import FacilityEdit from './userComponents/FacilityPUT';
import EditMe from './userComponents/editMe';
import EditUser from './userComponents/editUser';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'ProfileShow',
    props: ['profile','backOnClose'],
    components: {
        EditMe, EditUser, FacilityEdit, Loading
    },
    data () {
        return {
            loading: false,
            apipath: 'https://elektronski-dnevnik.herokuapp.com',
            CurrentUser : JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'))
        }
    },
    methods : {
        beforeOpen (event) {
            if(event.params) {
                this.profile = event.params.profile;
            }
        },
        onOpened () {
            this.loading = true;
            if(typeof(this.profile) !== typeof({})) {
                fetch(this.apipath + '/user/' + this.profile, {
                    headers: {
                        'content-type': 'application/json',
                        'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
                    },
                    mode: 'cors'
                })
                .then(response => response.json())
                .then(json => {
                    this.loading = false;
                    if(json.good === true) {
                        this.profile = json.data;
                        document.getElementById('background').style.background = 'url("' + this.profile.backgroundPicture + '")';
                        document.getElementById('background').style.backgroundSize = 'cover';
                        document.getElementById('background').style.backgroundPosition = 'center';
                        document.getElementById('picture').style.background = 'url("' + this.profile.picture + '")';
                        document.getElementById('picture').style.backgroundSize = 'cover';
                        document.getElementById('picture').style.backgroundPosition = 'center';
                    }
                    else {
                        this.loading = false;
                        this.$modal.hide('profile-show');
                        this.$modal.show('dialog', {
                            title: 'Error!',
                            text: json.message,
                            buttons: [
                                {
                                    title: 'Close',
                                    default: true
                                }
                            ]
                        });
                    }
                })
                .catch(err => {
                    this.loading = false;
                    this.$modal.hide('profile-show');
                    this.$modal.show('dialog', {
                        title: 'Error!',
                        text: err.message,
                        buttons: [
                            {
                                title: 'Close',
                                default: true
                            }
                        ]
                    });
                });
            }
            document.getElementById('background').style.background = 'url("' + this.profile.backgroundPicture + '")';
            document.getElementById('background').style.backgroundSize = 'cover';
            document.getElementById('background').style.backgroundPosition = 'center';
            document.getElementById('picture').style.background = 'url("' + this.profile.picture + '")';
            document.getElementById('picture').style.backgroundSize = 'cover';
            document.getElementById('picture').style.backgroundPosition = 'center';
            this.loading = false;
        },
        onClose () {
            if(this.backOnClose) {
                window.history.back();
            }
        }
    }
}
</script>

<style scoped>
.title {
    color: white;
}

#picture {
    border-radius: calc(200px / 2); 
    height: 200px;
    width: 200px;
}

.icon {
    width: 16px;
    color: crimson;
}
.icon:hover {
    color: red;
}
</style>
