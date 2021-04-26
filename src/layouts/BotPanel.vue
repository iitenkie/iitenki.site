<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>bot控制台</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    };
  },
  async created() {
    console.log(await this.$util.get("/cookieartbot/api/getDynamic"))
  },
  watch: {
    $route() {
      console.log(this.$route);
    }
  }
};
</script>
