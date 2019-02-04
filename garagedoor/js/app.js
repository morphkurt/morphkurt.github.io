function pressRemote(){
	$.ajax({
        type: "GET",
        url: "http://192.168.88.105/press",
        dataType: "text",
        success: function(data) { 
     	}
	});
}

$( document ).ready(function() {

  $("#option1").click(function(){
    alert('clicked!');
  });
});
