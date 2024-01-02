<template>
    <div>
        <input type="text" id="scanner">
        <div class="row" id="checkin-desktop" v-if="scanner_data.status == 200">
            <span>{{scanner_data.msg}}</span>
            <button @click="checkin_desktop()">Check-in!</button>
        </div>
        <div id="checkin-desktop" v-if="scanner_data.status == 202">
            <div id="#image">
                <div class="row box">
                    <img :src="scanner_data.guests_qr" class="qr-img">
                </div>
                <span>{{scanner_data.fullname}}</span>
            </div>
        </div>
    </div>
</template>

<script>
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
            on_scanner() {
                setTimeout(function () {
                    $("#scanner").trigger("focus");
                }, 500)
                let is_event = false; // for check just one event declaration
                let input = document.getElementById("scanner");
                var this_is = this
                input.addEventListener("focus", function () {
                    if (!is_event) {
                        is_event = true;
                        input.addEventListener("keypress", function (e) {
                            // setTimeout(function () {
                            if (e.keyCode == 13) {
                                console.log("count", this_is.guests_token_scan, input.value)
                                if (input.value !== this_is.guests_token_scan) {
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

            on_print() {
                setTimeout(function () {
                    $("#scanner").trigger("focus");
                }, 500)
                let is_event = false; // for check just one event declaration
                let input = document.getElementById("scanner");
                var this_is = this
                input.addEventListener("focus", function () {
                    if (!is_event) {
                        is_event = true;
                        input.addEventListener("keypress", function (e) {
                            // setTimeout(function () {
                            if (e.keyCode == 13) {
                                console.log("count", this_is.guests_token_scan, input.value)
                                if (input.value !== this_is.guests_token_scan) {
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
                            swal({
                                    html: true,
                                    icon: 'success',
                                    title: res.data.msg,
                                    content: span
                                })
                                .then((value) => {
                                    this.print_qr()
                                });
                        } else {
                            this.checkin_status = true
                            var span = document.createElement("span");
                            span.innerHTML = "<b>" + res.data.fullname + "</b><br>" + res.data.ticketclass_name
                            swal({
                                    html: true,
                                    icon: 'warning',
                                    title: res.data.msg,
                                    content: span
                                })
                                .then((value) => {});
                        }
                    })
            },

        },
        mounted() {
            this.on_scanner();
        },
    };
</script>


<style>
    .row {
        display: flex;
    }

    .box {
        border: 1px solid #000;
        width: 100%;
        height: 100%;
    }

    .qr-img{
        margin: auto;
    }
</style>