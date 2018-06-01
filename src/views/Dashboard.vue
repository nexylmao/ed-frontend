<template>
    <div class="wrapper">
        <NavBar/>
        <Loading :active.sync="isLoading"/>
        <p-o-s-t-grade/>
        <list-grades/>
        <v-dialog/>
        <div class="content container-fluid mx-auto align-middle text-center">
            <div class="bg-dark p-3 h-25 row mx-auto">
                <b-tabs pills class="mx-3">
                    <b-tab @click="tab='Grades'" title="Grades"/>
                    <b-tab @click="tab='Classes'" title="Classes"/>
                    <b-tab @click="tab='Subjects'" title="Subjects"/>
                </b-tabs>
                <b-form-select class="mx-3" v-model="chosen" name="year-select" id="year-range">
                    <option value="">
                        Current
                    </option>
                    <option v-for="year in yearArray" v-bind:key="year._id" :value="year.yearRange">
                        {{year.yearRange}}
                    </option>
                </b-form-select>
                <b-form-select class="mx-3" v-if="tab==='Grades'" v-model="chosen2" name="class-select" id="class-select">
                    <option v-for="x in classArray" v-bind:key="x" :value="x">
                        {{x}}
                    </option>
                </b-form-select>
            </div>
            <div v-if="tab === 'Grades'" class="p-3">
                <h2>GRADES MENU</h2>
                <button @click="() => {showGrades();}" class="btn btn-success w-100 h-100 p-3">
                    Show grades
                </button>
                <button v-if="me().accountType === 'Administrator' || me().accountType === 'Profesor'" @click="() => {showCreateGreade();}" class="btn btn-success w-100 h-100 p-3">
                    Give a grade!
                </button>
            </div>
            <div v-if="tab === 'Classes'" class="p-3">
                <h2>CLASSES MENU</h2>
            </div>
            <div v-if="tab === 'Subjects'" class="p-3">
                <h2>SUBJECTS MENU</h2>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/Navbar';
import ListGrades from '@/components/Grades';
import POSTGrade from '@/components/CreateGrade';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';

export default {
    name: 'Dashboard',
    components: {
        Loading, NavBar, ListGrades, POSTGrade
    },
    data () {
        return {
            tab: '',
            chosen: '',
            chosen2: '',
            yearArray: [],
            classArray: [],
            isLoading: false,
            apipath: 'https://elektronski-dnevnik.herokuapp.com'
        }
    },
    methods : {
        me () {
            return JSON.parse(window.localStorage.getItem('me') || window.sessionStorage.getItem('me'))
        },
        showCreateGreade () {
            this.$modal.show('create-grade', {
                schoolyear: this.chosen,
                class: this.chosen2
            });
        },
        showGrades () {
            this.$modal.show('list-grades', {
                schoolyear: this.chosen,
                class: this.chosen2
            });
        },
        setAllClass () {
            if(!window.localStorage.getItem('class') && !window.sessionStorage.getItem('class')) {
                this.isLoading = true;
                fetch(this.apipath + '/class/my/classes', {
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json',
                        'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    this.isLoading = false;
                    if(json.good === true) {
                        if(window.localStorage.getItem('token')) {
                            window.localStorage.setItem('class', JSON.stringify(json.data));
                            this.classArray = json.data;
                        }
                        if(window.sessionStorage.getItem('token')) {
                            window.sessionStorage.setItem('class', JSON.stringify(json.data));
                            this.classArray = json.data;
                        }
                    }
                    else {
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
                    this.isLoading = false;
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
        },
        setAllSY () {
            if(!window.localStorage.getItem('years') && !window.sessionStorage.getItem('years')) {
                this.isLoading = true;
                fetch(this.apipath + '/schoolYear/small', {
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json',
                        'x-access-token': window.localStorage.getItem('token') || window.sessionStorage.getItem('token')
                    }
                })
                .then(res => res.json())
                .then(json => {
                    this.isLoading = false;
                    if(json.good === true) {
                        if(window.localStorage.getItem('token')) {
                            window.localStorage.setItem('years', JSON.stringify(json.data));
                            this.yearArray = json.data;
                        }
                        if(window.sessionStorage.getItem('token')) {
                            window.sessionStorage.setItem('years', JSON.stringify(json.data));
                            this.yearArray = json.data;
                        }
                    }
                    else {
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
                    this.isLoading = false;
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
        },
        years () {
            return JSON.parse(window.localStorage.getItem('years') || window.sessionStorage.getItem('years'));
        },
        classes () 
        {
            return JSON.parse(window.localStorage.getItem('class') || window.sessionStorage.getItem('class'));
        }
    },
    mounted () {
        this.setAllSY();
        this.setAllClass();
        this.yearArray = this.years();
        this.classArray = this.classes();
    }
}
</script>

<style scoped>
#year-range {
    width: 30%;
}
#class-select {
    width: 30%;
}

div.content {
    padding-left: 50px;
    padding-right: 0px;
}
</style>
