
'use strict';

var requestBody=require('./requestSchema.js');

function AlexaSkill() {
}

// AlexaSkill.prototype.sayHello = function (name, cb) {
//
//   cb(null, 'Welcome to CapitalOne Banking');
// };

AlexaSkill.prototype.getSchema=function(callback){
  callback(requestBody['saving'].obj);
}

module.exports = AlexaSkill;
