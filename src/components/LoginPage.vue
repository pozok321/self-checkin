<template>
  <div class="login-page bg-light">
    <div class="container">
      <div class="h-100 width-50">
        <!-- <form class="row g-4"> -->
        <div class="form-group">
          <label>Event KEY<span class="text-danger">*</span></label>
          <div class="input-group">
            <div class="input-group-text"><i class="bi bi-person-fill"></i></div>
            <input type="number" class="form-control" placeholder="Enter Event Key" v-model="obj.events_token" />
          </div>
        </div>
        <div class="form-group">
          <label>Event ID<span class="text-danger">*</span></label>
          <div class="input-group">
            <div class="input-group-text"><i class="bi bi-lock-fill"></i></div>
            <input type="number" class="form-control" placeholder="Enter Event ID" v-model="obj.events_id" />
          </div>
        </div>
        <div class="form-group">
          <button class="button-login mt-4" @click="login_page()">login</button>
        </div>
        <!-- </form> -->
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

  .rounded-top-left {
    position: relative;
    top: 0;
    right: 0;
  }

  .rounded-bottom-left {
    position: relative;
    bottom: 0;
    left: 0;
  }

  .width-50 {
    margin: auto;
    width: 50%;
  }

  .button-login{
    width: 100%;
    background-color: #163C56;
    color: #fff;
    font-family: Helvetica;
    border-radius: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16pt;
    font-weight: bold;
  }
</style>