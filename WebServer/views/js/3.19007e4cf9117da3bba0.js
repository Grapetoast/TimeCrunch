webpackJsonp([3],{J7gT:function(e,n,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n.main[data-v-33201161] {\n  height: 500px;\n  width: 100%;\n  margin-top: 120px;\n}\nh1[data-v-33201161] {\n  color: #c90c2e;\n  text-align: center;\n  font-size: 2.5em;\n  margin: 0;\n  width: 80%;\n  margin-left: 10%;\n  margin-top: 200px;\n  margin-bottom: 20px;\n}\nselect option[data-default][data-v-33201161] {\n  color: #888;\n}\n.StripeElement[data-v-33201161] {\n  background-color: white;\n  height: 40px;\n  width: 90%;\n  margin-left: 5%;\n  padding: 10px 12px;\n  border: 1px solid #323d38;\n  box-shadow: 0 1px 3px 0 #e6ebf1;\n  transition: box-shadow 150ms ease;\n}\n.StripeElement--focus[data-v-33201161] {\n  box-shadow: 0 1px 3px 0 #cfd7df;\n}\n.StripeElement--invalid[data-v-33201161] {\n  border-color: #323d38;\n}\n.StripeElement--webkit-autofill[data-v-33201161] {\n  background-color: #fefde5 !important;\n}\nbutton[data-v-33201161] {\n  background: #323d38;\n  color: #fff;\n  border: none;\n  font-size: 1.5em;\n  margin-left: 10px;\n  border-radius: 5px;\n}\ninput[data-v-33201161] {\n  border: 1px solid #323d38;\n  width: 90%;\n  margin-left: 5%;\n  border-radius: 0;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.role[data-v-33201161] {\n  border: 1px solid #323d38;\n  width: 90%;\n  margin-left: 5%;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.togglePass[data-v-33201161] {\n  width: 50%;\n  margin-left: 20px;\n}\n.submitRegister[data-v-33201161] {\n  width: 90%;\n  height: 40px;\n  margin-left: 5%;\n  margin-top: 10px;\n}\n.submitCompany[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.submitEmployee[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.companyRegisterButton[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.exception[data-v-33201161] {\n  width: 90%;\n  margin-left: 5%;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-rows: 50px 20px;\n      grid-template-rows: 50px 20px;\n  -ms-grid-columns: 1fr 1fr;\n      grid-template-columns: 1fr 1fr;\n}\n.employeeRegisterButton[data-v-33201161] {\n  -ms-grid-row: 1;\n      grid-row: 1;\n  -ms-grid-column: 1;\n      grid-column-start: 1;\n  grid-column-end: 4;\n  height: 50px;\n  margin: 0;\n  margin-top: 10px;\n}\nh4[data-v-33201161] {\n  -ms-grid-row: 2;\n      grid-row: 2;\n  -ms-grid-column: 3;\n      grid-column: 3;\n  font-size: 0.9em;\n  margin: 0;\n  color: #c90c2e;\n}\n.back[data-v-33201161] {\n  width: 34%;\n  margin-left: 5%;\n  margin-top: 10px;\n  background-color: #c90c2e;\n}\n",""])},S2NW:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("mtWM"),o=t.n(a),s={name:"Register",props:["logged","user"],data:function(){return{modal:"",showPass:!1,email:"",password:"",name:"",company:!1,payment:!1,companyId:"",companyName:"",stripeSource:"",error:!1,taken:!1,stripe:"",card:""}},methods:{registerUser:function(){var e=this;!0===e.company&&o.a.post("https://54.186.69.46:81/companys",{companyId:e.companyId,companyName:e.companyName}).then(function(){e.error=!1}).catch(function(n){console.log(n),e.error=!0}),o.a.post("https://54.186.69.46:81/users",{email:e.email,password:e.password,name:e.name,companyId:e.companyId,admin:e.company,payment:e.payment,stripeSource:e.stripeSource}).then(function(n){console.log(n.data.token),e.$emit("register",n)}).catch(function(n){console.log(n),e.error=!0})},submitCompanyId:function(){var e=this;o.a.get("https://54.186.69.46:81/companys/"+e.companyId).then(function(n){e.companyName=n.data[0].companyName,e.modal="register",e.company=!1,e.error=!1}).catch(function(n){console.log(n),e.error=!0})},submitCompany:function(){var e=this;o.a.get("https://54.186.69.46:81/companys/"+e.companyId).then(function(n){if(console.log(n.data.length),0===n.data.length){e.company=!0,e.modal="register";var t=window.Stripe("pk_test_EUZwPeinKym4DDl0d9kMbrOw");e.stripeSetup(t)}else e.taken=!0}).catch(function(e){console.log(e)})},stripeSetup:function(e){this.stripe=e;var n=e.elements();this.card=n.create("card",{style:{base:{color:"#32325d",lineHeight:"18px",fontFamily:'"Helvetica Neue", Helvetica, sans-serif',fontSmoothing:"antialiased",fontSize:"16px","::placeholder":{color:"#aab7c4"}},invalid:{color:"#fa755a",iconColor:"#fa755a"}}}),this.card.mount("#card-element"),this.card.addEventListener("change",function(e){var n=document.getElementById("card-errors");e.error?n.textContent=e.error.message:n.textContent=""})},submitCard:function(){var e=this.stripe.createSource(this.card),n=e.source,t=e.error;t?(document.getElementById("card-errors").textContent=t.message,console.log(t)):(console.log("source"+n),this.stripeSourceHandler(n))},stripeSourceHandler:function(e){this.stripeSource=e,this.payment=!0,this.registerUser()}}},r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"main"},["register"===e.modal?t("div",{staticClass:"registerModal"},[t("h1",[e._v("Register")]),e._v(" "),e.error?t("h3",[e._v("Missing Inputs")]):e._e(),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"name",attrs:{placeholder:"First Name"},domProps:{value:e.name},on:{input:function(n){n.target.composing||(e.name=n.target.value)}}}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"email",attrs:{placeholder:"user@example.com"},domProps:{value:e.email},on:{input:function(n){n.target.composing||(e.email=n.target.value)}}}),e._v(" "),e.showPass?e._e():t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"password",attrs:{placeholder:"*********",type:"password"},domProps:{value:e.password},on:{keypress:function(n){return"button"in n||!e._k(n.keyCode,"enter",13,n.key,"Enter")?e.registerUser(n):null},input:function(n){n.target.composing||(e.password=n.target.value)}}}),e._v(" "),e.showPass?t("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"password",attrs:{placeholder:"*********"},domProps:{value:e.password},on:{keypress:function(n){return"button"in n||!e._k(n.keyCode,"enter",13,n.key,"Enter")?e.registerUser(n):null},input:function(n){n.target.composing||(e.password=n.target.value)}}}):e._e()]):"employee"===e.modal?t("div",{staticClass:"employeeRegister"},[t("h1",[e._v("Enter Company Code")]),e._v(" "),e.error?t("h3",[e._v("Wrong Code")]):e._e(),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.companyId,expression:"companyId"}],staticClass:"companyCode",attrs:{placeholder:"Company Code"},domProps:{value:e.companyId},on:{input:function(n){n.target.composing||(e.companyId=n.target.value)}}}),e._v(" "),t("button",{staticClass:"submitEmployee",on:{click:e.submitCompanyId}},[e._v("Submit")]),e._v(" "),t("button",{staticClass:"back",on:{click:function(n){e.modal="",e.error=!1}}},[e._v("Back")])]):"company"===e.modal?t("div",{staticClass:"companyRegister"},[t("h1",[e._v("Enter Company Information")]),e._v(" "),e.error?t("h3",[e._v("Missing Inputs")]):e._e(),e._v(" "),e.taken?t("h3",[e._v("Company Code Taken")]):e._e(),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.companyId,expression:"companyId"}],staticClass:"companyCode",attrs:{placeholder:"Company Code"},domProps:{value:e.companyId},on:{input:function(n){n.target.composing||(e.companyId=n.target.value)}}}),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.companyName,expression:"companyName"}],staticClass:"companyName",attrs:{placeholder:"Company Name"},domProps:{value:e.companyName},on:{input:function(n){n.target.composing||(e.companyName=n.target.value)}}}),e._v(" "),t("button",{staticClass:"submitCompany",on:{click:e.submitCompany}},[e._v("Submit")]),e._v(" "),t("button",{staticClass:"back",on:{click:function(n){e.modal="",e.error=!1}}},[e._v("Back")])]):t("div",{staticClass:"chooseRegister"},[t("h1",[e._v("Are you Registering a New Company?")]),e._v(" "),t("button",{staticClass:"companyRegisterButton",on:{click:function(n){e.modal="company"}}},[e._v("Yes")]),e._v(" "),t("div",{staticClass:"exception"},[t("button",{staticClass:"employeeRegisterButton",on:{click:function(n){e.modal="employee"}}},[e._v("No")]),e._v(" "),t("h4",[e._v("*Must have a company Code")])]),e._v(" "),t("button",{staticClass:"back",on:{click:function(n){e.$router.push("/login")}}},[e._v("Back")])]),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:"register"===e.modal,expression:"modal==='register'"}]},[e._m(0),e._v(" "),e.showPass?e._e():t("button",{staticClass:"togglePass",on:{click:function(n){e.showPass=!e.showPass}}},[e._v("Show Password")]),e._v(" "),e.showPass?t("button",{staticClass:"togglePass",on:{click:function(n){e.showPass=!e.showPass}}},[e._v("Hide Password")]):e._e(),e._v(" "),t("button",{staticClass:"back",on:{click:function(n){e.modal="",e.error=!1}}},[e._v("Back")]),e._v(" "),t("button",{staticClass:"submitRegister",on:{click:e.submitCard}},[e._v("Submit")])])])},i=[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"form-row"},[n("div",{attrs:{id:"card-element"}}),this._v(" "),n("div",{attrs:{id:"card-errors",role:"alert"}})])}];r._withStripped=!0;var c=t("XyMi"),m=!1;var d=function(e){m||t("SUff")},l=Object(c.a)(s,r,i,!1,d,"data-v-33201161",null);l.options.__file="src\\pages\\Register.vue";n.default=l.exports},SUff:function(e,n,t){var a=t("J7gT");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,t("rjj0").default)("6d8db02b",a,!1,{})}});