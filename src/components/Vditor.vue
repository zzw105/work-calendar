<template>
  <div id="vditor"></div>
</template>

<script setup lang="ts">
import Vditor from "vditor";
import "vditor/dist/index.css";
import { onMounted, ref, shallowRef } from "vue";

const vditor = shallowRef<Vditor | null>(null);
const value = defineModel({ required: true, type: String });
const emits = defineEmits(["blur"]);

const isFullscreenClick = ref(false);
onMounted(() => {
  vditor.value = new Vditor("vditor", {
    height: "100%",
    mode: "wysiwyg",
    cache: {
      enable: false,
    },
    cdn: "/work-calendar/vditor",
    toolbar: [
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-after",
      "insert-before",
      "|",
      "table",
      "undo",
      "redo",
      "|",
      {
        name: "fullscreen",
        click() {
          vditor.value!.vditor.toolbar!.element!.className = "vditor-toolbar aa";
          vditor.value!.focus();
          isFullscreenClick.value = false;
        },
      },
    ],
    // toolbarConfig: {
    //   hide: true,
    // },
    after: () => {
      vditor.value!.vditor.toolbar!.element!.className = "vditor-toolbar aa";
      vditor.value?.focus();
      vditor.value?.setValue(value.value, true);
    },
    blur: () => {
      setTimeout(() => {
        if (!isFullscreenClick.value) {
          // emits("blur", value);
          vditor.value?.clearCache();
        }
      }, 200);
    },
  });
});
const fullscreen = () => {
  console.log(1111, isFullscreenClick.value);

  const toolbarIconElement = vditor.value?.vditor.toolbar?.elements?.fullscreen.children[0] as HTMLButtonElement;
  toolbarIconElement.dispatchEvent(new CustomEvent("click"));
  vditor.value!.vditor.toolbar!.element!.className = "vditor-toolbar";
  isFullscreenClick.value = true;
};

const getVditorValue = () => {
  return vditor.value?.getValue();
};

defineExpose({ fullscreen, getVditorValue });
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
