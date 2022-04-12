<template>
  <div>
      <canvas ref="canvas" width="1000" height="1000" style="border:1px solid #d3d3d3;"></canvas>
  </div>
</template>

<script>
export default {
  name: "YushadearuLogoGenerator",
  data() {
    return {
    };
  },
  watch: {
  },
  methods: {
    roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === 'undefined') {
          stroke = true;
      }
      if (typeof radius === 'undefined') {
          radius = 5;
      }
      if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
      } else {
          var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
          for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
          }
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
      if (fill) {
          ctx.fill();
      }
      if (stroke) {
          ctx.stroke();
      }
    },
    yushadearu_logo_text(ctx, text, x, y, size, spacing, rect_spacing, color_primary, color_secondary) {
      x = x + rect_spacing / 2
      ctx.font = "75px Arial";
      let met = ctx.measureText(text[0]);

      for (let i in text) {
        if (i % 2 == 0) ctx.font = "75px Arial";
        else ctx.font = "65px Arial";
        let met2 = ctx.measureText(text[i]);
        ctx.fillStyle = color_secondary;
        this.roundRect(ctx, x + i * met.width + i * spacing + i * rect_spacing / 2 - rect_spacing / 1.4, y - met.fontBoundingBoxAscent, met2.width + rect_spacing + rect_spacing / 1.75, met2.fontBoundingBoxAscent + met2.fontBoundingBoxDescent + rect_spacing, 10, true, false);
        ctx.fillStyle = color_primary;
        ctx.fillText(text[i], x + i * met.width + i * spacing + i * rect_spacing / 2, y + rect_spacing / 2);
      }
    }
  },
  mounted () {
    let c = this.$refs.canvas;
    let ctx = c.getContext("2d");
    let text = "結城友奈は結結である";
    let spacing = 15;
    let rect_spacing = 7.5;
    ctx.fillStyle = "#763329";

    this.yushadearu_logo_text(ctx, text, 10, 100, null, spacing, rect_spacing, "#763329", "#fad1d3")
  }
};
</script>
