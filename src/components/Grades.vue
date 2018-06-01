<template>
    <modal name="list-grades" :scrollable="true" height="auto" width="75%" @before-open="beforeOpen" @opened="onOpened">
        <Loading :active.sync="loading"/>
        <div class="container-fluid jumbotron bg-dark m-0 p-0">
            <button class="btn btn-dark w-100 p-2 col-4" v-for="grade in grades" v-bind:key="grade._id">
                <div class="p-2">
                    <h4>Grade : {{grade.grade}}</h4>
                    subject : {{grade.subject}}
                    <br/>
                    <small>
                        givenBy : {{grade.givenBy}}
                    </small>
                    <br/>
                    <small>
                        givenTo : {{grade.givenTo}}
                    </small>
                </div>
            </button>
        </div>
    </modal>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    data () {
        return {
            syheader: '',
            classheader: '',
            loading: false,
            grades: [],
            apipath: 'https://elektronski-dnevnik.herokuapp.com'
        }
    },
    components: {
        Loading
    },
    methods: {
        beforeOpen (event) {
            if(event.params) {
                this.syheader = event.params.schoolyear;
                this.classheader = event.params.class;
            }
        },
        onOpened () {
            this.loading = true;
            fetch(this.apipath + '/grade', {
                mode: 'cors',
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token'),
                    'x-school-year': this.syheader,
                    'x-class': this.classheader
                }
            })
            .then(res => res.json())
            .then(json => {
                this.loading = false;
                if(json.good === true) {
                    this.grades = json.data;
                }
                else {
                    this.$modal.hide('list-grades');
                    this.$modal.show('dialog', {
                        title: 'Error!',
                        text: json.message || 'No users found!',
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
                this.$modal.hide('list-grades');
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
    }
}
</script>

<style scoped>
.btn {
    color: white;
}
</style>
