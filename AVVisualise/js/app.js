var w=500;
var h=800;
var col=4;
var row=4;
var sb;
var masterDB;
var skipArray=[];

$( document ).ready(function() {

	loadMasterDB();
	col=parseInt(getQuery("col"));
	row=parseInt(getQuery("row"));
	sb=getQuery("sb");
	skipArray=getQuery("skip").split(",");
//	console.log(skipArray.includes("3"));
	console.log(skipArray);
});

function loadMasterDB(){
	$.ajax({
        type: "GET",
        url: "https://sheets.googleapis.com/v4/spreadsheets/1W-wSwHFy2MgoXZ8BOD9EijVwtugpwHK8XHt7xLVMyU0/values/Master?key=AIzaSyDklKd0omHIdwOWr07vFppSXvjZDpf0_kE",
     //   url: "http://morphkurt.github.io/AVVisualise/MasterList.json?value="+Math.floor(Math.random() * 100000),
        dataType: "text",
        success: function(data) { 
          masterDB = convertSheetJson(JSON.parse(data));
          console.log(masterDB.values); 
          console.log(masterDB.length);
          var stageBoxConfig = getStageBoxConfig(sb);
          console.log(stageBoxConfig);
          drawBox(stageBoxConfig);
     	}
	});
}

function convertSheetJson(output){
		var rows = output.values;
		var masterDB = [];
		for (i = 1; i < rows.length; i++) { 
				var val=[];
				for (j = 0; j < rows[0].length; j++) { 
					val[rows[0][j]]=rows[i][j];
				}		
				masterDB.push(val);
		}
		return masterDB;
}

