<script lang="ts" setup>
import { ErMessage } from "zznikki-element";

const openCenter = () => {
  ErMessage({
    showClose: true,
    message: "Centered text",
    center: true
  });
};
</script>

<template>
  <er-button plain @click="openCenter">Centered text</er-button>
</template>