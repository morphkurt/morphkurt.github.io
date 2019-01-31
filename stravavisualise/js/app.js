var code;
var access_token;

$( document ).ready(function() {

	var code=getQuery("code");
	if (code!=''){
		$('#authorize').hide();
		exchangeToken(code);
	}
	
});


function getQuery (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  
/*

-F client_id=5 \
-F client_secret=7b2946535949ae70f015d696d8ac602830ece412 \
-F code=5919f3e385c6cb039bcc809f27d1e535e36b7a91
*/

function exchangeToken(code){
  $.post("https://www.strava.com/oauth/token", {
    client_id: "30302",
    client_secret: "45071b5a089e0467afa69fb5a7dea89b68166c01",
    code: code
  },
  function(data, status){
  		access_token=data.access_token;
  		console.log(access_token);
  	
  });
}

function download(){
	$.ajaxSetup({
   		headers:{
      		"Authorization": "Bearer "+ access_token
   		}
	});
	$.get("https://www.strava.com/api/v3/activities?include_all_efforts=", {
    },
    function(data, status){
  		console.log(data);
  	
  });
}
