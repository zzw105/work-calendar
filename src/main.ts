import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Edit, FullScreen, Check } from "@element-plus/icons-vue";
const app = createApp(App);

app.component("Edit", Edit);
app.component("FullScreen", FullScreen);
app.component("Check", Check);

app.mount("#app");
