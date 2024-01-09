<template>
  <div class="login-page bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="bg-white shadow rounded">
            <div class="row">
              <div class="col-md-7 pe-0">
                <div class="form-left h-100 py-5 px-5">
                  <!-- <form class="row g-4"> -->
                  <div class="col-12">
                    <label>Event KEY<span class="text-danger">*</span></label>
                    <div class="input-group">
                      <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
                      <input type="number" class="form-control" placeholder="Enter Event Key"
                        v-model="obj.events_token" />
                    </div>
                  </div>

                  <div class="col-12">
                    <label>Event ID<span class="text-danger">*</span></label>
                    <div class="input-group">
                      <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
                      <input type="number" class="form-control" placeholder="Enter Event ID" v-model="obj.events_id" />
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary px-4 float-end mt-4" @click="login_page()">login</button>
                  </div>
                  <!-- </form> -->
                </div>
              </div>
              <div class="col-md-5 ps-0 d-none d-md-block">
                <div class="form-right h-100 bg-darkblue text-white text-center pt-5">
                  <i class="bi bi-bootstrap"></i>
                  <h2 class="fs-1">Self Checkin Login</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swal from 'sweetalert2'
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    data() {
      return {
        obj: {
          events_token: '',
          events_id: '',
        },
      };
    },
    components: {

    },
    methods: {
      login_page() {
        axios({
            method: "post",
            url: "/selfsvc/login",
            data: this.obj,
            headers: {
              "Content-Type": "text/plain"
            },
          })
          .then(res => {
            console.log(res.data)
            if (res.data != false) {
              Swal.fire({
                title: "Success!",
                text: res.data.msg,
                icon: "success",
              });
              this.$router.push("/thescan");
            } else {
              Swal.fire({
                title: "Incorrect Event Key/Event ID",
                text: res.data.msg,
                icon: "warning",
              });
            }
          })
      },
    },
  };
</script>

<style>
  a {
    text-decoration: none;
  }

  .login-page {
    width: 100%;
    height: 100vh;
    display: inline-block;
    display: flex;
    align-items: center;
  }

  .form-right i {
    font-size: 100px;
  }

  .bg-darkblue {
    background-color: #1a283d;
  }
</style>