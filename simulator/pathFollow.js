queue()
.defer(d3.xml, "wiggle.svg", "image/svg+xml")
.await(ready);

function ready(error, xml) {
    
    //mockData
    //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    
    var groundLevel = 200;
    var data = [
        {
            'date':new Date(2014, 0, 1, 0, 0, 0, 0),
            'commits'://this is already sorted chronologically
            [
                 {
                    'author':'Thompson',
                    'timestamp': new Date(2014, 0, 1, 1, 1 , 1, 1),
                    'filesAdded': ['fruits'],
                    'filesModified': [],
                    'filesDeleted':[],
                    'relationshipModified':[]
                 },
                 {
                    'author':'Byung',
                    'timestamp': new Date(2014, 0, 1, 13, 1 , 1, 1),
                    'filesAdded': ['animals'],
                    'filesModified': [],
                    'filesDeleted':[],
                    'relationshipModified':[]
                 },
                 {
                    'author':'Thompson',
                    'timestamp': new Date(2014, 0, 1, 3, 1 , 1, 1),
                    'filesAdded': ['vegetables'],
                    'filesModified': [],
                    'filesDeleted':[],
                    'relationshipModified':[]
                 }
            ]
        },
        {
            'date':new Date(2014, 0, 2, 0, 0, 0, 0),
            'commits':
            [
            ]
        }
    ];
    
    var authors = {}
    var rooms = {}

    
    
    //Adding our svg file to HTML document
    var importedNode = document.importNode(xml.documentElement, true);
    d3.select("#pathAnimation").node().appendChild(importedNode);
    
    var svg = d3.select("svg")
    .attr("width",window.innerWidth)
    .attr("height",window.innerHeight);
    
    var sky = createBackground(svg);
    
    var sun = svg.append("circle")
    .attr("r", 40)
    .style("fill", "yellow");
    var moon = svg.append("circle")
    .attr("r", 30)
    .style("fill", "white");
    
    var ground = svg.append("rect")
    .attr("x", 0)
    .attr("y", groundLevel)
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight-groundLevel)
    .style("fill", "#A9672E");

    
    //var path = svg.select("path#wiggle"),
    //startPoint = pathStartPoint(path);
   
    //http://stackoverflow.com/questions/13563471/random-colors-for-circles-in-d3-js-graph
    /*var marker = svg.append("circle");
    marker.attr("r", 7)
    .attr("transform", "translate(" + startPoint + ")")
    .style("fill",function() {
           return "hsl(" + Math.random() * 360 + ",100%,50%)";
           })
    transition();*/
    
    var todayLabel = svg.append("text")
                        .attr("x", 0)
                        .attr("y", 20)
                        .text("Welcome to Git-Java Source Code Analyzer")
                        .attr("stroke-width", 1)
                        .attr("stroke", "black")
                        .style("font-family", "Verdana")
                        .style("font-size", "20px")
                        .style("fill", "white");

    
    
    simulateDay(0, data.length, data)
    
    
    function simulateDay(index, lastIndex, iData){
        if (index < lastIndex) {
            var entry = iData[index];
            var delay = 1000;
            var today = new Date(entry["date"]);
            var tommorrow = new Date(entry["date"]);
            tommorrow.setDate(tommorrow.getDate()+1);
            
            var commits = entry["commits"];
            //console.log("today:"+today);
            //console.log("tmrw:"+tommorrow);
            //console.log()
            var intervalId = setInterval(function() {
                todayLabel.text(today)

                if(today.getHours()==0||today.getHours()==12){
                    sky.transition()
                    .duration(12000)
                    .style("fill", skycolor(today.getHours()));
                }
                 
                if(today.getHours()==0){
                    sun
                    .transition()
                    .duration(24000)
                    .ease("in-out")
                    .attrTween("transform", orbit(1/4));

                    moon
                    .transition()
                    .duration(24000)
                    .ease("in-out")
                    .attrTween("transform", orbit(3/4));
                }
                 
                 //console.log(today.getTime());
                if (today.getTime() < tommorrow.getTime()){
                    commits.forEach(function(commit){
                 
                        if(!commit["processed"]){
                            console.log("now:"+today+" timestamp:"+commit["timestamp"])

                            if(today.getTime()>commit["timestamp"]){
                                commit["processed"] = true;
                                var author = authors[commit["author"]];
                                console.log(authors);
                         
                                if(!author){
                                    author = {};
                                    author["contribution"] = 10;
                         
                                    var circ = createAnt(svg);
                                    author["antMarker"] = circ;
                                     
                                    console.log(circ);
                                    circ.transition()
                                    .duration(500)
                                    .attr("transform", "translate(" + [27,groundLevel-55] + ")")
                                    .transition()
                                    .duration(500)
                                    .attr("transform", "translate(" + [Math.random()*500,groundLevel-55] + ")");
                                     
                                    authors[commit["author"]] = author;
                         
                                } else {
                                    author["contribution"]  += 1;
                                    var circ = author["antMarker"]
                                    circ.transition()
                                    .duration(500)
                                    .attr("transform", "translate(" + [Math.random()*500,groundLevel-55] + ")");
                                }
                            }
                        }else{
                            console.log("ho")
                        }
                    })

                    today.setHours(today.getHours()+1);

                } else {
                    clearInterval(intervalId)
                    simulateDay(index+1,lastIndex,iData)
                }
            }, delay);

        } else {
            todayLabel.text("Project ended")
        }
        
    }
    
    
    
    
    
       //Get path start point for placing marker
    function pathStartPoint(path) {
        var d = path.attr("d"),
        dsplitted = d.split(" ");
        return dsplitted[1].split(",");
    }
    
    function transition() {
        marker.transition()
        .duration(1000)
        .attrTween("transform", translateAlong(path.node()))
        //.each("end", transition);// infinite loop
    }
    
    function createAnt(canvas) {
        //Height of an ant
        var height = 55;
        
        //Initialize random color
        var color = "hsl(" + Math.random() * 360 + ",100%,50%)";

        
        // Draw the Circle
        var circleData = [
                          { "cx": 20, "cy": 20, "radius": 20, "color": color },
                          { "cx": 50, "cy": 20, "radius": 20, "color": color },
                          { "cx": 80, "cy": 20, "radius": 20, "color": color },
                          { "cx": 87, "cy": 15, "radius": 6, "color": "white" },
                          { "cx": 87, "cy": 15, "radius": 3, "color": color } ];
        
    
        
        // put circles in group1
        var group1 = canvas.append("g");
        var circles = group1.selectAll("circle")
        .data(circleData)
        .enter()
        .append("circle");
        
        
        var circleAttributes = circles
        .attr("cx", function (d) {return d.cx;})
        .attr("cy", function (d) {return d.cy;})
        .attr("r", function (d) {return d.radius;})
        .style("fill", function (d) {return d.color;});
        
        
        
        // draw legs in group1
        var line = group1.append("line")
        .attr("x1", 13)
        .attr("y1", 20)
        .attr("x2", 13)
        .attr("y2", 55)
        .attr("stroke-width", 2)
        .attr("stroke", color);
        var line = group1.append("line")
        .attr("x1", 25)
        .attr("y1", 20)
        .attr("x2", 25)
        .attr("y2", 55)
        .attr("stroke-width", 2)
        .attr("stroke", color);
        var line = group1.append("line")
        .attr("x1", 60)
        .attr("y1", 20)
        .attr("x2", 60)
        .attr("y2", 55)
        .attr("stroke-width", 2)
        .attr("stroke", color);
        var line = group1.append("line")
        .attr("x1", 72)
        .attr("y1", 20)
        .attr("x2", 72)
        .attr("y2", 55)
        .attr("stroke-width", 2)
        .attr("stroke", color);
        
        group1
        .attr("transform", "translate(" + [7,groundLevel-height] + ")");
        
        
        return group1;

    }
    
    function createBackground(canvas) {

        
        var sky = canvas.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", window.innerWidth)
        .attr("height", groundLevel)
        .style("fill", "#0c1317");
        
        
        
        return sky;
    }
    
    function skycolor(hours) {
        var skycolor = "blue"
        switch (hours) {
            case 0:
                console.log("its getting brighter");
                skycolor = "#97ccf1";
                
                break;
            case 12:
                skycolor = "#0c1317";
                break;
                
                
                    /*
            case 0:
                skycolor = "#00000";
                    break;
            case 1:
                    skycolor = "#0c1317";
                    break;
            case 2:
                    skycolor = "#19262f";
                    break;
            case 3:
                    skycolor = "#253947";
                    break;
            case 4:
                    skycolor = "#324c5f";
                    break;
            case 5:
                    skycolor = "#3f6077";
                    break;
            case 6:
                    skycolor = "#4b738e";
                    break;
            case 7:
                    skycolor = "#5886a6";
                    break;
            case 8:
                    skycolor = "#6499be";
                    break;
            case 9:
                    skycolor = "#71acd6";
                    break;
            case 10:
                    skycolor = "#7ec0ee";
                    break;
            case 11:
                    skycolor = "#8ac6ef";
                    break;
            case 12:
                    skycolor = "#97ccf1";
                    break;
            case 13:
                    skycolor = "#8ac6ef";
                    break;
            case 14:
                    skycolor = "#7ec0ee";
                    break;
            case 15:
                    skycolor = "#71acd6";
                    break;
            case 16:
                    skycolor = "#6499be";
                    break;
            case 17:
                    skycolor = "#5886a6";
                    break;
            case 18:
                    skycolor = "#4b738e";
                    break;
            case 19:
                    skycolor = "#3f6077";
                    break;
            case 20:
                    skycolor = "#324c5f";
                    break;
            case 21:
                    skycolor = "#253947";
                    break;
            case 22:
                    skycolor = "#19262f";
                    break;
            case 23:
                    skycolor = "#0c1317";
                    break;
            case 24:
                    skycolor = "#00000";
                    break;
            */ 
        }
        
        return skycolor;
    }

    
    function orbit(initValue) {
        
        return function(d, i, a) {
            return function(t) {

                var t_x, t_y;
                
                var rotation_radius_x = (window.innerWidth/2)+80;
                var rotation_radius_y = 200;
                var t_angle = (2 * Math.PI) * (t+(initValue));
                var t_x = rotation_radius_x * Math.cos(t_angle);
                var t_y = rotation_radius_y * Math.sin(t_angle);
                
                
                return "translate(" + ((window.innerWidth/2) + t_x) + "," + (200 + t_y) + ")";
            };
        };
    }
    
    function translateAlong(path) {
        var l = path.getTotalLength();
        return function(i) {
            return function(t) {
                var p = path.getPointAtLength(t * l);
                return "translate(" + p.x + "," + p.y + ")";//Move marker
            }
        }
    }
}