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
                    'filesAdded': 
                                    [
                                        {
                                            'fileName':'fruits',
                                            'parents':
                                                        [
                                                            //to add if exist
                                                        ]
                                        } ,
                                        {
                                            'fileName':'tools',
                                            'parents':
                                                        [
                                                        ]
                                        }
                                    ],
                    'filesModified': [],
                    'filesDeleted':[],
                    'relationshipModified':[]
                 },
                 {
                    'author':'Byung',
                    'timestamp': new Date(2014, 0, 1, 13, 1 , 1, 1),
                    'filesAdded': 
                                    [
                                        {
                                            'fileName':'animals',
                                            'parents':
                                                        [
                                                            //to add if exist
                                                        ]
                                        } 
                                    ],
                    'filesModified': [],
                    'filesDeleted':[],
                    'relationshipModified':[]
                 },
                 {
                    'author':'Thompson',
                    'timestamp': new Date(2014, 0, 1, 3, 1 , 1, 1),
                    'filesAdded': 
                                    [
                                        {
                                            'fileName':'apple',
                                            'parents':
                                                        [
                                                            'fruits'
                                                        ]
                                        },
                                        {
                                            'fileName':'oranges',
                                            'parents':
                                                        [
                                                            'fruits'
                                                        ]
                                        } 
                                    ],                   
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
                {
                    'author':'Aki',
                    'timestamp': new Date(2014, 0, 2, 5, 1 , 1, 1),
                    'filesAdded': 
                                    [
                                        {
                                            'fileName':'mandarin',
                                            'parents':
                                                        [
                                                            'oranges'
                                                        ]
                                        } ,
                                    ],
                    'filesModified': [],
                    'filesDeleted':[],
                    'relationshipModified':[]
                 }            
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
    
    var star = createStars(svg);
    
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
                                         
                    star.transition()
                    .duration(12000)
                    .style("opacity", starcolor(today.getHours()));
                                         
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
                            //console.log("now:"+today+" timestamp:"+commit["timestamp"])

                            if(today.getTime()>commit["timestamp"]){
                                commit["processed"] = true;
                                var author = authors[commit["author"]];
                                //console.log(authors);
                         
                                if(!author){
                                    author = {};
                                    author["contribution"] = 10;
                         
                                    var circ = createAnt(svg);
                                    author["antMarker"] = circ;
                                     
                                    //console.log(circ);
                                    circ.transition()
                                    .duration(500)
                                    .attr("transform", "translate(" + [27,groundLevel-55] + ")")
                                    .transition()
                                    .duration(500)
                                    .attr("transform", "translate(" + [Math.random()*500,groundLevel-55] + ")");
                                     
                                    authors[commit["author"]] = author;
                                    checkRoom(commit['filesAdded'], circ);
                                } else {
                                    author["contribution"]  += 1;
                                    var circ = author["antMarker"]
                                    circ.transition()
                                    .duration(500)
                                    .attr("transform", "translate(" + [Math.random()*500,groundLevel-55] + ")");
                                    checkRoom(commit['filesAdded'], circ);
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
    
    
    
    function checkRoom(files, ant){
        if (ant != null){
            console.log(files);
            files.forEach(function(file){
                var filename = file['fileName'];
                var existingFile = rooms[filename];
                if(!existingFile){
                    //no room of this file... so create a new room
                    createRoom(file);
                } else {
                    //room exist so modidfy that room
                }

            });

            

        }

    }
    
    function createRoom(file){

        if(file['parents'].length > 0 ){
            //this room is a child of some file
            console.log("I HAVE A PARENT");
            file['parents'].forEach(function(parentName){
                var parentRoom = rooms[parentName];
                var parentRoomSvg = parentRoom['roomSvg'];
                console.log("bbox:"+parentRoomSvg.attr('cx'));
            
                var numParentKids = parentRoom['childs'].length;
                var cx = parseInt(parentRoomSvg.attr('cx'));
                var cy = parseInt(parentRoomSvg.attr('cy'));


                var roomRx = 80;
                var roomRy = 50;
                var distanceBetweenRooms = 50;
                var distanceToBorder = 20;
                var distanceToGround = 25;

                var color = parentRoomSvg.attr('fill');
                var roomSvg = svg.append("ellipse")
                    .attr("cx", (roomRx*2 + distanceBetweenRooms)*(numParentKids)+(cx))
                    .attr("cy", cy+distanceToGround+ (roomRy*2))
                    .attr("rx", roomRx)
                    .attr("ry", roomRy)
                    .attr("fill",color);

                //var tunnelSvg =  svg.append("rect")
                var tunnel = svg.append("line")
                    .attr("x1", roomSvg.attr('cx'))
                    .attr("y1", roomSvg.attr('cy'))
                    .attr("x2", parentRoomSvg.attr('cx'))
                    .attr("y2", parentRoomSvg.attr('cy'))
                    .attr("stroke-width", 10)
                    .attr("stroke", color);

                var name = svg.append("text")
                        .attr("x", roomSvg.attr('cx'))
                        .attr("y", roomSvg.attr('cy'))
                        .text(file['fileName'])
                        .attr("stroke-width", 0.5)
                        .attr("stroke", "black")
                        .style("font-family", "Verdana")
                        .style("font-size", "12px")
                        .style("fill", "white");

                rooms[file['fileName']] = {};
                var newRootRoom = rooms[file['fileName']];
                newRootRoom['roomSvg'] = roomSvg;
                newRootRoom['parents'] = [];

                //update relationship
                newRootRoom['parents'].push(parentName);
                newRootRoom['childs'] = [];                
                parentRoom['childs'].push(file['fileName']);
            });

            



        } else {
            //this room is a root room
            //50 is the ry 
            //25 is tunner distance
            var color = "hsl(" + Math.random() * 360 + ",100%,50%)";

            var numRootRooms = countNumberRootRooms();
            var roomRx = 80;
            var roomRy = 50;
            var distanceBetweenRooms = 50;
            var distanceToBorder = 20;
            var distanceToGround = 25;
            console.log("rooms"+rooms)
            console.log("numroot:"+numRootRooms);

            var roomSvg = svg.append("ellipse")
                    .attr("cx", (roomRx*2 + distanceBetweenRooms)*(numRootRooms)+(roomRx+distanceToBorder))
                    .attr("cy", groundLevel+roomRy+distanceToGround)
                    .attr("rx", roomRx)
                    .attr("ry", roomRy)
                    .attr("fill",color);

            var tunnel = svg.append("line")
                    .attr("x1", roomSvg.attr('cx'))
                    .attr("y1", roomSvg.attr('cy'))
                    .attr("x2", roomSvg.attr('cx'))
                    .attr("y2", groundLevel)
                    .attr("stroke-width", 10)
                    .attr("stroke", color);

            var name = svg.append("text")
                        .attr("x", roomSvg.attr('cx'))
                        .attr("y", roomSvg.attr('cy'))
                        .text(file['fileName'])
                        .attr("stroke-width", 0.5)
                        .attr("stroke", "black")
                        .style("font-family", "Verdana")
                        .style("font-size", "12px")
                        .style("fill", "white");


            rooms[file['fileName']] = {};
            var newRootRoom = rooms[file['fileName']];
            newRootRoom['roomSvg'] = roomSvg;
            newRootRoom['parents'] = [];
            newRootRoom['childs'] = [];
        }
        


    }

    function countNumberRootRooms(){
        var count = 0;
        for(var key in rooms){
            var room = rooms[key];
            console.log("key:"+key);
            if(room['parents'].length == 0){
                count++;
            }
        }
        return count;
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
    
    function createStars(canvas) {
        var starData = [
                        { "cx": window.innerWidth/6, "cy": 80, "radius": 1, "color": "white"  },
                        { "cx": 2*window.innerWidth/3, "cy": 40, "radius": 2, "color": "white" },
                        { "cx": window.innerWidth/4, "cy": 40, "radius": 2, "color": "white" },
                        { "cx": 5*window.innerWidth/6, "cy": 80, "radius": 1, "color": "white"},
                        { "cx": window.innerWidth/3, "cy": 80, "radius": 2, "color": "white"  },
                        { "cx": window.innerWidth/2, "cy": 90, "radius": 1, "color": "white"  },
                        { "cx": window.innerWidth/20, "cy": 50, "radius": 2, "color": "white"  },
                        { "cx": window.innerWidth/15, "cy": 120, "radius": 1, "color": "white"  },
                        { "cx": 18*window.innerWidth/20, "cy": 120, "radius": 2, "color": "white"  },
                        { "cx": 15*window.innerWidth/20, "cy": 120, "radius": 2, "color": "white"  },
                        { "cx": 13*window.innerWidth/20, "cy": 160, "radius": 2, "color": "white"  },
                        { "cx": 2*window.innerWidth/5, "cy": 170, "radius": 2, "color": "white"  }];
        
        var group2 = canvas.append("g");
        var stars = group2.selectAll("circle").data(starData).enter().append("circle");
        var starAttributes = stars
        .attr("cx", function (d) {return d.cx;})
        .attr("cy", function (d) {return d.cy;})
        .attr("r", function (d) {return d.radius;})
        .style("fill", function (d) {return d.color;});
        
        return group2;
    }

function starcolor(hours) {
    var starcolor = 1;
    switch (hours) {
        case 0:
            starcolor = 0;
            break;
        case 12:
            starcolor = 1;
            break;
    }
    return starcolor;
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