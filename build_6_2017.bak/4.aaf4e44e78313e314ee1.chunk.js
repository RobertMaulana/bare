webpackJsonp([4],{648:function(t,e,r){"use strict";function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;switch(e.type){case u.a:return t.set("status","SUBMIT_FORM_REQUEST").set("submitted",!1).set("error",!1);case u.b:return t.set("status","SUBMIT_FORM_SUCCESS").set("submitted",!0).set("error",!1);case u.c:return t.set("status","SUBMIT_FORM_FAILURE").set("submitted",!1).set("error",!0);case u.d:return t.set("fullBenefits",e.data>=2012);case u.e:return t.set("ipAddress",!1);case u.f:return t.set("ipAddress",e.data);case u.g:return t.set("status","SUBMIT_FORM_EMPTY").set("submitted",!1);default:return t}}var n=r(64),u=(r.n(n),r(654)),S=r.i(n.fromJS)({status:"SUBMIT_FORM_EMPTY",submitted:!1,error:!1,ipAddress:!1,fullBenefits:!0});e["default"]=s},654:function(t,e,r){"use strict";r.d(e,"a",function(){return s}),r.d(e,"b",function(){return n}),r.d(e,"c",function(){return u}),r.d(e,"d",function(){return S}),r.d(e,"e",function(){return d}),r.d(e,"f",function(){return i}),r.d(e,"g",function(){return a});var s="SUBMIT_FORM_REQUEST",n="SUBMIT_FORM_SUCCESS",u="SUBMIT_FORM_FAILURE",S="UPDATE_VEHICLE_YEAR",d="IP_ADDRESS_REQUEST",i="IP_ADDRESS_SUCCESS",a="RESET_SUBMITTED"}});