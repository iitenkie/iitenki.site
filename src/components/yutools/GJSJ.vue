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
            `${texts.text1}.jpg`
          )
        "
      ></canvas>
    </div>
    <div class="flex flex-center row">
      <div class="col-6 q-px-sm">
        <q-input
          outlined
          v-model="texts.text1"
          type="text"
          hint="文本1"
          color="pink"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GJSJ",
  name_zh: "赶紧睡觉",
  data() {
    return {
      img_path: require("../../assets/emotes/赶紧睡觉.jpg"),
      img: null,
      texts: {
        text1: "赶紧睡觉"
      }
    };
  },
  methods: {
    draw() {
      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.img, 0, 0);
      ctx.font = "128px FZTCGHJ";
      this.$util.text_align(ctx, "c", this.texts.text1, 480, 1030);
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
  font-family: FZTCGHJ;
  src: url(../../css/fonts/yutools/FZTCGHJ.woff2);
}

.canvas {
  max-width: 50%;
  max-height: 80vh;
}
</style>
