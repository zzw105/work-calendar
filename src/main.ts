import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Edit } from "@element-plus/icons-vue";

const app = createApp(App);

app.component("Edit", Edit);

app.mount("#app");
