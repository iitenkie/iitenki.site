import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import vueFlvPlayer from 'vue-flv-player'

import VueClipboard from 'vue-clipboard2'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ( { Vue } ) => {
  Vue.use(VuePlyr, {
    plyr: {}
  })
  // VueClipboard.config.autoSetContainer = true
  Vue.use(VueClipboard)
  Vue.use(vueFlvPlayer)
}
