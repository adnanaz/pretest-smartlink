<template>
  <!-- rounded snackbar -->
  <v-snackbar v-model="isDialogVisible" rounded="pill" dark top right>
    {{ snackbarText }}
  </v-snackbar>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  props: {},

  setup() {
    const isDialogVisible = ref(false);
    const snackbarText = ref("");

    return { isDialogVisible, snackbarText };
  },
};
</script>

<style></style>
