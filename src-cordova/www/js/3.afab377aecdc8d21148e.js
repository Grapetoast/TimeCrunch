webpackJsonp([3],{J7gT:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.main[data-v-33201161] {\n  height: 500px;\n  width: 100%;\n  margin-top: 120px;\n}\nh1[data-v-33201161] {\n  color: #c90c2e;\n  text-align: center;\n}\nselect option[data-default][data-v-33201161] {\n  color: #888;\n}\nbutton[data-v-33201161] {\n  background: #323d38;\n  color: #fff;\n  border: none;\n  font-size: 1.5em;\n  margin-left: 10px;\n  border-radius: 5px;\n}\ninput[data-v-33201161] {\n  border: 1px solid #323d38;\n  width: 90%;\n  margin-left: 5%;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.role[data-v-33201161] {\n  border: 1px solid #323d38;\n  width: 90%;\n  margin-left: 5%;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.togglePass[data-v-33201161] {\n  width: 50%;\n  margin-left: 20px;\n}\n.submitRegister[data-v-33201161] {\n  width: 35%;\n}\n.submitCompany[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.submitEmployee[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.companyRegisterButton[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-left: 5%;\n}\n.employeeRegisterButton[data-v-33201161] {\n  width: 90%;\n  height: 50px;\n  margin-top: 20px;\n  margin-left: 5%;\n  font-size: 1.2em;\n}\n.back[data-v-33201161] {\n  width: 50%;\n  margin-left: 20px;\n  margin-top: 10px;\n}\n",""])},S2NW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("mtWM"),o=n.n(a),s={name:"Register",props:["logged","user"],data:function(){return{modal:"",showPass:!1,email:"",password:"",name:"",company:!1,companyId:"",companyName:"",error:!1,taken:!1}},methods:{registerUser:function(){var e=this;!0===e.company&&o.a.post("http://54.186.69.46:81/companys",{companyId:e.companyId,companyName:e.companyName}).then(function(){e.error=!1}).catch(function(t){console.log(t),e.error=!0}),o.a.post("http://54.186.69.46:81/users",{email:e.email,password:e.password,name:e.name,companyId:e.companyId,admin:e.company}).then(function(t){console.log(t.data.token),e.$emit("register",t)}).catch(function(t){console.log(t),e.error=!0})},submitCompanyId:function(){var e=this;o.a.get("http://54.186.69.46:81/companys/"+e.companyId).then(function(t){e.companyName=t.data[0].companyName,e.modal="register",e.company=!1,e.error=!1}).catch(function(t){console.log(t),e.error=!0})},submitCompany:function(){var e=this;o.a.get("http://54.186.69.46:81/companys/"+e.companyId).then(function(t){console.log(t.data.length),0===t.data.length?(e.company=!0,e.modal="register"):e.taken=!0}).catch(function(e){console.log(e)})}}},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main"},["register"===e.modal?n("div",{staticClass:"registerModal"},[n("h1",[e._v("Register")]),e._v(" "),e.error?n("h3",[e._v("Missing Inputs")]):e._e(),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"name",attrs:{placeholder:"First Name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"email",attrs:{placeholder:"user@example.com"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e._v(" "),e.showPass?e._e():n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"password",attrs:{placeholder:"*********",type:"password"},domProps:{value:e.password},on:{keypress:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.registerUser(t):null},input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),e.showPass?n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"password",attrs:{placeholder:"*********"},domProps:{value:e.password},on:{keypress:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.registerUser(t):null},input:function(t){t.target.composing||(e.password=t.target.value)}}}):e._e(),e._v(" "),e.showPass?e._e():n("button",{staticClass:"togglePass",on:{click:function(t){e.showPass=!e.showPass}}},[e._v("Show Password")]),e._v(" "),e.showPass?n("button",{staticClass:"togglePass",on:{click:function(t){e.showPass=!e.showPass}}},[e._v("Hide Password")]):e._e(),e._v(" "),n("button",{staticClass:"submitRegister",on:{click:e.registerUser}},[e._v("Submit")]),e._v(" "),n("button",{staticClass:"back",on:{click:function(t){e.modal="",e.error=!1}}},[e._v("Back")])]):"employee"===e.modal?n("div",{staticClass:"employeeRegister"},[n("h1",[e._v("Enter Company Code")]),e._v(" "),e.error?n("h3",[e._v("Wrong Code")]):e._e(),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.companyId,expression:"companyId"}],staticClass:"companyCode",attrs:{placeholder:"Company Code"},domProps:{value:e.companyId},on:{input:function(t){t.target.composing||(e.companyId=t.target.value)}}}),e._v(" "),n("button",{staticClass:"submitEmployee",on:{click:e.submitCompanyId}},[e._v("Submit")]),e._v(" "),n("button",{staticClass:"back",on:{click:function(t){e.modal="",e.error=!1}}},[e._v("Back")])]):"company"===e.modal?n("div",{staticClass:"companyRegister"},[n("h1",[e._v("Enter Company Information")]),e._v(" "),e.error?n("h3",[e._v("Missing Inputs")]):e._e(),e._v(" "),e.taken?n("h3",[e._v("Company Code Taken")]):e._e(),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.companyId,expression:"companyId"}],staticClass:"companyCode",attrs:{placeholder:"Company Code"},domProps:{value:e.companyId},on:{input:function(t){t.target.composing||(e.companyId=t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.companyName,expression:"companyName"}],staticClass:"companyName",attrs:{placeholder:"Company Name"},domProps:{value:e.companyName},on:{input:function(t){t.target.composing||(e.companyName=t.target.value)}}}),e._v(" "),n("button",{staticClass:"submitCompany",on:{click:e.submitCompany}},[e._v("Submit")]),e._v(" "),n("button",{staticClass:"back",on:{click:function(t){e.modal="",e.error=!1}}},[e._v("Back")])]):n("div",{staticClass:"chooseRegister"},[n("h1",[e._v("Are you Registering a New Company?")]),e._v(" "),n("button",{staticClass:"companyRegisterButton",on:{click:function(t){e.modal="company"}}},[e._v("Yes")]),e._v(" "),n("button",{staticClass:"employeeRegisterButton",on:{click:function(t){e.modal="employee"}}},[e._v("No (Must have a company Code)")]),e._v(" "),n("button",{staticClass:"back",on:{click:function(t){e.$router.push("/login")}}},[e._v("Back")])])])},r=[];i._withStripped=!0;var m=n("XyMi"),c=!1;var p=function(e){c||n("SUff")},l=Object(m.a)(s,i,r,!1,p,"data-v-33201161",null);l.options.__file="src\\pages\\Register.vue";t.default=l.exports},SUff:function(e,t,n){var a=n("J7gT");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n("rjj0").default)("6d8db02b",a,!1,{})}});