<template>
  <q-layout view="hHh lpR fFr">
    <q-header bordered class="bg-pink-11 text-white">
      <q-toolbar>
        <q-toolbar-title>
          云烤肉
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
      <q-bar class="bg-pink-1 text-black">
        <div class="cursor-pointer">
          {{ data.title }}
          <q-popup-edit v-model="data.title" auto-save>
            <q-input v-model="data.title" debounce="1000" dense autofocus />
          </q-popup-edit>
        </div>

        <div
          class="ellipsis cursor-pointer text-italic"
          style="font-size: 0.85rem;"
        >
          {{ data.comment ? data.comment : "备注" }}
          <q-popup-edit v-model="data.comment" auto-save>
            <q-input v-model="data.comment" debounce="1000" dense autofocus />
          </q-popup-edit>
        </div>
      </q-bar>
    </q-header>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <q-list padding class="rounded-borders text-pink-6">
        <div class="row q-pa-sm q-ma-xs rounded-borders">
          文本
          <q-space />
          <q-btn
            padding="none"
            color="pink-11"
            icon="add"
            @click="text_add_click()"
            class="q-mx-sm"
            flat
          />
          <q-btn
            padding="none"
            color="pink-11"
            icon="ios_share"
            class="q-mx-sm"
            flat
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable @click="save_conf()" v-close-popup>
                  <q-item-section>脚本用</q-item-section>
                </q-item>
                <q-item clickable @click="save_text()" v-close-popup>
                  <q-item-section>可读格式</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <input
            type="file"
            ref="file"
            style="display: none"
            @change="add"
            accept="text/*"
          />
        </div>

        <q-item
          v-for="(item, i) in text_list"
          :key="i"
          clickable
          v-ripple
          :active="text_select === i"
          @click="text_select = i"
          active-class="menu_active"
          class="q-ma-xs rounded-borders"
        >
          <q-item-section>
            {{ item.title }}
          </q-item-section>
        </q-item>

        <div class="flex flex-center">
          <q-pagination
            v-model="page"
            :max="Math.ceil(this.text_count / limit)"
            input
            color="pink-11"
          />
        </div>

        <q-inner-loading :showing="text_list.length == 0 && !loaded">
          <q-spinner-bars size="50px" color="pink" />
        </q-inner-loading>

        <q-separator />

        <q-expansion-item expand-separator label="词典">
          <q-item
            v-for="(item, i) in dicts"
            :key="i"
            clickable
            v-ripple
            class="q-ma-xs"
          >
            <q-item-section class="row">
              {{ item.name }}
            </q-item-section>
          </q-item>
          <q-inner-loading :showing="dicts.length == 0 && !loaded">
            <q-spinner-bars size="50px" color="pink" />
          </q-inner-loading>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="flex flex-center row" padding>
        <div class="col-xs-12 col-sm-8 col-md-6 col-xl-4">
          <div v-for="(item, i) in data.text" :key="i" class="q-pb-sm">
            <q-card v-if="item.type == 'text'" flat bordered>
              <div class="row q-px-md q-py-xs bg-pink-1">
                <div>
                  <span class="speaker-font">{{ item.speaker }}</span>
                  <q-btn
                    @click="
                      item.roasted_speaker = speaker_replace(item.speaker)
                    "
                    color="primary"
                    icon="update"
                    size="xs"
                    tabindex="-1"
                    flat
                    round
                  />
                  <div
                    :class="
                      'cursor-pointer text-caption roasted-speaker-font' +
                        (item.roasted_speaker
                          ? ' text-grey-8'
                          : ' text-negative text-bold')
                    "
                  >
                    {{
                      item.roasted_speaker
                        ? item.roasted_speaker
                        : "角色名（中文）"
                    }}
                    <q-popup-edit v-model="item.roasted_speaker" auto-save>
                      <q-input
                        v-model="item.roasted_speaker"
                        debounce="1000"
                        dense
                        autofocus
                      />
                    </q-popup-edit>
                  </div>
                </div>
                <q-space />
                {{ item.speaker_skin }}
              </div>

              <q-card-section class="q-pt-xs">
                <q-field color="orange" placeholder="原文" readonly autogrow>
                  <template v-slot:control>
                    <div
                      v-html="item.text"
                      class="text original-font"
                      style="white-space: pre-line;"
                    ></div>
                  </template>
                </q-field>
                <q-input
                  v-model="item.roasted_text"
                  debounce="500"
                  type="textarea"
                  color="pink"
                  placeholder="译文"
                  class="text roasted-font"
                  autogrow
                >
                  <template v-slot:append>
                    <q-btn
                      v-if="item.comment == undefined"
                      @click="item.comment = ''"
                      icon="arrow_drop_down"
                      size="sm"
                      round
                      flat
                    ></q-btn>
                  </template>
                </q-input>
                <q-input
                  v-if="item.comment != undefined"
                  v-model="item.comment"
                  type="text"
                  color="pink"
                  placeholder="备注"
                  tabindex="-1"
                  dense
                  autogrow
                >
                  <template v-slot:append>
                    <q-btn
                      v-if="
                        item.comment != undefined && item.comment.length == 0
                      "
                      @click="item.comment = undefined"
                      icon="arrow_drop_up"
                      size="sm"
                      tabindex="-1"
                      round
                      flat
                    ></q-btn>
                  </template>
                </q-input>
              </q-card-section>
            </q-card>

            <q-card
              v-else-if="item.type == 'location'"
              v-text="item.name"
              flat
              bordered
              dense
              class="bg-pink-1 text-h5 speaker-font q-pa-sm"
              style="text-align: center;"
            >
            </q-card>

            <q-chip v-else>
              <q-avatar
                v-if="item.type == 'bgm'"
                icon="music_note"
                color="red"
                text-color="white"
              />
              <q-avatar
                v-else-if="item.type == 'se'"
                icon="volume_up"
                color="red"
                text-color="white"
              />
              {{ item.name }}
            </q-chip>
          </div>
        </div>

        <q-page-sticky position="top-right" :offset="[18, 18]">
          <q-btn
            icon="book"
            size="lg"
            @click="speaker_replace_all()"
            color="pink"
            fab
          />
        </q-page-sticky>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn
            :label="`${diff_num}:保存`"
            size="lg"
            class="bg_transition"
            @click="update()"
            :color="diff_num == 0 ? 'positive' : 'negative'"
            rounded
          />
        </q-page-sticky>

        <q-inner-loading :showing="data.text.length == 0 && !loaded">
          <q-spinner-bars size="50px" color="pink" />
        </q-inner-loading>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { saveAs } from "file-saver";

