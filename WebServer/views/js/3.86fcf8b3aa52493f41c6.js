webpackJsonp([3],{S2NW:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("mtWM"),a=t.n(o),r={name:"Register",props:["logged","user"],data:function(){return{modal:"",showPass:!1,email:"",password:"",name:"",company:!1,payment:!1,companyId:"",companyName:"",stripeSource:"",error:!1,taken:!1,stripe:"",card:""}},methods:{registerUser:function(){var n=this;!0===n.company&&a.a.post("https://54.186.69.46:81/companys",{companyId:n.companyId,companyName:n.companyName}).then(function(){n.error=!1}).catch(function(e){console.log(e),n.error=!0}),a.a.post("https://54.186.69.46:81/users",{email:n.email,password:n.password,name:n.name,companyId:n.companyId,admin:n.company,payment:n.payment,stripeSource:n.stripeSource}).then(function(e){n.$emit("register",{token:e.data.token,id:e.data.userId,admin:e.data.admin})}).catch(function(e){console.log(e),n.error=!0})},submitCompanyId:function(){var n=this;a.a.get("https://54.186.69.46:81/companys/"+n.companyId).then(function(e){n.companyName=e.data[0].companyName,n.modal="register",n.company=!1,n.error=!1}).catch(function(e){console.log(e),n.error=!0})},submitCompany:function(){var n=this;a.a.get("https://54.186.69.46:81/companys/"+n.companyId).then(function(e){if(0===e.data.length){n.company=!0,n.modal="register";var t=window.Stripe("pk_live_dMLr0hShLxaZmXesv1buhndd");n.stripeSetup(t)}else n.taken=!0}).catch(function(n){console.log(n)})},stripeSetup:function(n){this.stripe=n;var e=n.elements();this.card=e.create("card",{style:{base:{color:"#32325d",lineHeight:"18px",fontFamily:'"Helvetica Neue", Helvetica, sans-serif',fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#aab7c4"}},invalid:{color:"#fa755a",iconColor:"#fa755a"}}}),this.card.mount("#card-element"),this.card.addEventListener("change",function(n){var e=document.getElementById("card-errors");n.error?e.textContent=n.error.message:e.textContent=""})},submitCard:function(){var n=this;n.stripe.createSource(n.card).then(function(e){e.error?(document.getElementById("card-errors").textContent=e.error.message,console.log(e.error)):n.stripeSourceHandler(e.source.id)})},stripeSourceHandler:function(n){this.stripeSource=n,this.payment=!0,this.registerUser()}}},i=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"main"},["register"===n.modal?t("div",{staticClass:"registerModal"},[t("h1",[n._v("Register")]),n._v(" "),n.error?t("h3",[n._v("Missing Inputs")]):n._e(),n._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.name,expression:"name"}],staticClass:"name",attrs:{placeholder:"First Name"},domProps:{value:n.name},on:{input:function(e){e.target.composing||(n.name=e.target.value)}}}),n._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.email,expression:"email"}],staticClass:"email",attrs:{placeholder:"user@example.com"},domProps:{value:n.email},on:{input:function(e){e.target.composing||(n.email=e.target.value)}}}),n._v(" "),n.showPass?n._e():t("input",{directives:[{name:"model",rawName:"v-model",value:n.password,expression:"password"}],staticClass:"password",attrs:{placeholder:"*********",type:"password"},domProps:{value:n.password},on:{keypress:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.registerUser(e):null},input:function(e){e.target.composing||(n.password=e.target.value)}}}),n._v(" "),n.showPass?t("input",{directives:[{name:"model",rawName:"v-model",value:n.password,expression:"password"}],staticClass:"password",attrs:{placeholder:"*********"},domProps:{value:n.password},on:{keypress:function(e){return"button"in e||!n._k(e.keyCode,"enter",13,e.key,"Enter")?n.registerUser(e):null},input:function(e){e.target.composing||(n.password=e.target.value)}}}):n._e()]):"employee"===n.modal?t("div",{staticClass:"employeeRegister"},[t("h1",[n._v("Enter Company Code")]),n._v(" "),n.error?t("h3",[n._v("Wrong Code")]):n._e(),n._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.companyId,expression:"companyId"}],staticClass:"companyCode",attrs:{placeholder:"Company Code"},domProps:{value:n.companyId},on:{input:function(e){e.target.composing||(n.companyId=e.target.value)}}}),n._v(" "),t("button",{staticClass:"submitEmployee",on:{click:n.submitCompanyId}},[n._v("Submit")]),n._v(" "),t("button",{staticClass:"back",on:{click:function(e){n.modal="",n.error=!1}}},[n._v("Back")])]):"company"===n.modal?t("div",{staticClass:"companyRegister"},[t("h1",[n._v("Enter Company Information")]),n._v(" "),n.error?t("h3",[n._v("Missing Inputs")]):n._e(),n._v(" "),n.taken?t("h3",[n._v("Company Code Taken")]):n._e(),n._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.companyId,expression:"companyId"}],staticClass:"companyCode",attrs:{placeholder:"Company Code"},domProps:{value:n.companyId},on:{input:function(e){e.target.composing||(n.companyId=e.target.value)}}}),n._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:n.companyName,expression:"companyName"}],staticClass:"companyName",attrs:{placeholder:"Company Name"},domProps:{value:n.companyName},on:{input:function(e){e.target.composing||(n.companyName=e.target.value)}}}),n._v(" "),t("button",{staticClass:"submitCompany",on:{click:n.submitCompany}},[n._v("Submit")]),n._v(" "),t("button",{staticClass:"back",on:{click:function(e){n.modal="",n.error=!1}}},[n._v("Back")])]):t("div",{staticClass:"chooseRegister"},[t("h1",[n._v("Are you Registering a New Company?")]),n._v(" "),t("button",{staticClass:"companyRegisterButton",on:{click:function(e){n.modal="company"}}},[n._v("Yes")]),n._v(" "),t("div",{staticClass:"exception"},[t("button",{staticClass:"employeeRegisterButton",on:{click:function(e){n.modal="employee"}}},[n._v("No")]),n._v(" "),t("h4",[n._v("*Must have a company Code")])]),n._v(" "),t("button",{staticClass:"back",on:{click:function(e){n.$router.push("/login")}}},[n._v("Back")])]),n._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:"register"===n.modal,expression:"modal==='register'"}]},[n._m(0),n._v(" "),n.showPass?n._e():t("button",{staticClass:"togglePass",on:{click:function(e){n.showPass=!n.showPass}}},[n._v("Show Password")]),n._v(" "),n.showPass?t("button",{staticClass:"togglePass",on:{click:function(e){n.showPass=!n.showPass}}},[n._v("Hide Password")]):n._e(),n._v(" "),t("button",{staticClass:"back",on:{click:function(e){n.modal="",n.error=!1}}},[n._v("Back")]),n._v(" "),t("button",{staticClass:"submitRegister",on:{click:n.submitCard}},[n._v("Submit")])])])},s=[function(){var n=this.$createElement,e=this._self._c||n;return e("div",{staticClass:"form-row"},[e("div",{attrs:{id:"card-element"}}),this._v(" "),e("div",{attrs:{id:"card-errors",role:"alert"}})])}];i._withStripped=!0;var A=t("XyMi"),d=!1;var m=function(n){d||t("vd0P")},p=Object(A.a)(r,i,s,!1,m,"data-v-33201161",null);p.options.__file="src\\pages\\Register.vue";e.default=p.exports},"h/iS":function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,".main[data-v-33201161]{height:500px;width:100%;margin-top:120px}h1[data-v-33201161]{color:#c90c2e;text-align:center;font-size:2.5em;margin:0;width:80%;margin-left:10%;margin-top:200px;margin-bottom:20px}select option[data-default][data-v-33201161]{color:#888}.StripeElement[data-v-33201161]{background-color:#fff;height:40px;width:90%;margin-left:5%;padding:10px 12px;border:1px solid #323d38;box-shadow:0 1px 3px 0 #e6ebf1;transition:box-shadow .15s ease}.StripeElement--focus[data-v-33201161]{box-shadow:0 1px 3px 0 #cfd7df}.StripeElement--invalid[data-v-33201161]{border-color:#323d38}.StripeElement--webkit-autofill[data-v-33201161]{background-color:#fefde5!important}button[data-v-33201161]{background:#323d38;color:#fff;border:none;font-size:1.5em;margin-left:10px;border-radius:5px}input[data-v-33201161]{border:1px solid #323d38;border-radius:0}.role[data-v-33201161],input[data-v-33201161]{width:90%;margin-left:5%;height:40px;margin-bottom:10px}.role[data-v-33201161]{border:1px solid #323d38}.togglePass[data-v-33201161]{width:50%;margin-left:20px}.submitRegister[data-v-33201161]{width:90%;height:40px;margin-left:5%;margin-top:10px}.companyRegisterButton[data-v-33201161],.submitCompany[data-v-33201161],.submitEmployee[data-v-33201161]{width:90%;height:50px;margin-left:5%}.exception[data-v-33201161]{width:90%;margin-left:5%;display:-ms-grid;display:grid;-ms-grid-rows:50px 20px;grid-template-rows:50px 20px;-ms-grid-columns:1fr 1fr;grid-template-columns:1fr 1fr}.employeeRegisterButton[data-v-33201161]{-ms-grid-row:1;grid-row:1;-ms-grid-column:1;grid-column-start:1;grid-column-end:4;height:50px;margin:0;margin-top:10px}h4[data-v-33201161]{-ms-grid-row:2;grid-row:2;-ms-grid-column:3;grid-column:3;font-size:.9em;margin:0;color:#c90c2e}.back[data-v-33201161]{width:34%;margin-left:5%;margin-top:10px;background-color:#c90c2e}","",{version:3,sources:["C:/Users/admin/Documents/Coding/Quasar/Time-Crunch/src/pages/C:/Users/admin/Documents/Coding/Quasar/Time-Crunch/src/pages/Register.vue","C:/Users/admin/Documents/Coding/Quasar/Time-Crunch/src/pages/Register.vue"],names:[],mappings:"AAiME,uBACE,aAAA,AACA,WAAA,AACA,gBAAA,CChMH,ADmMC,oBACE,cAAA,AACA,kBAAA,AACA,gBAAA,AACA,SAAA,AACA,UAAA,AACA,gBAAA,AACA,iBAAA,AACA,kBAAA,CCjMH,ADoMC,6CACE,UAAA,CClMH,ADqMD,gCACE,sBAAA,AACA,YAAA,AACA,UAAA,AACA,eAAA,AACA,kBAAA,AACA,yBAAA,AACA,+BAAA,AAEA,+BAAA,CCnMD,ADsMD,uCACE,8BAAA,CCpMD,ADuMD,yCACE,oBAAA,CCrMD,ADwMD,iDACE,kCAAA,CCtMD,ADyMC,wBACE,mBAAA,AACA,WAAA,AACA,YAAA,AACA,gBAAA,AACA,iBAAA,AACA,iBAAA,CCvMH,AD0MC,uBACE,yBAAA,AAGA,eAAA,CCtMH,AD2MC,8CAPE,UAAA,AACA,eAAA,AAEA,YAAA,AACA,kBAAA,CCjMH,ADoMC,uBACE,wBAAA,CCrMH,AD4MC,6BACE,UAAA,AACA,gBAAA,CC1MH,AD6MC,iCACE,UAAA,AACA,YAAA,AACA,eAAA,AACA,eAAA,CC3MH,AD0NC,yGACE,UAAA,AACA,YAAA,AACA,cAAA,CC9MH,ADiNC,4BACE,UAAA,AACA,eAAA,AACA,iBAAA,aAAA,AACA,wBAAA,6BAAA,AACA,yBAAA,6BAAA,CC/MH,ADkNC,yCACE,eAAA,WAAA,AACA,kBAAA,oBAAA,AACA,kBAAA,AACA,YAAA,AACA,SAAA,AACA,eAAA,CChNH,ADmNC,oBACE,eAAA,WAAA,AACA,kBAAA,cAAA,AACA,eAAA,AACA,SAAA,AACA,aAAA,CCjNH,ADoNC,uBACE,UAAA,AACA,eAAA,AACA,gBAAA,AACA,wBAAA,CClNH",file:"Register.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@red: #c90c2e;\n@grey: #323d38;\n\n  .main {\n    height: 500px;\n    width: 100%;\n    margin-top: 120px;\n  }\n\n  h1 {\n    color: @red;\n    text-align: center;\n    font-size: 2.5em;\n    margin: 0;\n    width: 80%;\n    margin-left: 10%;\n    margin-top: 200px;\n    margin-bottom: 20px;\n  }\n\n  select option[data-default] {\n    color: #888;\n  }\n\n.StripeElement {\n  background-color: white;\n  height: 40px;\n  width: 90%;\n  margin-left: 5%;\n  padding: 10px 12px;\n  border: 1px solid @grey;\n  box-shadow: 0 1px 3px 0 #e6ebf1;\n  -webkit-transition: box-shadow 150ms ease;\n  transition: box-shadow 150ms ease;\n}\n\n.StripeElement--focus {\n  box-shadow: 0 1px 3px 0 #cfd7df;\n}\n\n.StripeElement--invalid {\n  border-color: @grey;\n}\n\n.StripeElement--webkit-autofill {\n  background-color: #fefde5 !important;\n}\n\n  button {\n    background:  @grey;\n    color: #fff;\n    border: none;\n    font-size: 1.5em;\n    margin-left: 10px;\n    border-radius: 5px;\n  }\n\n  input {\n    border: 1px solid @grey;\n    width: 90%;\n    margin-left: 5%;\n    border-radius: 0;\n    height: 40px;\n    margin-bottom: 10px;\n  }\n\n  .role {\n    border: 1px solid @grey;\n    width: 90%;\n    margin-left: 5%;\n    height: 40px;\n    margin-bottom: 10px;\n  }\n\n  .togglePass {\n    width: 50%;\n    margin-left: 20px;\n  }\n\n  .submitRegister {\n    width: 90%;\n    height: 40px;\n    margin-left: 5%;\n    margin-top: 10px;\n  }\n\n  .submitCompany {\n    width: 90%;\n    height: 50px;\n    margin-left: 5%;\n  }\n\n  .submitEmployee {\n    width: 90%;\n    height: 50px;\n    margin-left: 5%;\n  }\n\n  .companyRegisterButton {\n    width: 90%;\n    height: 50px;\n    margin-left: 5%;\n  }\n\n  .exception {\n    width: 90%;\n    margin-left: 5%;\n    display: grid;\n    grid-template-rows: 50px 20px;\n    grid-template-columns: 1fr 1fr;\n  }\n\n  .employeeRegisterButton {\n    grid-row: 1;\n    grid-column-start: 1;\n    grid-column-end: 4;\n    height: 50px;\n    margin: 0;\n    margin-top: 10px;\n  }\n\n  h4 {\n    grid-row: 2;\n    grid-column: 3;\n    font-size: 0.9em;\n    margin: 0;\n    color: @red;\n  }\n\n  .back {\n    width: 34%;\n    margin-left: 5%;\n    margin-top: 10px;\n    background-color: @red;\n  }\n\n  @media (min-width: 700px) {\n  }\n",".main {\n  height: 500px;\n  width: 100%;\n  margin-top: 120px;\n}\nh1 {\n  color: #c90c2e;\n  text-align: center;\n  font-size: 2.5em;\n  margin: 0;\n  width: 80%;\n  margin-left: 10%;\n  margin-top: 200px;\n  margin-bottom: 20px;\n}\nselect option[data-default] {\n  color: #888;\n}\n.StripeElement {\n  background-color: white;\n  height: 40px;\n  width: 90%;\n  margin-left: 5%;\n  padding: 10px 12px;\n  border: 1px solid #323d38;\n  box-shadow: 0 1px 3px 0 #e6ebf1;\n  -webkit-transition: box-shadow 150ms ease;\n  transition: box-shadow 150ms ease;\n}\n.StripeElement--focus {\n  box-shadow: 0 1px 3px 0 #cfd7df;\n}\n.StripeElement--invalid {\n  border-color: #323d38;\n}\n.StripeElement--webkit-autofill {\n  background-color: #fefde5 !important;\n}\nbutton {\n  background: #323d38;\n  color: #fff;\n  border: none;\n  font-size: 1.5em;\n  margin-left: 10px;\n  border-radius: 5px;\n}\ninput {\n  border: 1px solid #323d38;\n  width: 90%;\n  margin-left: 5%;\n  border-radius: 0;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.role {\n  border: 1px solid #323d38;\n  width: 90%;\n  margin-left: 5%;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.togglePass {\n  width: 50%;\n  margin-left: 20px;\n}\n.submitRegister {\n  width: 90%;\n  height: 40px;\n  margin-left: 5%;\n  margin-top: 10px;\n}\n.submitCompany {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.submitEmployee {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.companyRegisterButton {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.exception {\n  width: 90%;\n  margin-left: 5%;\n  display: grid;\n  grid-template-rows: 50px 20px;\n  grid-template-columns: 1fr 1fr;\n}\n.employeeRegisterButton {\n  grid-row: 1;\n  grid-column-start: 1;\n  grid-column-end: 4;\n  height: 50px;\n  margin: 0;\n  margin-top: 10px;\n}\nh4 {\n  grid-row: 2;\n  grid-column: 3;\n  font-size: 0.9em;\n  margin: 0;\n  color: #c90c2e;\n}\n.back {\n  width: 34%;\n  margin-left: 5%;\n  margin-top: 10px;\n  background-color: #c90c2e;\n}\n"],sourceRoot:""}])},vd0P:function(n,e,t){var o=t("h/iS");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);(0,t("rjj0").default)("059028da",o,!1,{})}});
//# sourceMappingURL=3.86fcf8b3aa52493f41c6.js.map