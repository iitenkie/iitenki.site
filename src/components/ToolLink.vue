<template>
  <q-item class="tlink" clickable :to="path" active-class="tlink-active">
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "ToolLink",
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: "/"
    }
  }
};
</script>

<style lang="scss">
.tlink {
  color: $pink;
  background: white;
}

.tlink-active {
  color: $pink;
  background: $pink-1;
}
</style>
