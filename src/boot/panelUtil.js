import axios from "axios";
import { LocalStorage } from "quasar";
import AV from "leancloud-storage";
import { date } from 'quasar'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue }) => {
  class Util {
    constructor() {}

    post(path, data = {}, method = "post") {
      let token = LocalStorage.getItem("token");

      return axios({
        method: method,
        url: `${path}`,
        data: data,
        responseType: "json",
        headers: token === null ? {} : { token: token },
        validateStatus: status => {
          return status < 500;
        }
      });
    }

    get(path, params = {}, method = "get") {
      let token = LocalStorage.getItem("token");

      return axios({
        method: method,
        url: `${path}`,
        params: params,
        responseType: "json",
        headers: token === null ? {} : { token: token },
        validateStatus: status => {
          return status < 500;
        }
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
  Vue.prototype.$date = date;
};
