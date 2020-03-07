const cors = require('cors');

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    //verify that request origin is in the server whitelist
    if (whitelist.indexOf(req.header('Origin')) !== -1) {  
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors(); //Set Access-Control-Allow-Origin header to *

exports.corsWithOptions = cors(corsOptionsDelegate);  //Set Access-Control-Allow-Origin header to whitelisted URL or omit from request if not whitelisted