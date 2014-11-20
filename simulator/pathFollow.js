queue()
.defer(d3.xml, "wiggle.svg", "image/svg+xml")
.await(ready);

function ready(error, xml) {
    
    //mockData
    //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    
    //console.log(realData);
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
                  },
                  {
                  'fileName':'cat',
                  'parents':
                  [
                   'animals'
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
                 },
                 {
                 'author':'Thompson',
                 'timestamp': new Date(2014, 0, 1, 15, 1 , 1, 1),
                 'filesAdded':
                 [
                  {
                  'fileName':'persian',
                  'parents':
                  [
                   'cat'
                   ]
                  },
                  {
                  'fileName':'dog',
                  'parents':
                  [
                   'animals'
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
                  },
                  {
                  'fileName':'hammer',
                  'parents':
                  [
                   'tools'
                   ]
                  }
                  ],
                 'filesModified': [],
                 'filesDeleted':[],
                 'relationshipModified':[]
                 },
                 {
                 'author':'Thompson',
                 'timestamp': new Date(2014, 0, 2, 7, 1 , 1, 1),
                 'filesAdded':
                 [
                  {
                  'fileName':'banana',
                  'parents':
                  [
                   'fruits'
                   ]
                  },
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
    var grid = new Grid()
    
    
    
    
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
    .attr("height", 99999)
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
    
    //var antGroup = svg.append("g");
    //var defs = svg.append("defs");
    
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
                                         
                                         
                                         //console.log(today.getTime());
                                         if (today.getTime() < tommorrow.getTime()){
                                         
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
                                         
                                         commits.forEach(function(commit){
                                                         
                                                         if(!commit["processed"]){
                                                         //console.log("now:"+today+" timestamp:"+commit["timestamp"])
                                                         
                                                         if(today.getTime()>commit["timestamp"]){
                                                         commit["processed"] = true;
                                                         var author = authors[commit["author"]];
                                                         // console.log(authors);
                                                         var nextPos = nextPosition();
                                                         
                                                         if(!author){
                                                         author = {};
                                                         author["contribution"] = 10;
                                                         
                                                         var ant = new ants(svg);
                                                         author["antMarker"] = ant;
                                                         
                                                         //console.log(ant.group1);
                                                         ant.group1.transition()
                                                         .duration(500)
                                                         .attr("transform", "translate(" + [27,groundLevel-55] + ")")
                                                         .transition()
                                                         .duration(500)
                                                         .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")")
                                                         ;
                                                         ant.position = nextPos;
                                                         
                                                         authors[commit["author"]] = author;
                                                         checkRoom(commit['filesAdded'], ant.group1);
                                                         } else {
                                                         author["contribution"]  += 1;
                                                         var ant = author["antMarker"]
                                                         
                                                         ant = movePosition(ant, nextPos);
                                                         checkRoom(commit['filesAdded'], ant.group1);
                                                         }
                                                         
                                                         }
                                                         }else{
                                                         //console.log("ho")
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
            //console.log(files);
            files.forEach(function(file){
                          var filename = file['fileName'];
                          var existingFile = rooms[filename];
                          if(!existingFile){
                          //no room of this file... so create a new room
                          var newRoom = new Room(file)
                          rooms[filename] = newRoom; //creating an empty dictionary in the global "room" variable with the filename as the key
                          
                          } else {
                          //room exist so modidfy that room
                          }
                          
                          });
            
            
            
        }
        
    }
    
    
    function Grid(){
        this.rooms = [[]];
        
        this.delete = function(x,y){
            this.rooms[y][x]=0
        }
        
        this.moveChildren = function(parentRoom){
            for(var i = parentRoom.childs.length-1; i >= 0 ;i--){
                console.log("moving kids..."+parentRoom.childs[i].name)
                if(parentRoom.childs[i].svg){
                    grid.delete(parentRoom.childs[i].x,parentRoom.childs[i].y)
                    parentRoom.childs[i].move(parentRoom.childs[i].x+1, parentRoom.childs[i].y)
                }
                parentRoom.childs[i].x = parentRoom.childs[i].x + 1
                var callback = grid.moveChildren
                grid.push(parentRoom.childs[i].x, parentRoom.childs[i].y,parentRoom.childs[i],callback)
            }
        }
        
        this.push = function (x,y,room, callback){
            console.log("grid:")
            console.log(this.rooms)
            console.log("pushing "+room.name+" to:( "+x+","+y+")")
            //console.log("rooms.length:"+this.rooms.length)
            //console.log("y"+y)
            if (y >= this.rooms.length) {
                //need more depth
                //console.log("PUSHING MORE DEPTH")
                this.rooms.push([]);
            }
            
            if (x >= this.rooms[y].length){
                //console.log("PUHSING MORE WIDTH")
                this.rooms[y].push(0);
            }
            
            
            //console.log("checking grid["+x+"]["+y+"]:")
            //console.log(this.rooms[y][x])
            if (!this.rooms[y][x]) {
                //if no room in the grid
                
                //console.log("undefined")
                this.rooms[y][x]=room
                if(callback){
                    callback(room)
                }
            }else {
                //theres room in grid
                //console.log("defined")
                var occupyingRoom = this.rooms[y][x]
                
                console.log(occupyingRoom.name)
                
                if (occupyingRoom.parents.length == 0){
                    room.x = room.x + 1
                    this.push(x+1, y, room)
                    if(room.svg){
                        room.move(x+1, y)
                    }
                    if(callback){
                        callback(room)
                    }
                } else {
                    //console.log(occupyingRoom.parents[0].name)
                    //console.log(room.parents[0].name)
                    //search for the root and then movement
                    occupyingRoomBranch = occupyingRoom
                    while(occupyingRoomBranch.parents.length != 0){
                        occupyingRoomBranch = occupyingRoomBranch.parents[0]
                    }
                    currentBranch = room
                    while(currentBranch.parents.length != 0){
                        currentBranch = currentBranch.parents[0]
                    }
                    
                    var occupyingRoot = occupyingRoomBranch
                    var currentRoot = currentBranch
                    
                    
                    
                    var targetMove
                    if (currentRoot.x > occupyingRoot.x){
                        targetMove = currentRoot
                    } else {
                        targetMove = occupyingRoot
                    }
                    this.delete(targetMove.x,targetMove.y)
                    targetMove.x = targetMove.x + 1
                    
                    var pushChildren = this.moveChildren
                    var nextRoom = this.rooms[targetMove.y][targetMove.x]
                    if (nextRoom) {
                        if (nextRoom.svg){
                            this.delete(nextRoom.x, nextRoom.y)
                        }
                        nextRoom.x = nextRoom.x + 1
                        var pushNextRoomChildren = this.moveChildren
                        this.push(nextRoom.x, nextRoom.y, nextRoom,pushNextRoomChildren)
                        nextRoom.move(nextRoom.x , nextRoom.y)
                    }
                    
                    this.push(targetMove.x,targetMove.y,targetMove, pushChildren)
                    targetMove.move(targetMove.x,targetMove.y)
                    
                    
                    
                }
            }
        }
    }
    
    var mergedRoom = svg.append('g').attr("class", 'all').call(d3.behavior.drag().origin(function() {
                                                                                         var t = d3.select(this);
                                                                                         return {x: t.attr("x") + d3.transform(t.attr("transform")).translate[0],
                                                                                         y: t.attr("y") + d3.transform(t.attr("transform")).translate[1]};
                                                                                         })
                                                               .on("drag", function(d,i) {
                                                                   d3.select(this).attr("transform", function(d,i){
                                                                                        return "translate(" + [ d3.event.x,0 ] + ")"
                                                                                        })
                                                                   }));

    
    function Room(file){
        var roomRx = 80; //Rx means radius in x direction since the room is ellipse
        var roomRy = 50; //Ry means radius in y direction
        var distanceXBetweenRooms = 50;
        var distanceYBetweenRooms = 25;
        var distanceToBorder = 20;
        var distanceToGround = 25;
        this.x = -1; //Coordinates in respect to grid
        this.y = -1;
        this.nameLabel
        this.svg
        this.parents = [];
        this.childs = [];
        this.name = file['fileName'];
        this.tunnel
        this.inviGround
        
        
        this.addSvg = function (x, y){
            
            var color = "hsl(" + Math.random() * 360 + ",100%,50%)";
            
            
            var roomSvg = mergedRoom.append("ellipse").attr("class", 'all')
            .attr("cx", (roomRx*2 + distanceXBetweenRooms)*(this.x)+(roomRx+distanceToBorder))
            .attr("cy", groundLevel+distanceToGround+roomRy+(this.y * (distanceYBetweenRooms + (roomRy*2))))
            .attr("rx", roomRx)
            .attr("ry", roomRy)
            .attr("fill",color);
            
            //var tunnelSvg =  svg.append("rect")
            var tunnel = mergedRoom.append("line").attr("class", 'all')
            .attr("x1", roomSvg.attr('cx'))
            .attr("y1", roomSvg.attr('cy'))
            .attr("x2", roomSvg.attr('cx'))
            .attr("y2", groundLevel)
            .attr("stroke-width", 10)
            .attr("stroke", color);
            
            var name = mergedRoom.append("text").attr("class", 'all')
            .attr("x", roomSvg.attr('cx'))
            .attr("y", roomSvg.attr('cy'))
            .text(file['fileName'])
            .attr("stroke-width", 0.5)
            .attr("stroke", "black")
            .style("font-family", "Verdana")
            .style("font-size", "12px")
            .style("fill", "white");
            
            var inviGround = mergedRoom.append("rect").attr("class", 'all')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 999999)
            .attr("height", 999999)
            .attr("opacity", 0);
            
            
            
            
            if (y > 0) {
                var parentRoom = this.parents[0]
                var parentRoomSvg = this.parents[0].svg
                var color = parentRoomSvg.attr('fill');
                
                
                tunnel
                .attr("x2", (roomRx*2 + distanceXBetweenRooms)*(parentRoom.x)+(roomRx+distanceToBorder))
                .attr("y2", parentRoomSvg.attr('cy'))
                .attr("stroke-width", 10)
                .attr("stroke", color);
                
                roomSvg.attr("fill", color);
                
            }
            
            
            
            this.nameLabel = name
            
            this.svg = roomSvg;
            
            this.tunnel = tunnel
            
            this.inviGround = inviGround;
            
            
        }
        this.move = function (newx,newy){
            
            var newXCoor = (roomRx*2 + distanceXBetweenRooms)*(newx)+(roomRx+distanceToBorder)
            console.log("moving..."+this.name)
            var parentXcoor = newXCoor
            if (this.parents[0]){
                parentXcoor = (roomRx*2 + distanceXBetweenRooms)*(this.parents[0].x)+(roomRx+distanceToBorder)
            }
            
            this.svg.transition()
            .duration(500)
            .attr("cx", newXCoor)
            this.nameLabel.transition()
            .duration(500)
            .attr("x",newXCoor)
            this.tunnel.transition()
            .duration(500)
            .attr("x1", newXCoor)
            .attr("x2", parentXcoor)
            
            
            
            
            
        }
        
        
        
        if(file['parents'].length > 0 ){
            //this room is a child of some file
            //console.log("I HAVE A PARENT");
            
            var parentRoom = rooms[file['parents'][0]];
            //var parentRoomSvg = parentRoom['roomSvg'];
            //var parentRoomSvg = parentRoom.svg;
            
            //console.log("bbox:"+parentRoomSvg.attr('cx'));
            //console.log("printing a parent room:");
            //console.log(parentRoom)
            var numParentKids = parentRoom.childs.length;
            //var cx = parseInt(parentRoomSvg.attr('cx'));
            //var cy = parseInt(parentRoomSvg.attr('cy'));
            
            this.parents = [];
            this.childs = [];
            this.parents.push(parentRoom);
            parentRoom.childs.push(this);
            
            
            //rooms[file['fileName']] = {};
            //var newRootRoom = rooms[file['fileName']];
            //newRootRoom['roomSvg'] = roomSvg;
            //update relationship
            //newRootRoom['parents'] = [];
            
            
            //update relationship
            //newRootRoom['parents'].push(parentName);
            //newRootRoom['childs'] = [];
            //parentRoom['childs'].push(file['fileName']);
            this.x = parentRoom.x + numParentKids
            this.y = parentRoom.y + 1;
            grid.push(this.x, this.y, this)
            
            this.addSvg(this.x, this.y)
            
            
        } else {
            //this room is a root room
            //50 is the ry
            //25 is tunner distance
            
            
            //console.log("rooms"+rooms);
            //console.log("numroot:"+numRootRooms);
            this.y = 0;
            this.x = 0;
            this.parents = [];
            this.childs = [];
            
            
            
            grid.push(this.x, this.y, this)
            this.addSvg(this.x, this.y)
            
        }
        
        /*
         //Mouse Event
         mergedRoom.on("mousemove", function() {
         var m = d3.mouse(this);
         
         mergedRoom.selectAll('.all')
         .attr("cx", m[0])
         .attr("x1", m[0])
         .attr("x2", m[0])
         .attr("x", m[0]);
         
         });
         
         mergedRoom.on('mouseenter', function() {
         mergedRoom.selectAll('.all');
         });
         mergedRoom.on('mouseleave', function() {
         mergedRoom.selectAll('.all');
         });
         */
    }
    
    
    
    
    
    function countNumberRootRooms(){
        var count = 0;
        //console.log("print all rooms");
        //console.log(rooms)
        for(var key in rooms){
            var room = rooms[key];
            //console.log("printing a root room:");
            //console.log(room)
            
            //console.log("key:"+key);
            if(room.parents.length == 0){
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
    
    function ants(canvas) {
        //initializing variable used inside
        //height of ant
        var height = 55;
        //initializing random color
        var color = "hsl(" + Math.random() * 360 + ",100%,50%)";
        var position = 0;
        
        //setting variables for ant
        this.height = height;
        this.color = color;
        this.position = 0;
        this.direction = "left";
        this.group1 = createAnt(canvas, height, color, position);
    }
    
    
    
    function movePosition(ant, nextPos) {
        var pos = ant.position;
        var direction = ant.direction;
        
        if(direction == "rigth"){
            if(pos < nextPos){
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")");
            }
            else if(pos > nextPos){
                ant.direction = "left";
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")" + "scale(" + [-1,1] + ")");
            }
        }else{
            if(pos < nextPos){
                ant.direction = "right";
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")");
            }
            else if(pos > nextPos){
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")" + "scale(" + [-1,1] + ")");
            }
        }
        
        ant.position = nextPos;
        return ant;
    }
    
    
    
    function createAnt(canvas, height, color, position){
        // Draw the Circle
        var circleData = [
                          { "cx": position+20, "cy": 20, "radius": 20, "color": color },
                          { "cx": position+50, "cy": 20, "radius": 20, "color": color },
                          { "cx": position+80, "cy": 20, "radius": 20, "color": color },
                          { "cx": position+87, "cy": 15, "radius": 6, "color": "white" },
                          { "cx": position+87, "cy": 15, "radius": 3, "color": color } ];
        
        // put circles in group1
        var group1 = mergedRoom.append("g");
        
        var circles = group1.selectAll("circle")
        .data(circleData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {return d.cx;})
        .attr("cy", function (d) {return d.cy;})
        .attr("r", function (d) {return d.radius;})
        .style("fill", function (d) {return d.color;});
        
        
        // draw legs in group1
        for(i = 0; i < 2; i++){
            for(j = 0; j < 2; j++){
                var line = group1.append("line")
                .attr("x1", position+13+(j*12)+(i*47))
                .attr("y1", 20)
                .attr("x2", position+13+(j*12)+(i*47))
                .attr("y2", 55)
                .attr("stroke-width", 2)
                .attr("stroke", color);
            }
        }
        
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
                //console.log("its getting brighter");
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
    
    function nextPosition() {
        return  Math.random()*500;
    }
    
    function move(d, i) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).attr("transform", "translate(" + d.x + "," + d.y + ")");
        
        //var x = d3.event.x;
        //var y = 0;
        //d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
    }
}