function parseQueryString (queryString) {
  var  newQueryString= queryString.replace('?','');    
  var parsedString = '';   

  console.log(queryString);
  if(queryString.length > 2){
    parsedString = JSON.parse('{"' + decodeURI(newQueryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');}  
  return parsedString;
}

$(document).ready(function () {

//call the method passing in the query string.
var jsonQuery = parseQueryString(window.location.search);

var msisdn = 0;

//if we have a populated json object, 
if( jsonQuery ) {
  //if we have name as a json path in the json object and it's populated.
  if(jsonQuery.msisdn){
    //use jquery to load the value into the msisdn
  msisdn = jsonQuery.msisdn;
  }
  //same deal for email
}

console.log(msisdn);

if(msisdn != 0){
  //order id is popualted, we need to call the sync webhook,get the response and put it into the page
  $.ajax({
    url: 'https://hooks.imiconnect.eu/syncwebhook/UK9RDNMOZJ',
    type: 'POST',
    contentType: "application/json",
    dataType: "json",
    headers: {
    'key':'342160ef-5743-11ec-9d17-0aaac5b19840',
    'Content-Type':'application/json'
    },
    data: JSON.stringify({
      "msisdn" : msisdn
    })
  })

  //This is the function after returned
  .done(function (data){
  console.log(data);
  var reference = data.referenceId;

  if (reference == "1"){
    $('.referenceID').text("Create a case");
    $('.qrCodeSMS').attr("src","https://quickchart.io/qr?text=UPDATE&size=200");
    $('.qrCodeWA').attr("src","https://quickchart.io/qr?text=https://wa.me/447942207637/?text=nhs111&size=200")
  }

  else{
    $('.referenceID').text(reference);
    $('.qrCodeSMS').attr("src","https://quickchart.io/qr?text=nhs111" + reference + "&size=200");
  $('.qrCodeWA').attr("src","https://quickchart.io/qr?text=https://wa.me/447942207637/?text=nhs111%20" + reference + "&size=200")
  }
  });
}
else{
  //The referenceId is blank so show the default
  $('.referenceID').text("Create a case");
    $('.qrCodeSMS').attr("src","https://quickchart.io/qr?text=UPDATE&size=200");
    $('.qrCodeWA').attr("src","https://quickchart.io/qr?text=https://wa.me/447942207637/?text=nhs111&size=200")
}
});

document.getElementById("webChatButton").addEventListener("click", openChat)
    
    function openChat(){
      imichatwidget.maximizeWindow();
      $('#webChatButtonClose').show();
      $('#webChatButton').hide();
    }

    document.getElementById("webChatButtonClose").addEventListener("click", closeChat)
    
    function closeChat(){
      imichatwidget.minimizeWindow();
      $('#webChatButton').show();
      $('#webChatButtonClose').hide();
    }