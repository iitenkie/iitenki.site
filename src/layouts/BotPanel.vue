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
    this.$axios.interceptors.response.use(
      response => {
        if (
          response.status == 401 &&
          response.config.url != "/cookieartbot/login"
        )
          this.$router.push("/bot-panel/login");
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
    await this.$util.get("/cookieartbot/islogin");
  }
};
</script>
