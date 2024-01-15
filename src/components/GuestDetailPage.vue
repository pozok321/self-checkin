<template>
    <section class="vh-100 bg-guest-detail" style="background-color:#F1F1F1">
        <div class="d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-6 col-lg-6 col-xl-6">
                <div class="row">
                    <div class="col-sm-6 bg-profile container-border-profile text-center">
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
                    <div class="col-sm-6 bg-white container-border-details">
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
            <button class="button-login mt-4" @click="login_page()">Log In</button>
          </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Swal from 'sweetalert2/dist/sweetalert2.js';
    import axios from "axios";
    import $ from "jquery";
    //Define Vue app
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

        },
        mounted() {},
    };
</script>


<style>
    a {
        text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4 {
        margin-bottom: 0px !important;
    }

    .bg-guest-detail {
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background: url(../assets/image/bg-agenda-session.png)
    }

    .button-login {
    width: 50%;
    background-color: #163C56;
    color: #fff;
    font-family: Helvetica;
    border-radius: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16pt;
    font-weight: bold;
  }

    .bg-profile {
        background-image: linear-gradient(#5697B2, #1B6476);
    }

        .checkin h1,
        span {
            color: #fff;
            font-family: Helvetica;
        }

    .text-center{
        text-align: center;
    }

    .checkin span {
        color: #fff;
        font-family: Helvetica;
        font-style: italic;
    }

    .border-dash {
        border-width: thin;
        border-radius: 20px;
    }

    .form-floating {
        border: none !important;
    }

    .account-details{
        position: relative;
        padding: 10px;
        border-bottom: 1px solid;
        text-align: left;
    }

    .account-details h4{
        color: #143C55;
        font-weight: bold;
        text-align: left;
    }

    .account-details p{
        color: #1A283D;
        text-align: left;
        margin: 0 !important;
    }

    .form-text {
        display: block;
        width: 100%;
        padding: 0.2rem 0.2rem;
        font-size: 0.5rem;
    }

    .container-border-profile {
        border-width: thin;
        border-radius: 20px;
        border-bottom: 20px solid;
        border-color: #fff;
    }

    .container-border-details {
        border-width: thin;
        border-radius: 20px;
        border-bottom: 20px solid;
        border-color: #5697B2;
    }

    .card-deck {
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
    }
</style>