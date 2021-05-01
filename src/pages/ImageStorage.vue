<template>
  <q-page class="flex row items-start justify-center q-col-gutter-md q-pa-md">
    <div class="col-12 col-sm-6 col-md-5">
      <q-table
        grid
        :data="data"
        :selected.sync="selected"
        row-key="objid"
        selection="multiple"
        :pagination="{ rowsPerPage: 12 }"
        :loading="loading"
      >
        <template v-slot:top>
          <q-checkbox
            :value="
              selected.length == 0
                ? false
                : selected.length < data.length
                ? null
                : true
            "
            @input="selectAll()"
            class="col-auto"
          />
          <div class="col-2 q-table__title">存储</div>
          <q-space />
          <q-input v-model="imgAdd_input" label="图片ID" dense class="q-ma-xs">
            <template v-slot:append>
              <q-btn
                @click="change_site()"
                :style="
                  changeSite == 0
                    ? 'color: #575757'
                    : changeSite == 1
                    ? 'color: #1da1f2'
                    : 'color: #0096fa'
                "
                unelevated
                flat
                round
                dark
                size="sm"
                >{{
                  changeSite == 0 ? "N" : changeSite == 1 ? "T" : "P"
                }}</q-btn
              >
            </template>
          </q-input>
          <q-btn
            @click="itemAppend()"
            :disabled="!imgAdd_inputIsVaild"
            unelevated
            round
            class="q-ma-xs"
            color="positive"
            icon="add"
          ></q-btn>
          <q-btn unelevated round class="q-ma-xs" color="primary" icon="send">
            <q-menu>
              <div class="q-pa-md q-gutter-y-sm">
                <div>
                  <q-checkbox v-model="timing" label="定时投递" />
                </div>
                <div v-if="timing">
                  <q-btn
                    @click="
                      datetime_next = false;
                      datetime_dialog = true;
                    "
                    :label="datetime == null ? '设定时间' : datetime"
                    color="primary"
                  >
                    <q-dialog
                      v-model="datetime_dialog"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-if="!datetime_next"
                        v-model="datetime"
                        mask="YYYY-MM-DD HH:mm:00"
                        :locale="zh_cn"
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            @click="datetime_next = true"
                            label="NEXT"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                      <q-time
                        v-else
                        v-model="datetime"
                        mask="YYYY-MM-DD HH:mm:00"
                        format24h
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            @click="datetime_dialog = !datetime_dialog"
                            label="OK"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-dialog>
                  </q-btn>
                </div>
                <div>
                  <q-checkbox v-model="forceReview" label="强制审核" />
                </div>
                <div>
                  <q-checkbox v-model="reSend" label="被删自动重发" />
                </div>
                <div>
                  <q-btn
                    @click="sendDynamic(selected)"
                    :disabled="!isSendable"
                    v-close-popup
                    label="投递"
                    push
                    color="white"
                    text-color="primary"
                    style="width: 100%;"
                  ></q-btn>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            @click="deleteItem(selected)"
            :disabled="!isSendable"
            unelevated
            round
            class="q-ma-xs"
            color="red"
            icon="delete"
          ></q-btn>
        </template>
        <template v-slot:item="props">
          <div class="col-xs-6 col-sm-6 col-md-4 q-pa-sm">
            <q-card flat bordered>
              <div class="row">
                <q-checkbox v-model="props.selected" class="col" />
                <q-btn flat round icon="menu">
                  <q-menu>
                    <q-list>
                      <q-item
                        @click="sendDynamic(props.row)"
                        clickable
                        v-close-popup
                      >
                        <q-item-section>投递</q-item-section>
                      </q-item>
                      <q-item
                        @click="deleteItem(props.row)"
                        clickable
                        v-close-popup
                      >
                        <q-item-section>删除</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        @click="
                          props.row.site == 'seiga'
                            ? copyToClipboard(`im${props.row.id}`)
                            : copyToClipboard(props.row.id)
                        "
                        clickable
                        v-close-popup
                      >
                        <q-item-section>复制ID</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <q-separator />
              <a
                :href="
                  props.row.site == 'seiga'
                    ? `https://seiga.nicovideo.jp/seiga/im${props.row.id}`
                    : props.row.site == 'twitter'
                    ? `https://twitter.com/${props.row.userScreenName}/status/${props.row.id}`
                    : props.row.site == 'pixiv'
                    ? `https://www.pixiv.net/artworks/${props.row.id}`
                    : ''
                "
                target="_blank"
              >
                <q-img
                  :src="
                    props.row.site == 'seiga'
                      ? `https://lohas.nicoseiga.jp/thumb/${props.row.id}i`
                      : props.row.site == 'twitter'
                      ? props.row.media[0].media_url
                      : props.row.site == 'pixiv'
                      ? `https://pixiv.cat/${props.row.id}.jpg`
                      : ''
                  "
                  class="img"
                  ratio="1"
                >
                  <div
                    class="absolute-bottom text-center img-caption"
                    style="padding: 0;"
                  >
                    {{ props.row.site }}
                    <br />
                    {{ props.row.id }}
                  </div>
                </q-img>
              </a>
            </q-card>
          </div>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-spinner-facebook size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>
    </div>
    <div class="col-12 col-sm-6 col-md-5">
      <q-table
        grid
        :data="dynamics_data"
        :selected.sync="selected_dynamic"
        :row-key="row => row.desc.dynamic_id"
        selection="multiple"
        :pagination="{ rowsPerPage: 12 }"
        :loading="loading_dynamic"
      >
        <template v-slot:top>
          <div class="col-2 q-table__title">动态</div>
          <q-space />
          <q-btn
            @click="dynamicReset()"
            unelevated
            round
            class="q-ma-xs"
            color="grey"
            icon="refresh"
          ></q-btn>
          <q-btn
            @click="deleteDynamic(selected_dynamic)"
            unelevated
            round
            class="q-ma-xs"
            color="red"
            icon="delete"
          ></q-btn>
        </template>
        <template v-slot:item="props">
          <div class="col-xs-6 col-sm-6 col-md-4 q-pa-sm">
            <q-card
              :style="
                isReviewing(props.row.extend_json) != false
                  ? 'background-color: #fff1d3;'
                  : 'background-color: white;'
              "
              flat
              bordered
            >
              <div class="row">
                <q-checkbox v-model="props.selected" class="col" />
                <q-btn flat round icon="menu">
                  <q-menu>
                    <q-list>
                      <q-item
                        @click="deleteDynamic(props.row)"
                        class="text-red"
                        clickable
                        v-close-popup
                      >
                        <q-item-section>删除</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <q-separator />
              <a
                :href="`https://h.bilibili.com/${props.row.desc.rid}`"
                target="_blank"
              >
                <q-img
                  :src="
                    props.row.card.item.pictures[0].img_src.replace(
                      /https:\/\/i0.hdslb.com/g,
                      '/bilialbum'
                    ) + '@240w_240h_1e_1c.webp'
                  "
                  ratio="1"
                >
                  <div
                    class="absolute-bottom text-center"
                    style="padding: 6px;"
                  >
                    <span>
                      <q-icon class="q-mr-xs" name="reply" size="xs" />{{
                        props.row.desc.repost
                      }}
                    </span>
                    <span class="q-mx-xs">
                      <q-icon class="q-mr-xs" name="comment" size="xs" />{{
                        props.row.desc.comment
                      }}
                    </span>
                    <span>
                      <q-icon class="q-mr-xs" name="thumb_up" size="xs" />{{
                        props.row.desc.like
                      }}
                    </span>
                  </div>
                </q-img>
              </a>
            </q-card>
          </div>
        </template>
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-spinner-facebook size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "GetThumbnail",
  data() {
    return {
      data: [],
      dynamics_data: [],
      selected: [],
      selected_dynamic: [],
      loading: false,
      loading_dynamic: false,
      changeSite: 0,
      imgAdd_input: "",
      timing: false,
      forceReview: false,
      reSend: false,
      datetime: null,
      datetime_dialog: false,
      datetime_next: false,
      zh_cn: {
        days: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        daysShort: "日_一_二_三_四_五_六".split("_"),
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
          "_"
        ),
        monthsShort: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
          "_"
        )
      }
    };
  },
  methods: {
    async reset() {
      this.data = [];
      this.selected = [];
      this.loading = true;
      let seigas = new this.$AV.Query("seigaList");
      let tweets = new this.$AV.Query("tweetList");
      let illusts = new this.$AV.Query("pixivList");
      let pics = Array.prototype.concat(
        await seigas.find(),
        await tweets.find(),
        await illusts.find()
      );
      if (pics.length != 0) {
        for (let child in pics) {
          this.data.push(pics[child].attributes);
          this.data[child].objid = pics[child].id;
        }
      }
      this.loading = false;
    },
    dbAppend(data) {
      if (data.site == "seiga") {
        let sList = this.$AV.Object.extend("seigaList");
        let sl = new sList();
        let acl = new this.$AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);
        sl.setACL(acl);
        sl.set("created", data.created);
        sl.set("description", data.desc);
        sl.set("id", data.id);
        sl.set("img_url", data.img_url);
        sl.set("poster", data.poster);
        sl.set("tags", data.tags);
        sl.set("title", data.title);
        sl.set("uid", Number(data.uid));
        sl.set("tags_locked", data.tags_locked);
        sl.save();
      } else if (data.site == "twitter") {
        let sList = this.$AV.Object.extend("tweetList");
        let sl = new sList();
        let acl = new this.$AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);
        sl.setACL(acl);
        sl.set("id", data.id);
        sl.set("text", data.text);
        sl.set("userName", data.userName);
        sl.set("userScreenName", data.userScreenName);
        sl.set("userId", data.userId);
        sl.set("media", data.media);
        if (typeof data.created_at == "object") {
          sl.set("created_at", data.created_at);
        } else {
          sl.set("created_at", new Date(data.created_at));
        }
        sl.save();
      } else if (data.site == "pixiv") {
        let sList = this.$AV.Object.extend("pixivList");
        let sl = new sList();
        let acl = new this.$AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setPublicWriteAccess(true);
        sl.setACL(acl);
        sl.set("id", String(data.id));
        sl.set("title", data.title);
        let tags = [];
        for (i in data.tags) {
          tags.push(data.tags[i].name);
        }
        sl.set("tags", tags);
        sl.set("poster", data.user.name);
        sl.set("uid", String(data.user.id));
        sl.set("description", data.caption);
        let urls = [];
        if (data.meta_pages.length === 0) {
          urls = [
            {
              image_urls: { original: data.meta_single_page.original_image_url }
            }
          ];
        } else {
          urls = data.meta_pages;
        }
        urls = JSON.parse(
          JSON.stringify(urls).replace(/i.pximg.net/g, "i.pixiv.cat")
        );
        sl.set("img_urls", urls);
        sl.set("created", new Date(data.create_date));
        sl.set("type", data.type);
        sl.save();
      }
    },
    async itemAppend() {
      this.loading = true;
      if (this.changeSite == 0) {
        if (this.imgAdd_input.indexOf("im") != -1) {
          this.imgAdd_input = this.imgAdd_input.replace(/^im/g, "");
        }
        let ret;
        try {
          ret = await this.$util.post("/ajax/getSeigaData", this.imgAdd_input);
          ret.data.site = "seiga";
          try {
            this.dbAppend(ret.data);
            setTimeout(this.reset, 1250);
          } catch (err) {
            this.$q.notify({
              message: `发生错误！\n${err}`,
              color: "negative",
              multiLine: true,
              position: 'top'
            });
            this.loading = false;
          }
        } catch (err) {
          this.$q.notify({
            message: `发生错误！\n${err}`,
            color: "negative",
            multiLine: true,
            position: 'top'
          });
          this.loading = false;
        }
      } else if (this.changeSite == 1) {
        let ret;
        try {
          ret = await this.$util.post("/ajax/getTweetData", this.imgAdd_input);
          ret.data.data.site = "twitter";
          try {
            this.dbAppend(ret.data.data);
            setTimeout(this.reset, 1250);
          } catch (err) {
            this.$q.notify({
              message: `发生错误！\n${err}`,
              color: "negative",
              multiLine: true,
              position: 'top'
            });
            this.loading = false;
          }
        } catch (err) {
          this.$q.notify({
            message: `发生错误！\n${err}`,
            color: "negative",
            multiLine: true,
            position: 'top'
          });
          this.loading = false;
        }
      } else if (this.changeSite == 1) {
        let ret;
        try {
          ret = await this.$util.post("/ajax/getIllustData", this.imgAdd_input);
          ret.data.site = "pixiv";
          try {
            this.dbAppend(ret.data);
            setTimeout(this.reset, 1250);
          } catch (err) {
            this.$q.notify({
              message: `发生错误！\n${err}`,
              color: "negative",
              multiLine: true,
              position: 'top'
            });
            this.loading = false;
          }
        } catch (err) {
          this.$q.notify({
            message: `发生错误！\n${err}`,
            color: "negative",
            multiLine: true,
            position: 'top'
          });
          this.loading = false;
        }
      }
    },
    deleteItem(items = []) {
      this.loading = true;
      if (!Array.isArray(items)) {
        items = [items];
      }
      for (let i of items) {
        let item;
        if (i.site == "seiga") {
          item = this.$AV.Object.createWithoutData("seigaList", i.objid);
        } else if (i.site == "twitter") {
          item = this.$AV.Object.createWithoutData("tweetList", i.objid);
        } else if (i.site == "pixiv") {
          item = this.$AV.Object.createWithoutData("pixivList", i.objid);
        }
        item.destroy();
      }
      setTimeout(this.reset, 1250);
    },
    change_site() {
      this.changeSite++;
      if (this.changeSite > 2) this.changeSite = 0;
    },
    selectAll() {
      if (this.selected.length < this.data.length) {
        this.selected = this.data;
      } else this.selected = [];
    },
    async sendDynamic(items) {
      this.loading = true;
      if (!Array.isArray(items)) {
        items = [items];
      }
      let send = {
        data: [],
        data_twi: [],
        data_pixiv: []
      };
      for (let i of items) {
        if (i.site == "seiga") send.data.push(i);
        else if (i.site == "twitter") send.data_twi.push(i);
        else if (i.site == "pixiv") send.data_pixiv.push(i);
      }
      if (this.timing == true) {
        send.timing = true;
        send.date = this.datetime;
      } else {
        send.timing = false;
        send.date = null;
      }
      send.shz = this.forceReview;
      send.resend = this.reSend;
      let ret = await this.$util.post("/cookieartbot/api/dynamic/upload", send);
      for (let i of items) {
        let item;
        if (i.site == "seiga") {
          item = this.$AV.Object.createWithoutData("seigaList", i.objid);
        } else if (i.site == "twitter") {
          item = this.$AV.Object.createWithoutData("tweetList", i.objid);
        } else if (i.site == "pixiv") {
          item = this.$AV.Object.createWithoutData("pixivList", i.objid);
        }
        item.destroy();
      }
      this.$q.notify({
        message: `投递成功`,
        color: "positive",
        position: 'top'
      });
      setTimeout(this.reset, 1250);
    },
    async copyToClipboard(text, is_webimage = false) {
      if (!is_webimage) {
        await navigator.clipboard.writeText(text);
      }
    },
    async dynamicReset() {
      this.loading_dynamic = true;
      let ret = await this.$util.get("/cookieartbot/api/getDynamic");
      this.dynamics_data = ret.data;
      this.selected_dynamic = [];
      this.loading_dynamic = false;
    },
    async deleteDynamic(items) {
      this.loading_dynamic = true;
      let deletes = [];
      if (!Array.isArray(items)) {
        items = [items];
      }
      for (let i of items) {
        deletes.push(
          this.$util.get(
            "/cookieartbot/api/removeDynamic",
            {
              iddym: i.desc.dynamic_id_str
            },
            "delete"
          )
        );
      }
      this.$axios
        .all(deletes)
        .then(ret => {
          this.dynamicReset();
          this.loading_dynamic = false;
        })
        .catch(err => {
          this.$q.notify({
            message: `发生错误！\n${err}`,
            color: "negative",
            multiLine: true,
            position: 'top'
          });
          this.dynamicReset();
          this.loading_dynamic = false;
        });
    },
    isReviewing(extend) {
      if ("dispute" in extend) {
        return extend.dispute.content;
      } else return false;
    }
  },
  created() {
    this.reset();
    this.dynamicReset();
  },
  mounted() {},
  computed: {
    imgAdd_inputIsVaild() {
      return this.imgAdd_input.length != 0;
    },
    isSendable() {
      return this.selected.length != 0;
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.img-caption {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(22px);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.img:hover .img-caption {
  transform: translateY(0px);
}
</style>
