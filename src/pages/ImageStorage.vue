<template>
  <q-page class="flex row items-start justify-center q-col-gutter-md q-pa-md">
    <div class="col-12 col-sm-6 col-md-5">
      <q-table
        grid
        :data="data"
        :selected.sync="selected"
        row-key="objid"
        selection="multiple"
      >
        <template v-slot:top>
          <div class="col-2 q-table__title">静画</div>
          <q-space />
          <q-input label="图片ID" dense class="q-ma-xs">
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
          <q-btn unelevated round class="q-ma-xs" color="positive" icon="add" />
          <q-btn unelevated round class="q-ma-xs" color="primary" icon="send">
            <q-menu>
              <div class="q-pa-md q-gutter-y-sm">
                <div>
                  <q-checkbox label="定时投递" />
                </div>
                <div>
                  <q-checkbox label="强制审核" />
                </div>
                <div>
                  <q-checkbox label="自动重发" />
                </div>
                <div>
                  <q-btn
                    label="投递"
                    push
                    color="white"
                    text-color="primary"
                    style="width: 100%;"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
          <q-btn unelevated round class="q-ma-xs" color="red" icon="delete" />
        </template>
        <template v-slot:item="props">
          <div class="col-xs-6 col-sm-6 col-md-4 q-pa-sm">
            <q-card>
              <div class="row">
                <q-checkbox v-model="props.selected" class="col" />
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
      </q-table>
    </div>
    <div class="col-12 col-sm-6 col-md-5">
      <q-card class="q-pa-md">placeholder</q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "GetThumbnail",
  data() {
    return {
      columns: [{ name: "id", label: "图片ID", field: "id" }],
      data: [],
      selected: [],
      loading: false,
      changeSite: 0
    };
  },
  methods: {
    async reset() {
      this.data = [];
      this.selected = [];
      let seigas = new this.$AV.Query("seigaList");
      let tweets = new this.$AV.Query("tweetList");
      let illusts = new this.$AV.Query("pixivList");
      let pics = Array.prototype.concat(
        await seigas.find(),
        await tweets.find(),
        await illusts.find()
      );
      console.log(pics);
      if (pics.length != 0) {
        for (let child in pics) {
          this.data.push(pics[child].attributes);
          this.data[child].objid = pics[child].id;
        }
      }
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
    itemAppend() {
      this.loading = true;
    },
    change_site() {
      this.changeSite++;
      if (this.changeSite > 2) this.changeSite = 0;
    }
  },
  created() {
    this.reset();
  }
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
