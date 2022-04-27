<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="header-bg text-white">
      <q-toolbar class="text-pink-8">
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-toolbar-title>工具箱</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-list>
        <ToolLink v-for="link in ToolLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import ToolLink from "components/ToolLink.vue";

export default {
  name: "MainLayout",
  components: { ToolLink },
  data() {
    return {
      left: false,
      ToolLinks: []
    };
  },
  created() {
    for (let i of this.$router.options.routes[0].children) {
      if (i.name != undefined) this.ToolLinks.push(i);
    }
  }
};
</script>

<style lang="scss">
.header-bg {
  background-color: pink;
  background-repeat: no-repeat;
  background-position: 50% 12%;
  background-clip: border-box;
  background-size: 100%;
}
</style>
