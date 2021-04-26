<template>
  <q-page class="flex flex-center row">
    <q-card class="q-pa-md" style="width: 300px;">
      <div class="text-h5">登录</div>
      <div class="row q-mb-md">
        <q-input v-model="email" label="E-Mail" style="width: 100%;"></q-input>
      </div>
      <div class="row q-my-md">
        <q-input
          v-model="password"
          label="密码"
          type="password"
          style="width: 100%;"
        ></q-input>
      </div>
      <div class="row q-mt-md">
        <q-space />
        <q-btn @click="login()" label="登录" color="primary" class="col-3"></q-btn>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { sha512 } from "js-sha512";

export default {
  name: "PanelLogin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let ret = await this.$util.post("/cookieartbot/login", {
        email: this.email,
        password: sha512(this.password + "udk187")
      });
      if (ret.status == 200) {
        this.$q.notify({
          message: "登录成功",
          color: "positive"
        });
        this.$q.localStorage.set("token", ret.data.token);
        this.$router.push("/bot-panel/image-storage");
      } else if (ret.status == 403)
        this.$q.notify({
          message: ret.data.message,
          color: "negative"
        });
    }
  }
};
</script>
