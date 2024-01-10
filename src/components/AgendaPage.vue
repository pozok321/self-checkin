<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-8">
                <div class="row text-center">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <img src="../assets/image/session.png" alt="session" width="50%">
                                <p class="card-text session-agenda-title">Session</p>
                            </div>
                        </div>
                        <div class="input-group mt-3">
                            <!-- <select class="form-select" id="inputGroupSelect02" v-for="agendaData in session" :key="agendaData.id">
                                <option selected>Choose Session</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select> -->
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <img src="../assets/image/agenda.png" alt="agenda" width="50%">
                                <p class="card-text session-agenda-title">Agenda</p>
                            </div>
                        </div>
                        <div class="input-group mt-3">
                            <select class="form-select" id="selectAgenda">
                                <option v-for="sessionData in session" v-bind:value="session.id">
                                    {{ sessionData.session_topic }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="button-login mt-4">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        data() {
            return {
                events_id: "22817",
                prime_agenda: "",
                showOnMedia: "",
                venue_id: "",
                agenda_id: "1",
                agenda_name: "",
                track_id: "",
                session_topic: "",
                session: "",
                agenda: "",
            };
        },
        components: {

        },
        methods: {
            getSession() {
                axios({
                        method: "GET",
                        url: "/event/" + this.events_id + "/agenda/" + this.agenda_id + "/session",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        this.session = res.data;
                        console.log(this.session, 'test123');
                    })
            },
            getAgenda() {
                axios({
                        method: "GET",
                        url: "/event/22817/agenda",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        this.agenda = res.data;
                    })
            },

            confirmAgendaSession() {
                var confirm = new FormData();
                confirm.append("agenda_id", this.agenda_id);
                confirm.append("events_id", this.agenda_id);
                confirm.append("session_topic", this.session_topic);
                axios({
                        method: "POST",
                        url: "event/22817/agenda/1/session/1",
                        data: agenda,
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        if (res.data.status === 200) {
                            this.getAgenda();
                            this.getSession();
                        }
                    })

            }
        },
        mounted() {
            this.getAgenda();
            this.getSession();
        },
    };
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4 {
        margin-bottom: 0px;
    }

    .session-agenda-title {
        color: #003748;
        font-size: 20pt;
    }

    .button-login {
        width: 100%;
        background-color: #163C56;
        color: #fff;
        font-family: Helvetica;
        border-radius: 50px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 16pt;
        font-weight: bold;
    }

    .logo-undangin {
        width: 200px;
    }

    .form__input {
        background-color: #F1F1F1;
        width: 100%;
        border: 0px solid transparent;
        border-radius: 0;
        border-bottom: 1px solid #aaa;
        padding: 1em .5em .5em;
        padding-left: 2em;
        outline: none;
        margin: 1.5em auto;
        transition: all .5s ease;
    }

    .bg-darkblue {
        background-color: #1a283d;
    }

    .bg-agenda-session {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: url(../assets/image/bg-agenda-session.png)
    }
</style>