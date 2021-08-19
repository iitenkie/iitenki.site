<template>
  <q-card flat class="q-pa-sm q-my-md bg-grey-2" style="width: 100%;">
    <q-card-section>
      <div class="q-mb-md text-h6 text-primary">
        <span v-if="subs != 'pickup'"> {{ data[0].type }}榜 </span>
        <span v-else> Pick up </span>

        <span v-if="data.length > 0 && 'rank' in data[0]">
          {{ data[0].rank }}-{{ data.slice(-1)[0].rank }}
        </span>
      </div>
      <q-banner
        v-for="(item, i) in data"
        :key="i"
        rounded
        class="q-my-sm bg-primary text-white"
      >
        <span class="text-h6" v-if="item.rank" v-text="item.rank + ' '"></span>
        <span class="text-subtitle1" v-text="item.title"></span>
        <Check :data="item" class="q-ml-md" />
        <template v-slot:action>
          <q-btn
            @click="$parent.dialog(item)"
            flat
            round
            color="white"
            icon="edit"
          />
        </template>
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script>
import Check from "./Check.vue";

export default {
  components: {
    Check
  },
  name: "configs",
  props: {
    data: {
      type: [Object, Array],
      required: true
    },
    subs: {
      type: String,
      default: "orig_10_6"
    }
  }
};
</script>
