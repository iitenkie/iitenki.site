(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{2893:function(t,e,a){},8622:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"hHh lpR fFr"}},[a("q-header",{staticClass:"bg-pink-11 text-white",attrs:{bordered:""}},[a("q-toolbar",[a("q-toolbar-title",[t._v("\n        云烤肉\n      ")]),a("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(e){t.right=!t.right}}})],1),a("q-bar",{staticClass:"bg-pink-1 text-black"},[a("div",{staticClass:"cursor-pointer"},[t._v("\n        "+t._s(t.data.title)+"\n        "),a("q-popup-edit",{attrs:{"auto-save":""},model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}},[a("q-input",{attrs:{debounce:"1000",dense:"",autofocus:""},model:{value:t.data.title,callback:function(e){t.$set(t.data,"title",e)},expression:"data.title"}})],1)],1),a("div",{staticClass:"ellipsis cursor-pointer text-italic",staticStyle:{"font-size":"0.85rem"}},[t._v("\n        "+t._s(t.data.comment?t.data.comment:"备注")+"\n        "),a("q-popup-edit",{attrs:{"auto-save":""},model:{value:t.data.comment,callback:function(e){t.$set(t.data,"comment",e)},expression:"data.comment"}},[a("q-input",{attrs:{debounce:"1000",dense:"",autofocus:""},model:{value:t.data.comment,callback:function(e){t.$set(t.data,"comment",e)},expression:"data.comment"}})],1)],1)])],1),a("q-drawer",{attrs:{"show-if-above":"",side:"right",bordered:""},model:{value:t.right,callback:function(e){t.right=e},expression:"right"}},[a("q-list",{staticClass:"rounded-borders text-pink-6",attrs:{padding:""}},[a("div",{staticClass:"row q-pa-sm q-ma-xs rounded-borders"},[t._v("\n        文本\n        "),a("q-space"),t.multiple_selecting?t._e():a("q-btn",{staticClass:"q-mx-sm",attrs:{padding:"none",color:"pink-11",icon:"add",flat:""},on:{click:function(e){return t.text_add_click()}}}),t.multiple_selecting&&0===t.text_selected.length?t._e():a("q-btn",{staticClass:"q-mx-sm",attrs:{padding:"none",color:"pink-11",icon:"ios_share",flat:""}},[a("q-menu",[a("q-list",{staticStyle:{"min-width":"100px"}},[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",disable:t.multiple_selecting},on:{click:function(e){return t.save_conf()}}},[a("q-item-section",[t._v("脚本用")])],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",disable:t.multiple_selecting},on:{click:function(e){return t.save_serv_conf()}}},[a("q-item-section",[t._v("私服用")])],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",disable:t.multiple_selecting&&0===t.text_selected.length},on:{click:function(e){return t.save_text()}}},[a("q-item-section",[t._v("可读格式")])],1)],1)],1)],1),a("q-checkbox",{staticClass:"q-mx-sm",attrs:{size:"sm",color:"pink-11",dense:""},model:{value:t.multiple_selecting,callback:function(e){t.multiple_selecting=e},expression:"multiple_selecting"}}),a("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",accept:"text/*"},on:{change:t.add}})],1),t._l(t.text_list,(function(e,i){return a("q-item",{key:i,staticClass:"q-ma-xs rounded-borders",attrs:{clickable:!t.multiple_selecting,"v-ripple":!t.multiple_selecting,active:!t.multiple_selecting&&t.text_select===e._id,"active-class":"menu_active"},on:{click:function(a){t.text_select=e._id}}},[t.multiple_selecting?a("q-item-section",{attrs:{side:""}},[a("q-checkbox",{attrs:{val:e._id,color:"pink-11",dense:""},model:{value:t.text_selected,callback:function(e){t.text_selected=e},expression:"text_selected"}})],1):t._e(),a("q-item-section",[a("div",{domProps:{textContent:t._s(e.title)}}),e.comment?a("div",{staticClass:"text-italic",staticStyle:{"font-size":"0.9em"},domProps:{textContent:t._s(e.comment)}}):t._e()])],1)})),a("div",{staticClass:"flex flex-center"},[a("q-pagination",{attrs:{max:Math.ceil(this.text_count/t.limit),input:"",color:"pink-11"},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1),a("q-inner-loading",{attrs:{showing:t.text_list_loading}},[a("q-spinner-bars",{attrs:{size:"50px",color:"pink"}})],1),a("q-separator"),a("q-expansion-item",{attrs:{"expand-separator":"",label:"词典"}},[t._l(t.dicts,(function(e,i){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:i,staticClass:"q-ma-xs",attrs:{clickable:""}},[a("q-item-section",{staticClass:"row"},[t._v("\n            "+t._s(e.name)+"\n          ")])],1)})),a("q-inner-loading",{attrs:{showing:t.dict_loading}},[a("q-spinner-bars",{attrs:{size:"50px",color:"pink"}})],1)],2)],2)],1),a("q-page-container",[a("q-page",{staticClass:"flex flex-center row",attrs:{padding:""}},[a("div",{ref:"capture",staticClass:"col-xs-12 col-sm-8 col-md-6 col-xl-4"},t._l(t.data.text,(function(e,i){return a("div",{key:i,staticClass:"q-pb-sm"},["text"==e.type?a("q-card",{attrs:{flat:"",bordered:""}},[a("div",{class:"row q-px-md q-py-xs "+t.chara_color(e.speaker)},[a("div",[a("span",{staticClass:"speaker-font"},[t._v(t._s(e.speaker))]),a("q-btn",{attrs:{color:"primary",icon:"update",size:"xs",tabindex:"-1",flat:"",round:""},on:{click:function(a){e.roasted_speaker=t.speaker_replace(e.speaker)}}}),a("div",{class:"cursor-pointer text-caption roasted-speaker-font"+(e.roasted_speaker?" text-grey-8":" text-negative text-bold")},[t._v("\n                  "+t._s(e.roasted_speaker?e.roasted_speaker:"角色名（中文）")+"\n                  "),a("q-popup-edit",{attrs:{"auto-save":""},model:{value:e.roasted_speaker,callback:function(a){t.$set(e,"roasted_speaker",a)},expression:"item.roasted_speaker"}},[a("q-input",{attrs:{debounce:"1000",dense:"",autofocus:""},model:{value:e.roasted_speaker,callback:function(a){t.$set(e,"roasted_speaker",a)},expression:"item.roasted_speaker"}})],1)],1)],1),a("q-space"),t._v("\n              "+t._s(e.speaker_skin)+"\n            ")],1),a("q-card-section",{staticClass:"q-pt-xs"},[a("q-field",{attrs:{color:"orange",placeholder:"原文",readonly:"",autogrow:""},scopedSlots:t._u([{key:"control",fn:function(){return[a("div",{staticClass:"text original-font",staticStyle:{"white-space":"pre-line"},domProps:{innerHTML:t._s(e.text)}})]},proxy:!0}],null,!0)}),a("q-input",{staticClass:"text roasted-font",attrs:{debounce:"500",type:"textarea",color:"pink",placeholder:"译文",autogrow:""},scopedSlots:t._u([{key:"append",fn:function(){return[void 0==e.comment?a("q-btn",{attrs:{icon:"arrow_drop_down",size:"sm",round:"",flat:""},on:{click:function(t){e.comment=""}}}):t._e()]},proxy:!0}],null,!0),model:{value:e.roasted_text,callback:function(a){t.$set(e,"roasted_text",a)},expression:"item.roasted_text"}}),void 0!=e.comment?a("q-input",{attrs:{type:"text",color:"pink",placeholder:"备注",tabindex:"-1",dense:"",autogrow:""},scopedSlots:t._u([{key:"append",fn:function(){return[void 0!=e.comment&&0==e.comment.length?a("q-btn",{attrs:{icon:"arrow_drop_up",size:"sm",tabindex:"-1",round:"",flat:""},on:{click:function(t){e.comment=void 0}}}):t._e()]},proxy:!0}],null,!0),model:{value:e.comment,callback:function(a){t.$set(e,"comment",a)},expression:"item.comment"}}):t._e()],1)],1):"location"==e.type?a("q-card",{staticClass:"bg-pink-1 text-h5 roasted-speaker-font cursor-pointer q-pa-sm",staticStyle:{"text-align":"center"},attrs:{flat:"",bordered:"",dense:""}},[a("div",[t._v("\n              "+t._s(e.name)+"\n              "),a("q-popup-edit",{attrs:{"auto-save":""},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"item.name"}},[a("q-input",{attrs:{debounce:"1000",dense:"",autofocus:""},model:{value:e.name,callback:function(a){t.$set(e,"name",a)},expression:"item.name"}})],1)],1)]):a("q-chip",["bgm"==e.type?a("q-avatar",{attrs:{icon:"music_note",color:"red","text-color":"white"}}):"se"==e.type?a("q-avatar",{attrs:{icon:"volume_up",color:"red","text-color":"white"}}):"actor_show"==e.type?a("q-avatar",{attrs:{icon:"person_add",color:"positive","text-color":"white"}}):"actor_hide"==e.type?a("q-avatar",{attrs:{icon:"person_remove",color:"negative","text-color":"white"}}):t._e(),t._v("\n            "+t._s(e.name)+"\n          ")],1)],1)})),0),a("q-page-sticky",{attrs:{position:"top-right",offset:[18,18]}},[a("q-btn",{attrs:{icon:"book",size:"lg",color:"pink",fab:""},on:{click:function(e){return t.speaker_replace_all()}}})],1),a("q-page-sticky",{attrs:{position:"bottom-right",offset:[18,18]}},[a("q-btn",{staticClass:"bg_transition",attrs:{label:t.diff_num+":保存",size:"lg",color:0==t.diff_num?"positive":"negative",rounded:""},on:{click:function(e){return t.update()}}})],1),a("q-inner-loading",{staticStyle:{position:"fixed"},attrs:{showing:t.text_loading}},[a("q-spinner-bars",{attrs:{size:"50px",color:"pink"}})],1)],1)],1)],1)},s=[],o=a("7619"),n=a.n(o),r=(a("e6cf"),a("ddb0"),a("5319"),a("4d90"),a("21a6")),l={name:"YuyuyuiTranslationHelper",data(){return{last_updated:void 0,update_timeout_id:void 0,text_list:[],text_select:"",text_selected:[],text_count:0,dicts:[],data:{text:[]},diff_num:0,update_flag:!1,right:!1,text_loading:!1,text_list_loading:!1,dict_loading:!1,multiple_selecting:!1,limit:20,page:1}},watch:{async page(){this.text_list_loading=!0;let t=await this.get("/cookieartbot/yyyi/record",{params:{limit:this.limit,skip:(this.page-1)*this.limit,projection:JSON.stringify({text:0})}});this.text_list=t.data.data,this.text_list_loading=!1},async text_select(t,e){this.text_loading=!0,void 0!==this.update_timeout_id&&(clearTimeout(this.update_timeout_id),this.update_timeout_id=void 0,this.update_flag=!1);try{let a;if(""!==e){const i=[this.get(`/cookieartbot/yyyi/record/${t}`),this.get(`/cookieartbot/yyyi/record/${e}`)];a=await Promise.all(i),this.data_compare(a[1].data.data,this.data)>0&&await this.update(),this.data=a[0].data.data}else a=await this.get(`/cookieartbot/yyyi/record/${t}`),this.data=a.data.data;window.scrollTo(0,0)}catch(a){this.$q.notify({message:`加载失败！${a.message}`,color:"negative",position:"top"})}finally{this.text_loading=!1}},data:{deep:!0,handler(t,e){t._id==e._id&&(this.update_flag||0==e.text.length||(this.update_flag=!0,this.update_timeout_id=setTimeout((async()=>{let t=await this.get(`/cookieartbot/yyyi/record/${this.data._id}`),e=t.data.data;void 0!=this.data.last_modified&&e.last_modified>this.data.last_modified?location.reload():this.diff_num=this.data_compare(this.data,e),this.update_flag=!1,this.update_timeout_id=void 0}),2500)))}},diff_num(t){t>0&&this.update()},multiple_selecting(t){t||(this.text_selected=[])}},methods:{add(t){let e=t.target.files[0],a=new FileReader;a.onload=async()=>{let t=this.yuyuyui_script_serialize(a.result);await this.post("/cookieartbot/yyyi/record",{data:{title:e.name,text:t}}),await this.reset()},a.readAsText(e)},get(t,e={}){return this.$axios(n()({method:"get",url:t,responseType:"json"},e))},post(t,e={}){return this.$axios(n()({method:"post",url:t,responseType:"json"},e))},put(t,e={}){return this.$axios(n()({method:"put",url:t,responseType:"json"},e))},delete(t,e={}){return this.$axios(n()({method:"delete",url:t,responseType:"json"},e))},yuyuyui_script_serialize_old(t){function e(t,e,a,i,s){return`<span style="font-size: ${Math.round(e/48*100)/100}em;">${a}</span>`}t=t.split("\r\n");let a=[],i=1;for(let s=0;s<t.length;s++){let o=t[s];if(/^.*    <.*>$/.test(o)){s++;const n=o.match(/^(.*)    <(.*)>$/);let r={_id:i,type:"text",speaker:n[1],speaker_skin:n[2],roasted_speaker:"",text:"",roasted_text:""},l=[];for(;t[s];s++)l.push(t[s].slice(4));r.text=l.join("\n"),r.text=r.text.replace(/@s\((\d+)\)\{(.+)\}/g,e),r.text=r.text.replace(/@c\((.+)\)\{(.+)\}/g,'<span style="color: $1;">$2</span>'),r.text=r.text.replace(/@b\{(.+)\}/g,"<b>$1</b>"),a.push(r),i++}else if(/^BGM: .*$/.test(o)){const t=o.match(/^BGM: (.*)$/);let e={_id:i,type:"bgm",name:t[1]};a.push(e),i++}else if(/^SE: .*$/.test(o)){const t=o.match(/^SE: (.*)$/);let e={_id:i,type:"se",name:t[1]};a.push(e),i++}else{if(!/^■■■.*■■■$/.test(o))continue;{const t=o.match(/^■■■(.*)■■■$/);let e={_id:i,type:"location",name:t[1]};a.push(e),i++}}}return a},yuyuyui_script_serialize(t){function e(t,e,a,i,s){return`<span style="font-size: ${Math.round(e/48*100)/100}em;">${a}</span>`}t=t.split("\n");let a=[];for(let i in t){let s=t[i];if(/^mes	(.+?):(.+?):*.*	(.+?)	(.+?)$/.test(s)){const t=s.match(/^mes	(.+?):(.+?)	(.+?)	(.+?)$/);let i={type:"text",speaker:t[2],speaker_skin:t[1],roasted_speaker:"",voice:t[3],text:t[4].replace("\\n","\n"),roasted_text:""};i.text=i.text.replace(/@s\((\d+?)\)\{(.+?)\}/g,e),i.text=i.text.replace(/@c\((.+)\)\{(.+)\}/g,'<span style="color: $1;">$2</span>'),i.text=i.text.replace(/@b\{(.+?)\}/g,"<b>$1</b>"),a.push(i)}else if(/^bgm	(.+?)	.*$/.test(s)){const t=s.match(/^bgm	(.+?)	.*$/);let e={type:"bgm",name:t[1]};a.push(e)}else if(/^se	(.+?)	.*$/.test(s)){const t=s.match(/^se	(.+?)	.*$/);let e={type:"se",name:t[1]};a.push(e)}else if(/^caption	.+:(.+?)	.*	.*	.*	.*	.*$/.test(s)){const t=s.match(/^caption	.+:(.+?)	.*	.*	.*	.*	.*$/);let e={type:"location",name:t[1]};a.push(e)}else if(/^actor_show	(.+?)	.*	.*$/.test(s)){const t=s.split("\t");let e={type:"actor_show",name:t[1]};a.push(e)}else{if(!/^actor_hide	(.+?)	.*	.*$/.test(s))continue;{const t=s.split("\t");let e={type:"actor_hide",name:t[1]};a.push(e)}}}return a},async reset(){this.dict_loading=!0;const t=[this.get("/cookieartbot/yyyi/record",{params:{limit:this.limit,skip:(this.page-1)*this.limit,projection:JSON.stringify({text:0})}}),this.get("/cookieartbot/yyyi/dicts")];let e=await Promise.all(t);this.text_list=e[0].data.data,this.text_select=e[0].data.data[0]._id,this.text_count=e[0].data.count,this.dicts=e[1].data.data,this.dict_loading=!1},speaker_replace(t){return this.all_entries[t]?this.all_entries[t]:""},speaker_replace_all(){for(let t in this.data.text)""===this.data.text[t].roasted_speaker&&(this.data.text[t].roasted_speaker=this.speaker_replace(this.data.text[t].speaker))},async update(){let t=await this.put(`/cookieartbot/yyyi/record/${this.data._id}`,{data:this.data});200==t.status?(this.diff_num=0,this.data.last_modified=t.data.last_modified):this.$q.notify({message:"保存失败，请检查",color:"negative",position:"top"})},now_timestamp(){return Math.round(Date.now())},text_add_click(){this.$refs.file.click()},save_conf(){let t=[];for(let a of this.data.text)"roasted_text"in a&&t.push({speaker:a.roasted_speaker,text:a.roasted_text});let e=new Blob([JSON.stringify({type:"translating_helper",data:t})],{type:"application/json;charset=utf-8"});Object(r["saveAs"])(e,`${this.data.title}.json`)},save_serv_conf(){let t=[];for(let s of this.data.text)"location"===s.type?t.push({type:"caption",text:[s.name]}):"text"===s.type&&t.push({type:"message",voice:s.voice,text:[s.roasted_speaker,s.roasted_text]});let e=0,a=0;for(let s in t)"caption"===t[s].type?(t[s].id=`${this.data.title}_c_${String(e).padStart(2,"0")}`,e++):"message"===t[s].type&&(t[s].id=`${this.data.title}_m_${t[s].voice}_${String(a).padStart(3,"0")}`,delete t[s].voice,a++);let i=new Blob([JSON.stringify({name:this.data.title,language:"zh",lines:t})],{type:"application/json;charset=utf-8"});Object(r["saveAs"])(i,`${this.data.title}.json`)},data2text(t){let e=[];for(let a of t.text)if("text"===a.type){let t=[`${a.roasted_speaker}    <${a.speaker_skin}>`];for(let e of a.roasted_text.split("\n"))t.push(`    ${e}`);e.push(t.join("\n"))}else"location"===a.type?e.push(`■■■${a.name}■■■`):"bgm"===a.type?e.push(`BGM: ${a.name}`):"se"===a.type&&e.push(`SE: ${a.name}`);return e},async save_text(){let t;if(this.multiple_selecting){t=[];let e=[];for(let t of this.text_selected)e.push(this.get(`/cookieartbot/yyyi/record/${t}`));let a=await Promise.all(e);for(let i of a)t=[...t,...this.data2text(i.data.data)]}else t=this.data2text(this.data);let e=new Blob([t.join("\n\n")],{type:"text/plain;charset=utf-8"});Object(r["saveAs"])(e,`${this.data.title.replace(/.txt/g,"")}_roasted.txt`)},data_compare(t,e){let a=0;for(const i in t)if("last_modified"!=i)if("text"!=i)t[i]!=e[i]&&a++;else for(const s in t[i])for(const o in t[i][s])if(t[i][s][o]!=e[i][s][o]){a++;break}return a},chara_color(t){const e={"結城 友奈":"yuuki_yuuna","東郷 美森":"tougou_mimori","犬吠埼 風":"inubouzaki_fuu","犬吠埼 樹":"inubouzaki_itsuki","三好 夏凜":"miyoshi_karin","鷲尾 須美":"washio_sumi","三ノ輪 銀":"minowa_gin","乃木 園子":"nogi_sonoko","乃木 若葉":"nogi_wakaba","土居 球子":"doi_tamako","伊予島 杏":"iyojima_anzu","郡 千景":"koori_chikage","高嶋 友奈":"takashima_yuuna","白鳥 歌野":"shiratori_utano","秋原 雪花":"akihara_sekka","古波蔵 棗":"kohagura_natsume","上里 ひなた":"uesato_hinata","藤森 水都":"fujimori_mito","楠 芽吹":"kusunoki_mebuki","国土 亜耶":"kokudo_aya","加賀城 雀":"kagajyou_suzume","弥勒 夕海子":"miroku_yumiko","山伏 しずく":"yamabushi_shizuku","山伏 シズク":"yamabushi_shizuku","赤嶺 友奈":"akamine_yuuna","弥勒 蓮華":"miroku_renge","桐生 静":"kiryuu_shizuka","安芸 真鈴":"aki_masuzu","花本 美佳":"hanamoto_yoshika","芙蓉 友奈":"fuyou_yuuna","柚木 友奈":"yuzuki_yuuna"};return void 0!==e[t]?e[t]:"default_chara"},async save_capture(){const t=this.$refs.capture;let e=await this.$html2canvas(t,{});this.$util.save_canvas(e,"test.jpg")}},computed:{all_entries(){let t={};for(let e of this.dicts)t=n()(n()({},t),e.entries);return t}},async created(){await this.reset()}},c=l,d=(a("f905"),a("2877")),p=a("4d5a"),u=a("e359"),_=a("65c6"),m=a("6ac5"),h=a("9c40"),f=a("d847"),x=a("42a1"),k=a("27f9"),y=a("9404"),g=a("1c1c"),b=a("2c91"),v=a("4e73"),q=a("66e5"),$=a("4074"),w=a("8f8e"),C=a("3b16"),Q=a("74f7"),S=a("a154"),z=a("eb85"),j=a("3b73"),T=a("09e3"),P=a("9989"),B=a("f09f"),M=a("a370"),N=a("8572"),O=a("b047"),E=a("cb32"),J=a("de5e"),A=a("7f67"),I=a("714f"),H=a("eebe"),L=a.n(H),F=Object(d["a"])(c,i,s,!1,null,null,null);e["default"]=F.exports;L()(F,"components",{QLayout:p["a"],QHeader:u["a"],QToolbar:_["a"],QToolbarTitle:m["a"],QBtn:h["a"],QBar:f["a"],QPopupEdit:x["a"],QInput:k["a"],QDrawer:y["a"],QList:g["a"],QSpace:b["a"],QMenu:v["a"],QItem:q["a"],QItemSection:$["a"],QCheckbox:w["a"],QPagination:C["a"],QInnerLoading:Q["a"],QSpinnerBars:S["a"],QSeparator:z["a"],QExpansionItem:j["a"],QPageContainer:T["a"],QPage:P["a"],QCard:B["a"],QCardSection:M["a"],QField:N["a"],QChip:O["a"],QAvatar:E["a"],QPageSticky:J["a"]}),L()(F,"directives",{ClosePopup:A["a"],Ripple:I["a"]})},f905:function(t,e,a){"use strict";a("2893")}}]);