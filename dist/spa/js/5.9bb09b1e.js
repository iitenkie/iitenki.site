(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{ebf1:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("q-layout",{attrs:{view:"hHh lpR fFf"}},[i("q-header",{staticClass:"bg-primary text-white",attrs:{elevated:""}},[i("q-toolbar",[i("q-toolbar-title",[t.islogin?t._e():i("q-checkbox",{attrs:{value:t.bilistat,label:"bili",color:1==t.bilistat?"positive":null==t.bilistat?"grey":"negative","keep-color":""}}),t.islogin?t._e():i("q-checkbox",{attrs:{value:t.nicostat,label:"nico",color:1==t.nicostat?"positive":null==t.nicostat?"grey":"negative","keep-color":""}}),t.islogin?t._e():i("a",{staticClass:"q-ml-xs text-body1",attrs:{href:"https://space.bilibili.com/"+t.buid+"/dynamic"}},[t._v(" @"+t._s(t.buname)+" ")])],1),i("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(a){t.right=!t.right}}})],1)],1),t.islogin?t._e():i("q-drawer",{attrs:{side:"right",bordered:""},model:{value:t.right,callback:function(a){t.right=a},expression:"right"}},[i("div",{staticClass:"q-ma-sm"},[i("div",{staticClass:"row items-center"},[i("div",{staticClass:"col q-table__title q-ml-sm"},[t._v("系统消息")]),i("q-space"),i("q-btn",{staticClass:"col-auto q-ma-xs",attrs:{loading:t.loading,unelevated:"",round:"",color:"grey",icon:"refresh"},on:{click:t.notifyReset},scopedSlots:t._u([{key:"loading",fn:function(){return[i("q-spinner-facebook")]},proxy:!0}],null,!1,4102112682)}),i("q-btn",{staticClass:"col-auto q-ma-xs",attrs:{unelevated:"",round:"",color:"warning",icon:"update"},on:{click:t.webUpdate}})],1),t._l(t.notifys,(function(a,e){return i("q-card",{key:e,staticClass:"q-my-sm q-pa-sm",attrs:{flat:"",bordered:""}},[i("div",{staticClass:"q-mb-xs text-body2 text-grey-7"},[t._v(t._s(a.time_at))]),i("div",{staticClass:"text-body2"},[t._v(t._s(a.content.split("。")[0]))])])}))],2)]),i("q-page-container",[i("router-view")],1)],1)},o=[],s=(i("e6cf"),{data(){return{right:!0,notifys:[],loading:!1,islogin:!1,bilistat:null,nicostat:null,buname:"",buid:null}},methods:{async notifyReset(){this.loading=!0;let t=await this.$util.get("/cookieartbot/api/getNotify");this.notifys=t.data.data,this.loading=!1},async routeChange(t){"/bot-panel/login"==t.path?this.islogin=!0:this.islogin=!1,await this.$util.get("/cookieartbot/islogin")},webUpdate(){this.$q.dialog({title:"确认",message:"是否更新？",cancel:!0}).onOk((async()=>{let t=await this.$util.get("/cookieartbot/webupdate");0==t.data.code&&(this.$q.notify({message:"更新完毕",color:"positive",position:"top"}),this.$util.reload())}))}},watch:{$route(t){this.routeChange(t)}},async created(){null==this.$q.localStorage.getItem("token")&&this.$router.push("/bot-panel/login"),this.$axios.interceptors.response.use((t=>(401==t.status&&"/cookieartbot/login"!=t.config.url&&"/bot-panel/login"!=this.$route.path?this.$router.push("/bot-panel/login"):200==t.status&&"/bot-panel/login"==this.$route.path&&this.$router.push("/bot-panel/image-storage"),t)),(t=>Promise.reject(t))),this.routeChange(this.$route),await this.notifyReset();let t=await this.$util.get("/cookieartbot/loginstat");this.bilistat=t.data.data.bilibili,this.nicostat=t.data.data.niconico,this.buname=t.data.data.bilibili_uname,this.buid=t.data.data.bilibili_uid}}),l=s,n=i("2877"),r=i("4d5a"),c=i("e359"),u=i("65c6"),b=i("6ac5"),d=i("8f8e"),h=i("9c40"),g=i("9404"),p=i("eaac"),f=i("2c91"),m=i("e669"),y=i("f09f"),q=i("09e3"),v=i("eebe"),k=i.n(v),w=Object(n["a"])(l,e,o,!1,null,null,null);a["default"]=w.exports;k()(w,"components",{QLayout:r["a"],QHeader:c["a"],QToolbar:u["a"],QToolbarTitle:b["a"],QCheckbox:d["a"],QBtn:h["a"],QDrawer:g["a"],QTable:p["a"],QSpace:f["a"],QSpinnerFacebook:m["a"],QCard:y["a"],QPageContainer:q["a"]})}}]);