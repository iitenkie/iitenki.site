<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-checkbox
            v-if="!islogin"
            :value="bilistat"
            label="bili"
            :color="
              bilistat == true
                ? 'positive'
                : bilistat == null
                ? 'grey'
                : 'negative'
            "
            keep-color
          />
          <q-checkbox
            v-if="!islogin"
            :value="nicostat"
            label="nico"
            :color="
              nicostat == true
                ? 'positive'
                : nicostat == null
                ? 'grey'
                : 'negative'
            "
            keep-color
          />
          <span v-if="!islogin" class="q-ml-xs text-body1">
            当前账号: {{ uname }}
          </span>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="!islogin" v-model="right" side="right" bordered>
      <div class="q-ma-sm">
        <div class="row items-center">
          <div class="col q-table__title q-ml-sm">系统消息</div>
          <q-space />
          <q-btn
            @click="notifyReset"
            :loading="loading"
            unelevated
            round
            class="col-auto q-ma-xs"
            color="grey"
            icon="refresh"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
          <q-btn
            @click="webUpdate"
            unelevated
            round
            class="col-auto q-ma-xs"
            color="warning"
            icon="update"
          />
        </div>
        <q-card
          v-for="(item, i) in notifys"
          :key="i"
          class="q-my-sm q-pa-sm"
          flat
          bordered
        >
          <div class="q-mb-xs text-body2 text-grey-7">{{ item.time_at }}</div>
          <div class="text-body2">{{ item.content.split("。")[0] }}</div>
        </q-card>
      </div>
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
      right: true,
      notifys: [],
      loading: false,
      islogin: false,
      bilistat: null,
      nicostat: null,
      uname: ""
    };
  },
  methods: {
    async notifyReset() {
      this.loading = true;
      let ret = await this.$util.get("/cookieartbot/api/getNotify");
      this.notifys = ret.data.data;
      this.loading = false;
    },
    async routeChange(n) {
      if (n.path == "/bot-panel/login") {
        this.islogin = true;
      } else this.islogin = false;
      await this.$util.get("/cookieartbot/islogin");
    },
    async webUpdate() {
      let ret = await this.$util.get("/cookieartbot/webupdate");
      if (ret.data.code == 0) {
        this.$q.notify({
          message: `更新完毕`,
          color: "positive",
          position: "top"
        });
        this.$util.reload();
      }
    }
  },
  watch: {
    $route(n) {
      this.routeChange(n);
    }
  },
  async created() {
    if (this.$q.localStorage.getItem("token") == null)
      this.$router.push("/bot-panel/login");
    this.$axios.interceptors.response.use(
      response => {
        if (
          response.status == 401 &&
          response.config.url != "/cookieartbot/login" &&
          this.$route.path != "/bot-panel/login"
        ) {
          this.$router.push("/bot-panel/login");
        } else if (
          response.status == 200 &&
          this.$route.path == "/bot-panel/login"
        ) {
          this.$router.push("/bot-panel/image-storage");
        }
        return response;
      },
      error => {
        return Promise.reject(error);
      }
    );
    this.routeChange(this.$route);
    await this.notifyReset();
    let ret = await this.$util.get("/cookieartbot/loginstat");
    this.bilistat = ret.data.data.bilibili;
    this.nicostat = ret.data.data.niconico;
    this.uname = ret.data.data.bilibili_uname;
  }
};
</script>
