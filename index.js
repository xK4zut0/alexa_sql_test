// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function


var lastname                 = "";
var semester                 = "";
var module                   = "";
var InformationSlotRaw       = "";
var names                    = ["Philipp", "Aljoscha", "Hanna", "Alex", "Schmolle", "Eric"];
var jahr1                    = "";
var array                    = [""];


// 2. Skill Code =======================================================================================================

const Alexa     = require('alexa-sdk');
const AWS       = require('aws-sdk');
const AWSregion = 'eu-west-1';





AWS.config.update({
    region: AWSregion
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234' // Set Id if neccessary;

    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        var random = Math.floor((Math.random() * 6) + 0);
        this.response.speak("Willkommen").listen('Versuch es nochmal');
        this.emit(':responseReady');
    },

    'SoS': function () {
          //this.response.speak("Mögliche Kommandos sind: 1: Wer hält die Vorlesung 'Name der Vorlesung' 2: In welchem Raum sitzt Professor 'Name des Professor' ").listen('Versuch es nochmal');
          this.response.speak("Zu einem späteren Zeitpunkt").listen('Versuch es noch einmal');
          this.emit(':responseReady');
    },


    'ModuleSemester': function(){

        module = this.event.request.intent.slots.Vorlesung.value;

        studiengang = this.event.request.intent.slots.Studiengang.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleSemester(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Die Vorlesung ' + module + 'im Studiengang ' + studiengang +' wird im: ' + finalMyResult + '. Semester gehalten';
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'ModuleInhalt': function(){

        module = this.event.request.intent.slots.Vorlesung.value;

        studiengang = this.event.request.intent.slots.Studiengang.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleInhalt(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Die Vorlesung ' + module + ' beschäftigt sich mit: ' + finalMyResult;
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'SemestertermineAnf': function(){

        semester = this.event.request.intent.slots.Semester.value;
        jahr1 = this.event.request.intent.slots.zahleins.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleSemestertermineAnf(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Das Semester ' + semester + ' beginnt am: ' + finalMyResult;
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'VorlesungstermineAnf': function(){

        semester = this.event.request.intent.slots.Semester.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleVorlesungstermineAnf(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Die Vorlesungen im ' + Semester + '. Semester beginnen am: ' + finalMyResult;
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'SemestertermineEnde': function(){

        semester = this.event.request.intent.slots.Semester.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleSemestertermineEnde(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Das ' + semester +'. Semester endet am: ' + finalMyResult;
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'VorlesungstermineEnde': function(){

        semester = this.event.request.intent.slots.Semester.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleVorlesungstermineEnde(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Die Vorlesungen im ' + semester + '. Semester enden am: ' + finalMyResult;
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'ModuleECTS': function(){

        module = this.event.request.intent.slots.Vorlesung.value;

        studiengang = this.event.request.intent.slots.Studiengang.value;

        console.log('MyQuestion : ' + InformationSlotRaw);

        readSQLItemModuleECTS(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Die Vorlesung: '+ module +' im Studiengang  ' + studiengang +' gibt ' + finalMyResult + ' ECTS';
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'ModuleProfs': function(){

        module = this.event.request.intent.slots.Vorlesung.value;


        readSQLItemModuleLecturer(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));
            say = 'Die Vorlesung: ' + module + ' wird von ' + finalMyResult + ' gehalten';
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'Mensaplan': function() {
        readMensaItem(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var stringifiedMyResult = JSON.stringify(myResult);
            var lengthToStartCuttingVege = stringifiedMyResult.search('vegetarian_meal');
            var lengthToStartCuttingOptional = stringifiedMyResult.search('optional_meal');
            console.log(lengthToStartCuttingOptional);
            console.log(lengthToStartCuttingVege);

            var result1 = stringifiedMyResult.replace('[{"day":"today","', '');
            var result2 = result1.replace('"', '');
            var result3 = result2.replace("complete_meal", " Haupt Essen");
            var finalResult3 = result3.slice(0, lengthToStartCuttingVege - 23);
            var result4 = result3.replace("vegetarian_meal", " Vegetarisch");
            var finalResult4 = result4.slice(result4.search("Vegetarisch"), lengthToStartCuttingOptional - 26);
            var result5 = result4.replace("optional_meal", " Wahl Essen");
            var finalResult5 = result5.slice(result5.search("Wahl Essen"), stringifiedMyResult.length - 2);
            var result6 = result5.replace(',"}]', '');

            say = result6;
            say = 'Heute gibt es als: ' + finalResult3 + '.' + ' für ' + finalResult4 + '.' + ' und als ' + finalResult5;
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });

    },

    'PersonenMail': function() {
      lastname = this.event.request.intent.slots.Name.value;
      var anrede = this.event.request.intent.slots.Anrede.value;


        readMailItem(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');
            var count = 0;

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));

            if (anrede == null){
                if(array.length == 1 ){
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider = array[0].replace(/.*@/, '');

                    if (emailProvider == "htwsaar.de"){
                    say = 'Die E-mail von ' + lastname + ' lautet: ' + emailName + ' @ h t w saar.de ';
                    } else {
                        say = 'Die E-mail von ' + lastname + ' lautet: ' + emailName + ' @ ' + emailProvider;
                    }

                } else if (array.length == 2){
                    var emailProvider = array[0].replace(/.*@/, '');
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider2 = array[1].replace(/.*@/, '');
                    var emailName2 = array[1].replace(/@.*/, '');

                    if (emailProvider == "htwsaar.de" && emailProvider2 == "htwsaar.de"){
                        say = 'Ich habe mehrere Einträge zu dem Namen ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ h t w saar.de'  + ' und die zweite: ' + emailName2 + ' @ h t w saar.de';
                    } else {

                    say = 'Ich habe mehrere Einträge zu dem Namen ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ ' + emailProvider + ' und die zweite: ' + emailName2 + ' @ ' + emailProvider2;
                }
                } else if (array.length == 3){
                    var emailProvider = array[0].replace(/.*@/, '');
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider2 = array[1].replace(/.*@/, '');
                    var emailName2 = array[1].replace(/@.*/, '');
                    var emailProvider3 = array[2].replace(/.*@/, '');
                    var emailName3 = array[2].replace(/@.*/, '');

                    say = 'Ich habe mehrere Einträge zu dem Namen ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ ' + emailProvider + ', die zweite E-mail: ' + emailName2 + ' @ ' + emailProvider2.charAt(0) + emailProvider2.charAt(1) + emailProvider2.charAt(2) + emailProvider2.substring(3, emailProvider2.length+1) + ' und die dritte: ' + emailName3 + '@ ' + emailProvider3;
                } else if (array.length == 4){
                    var emailProvider = array[0].replace(/.*@/, '');
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider2 = array[1].replace(/.*@/, '');
                    var emailName2 = array[1].replace(/@.*/, '');
                    var emailProvider3 = array[2].replace(/.*@/, '');
                    var emailName3 = array[2].replace(/@.*/, '');
                    var emailProvider4 = array[2].replace(/.*@/, '');
                    var emailName4 = array[2].replace(/@.*/, '');

                    // switch or if statement "do you want to hear all the entries"
                    say = 'Ich habe mehrere Einträge zu dem Namen ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ ' + emailProvider + ', die zweite: ' + emailName2 + ' @ ' + emailProvider2 + ', die dritte: ' + emailName3 + '@ ' + emailProvider3 + ', und die letzte E-mail: ' + emailName4 + emailProvider4;
                }

            //say = 'Die Email von ' + lastname + ' ist: ' + finalMyResult;

            } else {
                    if(array.length == 1 ){
                    var emailName = array[0].replace(/.*@/, '');
                    var emailProvider = array[0].replace(/@.*/, '');

                    say = 'Die E-mail von ' + anrede + ' ' + lastname + ' lautet: ' + emailName + ' @ ' + emailProvider;

                } else if (array.length == 2){
                    var emailProvider = array[0].replace(/.*@/, '');
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider2 = array[1].replace(/.*@/, '');
                    var emailName2 = array[1].replace(/@.*/, '');

                    if (emailProvider == "htwsaar.de" && emailProvider2 == "htwsaar.de"){
                        say = 'Ich habe mehrere Einträge zu ' + anrede + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ h t w saar.de'  + ' und die zweite: ' + emailName2 + ' @ h t w saar.de';
                    } else {

                    say = 'Ich habe mehrere Einträge zu dem Namen ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ ' + emailProvider + ' und die zweite: ' + emailName2 + ' @ ' + emailProvider2;
                }
                } else if (array.length == 3){
                    var emailProvider = array[0].replace(/.*@/, '');
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider2 = array[1].replace(/.*@/, '');
                    var emailName2 = array[1].replace(/@.*/, '');
                    var emailProvider3 = array[2].replace(/.*@/, '');
                    var emailName3 = array[2].replace(/@.*/, '');

                    say = 'Ich habe mehrere Einträge zu ' + anrede + ' ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ ' + emailProvider + ', die zweite E-mail: ' + emailName2 + ' @ ' + emailProvider2 + ' und die dritte: ' + emailName3 + ' @ ' + emailProvider3;
                } else if (array.length == 4){
                    var emailProvider = array[0].replace(/.*@/, '');
                    var emailName = array[0].replace(/@.*/, '');
                    var emailProvider2 = array[1].replace(/.*@/, '');
                    var emailName2 = array[1].replace(/@.*/, '');
                    var emailProvider3 = array[2].replace(/.*@/, '');
                    var emailName3 = array[2].replace(/@.*/, '');
                    var emailProvider4 = array[2].replace(/.*@/, '');
                    var emailName4 = array[2].replace(/@.*/, '');

                    // switch or if statement "do you want to hear all the entries"
                    say = 'Ich habe mehrere Einträge zu ' + anrede + ' ' + lastname + ' gefunden. Die erste E-mail lautet: ' + emailName + ' @ ' + emailProvider + ', die zweite: ' + emailName2 + '@ ' + emailProvider2 + ', die dritte: ' + emailName3 + '@ ' + emailProvider3 + ', und die letzte E-mail: ' + emailName4 + emailProvider4;
                }
            }

            if(array[0] == null){
                array = [];
                this.response.speak("Ich kann keinen Eintrag zu diesem Namen finden");
                this.emit(':responseReady');
            } else {
            array = [];
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');
              }

        });
    },

    'PersonenRaum': function() {

        lastname = this.event.request.intent.slots.Name.value;

        anrede = this.event.request.intent.slots.Anrede.value;


        readRaumItem(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));

            if(anrede == null){
                say = 'Das Büro von: ' + lastname + ' befindet sich im Raum: ' + finalMyResult;
            } else {
            say = 'Das Büro von: ' + anrede + ' ' + lastname + ' befindet sich im Raum: ' + finalMyResult;
              }
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    'PersonenTelefon': function() {

        lastname = this.event.request.intent.slots.Name.value;

        anrede = this.event.request.intent.slots.Anrede.value;


        readPhoneItem(myResult=>{
            var say = '';
            var stringifiedMyResult = '';
            var lengthToStart = stringifiedMyResult.indexOf('}');

            say = myResult;

            stringifiedMyResult = JSON.stringify(myResult);
            var regexMyResult = stringifiedMyResult.replace(/^.+:\.*/, '');
            var finalMyResult = regexMyResult.substring(lengthToStart, regexMyResult.indexOf('}'));

            if(anrede == null){
                say = 'Die Telefonnummer von: ' + lastname + ' ist: ' + finalMyResult;
            } else {
            say = 'Die Telefonnummer von: '+ anrede + ' ' + lastname + ' ist: ' + finalMyResult;
              }
            this.response.speak(say).listen('Versuch es nochmal');
            this.emit(':responseReady');

        });
    },

    //No intent found handle exception

    'AMAZON.HelpIntent': function () {
        this.response.speak('Sie können mich Fragen die mit der H T W Saar zu tun haben, fragen.').listen('Versuch es nochmal');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Hasta luego!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Sayonara!');
        this.emit(':responseReady');
    }
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


function readSQLItem(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT " + InformationSlotRaw + " FROM person_data WHERE name LIKE '%" + lastname + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemSemester(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT " + InformationSlotRaw + " FROM semester_dates WHERE semester = '" + semester + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleSemester(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT semester FROM moduledb WHERE module = '" + module + "' AND course = '" + studiengang + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleInhalt(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT content FROM moduledb WHERE module = '" + module + "' AND course = '" + studiengang + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleSemestertermineAnf(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT semester_start FROM semester_dates WHERE semester = '" + semester + " " + jahr1 + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleVorlesungstermineAnf(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT lecture_start FROM semester_dates WHERE semester = '" + semester + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleVorlesungstermineAnf(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT lectures_start FROM semester_dates WHERE semester = '" + semester + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleVorlesungstermineEnde(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT lectures_end FROM semester_dates WHERE semester = '" + semester + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleSemestertermineEnde(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT semester_end FROM semester_dates WHERE semester = '" + semester + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readSQLItemModuleECTS(callback) {

    console.log('Checkpoint: readTableItem' + module +  ' ' + studiengang);

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT ects FROM moduledb WHERE module = '" + module + "' AND course = '" + studiengang + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}
function readSQLItemModuleLecturer(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT lecturer FROM moduledb WHERE module = '" + module + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readMensaItem(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM mensa_plan WHERE day = 'today'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readMailItem(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT email FROM person_data WHERE name LIKE '%" + lastname + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        for (var i in result){
            array[i] = result[i].email;
            console.log('All Items returned: ', result[i].email);
        }
        callback(result);
      });
    });


}

function readRaumItem(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT office FROM person_data WHERE name LIKE '%" + lastname + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}

function readPhoneItem(callback) {
    console.log('Checkpoint: readTableItem');

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var mysql = require('mysql');

    var con = mysql.createConnection({
      host: "134.96.217.36",
      user: "aws_alexa",
      password: "!HTW_alexa18#Xgh98",
      database: "alexa"
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT phone FROM person_data WHERE name LIKE '%" + lastname + "'", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        callback(result);
      });
    });


}



