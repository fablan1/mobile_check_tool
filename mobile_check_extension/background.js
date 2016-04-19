
var Response = {};
chrome.extension.onConnect.addListener(function(port)
{
    //console.log("Connected .....",port.name);
    port.postMessage(Response);
    port.onMessage.addListener(function(msg)
    {
        //console.log("message received"+ msg);
    });
});



chrome.runtime.onMessage.addListener(function(response, sender, sendResponse)
{
    //console.log(response,sender);
    if(response.action == 'GetMetaTag')
    {
        var mobileURL = response.mobileURL; // Link from mobile_check.js
        sendMobileURLtoNode(mobileURL,function (serverResponse)
        {
            //console.log('ServerResponse',ServerResponse);
            Response.mobileURL = mobileURL;
            Response.reply = serverResponse.reply;
            Response.canonicalURL = serverResponse.canonicalURL;
        });
    }
});

function sendMobileURLtoNode(mobileURL,cb){
console.log("Mobile URL:", mobileURL);
    var r = new XMLHttpRequest();
    r.open("POST", "HIER DIE IP ADRESSE", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        //console.log("Success: " , r.responseText);
        var response = JSON.parse(r.responseText);
        console.log(response);
        cb(response);
    };
    r.send(JSON.stringify({action:"checkCanonical",canonicalURL:mobileURL}));
}

var mobileURL = "http://m.idee-shop.com/category/373933";
//sendMobileURLtoNode(mobileURL);

