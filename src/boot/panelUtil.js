import axios from "axios";
import { LocalStorage } from "quasar";
import AV from "leancloud-storage";

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue }) => {
  class Util {
    constructor() {}

    post(path, data = {}) {
      let token = LocalStorage.getItem("token");

      return axios({
        method: "post",
        url: `${path}`,
        data: data,
        responseType: "json",
        headers: token === null ? {} : { token: token }
      });
    }

    get(path, params = {}) {
      let token = LocalStorage.getItem("token");

      return axios({
        method: "get",
        url: `${path}`,
        params: params,
        responseType: "json",
        headers: token === null ? {} : { token: token }
      });
    }
  }

  AV.init({
    appId: "SjoOertYHAzFFUOMV0RmrjLl-gzGzoHsz",
    appKey: "L3DsSRVy7iUJEwf0MkzzRohk",
    serverURLs: "https://platform.jnpj.club"
  });

  Vue.prototype.$util = new Util();
  Vue.prototype.$AV = AV;
};
