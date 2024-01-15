<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-8">
                <div class="text-center">
                    <div class="col-md-12 bg-white container-border-bottom align-items-center row">
                        <div class="col-md-6"> 
                        <input type="hidden" id="scanner">
                        <img src="../assets/image/qr-code.gif" alt="qr code" width="100%" class="img-qr">
                        </div>
                        <div class="col-md-6 border-left">
                            <h1>Tap your QR to scanner</h1>
                            <span>
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
    import $ from 'jquery'

    export default {
        data() {
            return {
                baseUrl: '',
                url: '',
                evidenc: 'U1c4WnMxd0drVEhMUUV3QTJKSzRQZz09',
                agenda_id: '2',
                track_id: '1',
                session_id: '1',
                status: '',
                guests_token: '',
                imei: '',
                scanner_data: '',
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

            on_scanner() {
                setTimeout(function () {
                    $("#scanner").trigger("focus");
                }, 500)
                let is_event = false; // for check just one event declaration
                let input = document.getElementById("scanner");
                var this_is = this;
                
                input.addEventListener("focus", function () {
                    if (!is_event) {
                        is_event = true;
                        input.addEventListener("keypress", function (e) {
                            // setTimeout(function () {
                            if (e.keyCode == 13) {
                                console.log("count", this_is.guests_token_scan, input.value)
                                if (input.value !== this_is.guests_token_scan) {
                                    this.$router.push("/guestdetailpage");
                                    this_is.checkin_withScanner(input.value)
                                }
                                input.select();
                            }
                            // }, 500)
                        })
                    }
                });
                document.addEventListener("keypress", function (e) {
                    if (e.target.tagName !== "INPUT") {
                        input.focus();
                    }
                });
            },

            checkin_withScanner(guests_token) {
                var form_data = new FormData();
                form_data.append('evidenc', this.evidenc);
                form_data.append('agenda_id', this.agenda_id);
                form_data.append('track_id', this.track_id);
                form_data.append('session_id', this.session_id);
                form_data.append('guests_token', guests_token);
                axios({
                        method: "post",
                        url: "https://corp.undangin.com/apife/checkin/scan-desktop",
                        data: form_data,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    })
                    .then(res => {
                        this.on_scanner()
                        this.scanner_data = res.data
                        this.guests_token_scan = this.scanner_data.guests_token
                        if (this.scanner_data.status == 200) {
                            this.checkin_status = false
                        } else {
                            this.checkin_status = true
                        }
                        // $('#auto_checkin_modal').modal('show');
                    })
            },
            checkin_desktop() {
                var form_data = new FormData();
                form_data.append('evidenc', this.evidenc);
                form_data.append('agenda_id', this.agenda_id);
                form_data.append('track_id', this.track_id);
                form_data.append('session_id', this.session_id);
                form_data.append('status', this.scanner_data.status);
                form_data.append('imei', this.scanner_data.imei);
                form_data.append('guests_token', this.scanner_data.guests_token);
                axios({
                        method: "post",
                        url: "https://corp.undangin.com/apife/checkin/desktop",
                        data: form_data,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                    })
                    .then(res => {
                        this.on_scanner()
                        if (res.data.status == 200) {
                            this.checkin_status = true
                            // this.get_guestlist()
                            // this.getCheckinTablet()
                            var span = document.createElement("span");
                            span.innerHTML = "Welcome <br><b>" + res.data.fullname + "</b><br>" + res.data
                                .ticketclass_name
                                Swal.fire({
                                title: "Success",
                                text: "You are Checkin!",
                                icon: "success"
                                })
                                .then((value) => {
                                    this.print_qr()
                                });
                        } else {
                            this.checkin_status = true
                            var span = document.createElement("span");
                            span.innerHTML = "<b>" + res.data.fullname + "</b><br>" + res.data.ticketclass_name
                            Swal.fire({
                                title: "Failed",
                                text: "Try Again",
                                icon: "error"
                                })
                                .then((value) => {});
                        }
                    })
            },
        },
        mounted() {
            this.events_id = $cookies.get("events_id");
            this.on_scanner();
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

    .img-qr{
        padding: 4rem;
    margin-left: 2rem;
    }
    .bg-white {
        background-color: #fff;
    }

    .container-border-bottom {
    border-width: thin;
    border-radius: 20px;
    border-bottom: 10px solid;
    border-color: #5697B2;
    }

    .border-left{
    border-left: 10px solid;
    align-items: left;
    height: 50;
    padding-top: 50px;
    padding-bottom: 50px;
    border-color: #163C56;
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