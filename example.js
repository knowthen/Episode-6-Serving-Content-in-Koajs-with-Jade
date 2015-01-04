var koa   = require('koa'),
    app   = koa(),
    fs    = require('co-fs'),
    serve = require('koa-static');

app.use(serve('public'));

app.use(function *(){

  

});

app.listen(3000);