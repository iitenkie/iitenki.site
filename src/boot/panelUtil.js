import "@babel/polyfill";
import axios from "axios";
import { LocalStorage } from "quasar";
import AV from "leancloud-storage";
import { date } from "quasar";
import { saveAs } from "file-saver";
import VueHtml2Canvas from "vue-html2canvas";

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

    reload() {
      location.reload();
    }

    text_align(ctx, align, ...args) {
      let measure = ctx.measureText(args[0]);
      if (align == "c") {
        args[1] -= measure.width / 2;
      } else if (align == "r") {
        args[1] -= measure.width;
      }
      ctx.fillText(...args);
    }

    save_canvas(canvas, fn, mime = "image/jpeg", quality = 0.95) {
      canvas.toBlob(
        blob => {
          saveAs(blob, fn);
        },
        mime,
        quality
      );
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
  Vue.use(VueHtml2Canvas);
};