export default {
  name: "YuyuyuiTranslationHelper",
  data() {
    return {
      last_updated: undefined,
      loaded: false,
      text_list: [],
      text_select: 0,
      text_count: 0,
      dicts: [],
      data: { text: [] },
      diff_num: 0,
      update_flag: false,
      right: false,
      limit: 20,
      page: 1
    };
  },
  watch: {
    async page(val) {
      let resp = await this.get("/cookieartbot/yyyi/record", {
        params: {
          limit: this.limit,
          skip: (this.page - 1) * this.limit,
          projection: JSON.stringify({ text: 0 })
        }
      });
      this.text_list = resp.data.data;
    },
    async text_select(val) {
      this.data = this.text_list[val];
      window.scrollTo(0, 0);
    },
    data: {
      deep: true,
      handler(val, old_val) {
        if (val._id == old_val._id) {
          if (!this.update_flag && old_val.text.length != 0) {
            this.update_flag = true;
            setTimeout(async () => {
              let data_old_raw = await this.get(
                `/cookieartbot/yyyi/record/${this.data._id}`
              );
              let data_old = data_old_raw.data.data;

              if (
                this.data.last_modified != undefined &&
                data_old.last_modified > this.data.last_modified
              ) {
                location.reload();
              } else {
                let diff_num = 0;
                for (const i in this.data) {
                  if (i == "last_modified") continue;
                  if (i != "text") {
                    if (this.data[i] != data_old[i]) {
                      diff_num++;
                    }
                  } else {
                    for (const ii in this.data[i]) {
                      for (const iii in this.data[i][ii]) {
                        if (this.data[i][ii][iii] != data_old[i][ii][iii]) {
                          diff_num++;
                          break;
                        }
                      }
                    }
                  }
                }
                this.diff_num = diff_num;
              }

              this.update_flag = false;
            }, 2500);
          }
        }
      }
    },
    diff_num(val) {
      if (val > 0) this.update();
    }
  },
  methods: {
    add(el) {
      let file = el.target.files[0];
      let reader = new FileReader();
      reader.onload = async () => {
        let dat = this.yuyuyui_script_serialize(reader.result);
        await this.post("/cookieartbot/yyyi/record", {
          data: {
            title: file.name,
            text: dat
          }
        });
        await this.reset();
      };
      reader.readAsText(file);
    },
    get(url, config = {}) {
      return this.$axios({
        method: "get",
        url: url,
        responseType: "json",
        ...config
      });
    },
    post(url, config = {}) {
      return this.$axios({
        method: "post",
        url: url,
        responseType: "json",
        ...config
      });
    },
    put(url, config = {}) {
      return this.$axios({
        method: "put",
        url: url,
        responseType: "json",
        ...config
      });
    },
    delete(url, config = {}) {
      return this.$axios({
        method: "delete",
        url: url,
        responseType: "json",
        ...config
      });
    },
    yuyuyui_script_serialize(text) {
      function size_replace(a, p1, p2, b, c) {
        return `<span style="font-size: ${Math.round((p1 / 48) * 100) /
          100}em;">${p2}</span>`;
      }

      text = text.split("\r\n");
      let data = [];
      let id = 1;
      for (let i = 0; i < text.length; i++) {
        let el = text[i];

        if (/^.*    <.*>$/.test(el)) {
          i++;
          let extract = el.match(/^(.*)    <(.*)>$/);

          let form = {
            _id: id,
            type: "text",
            speaker: extract[1],
            speaker_skin: extract[2],
            roasted_speaker: "",
            text: "",
            roasted_text: ""
          };

          let _text = [];
          for (; text[i]; i++) _text.push(text[i].slice(4));

          form.text = _text.join("\n");
          form.text = form.text.replace(/@s\((\d+)\)\{(.+)\}/g, size_replace);
          form.text = form.text.replace(
            /@c\((.+)\)\{(.+)\}/g,
            '<span style="color: $1;">$2</span>'
          );
          form.text = form.text.replace(/@b\{(.+)\}/g, "<b>$1</b>");

          data.push(form);
          id++;
        } else if (/^BGM: .*$/.test(el)) {
          let extract = el.match(/^BGM: (.*)$/);
          let form = {
            _id: id,
            type: "bgm",
            name: extract[1]
          };
          data.push(form);
          id++;
        } else if (/^SE: .*$/.test(el)) {
          let extract = el.match(/^SE: (.*)$/);
          let form = {
            _id: id,
            type: "se",
            name: extract[1]
          };
          data.push(form);
          id++;
        } else if (/^■■■.*■■■$/.test(el)) {
          let extract = el.match(/^■■■(.*)■■■$/);
          let form = {
            _id: id,
            type: "location",
            name: extract[1]
          };
          data.push(form);
          id++;
        } else continue;
      }

      return data;
    },
    async reset() {
      let requests = [
        this.get("/cookieartbot/yyyi/record", {
          params: {
            limit: this.limit,
            skip: (this.page - 1) * this.limit
          }
        }),
        this.get("/cookieartbot/yyyi/dicts")
      ];
      let resp = await Promise.all(requests);
      this.text_list = resp[0].data.data;
      this.data =
        this.text_select in this.text_list
          ? this.text_list[this.text_select]
          : { text: [] };
      this.text_count = resp[0].data.count;
      this.dicts = resp[1].data.data;
      this.loaded = true;
    },
    speaker_replace(speaker) {
      return this.all_entries[speaker] ? this.all_entries[speaker] : "";
    },
    speaker_replace_all() {
      for (let i in this.data.text) {
        if (this.data.text[i].roasted_speaker === "") {
          this.data.text[i].roasted_speaker = this.speaker_replace(
            this.data.text[i].speaker
          );
        }
      }
    },
    async update() {
      let res = await this.put(`/cookieartbot/yyyi/record/${this.data._id}`, {
        data: this.data
      });
      if (res.status == 200) {
        this.diff_num = 0;
        this.data.last_modified = res.data.last_modified;
      } else {
        this.$q.notify({
          message: `保存失败，请检查`,
          color: "negative",
          position: "top"
        });
      }
    },
    now_timestamp() {
      return Math.round(Date.now());
    },
    text_add_click() {
      this.$refs.file.click();
    },
    save_conf() {
      let export_data = [];
      for (let i of this.data.text) {
        if ("roasted_text" in i) {
          export_data.push({
            speaker: i.roasted_speaker,
            text: i.roasted_text
          });
        }
      }
      let blob = new Blob(
        [JSON.stringify({ type: "translating_helper", data: export_data })],
        {
          type: "application/json;charset=utf-8"
        }
      );
      saveAs(blob, `${this.data.title}.json`);
    },
    save_text() {
      let export_data = [];
      for (let i of this.data.text) {
        if (i.type === "text") {
          let text_line = [`${i.roasted_speaker}    <${i.speaker_skin}>`];
          for (let ii of i.roasted_text.split("\n")) {
            text_line.push(`    ${ii}`);
          }
          export_data.push(text_line.join("\n"));
        } else if (i.type === "location") {
          export_data.push(`■■■${i.name}■■■`);
        } else if (i.type === "bgm") {
          export_data.push(`BGM: ${i.name}`);
        } else if (i.type === "se") {
          export_data.push(`SE: ${i.name}`);
        }
      }
      let blob = new Blob([export_data.join("\n\n")], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, `${this.data.title.replace(/.txt/g, "")}_roasted.txt`);
    }
  },
  computed: {
    all_entries() {
      let dicts = {};
      for (let i of this.dicts) {
        dicts = { ...dicts, ...i.entries };
      }
      return dicts;
    }
  },
  async created() {
    await this.reset();
  }
};
</script>

<style lang="scss">
.bg_transition {
  transition: background 0.5s;
}

.menu_active {
  color: white;
  background: $pink-11;
}

.text {
  font-size: 1.1em;
}
</style>
