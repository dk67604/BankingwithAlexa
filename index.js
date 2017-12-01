'use strict';
const Alexa = require('alexa-app');
const app = new Alexa.app('AlexaBanking');
const AlexaSkill = require('./AlexaSkills');
const alexaSkill = new AlexaSkill();
const _ = require('lodash');
let fullStory = '';
let bodyStarterDetails = {};
let nextQueryPrompt = '';
app.launch((req, res) => {
  const prompt = 'Welcome to the CapitalOne Alexa Banking app.';
  const reprompt = 'I\'m confused. Try again.';
  res.say(prompt).reprompt(reprompt).shouldEndSession(false);
});
app.intent('openBankAccount',{
  "slots": {},
  "utterances": ["Open a bank account"]
},function(req,res){
  const reprompt = 'You can ask me to perform any banking services like' +
      'Say, open a bank account';
  nextQueryPrompt='Let me check with Capital One, Please say one of these 3 account types'+'1, 360 Savings'+','+'2, 360 Money Market'+','+'3, 360 CD';
  res.say(nextQueryPrompt).reprompt(reprompt).shouldEndSession(false);
});
app.intent('selectAccountType',{
  "slots":{"ACCOUNT":"AMAZON.NUMBER",},
  "utterances":["I would like to choose {ACCOUNT}"]
},function(req,res){
  const accountType = req.slot('ACCOUNT');
    const reprompt = 'You have to choose the corresponding option number of your account type';
    if (_.isEmpty(accountType)) {
        const prompt = 'I\'m confused. Try again.';
        res.say(`${prompt} ${reprompt}`).reprompt(reprompt).shouldEndSession(false);
        return true;
      }
  if(accountType>3){
    const reprompt = 'You have to choose between 1 and 3';
    const prompt='You have to choose between 1 and 3';
    res.say(`${prompt} ${reprompt}`).reprompt(reprompt).shouldEndSession(false);
    return true;
  }else{
    alexaSkill.getSchema(function(schema){
      bodyStarterDetails=schema;
      res.session('accountype',accountType);
      res.session('query','firstName');
      nextQueryPrompt='I need the following information for the chosen option, What is your first name';
      res.say(nextQueryPrompt).reprompt(reprompt).shouldEndSession(false);
    });
  }
});
app.intent(('info'),{
  "slots":{"WORD":"AMAZON.LITERAL"},
  "utterances":["{John|WORD}"]
},function(req,res){
  const word = req.slot('WORD');
  const query = req.session('query');
  if (!query) {
     const prompt = 'Hmm. I need a valid input';
     const reprompt = 'You can say open a bank account'
     res.say(`${prompt} ${reprompt}`).reprompt(reprompt).shouldEndSession(false);
     return true;
   }
   if (_.isEmpty(word)) {
      const prompt = 'Hmm. I\'m not sure what you said. Try again.';
      res.say(`${prompt} ${nextQueryPrompt}`).reprompt(nextQueryPrompt).shouldEndSession(false);
      return true;
    }else{
      bodyStarterDetails[query]=word;
      let nextQuery = '';
     Object.keys(bodyStarterDetails).some(key => {
       nextQuery = key;
       return bodyStarterDetails[key] === 'N/A';
     });
     if (nextQuery === res.session('query')) {
       //endGame(res, res.session('story'));
       res.say('Congratulations').shouldEndSession(true).send();
       var session = req.getSession()
       session.clear();
       return false;
     }
     res.session('query', nextQuery);
     nextQueryPrompt = `Say a ${nextQuery}.`;
     res.say(nextQueryPrompt).shouldEndSession(false).send();
     return false;
    }
});
app.intent("dob",{"slots":{"DATE":"AMAZON.DATE"},
"utterances":["My dob is {DATE}"]
},function(req,res){
  var date=req.slot('DATE');
  const query = req.session('query');
  if (_.isEmpty(date)) {
     const prompt = 'Hmm. I\'m not sure what you said. Try again.';
     res.say(`${prompt} ${nextQueryPrompt}`).reprompt(nextQueryPrompt).shouldEndSession(false);
     return true;
   }
  else{
  bodyStarterDetails[query]=date;
  let nextQuery = '';
  Object.keys(bodyStarterDetails).some(key => {
   nextQuery = key;
   return bodyStarterDetails[key] === 'N/A';
 });
 if (nextQuery === res.session('query')) {
   //endGame(res, res.session('story'));
   res.say('Congratulations').shouldEndSession(true).send();
   var session = req.getSession()
   session.clear();
   return false;
 }
 res.session('query', nextQuery);
 nextQueryPrompt = `Say a ${nextQuery}.`;
 res.say(nextQueryPrompt).shouldEndSession(false).send();
 return false;
  }
});
app.intent("phonenumber",{"slots":{"PHONE":"AMAZON.NUMBER"},
"utterances":["My phone number is {PHONE}"]
},function(req,res){
  var phone=req.slot('PHONE');
  const query = req.session('query');
  if (_.isEmpty(phone)) {
     const prompt = 'Hmm. I\'m not sure what you said. Try again.';
     res.say(`${prompt} ${nextQueryPrompt}`).reprompt(nextQueryPrompt).shouldEndSession(false);
     return true;
   }
  else{
  bodyStarterDetails[query]=phone;
  let nextQuery = '';
  Object.keys(bodyStarterDetails).some(key => {
   nextQuery = key;
   return bodyStarterDetails[key] === 'N/A';
 });
 if (nextQuery === res.session('query')) {
   //endGame(res, res.session('story'));
   res.say('Congratulations').shouldEndSession(true).send();
   var session = req.getSession()
   session.clear();
   return false;
 }
 res.session('query', nextQuery);
 nextQueryPrompt = `Say a ${nextQuery}.`;
 res.say(nextQueryPrompt).shouldEndSession(false).send();
 return false;
  }
});
app.intent("fundingamount",{"slots":{"FA":"AMAZON.NUMBER"},
"utterances":["My funding  is {FA}"]
},function(req,res){
  var fa=req.slot('FA');
  const query = req.session('query');
  if (_.isEmpty(fa)) {
     const prompt = 'Hmm. I\'m not sure what you said. Try again.';
     res.say(`${prompt} ${nextQueryPrompt}`).reprompt(nextQueryPrompt).shouldEndSession(false);
     return true;
   }
  else{
  bodyStarterDetails[query]=fa;
  let nextQuery = '';
  Object.keys(bodyStarterDetails).some(key => {
   nextQuery = key;
   return bodyStarterDetails[key] === 'N/A';
 });
 if (nextQuery === res.session('query')) {
   //endGame(res, res.session('story'));
   res.say('Congratulations').shouldEndSession(true).send();
   var session = req.getSession()
   session.clear();
   return false;
 }
 res.session('query', nextQuery);
 nextQueryPrompt = `Say a ${nextQuery}.`;
 res.say(nextQueryPrompt).shouldEndSession(false).send();
 return false;
  }
});
app.error = (exception) => {
  console.log(exception);
  throw exception;
};
app.intent("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": []
  },
  function(request, response) {
    var helpOutput = "You can say 'some statement' or ask 'some question'. You can also say stop or exit to quit.";
    var reprompt = "What would you like to do?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
  }
);
app.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var stopOutput = "Don't You Worry. I'll be back.";
    response.say(stopOutput);
  }
);
app.intent("AMAZON.CancelIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var cancelOutput = "No problem. Request cancelled.";
    response.say(cancelOutput);
  }
);
module.exports = app;