import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import vueFlvPlayer from 'vue-flv-player'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ( { Vue } ) => {
  Vue.use(VuePlyr, {
    plyr: {}
  })
  Vue.use(vueFlvPlayer)
}
