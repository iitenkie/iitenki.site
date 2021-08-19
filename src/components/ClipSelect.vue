<template>
  <q-dialog ref="dialog" no-backdrop-dismiss @hide="onDialogHide">
    <q-card
      class="q-dialog-plugin column"
      style="max-width: 100%; width: 1000px; max-height: 100%; height: 750px;"
    >
      <div class="col-1 q-px-sm row">
        <q-file
          v-model="vfile"
          outlined
          dense
          label="视频文件"
          accept=".flv, .mp4"
          class="col-10 q-my-sm"
        >
        </q-file>
        <div class="col-2 flex flex-center">
          <q-btn
            @click="open('https://www.bilibili.com/video/av' + data.aid)"
            color="primary"
            >{{ "av" + data.aid }}</q-btn
          >
        </div>
      </div>
      <div class="col-xs-7 col-sm-8">
        <vue-flv-player
          :controls="true"
          ref="player"
          :source="vsrc"
          :type="vtype"
          style="width: 100%; height: 100%;"
        />
      </div>
      <div class="col-1 flex justify-start q-px-md">
        <q-range
          v-model="inout"
          :min="0"
          :max="vduration"
          :step="0.1"
          :left-label-value="'入点 ' + timeFormat(inout.min)"
          :right-label-value="'出点 ' + timeFormat(inout.max)"
          label
        ></q-range>
        <q-badge color="secondary" class="q-mr-sm">
          片段长度: {{ (this.inout.max - this.inout.min).toFixed(1) }}''
        </q-badge>
        <q-badge color="negative" v-if="vfile == null">
          请选择视频文件
        </q-badge>
      </div>
      <div class="col-xs-2 col-sm-1 q-px-sm row">
        <q-input
          v-model.number="inout.min"
          outlined
          label="入点（秒）"
          type="number"
          class="col-xs-11 col-sm-3 q-mr-sm"
          style="margin-top: 12px;"
        >
          <template v-slot:after>
            <q-btn @click="seek(inout.min)" round flat icon="double_arrow">
              <q-tooltip>
                跳转到入点
              </q-tooltip>
            </q-btn>
            <q-btn @click="setInpoint" round flat icon="sell">
              <q-tooltip>
                设置当前位置为入点
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <q-input
          v-model.number="inout.max"
          outlined
          label="出点（秒）"
          type="number"
          class="col-xs-11 col-sm-3"
          style="margin-top: 12px;"
        >
          <template v-slot:after>
            <q-btn @click="seek(inout.max)" round flat icon="double_arrow">
              <q-tooltip>
                跳转到出点
              </q-tooltip>
            </q-btn>
            <q-btn @click="setOutpoint" round flat icon="sell">
              <q-tooltip>
                设置当前位置为出点
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
        <q-input
          v-if="data.type == '搬运'"
          v-model="owner_orig"
          outlined
          label="原作者"
          class="col-xs-11 col-sm-3"
          style="margin-top: 12px;"
        ></q-input>
      </div>
      <q-card-actions align="right" class="col-1">
        <q-separator />
        <q-btn flat color="primary" label="确定" @click="onOKClick" />
        <q-btn flat color="primary" label="返回" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inout: {
        min: 0,
        max: 0
      },
      vduration: 10,
      vfile: null,
      vsrc: "",
      vtype: "mp4",
      owner_orig: null,
      setinterval: null,
      flag: false
    };
  },
  watch: {
    vfile(n) {
      let reader = new FileReader();
      reader.readAsDataURL(n);
      reader.onload = () => {
        this.vsrc = reader.result;
        this.vtype = n.name.slice(-3);
        console.log(this.$refs.player);
      };
    }
  },
  mounted() {
    if ("file" in this.data) this.vfile = this.data.file;
    this.setinterval = setInterval(() => {
      if (this.$refs.player.flvPlayer) {
        this.vduration = this.$refs.player.flvPlayer.duration;
        if (this.flag == false) {
          if ("start_time" in this.data) {
            this.inout.min = this.data.start_time;
            this.inout.max = this.data.start_time + this.data.duration;
          }
          this.flag = true;
        }
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.setinterval);
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    hide() {
      this.$refs.dialog.hide();
    },
    onDialogHide() {
      this.$emit("hide");
    },
    onOKClick() {
      let fileva = this.vfile == null;
      let inoutva = this.inout.min == 0 && this.inout.max == 0;
      let ownerva = false;
      let msg = [];
      if (this.data.type == "搬运") ownerva = this.owner_orig == null;
      if (fileva || inoutva || ownerva) {
        if (fileva) msg.push("未选择视频文件！");
        if (inoutva) msg.push("未填写入点出点！");
        if (ownerva) msg.push("未填写原作者名！");
        this.$q.notify({
          message: msg.join("; "),
          color: "negative",
          multiLine: true,
          position: "bottom"
        });
      } else {
        let dataout = Object.assign({}, this.data);

        dataout.start_time = this.inout.min;
        dataout.duration = this.inout.max - this.inout.min;
        if (this.owner_orig) dataout.owner_orig = this.owner_orig;
        if (this.vfile) {
          dataout.file = this.vfile;
          dataout.source_file = `./${this.vfile.name}`;
        } else dataout.source_file = null;

        this.$emit("ok", { data: dataout });
        this.hide();
      }
    },
    onCancelClick() {
      this.hide();
    },
    seek(time) {
      this.$refs.player.flvPlayer.currentTime = time;
    },
    setInpoint() {
      if (this.$refs.player.flvPlayer.currentTime < this.inout.max) {
        this.inout.min = Number(
          this.$refs.player.flvPlayer.currentTime.toFixed(1)
        );
      } else {
        this.inout.min = Number(
          this.$refs.player.flvPlayer.currentTime.toFixed(1)
        );
        this.inout.max = Number(
          this.$refs.player.flvPlayer.currentTime.toFixed(1)
        );
      }
    },
    setOutpoint() {
      if (this.$refs.player.flvPlayer.currentTime > this.inout.min) {
        this.inout.max = Number(
          this.$refs.player.flvPlayer.currentTime.toFixed(1)
        );
      }
    },
    timeFormat(s) {
      let mm = String(Math.floor(s / 60));
      let ss = String(Math.floor(s % 60));
      if (mm.length < 2) mm = "0" + mm;
      if (ss.length < 2) ss = "0" + ss;
      return mm + ":" + ss;
    },
    open(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
