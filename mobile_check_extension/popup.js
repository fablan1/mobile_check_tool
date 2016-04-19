
var port = chrome.extension.connect({name: "Popup"});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(res)
{
    console.log(res);
    if(res.reply == "SUCCESS"){
        document.getElementById('status').innerHTML = "Mobile URL: " + res.mobileURL+ '</br> Canonical: '+ res.canonicalURL;
    } else if (res.reply == "FAIL") {
        document.getElementById('status').innerHTML = "Mobile URL nicht gefunden";
    }
});

/*var bgPage = chrome.extension.getBackgroundPage();
bgPage.SendToPopup = function (response)
{
}
*/