function drawBox(stageBoxConfig){
	var r=w/(col*4);
	console.log(r);
	var circleArray=[];
	for (i = 1; i < (col*row)+1; i++) { 
		var quotient = Math.floor((i-1)/col);
		var remainder = (i-1) % col;
		var circle=[];
		circle.x=(2*r)+remainder*3*r;
		circle.y=(3*r*Math.floor((i-1)/col))+(r*2);
		circle.r=r;
		circle.stageInput=i;
		circle["condition"]="HIDDEN";
		for (j = 0; j < stageBoxConfig.length; j++){
			if (stageBoxConfig[j].stageInput==i){
				circle["consoleIO"]=stageBoxConfig[j].consoleIO;
				circle["connectionType"]=stageBoxConfig[j].connectionType;
				circle["instrumentShortName"]=stageBoxConfig[j].instrumentShortName.toUpperCase();
				circle["stageInput"]=stageBoxConfig[j].stageInput;
				circle["color"]=stageBoxConfig[j].color;
				circle["condition"]=stageBoxConfig[j].condition;
				circle["stageInputType"]=stageBoxConfig[j].stageInputType.toLowerCase();
			}
		}
			//circle["stageInput"]=stageBoxConfig[j].stageInput;
			


		circleArray.push(circle);
	}
console.log(circleArray);
var svgContainer = d3.select("body").append("svg")
                                     .attr("width", w)
                                     .attr("height", h);
                                    


var circles=svgContainer.selectAll("g")
                        .data(circleArray)
                       	.enter()
                       	.append("g");

                circles.append("circle")
                       .attr("cx", function (d,i) { return (2*r)+(i % col)*3*r; })
                       .attr("cy", function (d,i) { return ( 4*r*Math.floor(i/col))+(r*3); })
                       .attr("r", function (d) { return d.r; })
                       .style("stroke", "black")
                       //stageInputType
                       .style("fill", function (d){return d.stageInputType=="input" ? "black":"none";})
                       .style("visibility", function (d,i){ return d.condition==="HIDDEN" || skipArray.includes((i+1).toString()) ? "hidden" : "visible";});
                circles.append("circle")
                       .attr("cx", function (d,i) {return (2*r)+(i % col)*3*r;})
                       .attr("cy", function (d,i) {return ( 4*r*Math.floor(i/col))+(r*3.5);})
                       .attr("r", function (d) {return d.r/10;})
                       .style("visibility", function (d,i){ return d.condition==="HIDDEN" || skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
                       .style("fill", function (d){return d.stageInputType=="input" ? "white":"black";});
                circles.append("circle")
                       .attr("cx", function (d,i) {return (1.5*r)+(i % col)*3*r;})
                       .attr("cy", function (d,i) {return ( 4*r*Math.floor(i/col))+(r*3);})
                       .attr("r", function (d) {return d.r/10;})
                       .style("visibility", function (d,i){ return d.condition==="HIDDEN" || skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
                       .style("fill", function (d){return d.stageInputType=="input" ? "white":"black";});
				circles.append("circle")
                       .attr("cx", function (d,i) {return (2.5*r)+(i % col)*3*r;})
                       .attr("cy", function (d,i) {return ( 4*r*Math.floor(i/col))+(r*3);})
                       .attr("r", function (d) {return d.r/10;})
                       .style("visibility", function (d,i){ return d.condition==="HIDDEN" || skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
                       .style("fill", function (d){return d.stageInputType=="input" ? "white":"black";});
                circles.append("rect")
                       .attr("x", function (d,i) { return (i % col)*3*r+0.5*r; })
                       .attr("y", function (d,i) { return ( 4*r*Math.floor(i/col))+0.5*r; })
                       .attr("width", 3*r)
                       .style("stroke","black")
                       .style("fill", "none")
                       .style("visibility", function (d,i){ return d.condition==="HIDDEN" ||  skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
        			   .attr("height", 4*r); 
        		circles.append("text")
        		       .attr("x", function (d,i) { return (i % col)*3*r+0.75*r; })
                       .attr("y", function (d,i) { return (4*r*Math.floor(i/col))+1.25*r; })
        			   .attr("dy", "-.35em")
        			   .style("visibility", function (d,i){ return d.condition==="HIDDEN" ||  skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
                       .text( function (d) {return d.stageInput;})
                       //.style("stroke","black")
                       .style("fill", "black");
        		circles.append("text")
        		       .attr("x", function (d,i) { return (i % col)*3*r+2.75*r; })
                       .attr("y", function (d,i) { return (4*r*Math.floor(i/col))+1.25*r; })
        			   .attr("dy", "-.35em")
        			   .style("visibility", function (d,i){ return d.condition==="HIDDEN" ||  skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
                       .text(  function (d) {return d.consoleIO;})
                       //.style("stroke","black");
                circles.append("text")
        		       .attr("x", function (d,i) { return (i % col)*3*r+1.20*r; })
                       .attr("y", function (d,i) { return (4*r*Math.floor(i/col))+1.75*r; })
                       .style("visibility", function (d,i){ return d.condition==="HIDDEN" || skipArray.includes((i+1).toString()) ? "hidden" : "visible";})
        			   //.attr("dy", "-.35em")
                       .text(  function (d) {return d.condition==="NOK" ? "FLTY" : d.instrumentShortName})
                       .style( "fill", function (d) {return d.condition=="NOK" ? "red" : "black"})
                       .style("font-size","17px");
                       //.style("stroke","black");
               



/*
var r2=r/2;

var circleAttributes = circles
                       .attr("cx", function (d,i) { return (2*r2)+(i % col)*3*r2; })
                       .attr("cy", function (d,i) { return ( 3*r2*Math.floor(i/col))+(r2*2); })
                       .attr("r", function (d) { return d.r; })
                       .style("fill", function(d) { return d.color; });
*/

//Add the SVG Text Element to the svgContainer
/*
var text = svgContainer.selectAll("text")
                        .data(circleArray)
                        .enter()
                        .append("text");

var textLabels = text
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .text( function (d) { return d.consoleIO;})
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "10px")
                 .attr("fill", "black");
*/
}

function getStageBoxConfig(sb){
	var j=0;
	var config=[];
	for (i = 0; i < masterDB.length; i++) { 
		console.log(masterDB[i].stageBox);
/*
	 "consoleIO": 2,
    "connectedBox": "IDR32",
    "consoleInputType": "Input",
    "stageInputType": "Input",
    "stageBox": "FL",
    "stageInput": 2,
    "stageLongName": "Front Left",
    "connectionType": "mic",
    "instrument": "Vox 2",
    "instrumentShortName": "Vox2",
    "condition": "OK",
    "surfaceColor": "green",
    "Comments": ""
*/

		if (masterDB[i].stageBox==sb){
			var circle=[];
			circle["consoleIO"]=masterDB[i].consoleIO;
			circle["connectionType"]=masterDB[i].connectionType;
			circle["instrumentShortName"]=masterDB[i].instrumentShortName;
			circle["stageInput"]=masterDB[i].stageInput;
			circle["color"]=masterDB[i].surfaceColor;
			circle["condition"]=masterDB[i].condition;
			circle["stageInputType"]=masterDB[i].stageInputType;
			config.push(circle);
		}
	}
	return config;
}

function getQuery (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  
