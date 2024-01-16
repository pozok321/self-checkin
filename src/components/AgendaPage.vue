<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-8">
                <div class="row text-center">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <img src="../assets/image/agenda.png" alt="agenda" width="100%">
                            </div>
                        </div>
                        <div class="input-group mt-3">
                            <select class="form-select" id="selectAgenda" v-model="agenda_id" @change="getSession()">
                                <option v-for="agendaData in agenda" v-bind:value="agendaData.id">
                                    {{ agendaData.agenda_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <img src="../assets/image/session.png" alt="session" width="100%">
                            </div>
                        </div>
                        <div class="input-group mt-3">
                            <select class="form-select" id="selectSession" v-model="session_id">
                                <option v-for="sessionData in session" v-bind:value="sessionData.id">
                                    {{ sessionData.session_topic }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="button-login mt-4" @click="confirmAgendaSession()">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swal from 'sweetalert2'
    import axios from 'axios'

    export default {
        data() {
            return {
                events_id: "",
                prime_agenda: "",
                showOnMedia: "",
                venue_id: "",
                agenda_id: "",
                session_id: "",
                agenda_name: "",
                track_id: "",
                session_topic: "",
                session: "",
                agenda: "",
                event_poster:"",
            };
        },
        components: {

        },
        methods: {
            getCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },

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
                    })
            },
            getAgenda() {
                axios({
                        method: "GET",
                        url: "/event/" + this.events_id + "/agenda",
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        this.agenda = res.data;
                    })
            },

            createCookie(name, value, day) {
                if (day) {
                    let currentDate = new Date();
                    currentDate.setTime(currentDate.getTime() + (day * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + currentDate.toGMTString();
                } else {
                    var expires = "";
                }
                document.cookie = name + "=" + value + ";" + expires + "; path=/";
            },

            confirmAgendaSession() {
                axios({
                        method: "GET",
                        url: "/event/" + this.events_id + "/agenda/" + this.agenda_id + "/session/" + this
                            .session_id,
                        headers: {
                            "Content-Type": "text/plain"
                        },
                    })
                    .then(res => {
                        console.log(res.data)
                        if (res.data !== "") {
                            this.createCookie("session_id", this.session_id, 1)
                            this.createCookie("agenda_id", this.agenda_id, 1)
                            this.$router.push("/eventdetailpage");
                        } else {
                            Swal.fire({
                                title: "Failed",
                                text: res.data.msg,
                                icon: "warning",
                            });
                        }
                    })

            }
        },
        mounted() {
            this.events_id = $cookies.get("events_id");
            this.getAgenda();
            if (this.events_id == null) {
                Swal.fire({
                    title: "Your Session is Expired!",
                    icon: "warning",
                });
                setTimeout(2000);
                this.$router.push("/");
            } else {
                this.getCookie()
            }
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