(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{ebf1:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("q-layout",{attrs:{view:"hHh lpR fFf"}},[e("q-header",{staticClass:"bg-primary text-white",attrs:{elevated:""}},[e("q-toolbar",[e("q-toolbar-title",[t.islogin?t._e():e("q-checkbox",{attrs:{value:t.bilistat,label:"bili",color:1==t.bilistat?"positive":null==t.bilistat?"grey":"negative","keep-color":""}}),t.islogin?t._e():e("q-checkbox",{attrs:{value:t.nicostat,label:"nico",color:1==t.nicostat?"positive":null==t.nicostat?"grey":"negative","keep-color":""}}),t.islogin?t._e():e("span",{staticClass:"q-ml-xs text-body1"},[t._v("\n          @"+t._s(t.uname)+"\n        ")])],1),e("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(a){t.right=!t.right}}})],1)],1),t.islogin?t._e():e("q-drawer",{attrs:{side:"right",bordered:""},model:{value:t.right,callback:function(a){t.right=a},expression:"right"}},[e("div",{staticClass:"q-ma-sm"},[e("div",{staticClass:"row items-center"},[e("div",{staticClass:"col q-table__title q-ml-sm"},[t._v("系统消息")]),e("q-space"),e("q-btn",{staticClass:"col-auto q-ma-xs",attrs:{loading:t.loading,unelevated:"",round:"",color:"grey",icon:"refresh"},on:{click:t.notifyReset},scopedSlots:t._u([{key:"loading",fn:function(){return[e("q-spinner-facebook")]},proxy:!0}],null,!1,4102112682)}),e("q-btn",{staticClass:"col-auto q-ma-xs",attrs:{unelevated:"",round:"",color:"warning",icon:"update"},on:{click:t.webUpdate}})],1),t._l(t.notifys,(function(a,i){return e("q-card",{key:i,staticClass:"q-my-sm q-pa-sm",attrs:{flat:"",bordered:""}},[e("div",{staticClass:"q-mb-xs text-body2 text-grey-7"},[t._v(t._s(a.time_at))]),e("div",{staticClass:"text-body2"},[t._v(t._s(a.content.split("。")[0]))])])}))],2)]),e("q-page-container",[e("router-view")],1)],1)},o=[],s=(e("e6cf"),{data(){return{right:!0,notifys:[],loading:!1,islogin:!1,bilistat:null,nicostat:null,uname:""}},methods:{async notifyReset(){this.loading=!0;let t=await this.$util.get("/cookieartbot/api/getNotify");this.notifys=t.data.data,this.loading=!1},async routeChange(t){"/bot-panel/login"==t.path?this.islogin=!0:this.islogin=!1,await this.$util.get("/cookieartbot/islogin")},async webUpdate(){let t=await this.$util.get("/cookieartbot/webupdate");0==t.data.code&&(this.$q.notify({message:"更新完毕",color:"positive",position:"top"}),this.$util.reload())}},watch:{$route(t){this.routeChange(t)}},async created(){null==this.$q.localStorage.getItem("token")&&this.$router.push("/bot-panel/login"),this.$axios.interceptors.response.use((t=>(401==t.status&&"/cookieartbot/login"!=t.config.url&&"/bot-panel/login"!=this.$route.path?this.$router.push("/bot-panel/login"):200==t.status&&"/bot-panel/login"==this.$route.path&&this.$router.push("/bot-panel/image-storage"),t)),(t=>Promise.reject(t))),this.routeChange(this.$route),await this.notifyReset();let t=await this.$util.get("/cookieartbot/loginstat");this.bilistat=t.data.data.bilibili,this.nicostat=t.data.data.niconico,this.uname=t.data.data.bilibili_uname}}),n=s,l=e("2877"),r=e("4d5a"),c=e("e359"),u=e("65c6"),d=e("6ac5"),b=e("8f8e"),h=e("9c40"),g=e("9404"),p=e("eaac"),f=e("2c91"),m=e("e669"),y=e("f09f"),q=e("09e3"),v=e("eebe"),w=e.n(v),k=Object(l["a"])(n,i,o,!1,null,null,null);a["default"]=k.exports;w()(k,"components",{QLayout:r["a"],QHeader:c["a"],QToolbar:u["a"],QToolbarTitle:d["a"],QCheckbox:b["a"],QBtn:h["a"],QDrawer:g["a"],QTable:p["a"],QSpace:f["a"],QSpinnerFacebook:m["a"],QCard:y["a"],QPageContainer:q["a"]})}}]);