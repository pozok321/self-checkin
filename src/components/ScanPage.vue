<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-8">
                <div class="row text-center">
                    <div class="col-md-12 bg-white border-dash align-items-center row">
                        <div class="col-md-6"> 
                            <img src="../assets/image/qr-code.gif" alt="qr code" width="100%">
                        </div>
                        <div class="col-md-6">
                            <h1>Tap your QR to scanner</h1>
                            <span class="">
                                Please wait till your QR show the details information
                            </span>
                        </div>
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
        },
        mounted() {
            this.events_id = $cookies.get("events_id");
        },
    };
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    span{
        color: #888888;
        font-family: Arial, Helvetica, sans-serif;
    }

    h1{
        margin-bottom: 0px;
        text-align: center;
        font-weight: bold;
        color: #163C56;
        font-family: helvetica;
    }

    .bg-white {
        background-color: #fff;
    }

    .border-dash {
        border-style: dashed;
        border-width: thin;
        border-radius: 20px;
    }

    .card-deck {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }

    .btn-checkin {
        background-color: #EBEBEB;
        color: #25516B;
        border-radius: 20px;
        font-size: 20px;
        align-items: center;
        text-align: center;
        border: none;
        padding: 10px;
        font-weight: bold;
    }

    .btn-registration {
        background-color: #25516B;
        color: #EBEBEB;
        border-radius: 20px;
        font-size: 20px;
        align-items: center;
        text-align: center;
        border: none;
        padding: 10px;
        font-weight: bold;
    }

    .bg-agenda-session {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: url(../assets/image/bg-agenda-session.png)
    }
</style>