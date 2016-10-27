
var jsondata;

$( document ).ready(function() {
	 getdata(populate);

	 $("#searchbox").keypress(function(getdata){
			
		var servers=JSON.parse(jsondata);
		  $('#resultstable').empty();
		  var text = $("#searchbox").val();
		  var first=true;
		  var html='';  

		  for (i = 0; i < servers.servers.length; i++) { 

			    if((servers.servers[i].servername.search(text) > -1) 
			    	|| (servers.servers[i].role.search(text) > -1) 
			    	|| (servers.servers[i].environment.search(text) > -1) 
			    	|| (servers.servers[i].mgt_ip.search(text) > -1))
			    {
				    html += '<tr><td><p class="text-left">'+servers.servers[i].servername+'</p>'+ 
                    '</td><td><i onclick="location.href=\'ssh://'+servers.servers[i].mgt_ip+':'+servers.servers[i].ssh_port+'\'" class="fa fa-terminal fa-2x" aria-hidden="true"></i></a></td>' +
                    '</td><td><i onclick="location.href=\'http://'+servers.servers[i].mgt_ip+':'+servers.servers[i].web_port+'\'" class="fa fa-chrome fa-2x" aria-hidden="true"></i></td>' +
                    '</td><td><i onclick="location.href=\'https://'+servers.servers[i].ilo_ip+'\'" class="fa fa-chrome fa-2x" aria-hidden="true"></i></td>' +
                    '</td><td>' + servers.servers[i].environment + '</td>' +
                    '</td><td>' + servers.servers[i].role + '</td>' +
                    '</td><td>'+renderType(servers.servers[i].type)+'</td>' +
                    '</td><td><i onclick="infoclick(\''+servers.servers[i].servername+'\');" class="fa fa-info fa-2x" aria-hidden="true"><a></i></td></tr>';
			    }
		  }
		  $('#resultstable').append(html);
	});
	
});

function fireSSH(servername){
	var servers=JSON.parse(jsondata);
	$('#infotable').empty;
	$("#myModal").modal('show');    
	$("#modalheader").text(servername);        // initializes and invokes show immediately
	var html;
	var s = search(servername,servers.servers);
	console.log(JSON.stringify(s));

	$('#infotable').html(html);
	console.log(s.role);
	console.log("itworks:" +servername);

}

function infoclick(servername){
	var servers=JSON.parse(jsondata);
	$('#infotable').empty;
	$("#myModal").modal('show');    
	$("#modalheader").text(servername);        // initializes and invokes show immediately
	var html;
	var s = search(servername,servers.servers);
	console.log(JSON.stringify(s));
	html += '<tr><td><p class="text-left">Role</p></td><td>'+s.role+'</td>'+
		'<tr><td><p class="text-left">Management IP</p></td><td>'+s.mgt_ip+'</td>'+
		'<tr><td><p class="text-left">Server Type</p></td><td>'+s.type+'</td>'+
		'<tr><td><p class="text-left">Services</p></td><td>'+s.services+'</td>'+
		'<tr><td><p class="text-left">Web Port</p></td><td>'+s.web_port+'</td>'+
		'<tr><td><p class="text-left">SSH Port</p></td><td>'+s.ssh_port+'</td>'+
		'<tr><td><p class="text-left">Environment</p></td><td>'+s.environment+'</td>'+
		'<tr><td><p class="text-left">Hosted Environment</p></td><td>'+s.hosting+'</td>'+
		'<tr><td><p class="text-left">Username</p></td><td>'+s.username+'</td>'+
		'<tr><td><p class="text-left">Comments</p></td><td>'+s.comment+'</td>'+
	'</tr>';
	$('#infotable').html(html);
	console.log(s.role);
	console.log("itworks:" +servername);

}

function renderType(server_type){
	if(server_type === "linux") {
		return '<i class="fa fa-linux fa-2x" aria-hidden="true">';
	}
	else if (server_type === "windows") {
		return '<i class="fa fa-windows fa-2x" aria-hidden="true">';
	};
}

function populate(result) {
    // Code that depends on 'result'
    jsondata=result;
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].servername === nameKey) {
            return myArray[i];
        }
    }
}


function getdata(callback){
 var milliseconds = (new Date).getTime();
 $.ajax({
        type: "GET",
        url: "http://localhost:8080/data/data-servers.csv?time="+milliseconds,
        dataType: "text",
        success: function(data) {
        	var lines = data.split(/\r\n|\n/);
        	var servers = [];
        	var headings = lines[0].split(','); // Splice up the first row to get the headings

        	for (var j=1; j<lines.length; j++) {

        		var values = lines[j].split(','); // Split up the comma seperated values
        		if(values.length === headings.length ) {
				var obj = {};
        			for (var k=0;k<headings.length;k++){
        	
        				obj[headings[k]]=values[k];
        			}
        			var s = {};
        
      		  		servers.push(obj);
        			s["servers"]=servers;
        		}

        	}	
        	jsondata=JSON.stringify(s);
        	callback(jsondata);
        },
        error: function (data, textStatus, errorThrown) {
        }
        });
}
