(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"1f90":function(A,w,P){},"713b":function(A,w,P){"use strict";P.r(w);var e=function(){var A=this,w=A.$createElement,e=A._self._c||w;return e("q-layout",{attrs:{view:"hHh lpR fFf"}},[e("q-header",{staticClass:"header-bg text-white",attrs:{elevated:""}},[e("q-toolbar",[e("q-btn",{attrs:{dense:"",flat:"",round:"",icon:"menu"},on:{click:function(w){A.left=!A.left}}}),e("q-toolbar-title",[e("img",{attrs:{src:P("beb9")}})])],1)],1),e("q-drawer",{attrs:{"show-if-above":"",side:"left",bordered:""},model:{value:A.left,callback:function(w){A.left=w},expression:"left"}},[e("q-list",A._l(A.ToolLinks,(function(w){return e("ToolLink",A._b({key:w.title},"ToolLink",w,!1))})),1)],1),e("q-page-container",[e("router-view")],1)],1)},D=[],r=(P("ddb0"),function(){var A=this,w=A.$createElement,P=A._self._c||w;return P("q-item",{staticClass:"tlink",attrs:{clickable:"",to:A.path,"active-class":"tlink-active"}},[P("q-item-section",[P("q-item-label",[A._v(A._s(A.name))])],1)],1)}),s=[],C={name:"ToolLink",props:{name:{type:String,required:!0},path:{type:String,default:"/"}}},t=C,j=(P("b6ee"),P("2877")),n=P("66e5"),O=P("4074"),K=P("0170"),U=P("eebe"),v=P.n(U),p=Object(j["a"])(t,r,s,!1,null,null,null),X=p.exports;v()(p,"components",{QItem:n["a"],QItemSection:O["a"],QItemLabel:K["a"]});var m={name:"MainLayout",components:{ToolLink:X},data(){return{left:!1,ToolLinks:[]}},created(){for(let A of this.$router.options.routes[0].children)void 0!=A.name&&this.ToolLinks.push(A)}},a=m,y=(P("89d3"),P("4d5a")),Q=P("e359"),I=P("65c6"),o=P("9c40"),T=P("6ac5"),i=P("9404"),f=P("1c1c"),c=P("09e3"),g=Object(j["a"])(a,e,D,!1,null,null,null);w["default"]=g.exports;v()(g,"components",{QLayout:y["a"],QHeader:Q["a"],QToolbar:I["a"],QBtn:o["a"],QToolbarTitle:T["a"],QDrawer:i["a"],QList:f["a"],QPageContainer:c["a"]})},"89d3":function(A,w,P){"use strict";P("e87e")},b6ee:function(A,w,P){"use strict";P("1f90")},beb9:function(A,w){A.exports="data:image/png;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAMQOAADEDgAAAAAAAAAAAAD/9esA//XrAP/16wD/9esAEBAQ/9Tg///U4P//1OD//9Tg//8iV3z//////1Hz7v9A1P//LsgA/y7IAP8gjgD/II4A/yCOAP8gjgD/J6wA/0DU//9A1P//AJzI/7bL//+2y///1OD//9Tg//8QEBD///XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wAQEBD/1OD//9Tg///U4P//ADKs/9TU1P9A1P//QNT//wCcyP8uyAD/LsgA/y7IAP8nrAD/J6wA/yesAP8nrAD/AJzI/0DU//8AnMj/tsv//7bL///U4P//1OD//9Tg//8QEBD///XrAP/16wD/9esA//XrAP/16wD/9esA//XrAAACCf/U4P//tsv//wAyrP8AMqz//////wCcyP8AnMj/AJzI/yesAP8nrAD/J6wA/yesAP8nrAD/J6wA/yesAP8AnMj/AJzI/wCcyP8AMqz/tsv//7bL///U4P//1OD//xAQEP//9esA//XrAP/16wD/9esA//XrAP/16wAHAgT/ADKs/wAAD/+2y///ADKs/wAyrP8AMqz/AJzI/wCcyP8AnMj/mLf//5i3//+Yt///mLf//5i3//+Yt///QNT//wCcyP8AnMj/AJzI/wAyrP8AKY7/1OD//wAABP/U4P//EBAQ///16wD/9esA//XrAP/16wD/9esA//XrAAAABv8AMqz/AAAX/7bL//8AMqz/ADKs/wAhcf8AIXH/ACFx/wAhcf8AIXH/tsv//7bL//+2y///tsv//wAhcf8AIXH/ACFx/yZQhf8AMqz/ADKs/wApjv/U4P//ACFx/wAACf//9esA//XrAP/16wD/9esA//XrAP/16wD/9esAAgAG/wAyrP8AKY7/ADKs/wAyrP8AMqz/ACFx/wAhcf8AIXH/ACFx/wAhcf/U4P//1OD//9Tg///U4P//ACFx/wAhcf8AIXH/ACFx/wAyrP8AMqz/ACmO/wAAEf8AKY7/AAAP///16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esAAAAN/wApjv8AMqz/ADKs/wAyrP8AIXH/ACFx/wAhcf/U4P//1OD//9Tg//+wmf//sJn//9Tg///U4P//ACFx/wAhcf8AIXH/ADKs/wAyrP8AKY7/ACmO/wApjv8AAA////XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wAAAA3/ADKs/wAyrP/p6en/ADKs/wAhcf8AIXH/1OD//9Tg///U4P//sJn//7CZ//+wmf//sJn//9Tg///U4P//ACFx/wAhcf8AMqz/ADKs/wApjv8AKY7/ACFx/wAAE///9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAAAAEP8AMqz//////wAA////////dYXS/9Tg///U4P//1OD//9Tg//+wmf//sJn//7CZ//+wmf//1OD//9Tg///U4P//ACFx///////p6en/ACmO/wApjv8AIXH/AAAO///16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esAAAAO/wAyrP8AAP//AAD//wAA//9bZrj/1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///U4P//AAD//wAA//8AKY7/ADKs/wAhcf8AAA7///XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wAAAAr/ADKs/wAA//8tAMj/LQDI/9Tg///Gtv//xrb//9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///Gtv//xrb//9Tg//8AAP//LQDI/wApjv8AMqz/ACFx/wAACv8AAQD///XrAP/16wD/9esA//XrAAAABv8AABD/AAAU//////8AMqz/LQDI/y0AyP8tAMj/1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//y0AyP8tAMj/ACmO/wAyrP8AIXH/VCP//9TU1P8AAQL///XrAP/16wAAAAj/1NTU/1Qj//9UI///VCP//wAyrP/p6en//////+np6f8AMqz/EBAQ/9Tg///U4P//EBAQ/9Tg///U4P//1OD//xAQEP/U4P//1OD//xAQEP/U4P///////+np6f8AKY7/ACFx/1Qj//9UI///VCP///r4//8AAAn///XrAP////9UI///VCP//1Qj//9UI///ADKs/wApjv8AMqz/ADKs/wApjv/U4P//EBAQ/xAQEP/U4P//1OD//9Tg///U4P//1OD//xAQEP8QEBD/1OD//9Tg//8AKY7/ACmO/wApjv8AIXH/VCP//1Qj//9UI///1NTU/wAAD///9esA1NTU/1Qj//9UI///VCP//1Qj//8AKY7/ADKs/wAyrP8AMqz/ACmO/9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//9Tg///U4P//1OD//7bL//8AKY7/ADKs/wAhcf9UI///VCP//1Qj//9UI///8/L//wAAEf8AAQX//////1Qj//9UI///VCP//wApjv8AMqz/ADKs/wAyrP8AKY7/1OD//9Tg///U4P//1OD//9Tg///U4P//ADKs/9Tg///U4P//ADKs/9Tg//+2y///ACmO/wApjv8AMqz/ACFx/wApjv9UI///VCP//1Qj///U1NT/AAAX///16wAAAA3/AAAi/1Qj//9UI///ACmO/wAyrP8AKY7/ADKs/wApjv+2y///1OD//wApjv+2y///1OD//wAyrP8AMqz/1OD//wAyrP8AMqz/ADKs/wAhcf8AKY7/ACmO/wApjv8AIXH/ACFx/1Qj//9UI///VCP///////8AABj///XrAP/16wD/9esAAAAW/wAAH/8AMqz/ACmO/wApjv8AMqz/ADKs/wApjv+2y///ACmO/wApjv+2y///ADKs/wApjv8AMqz/ADKs/wAyrP8AKY7/ADKs/wApjv8AMqz/ACmO/wApjv8AIXH/ADKs/1Qj//9rQf//a0H//xAQEP//9esA//XrAP/16wD/9esAAAAP/wAAGf8AKY7/ACmO/wAyrP8AGFP/ACmO/wApjv8AKY7/ADKs/wApjv8AMqz/ACmO/wAyrP8AKY7/ADKs/wApjv8AGFP/ACmO/wAyrP8AKY7/ACmO/wAyrP9UI///VCP//xAQEP8QEBD///XrAP/16wD/9esA//XrAAIAAf//////ACmO/wApjv8AKY7/ACmO/wApjv8AGFP/ABhT/wAYU/8AGFP/ACmO/wAyrP8AKY7/ABhT/wAYU/8AGFP/ABhT/wApjv8AMqz/ACmO/wApjv8AKY7/ACmO/wAAE/8QEBD///XrAP/16wD/9esA//XrAP/16wD/9esAAgAD/9TU1P8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ADKs/wAyrP8AMqz/ACmO/wAyrP8AMqz/ADKs/wAyrP8AMqz/ADKs/wApjv8AKY7/ACmO/wApjv8AKY7/AAAe///16wD/9esA//XrAP/16wD/9esA//XrAP/16wAAAAf//////wApjv8AKY7/ACmO/wAyrP8AKY7/ACmO/wAyrP8AMqz/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ADKs/wAyrP8AMqz/ACmO/wAyrP8AKY7/ACmO/wApjv8AACv///XrAP/16wD/9esA//XrAP/16wD/9esA//XrAAAACP/U1NT/VCP//wApjv8AMqz/ADKs/wAyrP8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wAyrP8AMqz/ADKs/wAyrP8AKY7/ACmO//////8FABv///XrAP/16wD/9esA//XrAP/16wD/9esAAAAN//////9UI///ADKs/wAyrP8AMqz/ADKs/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wAyrP8AMqz/ADKs/1Qj//9UI///VCP///vv//8FAAP///XrAP/16wD/9esA//XrAP/16wAAAAr/1NTU/1Qj//9UI///ADKs/wAyrP8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wAyrP9UI///VCP//1Qj//9UI///1NTU/wIAAP//9esA//XrAP/16wD/9esABAUB//////8tAMj/LQDI/1Qj//9UI///ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv9UI///VCP//1Qj//9UI///VCP//1Qj///x6///AwEA///16wD/9esA//XrAP/16wAAAAH/1NTU/y0AyP8tAMj/LQDI/y0AyP8tAMj/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/y0AyP9UI///VCP//1Qj//9UI///VCP//9TU1P8HBAD///XrAP/16wD/9esA//XrAAAAA///////VCP//1Qj//8tAMj/LQDI/y0AyP8tAMj/LQDI/wApjv8AKY7/ACmO/wApjv8AKY7/ACmO/wApjv8AKY7/DBpK/wAALP9UI///VCP//y0AyP8tAMj/VCP//1Qj//9UI///8/D//wIBAP//9esA//XrAP/16wD/9esAAAAD/9TU1P9UI///VCP//1Qj//9UI///VCP//1Qj//9UI///VCP//1Qj//9UI///AAAR/wAACv8AAAr/AAAM/wAADf//9esA//XrAAAAHv9UI///VCP//1Qj//9UI///VCP//1Qj///U1NT/AAQC///16wD/9esA//XrAP/16wACAAT//////1Qj//9UI///VCP//1Qj//9UI///VCP//1Qj//8AADf/AAAn/wAAGf//9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAAAAGP8AACb/AAA3/1Qj//9UI///VCP///H0//8AAwH///XrAP/16wD/9esA//XrAP/16wAQEBD/AAAe/wAAJ/8AACn/VCP//1Qj//8AACf/AAAe///16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esABAAi/wAAJP8AACH/AAAH///16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wAAAAn/AAAM///16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA//XrAP/16wD/9esA8AAAD/AAAAfwAAAH4AAAB+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAeAAAADAAAAAQAAAAEAAAAAAAAAAIAAAADgAAAA8AAAAeAAAAfgAAAP4AAAD+AAAAfgAAAD4AAAA8AAAAPAAAADwAAAA8AAGAPAA/wD4B//h/5///8="},e87e:function(A,w,P){}}]);