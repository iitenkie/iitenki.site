<template>
  <span>
    <span v-if="!('file' in data)">🈚未选择源文件！</span>
    <span v-if="!('start_time' in data)">🈚未选择片段！</span>
    <span v-if="data.type == '搬运' && !('owner_orig' in data)">🈚未填写原作者名！</span>
  </span>
</template>

<script>
export default {
  name: "check",
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>
