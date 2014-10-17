

var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app)
    ;
var morgan = require('morgan');
app.use(morgan('dev')); //this is the express logger...
app.use(require('errorhandler')({dumpExceptions: true, showStack: true}));


var blocked = require('blocked');
//setInterval(function(){
//    Array(10000000).join('a')
//}, 500);
//
//setInterval(function(){
//    Array(100000000).join('a')
//}, 3000);

blocked(function(ms){
    console.log('BLOCKED FOR %sms', ms | 0);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HERE comes the problem:
var session = require('express-session');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(session({
        secret: "x",
        //store: new MongoHttpSessionStore(
        //    {
        //        collection: "_sTEST_delete",
        //        db: "test"
        //    }
        //),
        cookie: {
            maxAge: 60000 * 30
        }, // in minute(s) from milliseconds-> *60000
        // the following are both default true
        resave: false,
        saveUninitialized: true
    }
));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/', express.static(__dirname + '/public')); //at last try to find if this is a static file...

server.listen(3005);
console.log("started on port 3005");
