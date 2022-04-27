<template>
  <q-page>
    <div class="q-pa-md">
      <q-select
        outlined
        v-model="select_value"
        :options="options"
        option-value="name"
        option-label="name_zh"
        class="q-mb-sm"
        color="pink"
        emit-value
        map-options
        dense
      />
    </div>
    <div class="flex flex-center row">
      <div class="col-lg-6 col-md-8 col-sm-10 col-xs-11">
        <component v-if="select_value" :is="select_value"></component>
      </div>
    </div>
  </q-page>
</template>

<script>
import WMCCDH from "components/yutools/WMCCDH.vue";
import GJSJ from "components/yutools/GJSJ.vue";
var components = { WMCCDH, GJSJ };

export default {
  name: "EmoteGenerator",
  components: components,
  data() {
    return {
      components: components,
      select_value: null,
      options: []
    };
  },
  methods: {
    _option() {
      let ret = [];
      for (let i in this.components) {
        if (/^.+[A-Z]$/.test(i) == false) continue;
        ret.push({ name: components[i].name, name_zh: components[i].name_zh });
      }
      return ret;
    }
  },
  watch: {
    components() {
      this.options = this._option();
    }
  },
  mounted() {
    this.options = this._option();
  }
};
</script>

<style lang="scss">
.thumbnail {
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-enter,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
