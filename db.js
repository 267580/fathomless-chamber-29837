var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user1:qwertyuiop@ds245687.mlab.com:45687/records');
