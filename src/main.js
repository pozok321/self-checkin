import "./assets/main.css";

import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";

axios.defaults.baseURL = "https://privateapi.undangin.id/";

const app = createApp(App);

app.use(router);
app.mount("#app");
