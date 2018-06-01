<template>
    <modal name="facility-view" height="75%" @before-open="beforeOpened" @opened="onOpened">
        <Loading :active.sync="loading"/>
        <v-dialog/>
        <div class="jumbotron p-0">
            <b-nav class="bg-dark">
                <b-btn class="btn-dark" @click="$modal.hide('facility-view')">
                    <icon name="x"></icon>
                </b-btn>
            </b-nav>
            <div id="background" class="w-100 h-100 py-3 text-center align-middle jumbotron">
                <div id="picture" class="mx-auto my-3"></div>
                
            </div>
        </div>
    </modal>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    components: {
        Loading
    },
    data () {
        return {
            apipath: 'https://elektronski-dnevnik.herokuapp.com',
            Facility: {},
            loading: false,
            obj : ''
        }
    },
    methods : {
        beforeOpened(event) {
            if(event.params.facility)
            {
                this.obj = event.params.facility;
            }
        },
        onOpened () {
            this.loading = true;
            if(typeof(this.obj) !== typeof({})) {
                fetch(this.apipath + '/facility/' + this.obj, {
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
                        this.Facility = json.data;
                        document.getElementById('background').style.background = 'url("' + this.Facility.backgroundPicture + '")';
                        document.getElementById('background').style.backgroundSize = 'cover';
                        document.getElementById('background').style.backgroundPosition = 'center';
                        document.getElementById('picture').style.background = 'url("' + this.Facility.picture + '")';
                        document.getElementById('picture').style.backgroundSize = 'cover';
                        document.getElementById('picture').style.backgroundPosition = 'center';
                    }
                    else {
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
            document.getElementById('background').style.background = 'url("' + this.Facility.backgroundPicture + '")';
            document.getElementById('background').style.backgroundSize = 'cover';
            document.getElementById('background').style.backgroundPosition = 'center';
            document.getElementById('picture').style.background = 'url("' + this.Facility.picture + '")';
            document.getElementById('picture').style.backgroundSize = 'cover';
            document.getElementById('picture').style.backgroundPosition = 'center';
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.icon {
    width: 16px;
    color: crimson;
}
.icon:hover {
    color: red;
}
</style>