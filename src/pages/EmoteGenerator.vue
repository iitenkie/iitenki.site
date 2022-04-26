<template>
  <q-page class="flex flex-center row">
    <div class="col-lg-6 col-md-8 col-sm-10 col-xs-11">
      <transition name="slide">
        <div>
          <div class="flex flex-center q-mb-lg">
            <canvas
              ref="canvas"
              width="240"
              height="240"
              class="shadow-6"
            ></canvas>
          </div>
          <div class="flex flex-center row q-mb-sm">
            <div class="col-6 q-px-sm">
              <q-input outlined v-model="text1" type="text" hint="文本1" />
            </div>
            <div class="col-6 q-px-sm">
              <q-input outlined v-model="text2" type="text" hint="文本2" />
            </div>
          </div>
          <div class="flex flex-center row">
            <div class="col-6 q-px-sm">
              <q-input outlined v-model="text3" type="text" hint="文本3" />
            </div>
          </div>
        </div>
      </transition>
      <transition name="slide">
        <div
          v-if="state == 1"
          @click="imgdownload(text1)"
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
export default {
  name: "GetThumbnail",
  data() {
    return {
      state: 0,
      text1: "我没猜错的话",
      text2: "〇〇是〇〇〇〇吧",
      text3: "〇〇",
      image: "",
      loading: false,
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    draw() {
      let img = new Image();
      img.onload = () => {
        let ctx = this.$refs.canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.font = "bold 22px SourceHanSans";
        ctx.fillText(this.text1, this.center_text(ctx, this.text1, 120), 38);
        ctx.fillText(this.text2, this.center_text(ctx, this.text2, 120), 67);
        ctx.fillText(this.text3, this.center_text(ctx, this.text3, 127), 214);
      };
      img.src = require("../assets/我没猜错的话.png");
    },
    center_text(ctx, text, x) {
      let measure = ctx.measureText(text);
      return x - measure.width / 2;
    },
    imgdownload(smid) {
      let link = document.createElement("a");
      link.href = this.image;
      link.download = `${smid}.jpg`;
      link.click();
    }
  },
  mounted() {
    this.draw();
  },
  computed: {
    combined() {
      return this.text1 + this.text2 + this.text3;
    }
  },
  watch: {
    combined() {
      this.draw();
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

.canvas {
  width: 240;
  height: 240;
}
</style>
