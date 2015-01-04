'use strict';
let koa     = require('koa'),
    views   = require('co-views'),
    parse   = require('co-body'),
    html    = require('html'),
    colors  = require('colors');

let app = koa();

let render = views(__dirname + '/jade/', {default: 'jade'});

function log(content){
  content = html.prettyPrint(content, {indent_size: 2});
  console.log(content.blue.bgWhite);
}

app.use(function *controller(){
  let fileName, data, body, doLog;

  fileName = this.get('jadeFile');
  
  doLog = this.get('doLog');
  
  data = yield parse(this);

  body = yield render(fileName, data);

  if(doLog === "true"){
    log(body);
  }
  this.body = body; 

});

module.exports = app;
