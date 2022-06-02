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
            v-if="!multiple_selecting"
            padding="none"
            color="pink-11"
            icon="add"
            @click="text_add_click()"
            class="q-mx-sm"
            flat
          />
          <q-btn
            v-if="!multiple_selecting || text_selected.length !== 0"
            padding="none"
            color="pink-11"
            icon="ios_share"
            class="q-mx-sm"
            flat
          >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  clickable
                  @click="save_conf()"
                  :disable="multiple_selecting"
                  v-close-popup
                >
                  <q-item-section>脚本用</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="save_serv_conf()"
                  :disable="multiple_selecting"
                  v-close-popup
                >
                  <q-item-section>私服用</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="save_text()"
                  :disable="multiple_selecting && text_selected.length === 0"
                  v-close-popup
                >
                  <q-item-section>可读格式</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-checkbox
            v-model="multiple_selecting"
            size="sm"
            color="pink-11"
            class="q-mx-sm"
            dense
          />
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
          :clickable="!multiple_selecting"
          :v-ripple="!multiple_selecting"
          :active="multiple_selecting ? false : text_select === item._id"
          @click="text_select = item._id"
          active-class="menu_active"
          class="q-ma-xs rounded-borders"
        >
          <q-item-section v-if="multiple_selecting" side>
            <q-checkbox
              v-model="text_selected"
              :val="item._id"
              color="pink-11"
              dense
            />
          </q-item-section>
          <q-item-section>
            <div v-text="item.title"></div>
            <div
              v-if="item.comment"
              v-text="item.comment"
              style="font-size: 0.9em;"
              class="text-italic"
            ></div>
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

        <q-inner-loading :showing="text_list_loading">
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
          <q-inner-loading :showing="dict_loading">
            <q-spinner-bars size="50px" color="pink" />
          </q-inner-loading>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="flex flex-center row" padding>
        <div class="col-xs-12 col-sm-8 col-md-6 col-xl-4" ref="capture">
          <div v-for="(item, i) in data.text" :key="i" class="q-pb-sm">
            <q-card v-if="item.type == 'text'" flat bordered>
              <div :class="'row q-px-md q-py-xs ' + chara_color(item.speaker)">
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
              flat
              bordered
              dense
              class="bg-pink-1 text-h5 speaker-font cursor-pointer q-pa-sm"
              style="text-align: center;"
            >
              <div>
                {{ item.name }}
                <q-popup-edit v-model="item.name" auto-save>
                  <q-input
                    v-model="item.name"
                    debounce="1000"
                    dense
                    autofocus
                  />
                </q-popup-edit>
              </div>
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

        <q-inner-loading :showing="text_loading" style="position: fixed;">
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
      update_timeout_id: undefined,
      text_list: [],
      text_select: "",
      text_selected: [],
      text_count: 0,
      dicts: [],
      data: { text: [] },
      diff_num: 0,
      update_flag: false,
      right: false,
      text_loading: false,
      text_list_loading: false,
      dict_loading: false,
      multiple_selecting: false,
      limit: 20,
      page: 1
    };
  },
  watch: {
    async page() {
      this.text_list_loading = true;
      let resp = await this.get("/cookieartbot/yyyi/record", {
        params: {
          limit: this.limit,
          skip: (this.page - 1) * this.limit,
          projection: JSON.stringify({ text: 0 })
        }
      });
      this.text_list = resp.data.data;
      this.text_list_loading = false;
    },
    async text_select(val, old_val) {
      this.text_loading = true;
      if (this.update_timeout_id !== undefined) {
        clearTimeout(this.update_timeout_id);
        this.update_timeout_id = undefined;
        this.update_flag = false;
      }
      try {
        let resp;
        if (old_val !== "") {
          const requests = [
            this.get(`/cookieartbot/yyyi/record/${val}`),
            this.get(`/cookieartbot/yyyi/record/${old_val}`)
          ];
          resp = await Promise.all(requests);
          if (this.data_compare(resp[1].data.data, this.data) > 0) {
            await this.update();
          }
          this.data = resp[0].data.data;
        } else {
          resp = await this.get(`/cookieartbot/yyyi/record/${val}`);
          this.data = resp.data.data;
        }
        window.scrollTo(0, 0);
      } catch (err) {
        this.$q.notify({
          message: `加载失败！${err.message}`,
          color: "negative",
          position: "top"
        });
      } finally {
        this.text_loading = false;
      }
    },
    data: {
      deep: true,
      handler(val, old_val) {
        if (val._id == old_val._id) {
          if (!this.update_flag && old_val.text.length != 0) {
            this.update_flag = true;
            this.update_timeout_id = setTimeout(async () => {
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
                this.diff_num = this.data_compare(this.data, data_old);
              }

              this.update_flag = false;
              this.update_timeout_id = undefined;
            }, 2500);
          }
        }
      }
    },
    diff_num(val) {
      if (val > 0) this.update();
    },
    multiple_selecting(val) {
      if (!val) this.text_selected = [];
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
    yuyuyui_script_serialize_old(text) {
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
          const extract = el.match(/^(.*)    <(.*)>$/);

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
          const extract = el.match(/^BGM: (.*)$/);
          let form = {
            _id: id,
            type: "bgm",
            name: extract[1]
          };
          data.push(form);
          id++;
        } else if (/^SE: .*$/.test(el)) {
          const extract = el.match(/^SE: (.*)$/);
          let form = {
            _id: id,
            type: "se",
            name: extract[1]
          };
          data.push(form);
          id++;
        } else if (/^■■■.*■■■$/.test(el)) {
          const extract = el.match(/^■■■(.*)■■■$/);
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
    yuyuyui_script_serialize(text) {
      function size_replace(a, p1, p2, b, c) {
        return `<span style="font-size: ${Math.round((p1 / 48) * 100) /
          100}em;">${p2}</span>`;
      }

      text = text.split("\n");
      let data = [];
      for (let i in text) {
        let el = text[i];

        if (/^mes	(.+):(.+)	(.+)	(.+)$/.test(el)) {
          const extract = el.match(/^mes	(.+):(.+)	(.+)	(.+)$/);

          let form = {
            type: "text",
            speaker: extract[2],
            speaker_skin: extract[1],
            roasted_speaker: "",
            voice: extract[3],
            text: extract[4].replace("\\n", "\n"),
            roasted_text: ""
          };

          form.text = form.text.replace(/@s\((\d+)\)\{(.+)\}/g, size_replace);
          form.text = form.text.replace(
            /@c\((.+)\)\{(.+)\}/g,
            '<span style="color: $1;">$2</span>'
          );
          form.text = form.text.replace(/@b\{(.+)\}/g, "<b>$1</b>");

          data.push(form);
        } else if (/^bgm	(.+)	.*$/.test(el)) {
          const extract = el.match(/^bgm	(.+)	.*$/);
          let form = {
            type: "bgm",
            name: extract[1]
          };
          data.push(form);
        } else if (/^se	(.+)	.*$/.test(el)) {
          const extract = el.match(/^se	(.+)	.*$/);
          let form = {
            type: "se",
            name: extract[1]
          };
          data.push(form);
        } else if (/^caption	.+:(.+)	.*	.*	.*	.*	.*$/.test(el)) {
          const extract = el.match(/^caption	.+:(.+)	.*	.*	.*	.*	.*$/);
          let form = {
            type: "location",
            name: extract[1]
          };
          data.push(form);
        } else continue;
      }

      return data;
    },
    async reset() {
      this.dict_loading = true;
      const requests = [
        this.get("/cookieartbot/yyyi/record", {
          params: {
            limit: this.limit,
            skip: (this.page - 1) * this.limit,
            projection: JSON.stringify({ text: 0 })
          }
        }),
        this.get("/cookieartbot/yyyi/dicts")
      ];
      let resp = await Promise.all(requests);
      this.text_list = resp[0].data.data;
      this.text_select = resp[0].data.data[0]._id;
      this.text_count = resp[0].data.count;
      this.dicts = resp[1].data.data;
      this.dict_loading = false;
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
    save_serv_conf() {
      let export_data = [];
      for (let i of this.data.text) {
        if (i.type === "location") {
          export_data.push({
            type: "caption",
            text: [i.name]
          });
        } else if (i.type === "text") {
          export_data.push({
            type: "message",
            voice: i.voice,
            text: [i.roasted_speaker, i.roasted_text]
          });
        }
      }
      let numcaption = 0;
      let nummessage = 0;
      for (let i in export_data) {
        if (export_data[i].type === "caption") {
          export_data[i].id = `${this.data.title}_c_${String(
            numcaption
          ).padStart(2, "0")}`;
          numcaption++;
        } else if (export_data[i].type === "message") {
          export_data[i].id = `${this.data.title}_m_${
            export_data[i].voice
          }_${String(nummessage).padStart(3, "0")}`;
          delete export_data[i].voice;
          nummessage++;
        }
      }
      let blob = new Blob(
        [
          JSON.stringify({
            name: this.data.title,
            language: "zh",
            lines: export_data
          })
        ],
        {
          type: "application/json;charset=utf-8"
        }
      );
      saveAs(blob, `${this.data.title}.json`);
    },
    data2text(data) {
      let export_data = [];
      for (let i of data.text) {
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

      return export_data;
    },
    async save_text() {
      let export_data;
      if (!this.multiple_selecting) {
        export_data = this.data2text(this.data);
      } else {
        export_data = [];
        let requests = [];
        for (let i of this.text_selected) {
          requests.push(this.get(`/cookieartbot/yyyi/record/${i}`));
        }
        let resp = await Promise.all(requests);
        for (let i of resp) {
          export_data = [...export_data, ...this.data2text(i.data.data)];
        }
      }
      let blob = new Blob([export_data.join("\n\n")], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, `${this.data.title.replace(/.txt/g, "")}_roasted.txt`);
    },
    data_compare(new_data, old_data) {
      let diff_num = 0;
      for (const i in new_data) {
        if (i == "last_modified") continue;
        if (i != "text") {
          if (new_data[i] != old_data[i]) {
            diff_num++;
          }
        } else {
          for (const ii in new_data[i]) {
            for (const iii in new_data[i][ii]) {
              if (new_data[i][ii][iii] != old_data[i][ii][iii]) {
                diff_num++;
                break;
              }
            }
          }
        }
      }
      return diff_num;
    },
    chara_color(name) {
      const chara_aliases = {
        "結城 友奈": "yuuki_yuuna",
        "東郷 美森": "tougou_mimori",
        "犬吠埼 風": "inubouzaki_fuu",
        "犬吠埼 樹": "inubouzaki_itsuki",
        "三好 夏凜": "miyoshi_karin",
        "鷲尾 須美": "washio_sumi",
        "三ノ輪 銀": "minowa_gin",
        "乃木 園子": "nogi_sonoko",
        "乃木 若葉": "nogi_wakaba",
        "土居 球子": "doi_tamako",
        "伊予島 杏": "iyojima_anzu",
        "郡 千景": "koori_chikage",
        "高嶋 友奈": "takashima_yuuna",
        "白鳥 歌野": "shiratori_utano",
        "秋原 雪花": "akihara_sekka",
        "古波蔵 棗": "kohagura_natsume",
        "上里 ひなた": "uesato_hinata",
        "藤森 水都": "fujimori_mito",
        "楠 芽吹": "kusunoki_mebuki",
        "国土 亜耶": "kokudo_aya",
        "加賀城 雀": "kagajyou_suzume",
        "弥勒 夕海子": "miroku_yumiko",
        "山伏 しずく": "yamabushi_shizuku",
        "山伏 シズク": "yamabushi_shizuku",
        "赤嶺 友奈": "akamine_yuuna",
        "弥勒 蓮華": "miroku_renge",
        "桐生 静": "kiryuu_shizuka",
        "安芸 真鈴": "aki_masuzu",
        "花本 美佳": "hanamoto_yoshika",
        "芙蓉 友奈": "fuyou_yuuna",
        "柚木 友奈": "yuzuki_yuuna"
      };

      if (chara_aliases[name] !== undefined) {
        return chara_aliases[name];
      } else return "default_chara";
    },
    async save_capture() {
      const el = this.$refs.capture;
      let output = await this.$html2canvas(el, {});
      this.$util.save_canvas(output, "test.jpg");
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

<style lang="stylus">
@import "../css/yuyuyui_chara_color.styl";

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
