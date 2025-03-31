<template>
  <div :id="'vditor' + day"></div>
  <!-- <div @click="full">1111</div> -->
</template>

<script setup lang="ts">
import Vditor from "vditor";
import "vditor/dist/index.css";
import { onMounted } from "vue";

const emits = defineEmits(["blur"]);
const props = defineProps({
  value: String,
  day: String,
});

onMounted(() => {
  Vditor.preview(document.getElementById("vditor" + props.day) as HTMLDivElement, props.value ?? "", {
    mode: "light",
    cdn: "/work-calendar/vditor",
  });
});
</script>

<style lang="less">
.aa {
  height: 0;
  overflow: hidden;
}
.vditor-reset {
  padding: 5px !important;
  p {
    margin-bottom: 8px;
  }
}
.vditor-reset ul,
.vditor-reset ol {
  padding-left: 1.3em;
}
</style>
