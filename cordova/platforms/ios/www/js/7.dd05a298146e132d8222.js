webpackJsonp([7],{58:function(e,t,o){"use strict";function a(e){o(84)}Object.defineProperty(t,"__esModule",{value:!0});var s=o(72),r=o(86),i=o(3),n=a,l=i(s.a,r.a,!1,n,"data-v-3d9dc885",null);t.default=l.exports},72:function(e,t,o){"use strict";var a=o(14),s=o.n(a);t.a={name:"landing",data:function(){return{email:"",success:!1,wrong:!1}},methods:{subscribe:function(){var e=this,t=this;""!==t.email&&s.a.post("http://54.186.69.46:81/leads",{email:t.email.toLowerCase()}).then(function(e){t.success=!0}).catch(function(t){console.log(t),e.wrong=!0})}}}},84:function(e,t,o){var a=o(85);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);o(53)("00ac0fd1",a,!0,{})},85:function(e,t,o){t=e.exports=o(52)(!1),t.push([e.i,".main[data-v-3d9dc885]{margin-top:100px}h1[data-v-3d9dc885]{text-align:center;font-size:2em}p[data-v-3d9dc885]{margin-left:5%}h2[data-v-3d9dc885]{color:#c90c2e;margin-left:5%}.email[data-v-3d9dc885]{border:1px solid #323d38;margin-left:5%;height:25px;width:60%}.submit[data-v-3d9dc885]{margin-left:5%;background-color:#c90c2e;color:#fff;border:none;border-radius:5px;height:30px}",""])},86:function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"main"},[o("h1",[e._v("Time Crunch")]),e._v(" "),o("p",[e._v("\n    This is a paragraph meant to convert the user to input their email below.\n    lorem ipsum dolor est lorem ipsum dolor est lorem ipsum dolor est lorem ipsum dolor est.\n    lorem ipsum dolor est lorem ipsum dolor est, lorem ipsum dolor est lorem ipsum dolor est\n    lorem ipsum dolor est.\n  ")]),e._v(" "),e.success?o("h1",[e._v("Success!!!")]):e._e(),e._v(" "),e.wrong?o("h1",[e._v("Error")]):e._e(),e._v(" "),o("h2",[e._v("Sign up for News and Updates")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"email",attrs:{placeholder:"email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),o("button",{staticClass:"submit",on:{click:e.subscribe}},[e._v("Sign Up")])])},s=[],r={render:a,staticRenderFns:s};t.a=r}});