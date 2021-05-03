<template>
  <q-page class="flex flex-center row">
    <div class="col-lg-6 col-md-8 col-sm-10 col-xs-11">
      <transition name="slide">
        <q-form>
          <q-input
            class="q-mb-xs"
            outlined
            v-model.trim="smid"
            label="获取N站视频高清封面"
            placeholder="视频ID"
            :loading="loading"
            :readonly="loading"
            :error="error"
            :error-message="errorMessage"
          >
            <template v-slot:append>
              <q-btn
                v-if="!loading"
                round
                flat
                @click="run"
                color="primary"
                icon="arrow_forward"
              />
            </template>
          </q-input>
        </q-form>
      </transition>
      <transition name="slide">
        <div
          v-if="state == 1"
          @click="imgdownload(smid)"
          class="text-center text-primary cursor-pointer"
        >
          <img
            v-if="state == 1"
            key="image"
            class="q-mb-sm thumbnail shadow-6"
            :src="image"
          />
          <q-icon name="arrow_upward" style="font-size: 1.75em" />
          <br />
          <span class="text-subtitle1">点击保存</span>
        </div>
      </transition>
    </div>
  </q-page>
</template>

<script>
import Jimp from "jimp";

export default {
  name: "GetThumbnail",
  data() {
    return {
      state: 0,
      smid: "",
      image: "",
      loading: false,
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    run() {
      if (this.valid(this.smid)) {
        this.error = true;
      } else {
        this.loading = true;
        this.error = false;
        Jimp.read(
          "https://iitenki.site/ajax/getNicoThumbnailForward?smid=" + this.smid
        )
          .then(result => {
            result.getBase64(Jimp.MIME_JPEG, (err, src) => {
              this.state = 1;
              this.image = src;
              this.loading = false;
            });
          })
          .catch(err => {
            this.loading = false;
            this.error = true;
            console.log(err);
            const str = err.message;
            const status = Number(
              str.substring(str.lastIndexOf("s ") + 2, str.lastIndexOf(" for"))
            );
            if (status === 584) {
              this.errorMessage = "该sm号不存在";
            } else if (status === 408 || status === 504) {
              this.errorMessage = "连接超时，请稍后再试";
            }
          });
      }
    },
    valid(str) {
      if (str.length === 0) {
        this.errorMessage = "未输入sm号";
        return true;
      } else if (!/^sm[0-9]+$/.test(str)) {
        this.errorMessage = "sm号有误";
        return true;
      } else return false;
    },
    imgdownload(smid) {
      let link = document.createElement("a");
      link.href = this.image;
      link.download = `${smid}.jpg`;
      link.click();
    }
  },
  watch: {
    smid() {
      this.error = false;
    }
  }
};
</script>

<style lang="scss">
.thumbnail {
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-enter,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
