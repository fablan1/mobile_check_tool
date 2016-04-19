
 function detectMobileLink()
 {
     var mobileLink = document.querySelector("link[rel='alternate']");
     //wenn rel=alternate Link vorhandne ist, schicke mobile Link an Background.js
     if (mobileLink != null)
     {
         if(mobileLink.getAttribute('media') != null)
         {
             return mobileLinkFound();
         } else
         {
             return mobileLinkNotFound();
         }

     } else
     {
         return mobileLinkNotFound();
     }
 }

 function mobileLinkNotFound() {
     //Wenn kein rel=alternate Link vorhandnen ist, schicke "Leider keinen Link" an background.js
     chrome.runtime.sendMessage({action:'GetMetaTag',mobileURL:"kein mobile Link"});
 }


 function mobileLinkFound() {
     var link = document.querySelector("link[rel='alternate']").href;
     chrome.runtime.sendMessage({action:'GetMetaTag',mobileURL:link});
 }


 //ausführen der Funktionen
detectMobileLink();




 // Ajax Request an background.js ... und Rückgabe... beide werte mobile Link und canonical Link in popup.js ausgeben
// Error Stack angucken!!!!
 // console.dir angucken!!! bei html elementen

/*

//Prüfen ob rel alternate Link vorhanden ist, ansonsten andere Nachricht übergeben
function detectMobileLink(callback) {
    var mobileLink = document.querySelector("link[rel='alternate']");

    //Wenn kein rel=alternate Link vorhandnen ist, schicke "Leider keinen Link" an background.js
    if (mobileLink != null) {
        callback(document.querySelector("link[rel='alternate']").href);
    } else {
        //wenn rel=alternate Link vorhandne ist, schicke mobile Link an Background.js
        callback("nein");
    }

}


// Helper Funktion um den detektieren Mobilen Link an background.js zu schicken
function sendMobileLink(link) {
    chrome.runtime.sendMessage(link);
}

//chrome.runtime.sendMessage(document.querySelector("link[rel='alternate']").href);


//ausführen der Funktionen
detectMobileLink(sendMobileLink);
    */