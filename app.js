// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var Contact = require('./models/contact');
var Image = require('./models/image');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({limit: '5mb'}));

// app.use(express.static(__dirname + '/public'));
// app.use('/contacts', Contact)
// app.use('/images', Image)
// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 3000;

// [CONFIGURE ROUTER]
var contactRouter = require('./routes/contact')(app, Contact);
var imageRouter = require('./routes/image')(app, Image);

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/Week2Server');

// DEFINE MODEL


// [RUN SERVER]
var server = app.listen(port, '0.0.0.0', function(){
 console.log("Express server has started on port " + port)
});

