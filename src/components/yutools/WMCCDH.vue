<template>
  <div>
    <div class="flex flex-center q-mb-lg">
      <canvas
        ref="canvas"
        width="240"
        height="240"
        class="shadow-6 cursor-pointer canvas"
        @click="
          $util.save_canvas(
            $refs.canvas,
            `${texts.text1}${texts.text2}_${texts.text3}.jpg`
          )
        "
      ></canvas>
    </div>
    <div class="flex flex-center row q-mb-sm">
      <div class="col-6 q-px-sm">
        <q-input
          outlined
          v-model="texts.text1"
          type="text"
          hint="文本1"
          color="pink"
        />
      </div>
      <div class="col-6 q-px-sm">
        <q-input
          outlined
          v-model="texts.text2"
          type="text"
          hint="文本2"
          color="pink"
        />
      </div>
    </div>
    <div class="flex flex-center row">
      <div class="col-6 q-px-sm">
        <q-input
          outlined
          v-model="texts.text3"
          type="text"
          hint="文本3"
          color="pink"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WMCCDH",
  name_zh: "我没猜错的话",
  data() {
    return {
      img_path: require("../../assets/emotes/我没猜错的话.png"),
      img: null,
      texts: {
        text1: "我没猜错的话",
        text2: "〇〇是〇〇〇〇吧",
        text3: "〇〇"
      }
    };
  },
  methods: {
    draw() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.img, 0, 0);
      ctx.font = "bolder 22px SourceHanSans";
      this.$util.text_align(ctx, "c", this.texts.text1, 120, 38);
      this.$util.text_align(ctx, "c", this.texts.text2, 120, 67);
      this.$util.text_align(ctx, "c", this.texts.text3, 127, 214);
    },
    get_img(src) {
      return new Promise(resolve => {
        let img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.src = src;
      });
    }
  },
  async mounted() {
    this.img = await this.get_img(this.img_path);
    let canvas = this.$refs.canvas;
    let ctx = canvas.getContext("2d");
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    ctx.drawImage(this.img, 0, 0);
    this.draw();
  },
  watch: {
    texts: {
      deep: true,
      handler() {
        this.draw();
      }
    }
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: SourceHanSansSC;
  font-weight: bold;
  src: url(../../css/fonts/yutools/SourceHanSansSC-Bold.otf);
}

@font-face {
  font-family: SourceHanSansSC;
  font-weight: bolder;
  src: url(../../css/fonts/yutools/SourceHanSansSC-Heavy.otf);
}

.canvas {
  max-width: 50%;
  max-height: 80vh;
}
</style>
