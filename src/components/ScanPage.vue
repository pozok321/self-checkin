<template>
    <section class="vh-100 bg-agenda-session" style="background-color:#F1F1F1" v-if="checkin_status == false">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-8">
                <div class="text-center">
                    <div class="col-md-12 bg-white container-border-bottom align-items-center row">
                        <div class="col-md-6">
                            <input type="text" id="scanner" class="text-none">
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
    <section class="vh-100 bg-guest-detail" style="background-color:#F1F1F1" v-else>
        <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-6 bg-profile container-border-profile text-center">
                        <div class="card-body text-center">
                            <img src="../assets/image/guest.png" alt="guest" width="100" class="mt-4">
                            <div class="row">
                                <div class="checkin mb-4">
                                    <h1>Muhammad Irvan</h1>
                                    <span>muhammadirvan337@gmail.com</span>
                                </div>
                                <div class="registration">
                                    <img src="../assets/image/qr.png" alt="guest" width="50%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 bg-white container-border-details">
                        <div class="card-body">
                            <h2 class="mt-3 mx-5">Welcome to "event name"</h2>
                            <div class="account-details mx-4">
                                <h4>Mobile Phone</h4>
                                <p>+628-51-7321-0951</p>
                            </div>
                            <div class="account-details mx-4">
                                <h4>Company</h4>
                                <p>Mitra Teleinformatika Perkasa</p>
                            </div>
                            <div class="account-details mx-4">
                                <h4>Job Title</h4>
                                <p>CEO/Director/Owner</p>
                            </div>
                            <div class="account-details mx-4">
                                <h4>Company Title</h4>
                                <p>Manufacture</p>
                            </div>
                            <div class="account-details mx-4">
                                <h4>Ticket</h4>
                                <p>Day 1 / QTY : 1</p>
                            </div>
                            <div class="account-details mx-4">
                                <h4>Status</h4>
                                <p>Cold</p>
                            </div>
                        </div>
                    </div>
                </div>
            <div class="form-group text-center">
            <span><img src="../assets/image/namaste.png" alt="thankyou" width="50"></span>
            <button class="button-login mt-4" @click="finish()">Finish</button>
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
                checkin_status: false,
                obj : {
                evidenc: '',
                agenda_id: '',
                track_id: '',
                session_id: '',
                guests_token: '',
                security_level: '',
                multiple_session_entry: '',
                scanner_name: 'SS',
                security_level:'',
                qr_setting: ''
            }
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
                                // console.log("count", this_is.obj.guests_token_scan, input.value)
                                // this.$router.push("/guestdetailpage");
                                
                                if (input.value !== this_is.obj.guests_token_scan) {
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

            checkin_withScanner(value) {
                this.obj.guests_token = value;
                axios({
                        method: "post",
                        url: "/guest/scan/",
                        data: this.obj,
                        headers: {
                            "Content-Type": "text/plain"
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
        },
        mounted() {
            this.obj.events_id = $cookies.get("events_id");
            this.obj.session_id = $cookies.get("session_id");
            this.obj.agenda_id = $cookies.get("agenda_id");
            if (this.obj.events_id == null) {
                Swal.fire({
                    title: "Your Session is Expired!",
                    icon: "warning",
                });
                setTimeout(2000);
                this.$router.push("/");
            } else {
            this.on_scanner();
            }
        },
    };
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    span {
        color: #888888;
        font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
        margin-bottom: 0px;
        text-align: center;
        font-weight: bold;
        color: #163C56;
        font-family: helvetica;
    }

    .text-none{
        border: none;
        color: #fff;
        outline-style: none;
    }

    #scanner:focus{
        border-color: #fff;
        color: #fff;
    }

    .img-qr {
        padding: 4rem;
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

    .border-left {
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