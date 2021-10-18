<template>
  <div class="flex flex-center row">
    <div class="col-8">
      <q-card flat class="q-pa-sm q-my-md bg-grey-2 row" style="width: 100%;">
        <q-file
          outlined
          v-model="file"
          label="配置文件"
          accept=".json"
          class="col-5"
        >
          <template v-slot:after>
            <q-btn @click="packages" v-if="file" :disable="btndisabled" outline class="q-mr-sm">
              {{ btntext }}
            </q-btn>
            <q-btn
              @click="filedl"
              v-if="file"
              :disable="dlfile == null"
              outline
              class="q-mr-sm"
            >
              保存
            </q-btn>
            <q-btn
              @click="saveConf"
              v-if="file"
              outline
            >
              保存配置文件
            </q-btn>
          </template>
        </q-file>
      </q-card>
      <div v-for="(item, i) in data" :key="i">
        <Configs
          :data="item"
          :subs="i"
          v-if="
            i == 'orig_10_6' ||
              i == 'orig_5_1' ||
              i == 'repo_5_1' ||
              i == 'pickup'
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ClipSelect from "components/ClipSelect.vue";
import Configs from "components/Configs.vue";

export default {
  name: "RankingConfigMaker",
  components: {
    Configs
  },
  data() {
    return {
      data: {},
      file: null,
      dlfile: null,
      btntext: "打包",
      btndisabled: false
    };
  },
  methods: {
    dialog(data) {
      this.$q
        .dialog({
          component: ClipSelect,
          parent: this,
          data: data
        })
        .onOk((n, vf) => {
          console.log("OK", n);
          for (let i in this.data) {
            this.data[i].push({});
            this.data[i].pop();
            for (let ii in this.data[i]) {
              if (this.data[i][ii].aid == n.data.aid) {
                this.data[i][ii] = n.data;
                break;
              }
            }
          }
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    async packages() {
      this.btndisabled = true;
      let zip = new JSZip();

      zip.file("data.json", JSON.stringify(this.data));
      for (let i in this.data) {
        for (let ii in this.data[i]) {
          if ("file" in this.data[i][ii]) {
            let file = this.data[i][ii].file;
            let reader = file => {
              return new Promise((resolve, reject) => {
                let r = new FileReader();
                r.readAsDataURL(file);
                r.onload = () => {
                  resolve(r.result);
                };
              });
            };
            zip.file(file.name, (await reader(file)).split(",")[1], {
              base64: true
            });
          }
        }
      }

      this.dlfile = await zip.generateAsync({ type: "blob" }, metadata => {
        this.btntext = metadata.percent.toFixed(2) + "%";
      });
      this.btndisabled = false;
      this.btntext = "OK";
    },
    filedl() {
      saveAs(this.dlfile, this.file.name.replace(".json", ".zip"));
    },
    saveConf() {
      saveAs(JSON.stringify(this.data), this.file.name)
    }
  },
  watch: {
    file(n) {
      let reader = new FileReader();
      reader.readAsText(n);
      reader.onload = e => {
        let res = JSON.parse(e.target.result);
        for (let i in res) {
          if (
            i == "orig_10_6" ||
            i == "orig_5_1" ||
            i == "repo_5_1" ||
            i == "pickup"
          ) {
          } else delete res[i];
        }
        this.data = res;
        console.log(this.data);
      };
    }
  }
};
</script>
