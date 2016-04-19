var request = require("request");
var cheerio = require("cheerio");
var express = require('express');
var qs = require('querystring');
var app = express();


//Hier übergebener Parameter aus der Chrome Extension
url = "https://www.idee-shop.com/shop/de/dieprodukte/TextilesGestalten.html";



var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.use(function (req, res, next)
{
    //res.setHeader('Access-Control-Allow-Origin', 'null'); für Localhost
      res.setHeader('Access-Control-Allow-Origin', '*'); // für Alle IP-Adresse
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function(req,res,next)
{
    processRequest(req,function(data)
    {
        console.log(data);
        if(data.action == "checkCanonical"){
            var getCanonicalURL = data.canonicalURL;
            checkCanonicalTag(getCanonicalURL, function(erfolg,url)
            {
                if (erfolg)
                {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({reply:'SUCCESS', canonicalURL:url}));
                } else
                {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({reply:'FAIL'}));
                }
            });
        }

    });
});

function checkCanonicalTag(url,cb) {
  //  url = "https://www.idee-shop.com/shop/de/dieprodukte/TextilesGestalten.html";
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                relCanonical = $('link[rel="canonical"]');
            //  relCanonical = $('link[rel="canonical"]').attr("href");
            if (relCanonical != null) {
                if(relCanonical.attr("href") != null && relCanonical.attr("href")!=""){
                    cb(true,relCanonical.attr("href"))
                } else {
                    cb(false);
                }
            }
            else {
                cb(false)
            }

        } else {
            console.log("errormeldung: " + error);
            cb("fail");
        }

    });
}


function processRequest(req,cb) {

    var body = '';
    req.on('data', function (data)
    {
        body += data;
        // 1e6 === 1  Math.pow(10, 6) === 1  1000000 ~~~ 1MB
        if (body.length > 1e6)
        {
            console.log('Flood Attack');
            req.connection.destroy();
        }
    });
    req.on('end', function ()
    {
      //  console.log(JSON.parse(body));
        cb(JSON.parse(body));
    });


}


