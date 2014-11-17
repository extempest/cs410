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
    .attr("height", window.innerHeight-groundLevel)
    .style("fill", "#A9672E");

    var stopCounter = 0;
    var isPaused = false;
    
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

                if(!isPaused){
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


                        resumeAnimeationFromCommit(today.getHours());

                        commits.forEach(function(commit){

                            if(!commit["processed"]){
                                //console.log("now:"+today+" timestamp:"+commit["timestamp"])

                                if(today.getTime()>commit["timestamp"]){
                                    isPaused = true;
                                    today.setHours(today.getHours()-1);
                                    pauseAnimationForCommit();
                                    commit["processed"] = true;
                                    var author = authors[commit["author"]];
                                    // console.log(authors);
                                    var nextPos = nextPosition();
                                    var tempTime = today.getHours();

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
                                        .each("end", function(tempTime) {
                                            isPaused = false;});
                                        ant.position = nextPos;

                                        authors[commit["author"]] = author;
                                        checkRoom(commit['filesAdded'], ant.group1);
                                    } else {
                                        author["contribution"]  += 1;
                                        var ant = author["antMarker"]

                                        ant = movePosition(ant, nextPos, tempTime);
                                        checkRoom(commit['filesAdded'], ant.group1);
                                    }

                                    // checkSleep(5000);
                                }
                            }else{
                                //console.log("ho")
                            }
                        })

                        // commits.forEach(oneCommit(commit));

                        today.setHours(today.getHours()+1);

                        stopCounter++;
                        if(stopCounter == 2){
                        //     // moon.transition()
                        //     // .duration(0);

                        //     // moon.transition()
                        //     // .duration(24000)
                        //     // .ease("in-out")
                        //     // .attrTween("transform", orbit((18+today.getHours() - 1 )/24));

                        //     // console.log(sky.style("Fill"));
                        //     // moon.style("fill", sky.style("Fill"));

                        //     pauseAnimationForCommit();
                        //     resumeAnimeationFromCommit(today.getHours() - 1);

                        console.log("check1");
                        console.log(moon.style("fill"));
                        console.log("check2");
                        console.log(moon.transform);
                    }

                        // if(stopCounter == 2){
                        //     pauseAnimationForCommit();
                        //     // resumeAnimeationFromCommit(today.getHours() - 1);
                        // }
                        // if(stopCounter == 3){
                        //     resumeAnimeationFromCommit(today.getHours() - 1);
                        // }


                    } else {
                        pauseAnimationForCommit();
                        clearInterval(intervalId)
                        simulateDay(index+1,lastIndex,iData)
                    }
                }
            }, delay);
} else {
    todayLabel.text("Project ended")
}
}


function oneCommit(commit){

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
                    .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")");
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
    }

    function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    function checkSleep(time){
        console.log("sleeping");
        sleep(time);
        console.log("awake");
    }

    //stopping the animation except the ants
    function pauseAnimationForCommit(){
        sky.transition().duration(0);
        star.transition().duration(0);
        sun.transition().duration(0);
        moon.transition().duration(0);
    }

    //resuming the animation of the background
    function resumeAnimeationFromCommit(time){
        var tweleveTime = (time % 12);
        sky.transition().duration((12 - tweleveTime)*1000)
        .style("fill", resumeSkyColor(time));
        star.transition().duration((12 - tweleveTime)*1000)
        .style("opacity", resumeStarColor(time));

        sun.transition().duration(24000)
        .ease("in-out")
        .attrTween("transform", orbit(sunPosition(time)));
        moon.transition().duration(24000)
        .ease("in-out")
        .attrTween("transform", orbit(moonPosition(time)));
    }

    function resumeSkyColor(time){
        if(time < 12)
            return skycolor(0);
        else
            return skycolor(12);
    }

    function resumeStarColor(time){
        if(time < 12)
            return starcolor(0);
        else
            return starcolor(12);
    }

    function sunPosition(time){
        return ((6+time)%24)/24;
    }

    function moonPosition(time){
        return ((18+time)%24)/24;
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
        this.push = function (x,y,room){
            console.log("grid:")
            console.log(this.rooms)
            //console.log("inserted room:")            
            //console.log(room)
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
            }else {
                //theres room in grid
                //console.log("defined")
                var occupyingRoom = this.rooms[y][x]
                if (occupyingRoom.parents.length == 0){
                    room.x = room.x + 1
                } else {
                    //console.log(occupyingRoom.parents[0])
                    //console.log(room.parents[0])
                    if (occupyingRoom.parents[0].x < room.parents[0].x){
                        //console.log("printing room:")
                        //console.log(room)
                        room.x = room.x+1
                        this.push(x+1, y, room)                        
                        room.move(x+1,y)
                    } else {
                        occupyingRoom.x = occupyingRoom.x + 1

                        occupyingRoom.move(x+1,y)
                        this.push(x+1,y, occupyingRoom)
                        this.rooms[y][x] = room
                    }
                }
            }
        }



    }

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
        this.move = function (newx,newy){

            var newXCoor = (roomRx*2 + distanceXBetweenRooms)*(newx)+(roomRx+distanceToBorder)

            console.log("parent of "+this.name+" is "+this.parents[0].name)
            console.log("parent x: "+this.parents[0].x)
            var parentX =  (roomRx*2 + distanceXBetweenRooms)*(this.parents[0].x)+(roomRx+distanceToBorder)
            this.svg.transition()
            .duration(500)
            .attr("cx", newXCoor)
            this.nameLabel.transition()
            .duration(500)
            .attr("x",newXCoor)
            this.tunnel.transition()
            .duration(500)
            .attr("x1", newXCoor)
            .attr("x2", parentX)

            if (this.name == "cat"){
                console.log("cat x: "+this.x)
            }

            this.childs.forEach(function(child){
                console.log("aaaaaaaaa")
                console.log(child)
                child.x = child.x + 1
                grid.push(child.x, child.y, child)
                grid.rooms[child.y][child.x] = 0
                child.move(child.x, child.y)

            })


        }



        if(file['parents'].length > 0 ){
            //this room is a child of some file
            //console.log("I HAVE A PARENT");

            var parentRoom = rooms[file['parents'][0]];
                //var parentRoomSvg = parentRoom['roomSvg'];
                var parentRoomSvg = parentRoom.svg;

            //console.log("bbox:"+parentRoomSvg.attr('cx'));
            //console.log("printing a parent room:");
            //console.log(parentRoom)
            var numParentKids = parentRoom.childs.length;
            var cx = parseInt(parentRoomSvg.attr('cx'));
            var cy = parseInt(parentRoomSvg.attr('cy'));
            this.x = parentRoom.x + numParentKids
            this.y = parentRoom.y + 1;
            this.parents = [];
            this.childs = [];
            this.parents.push(parentRoom);
            parentRoom.childs.push(this);

            var color = parentRoomSvg.attr('fill');
            var roomSvg = svg.append("ellipse")
            .attr("cx", (roomRx*2 + distanceXBetweenRooms)*(this.x)+(roomRx+distanceToBorder))
            .attr("cy", groundLevel+distanceToGround+roomRy+(this.y * (distanceYBetweenRooms + (roomRy*2))))
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

            this.nameLabel = name

            this.svg = roomSvg;

            this.tunnel = tunnel
            //rooms[file['fileName']] = {};
            //var newRootRoom = rooms[file['fileName']];
            //newRootRoom['roomSvg'] = roomSvg;
            //update relationship
            //newRootRoom['parents'] = [];


            //update relationship
            //newRootRoom['parents'].push(parentName);
            //newRootRoom['childs'] = [];                
            //parentRoom['childs'].push(file['fileName']);

            grid.push(this.x, this.y, this)


        } else {
            //this room is a root room
            //50 is the ry 
            //25 is tunner distance
            var color = "hsl(" + Math.random() * 360 + ",100%,50%)";

            var numRootRooms = countNumberRootRooms();

            //console.log("rooms"+rooms);
            //console.log("numroot:"+numRootRooms);
            this.y = 0;
            this.x = numRootRooms;
            this.parents = [];
            this.childs = [];

            var roomSvg = svg.append("ellipse")
            .attr("cx", (roomRx*2 + distanceXBetweenRooms)*(this.x)+(roomRx+distanceToBorder))
            .attr("cy", groundLevel+distanceToGround+roomRy+(this.y * (distanceYBetweenRooms + (roomRy*2))))
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

            this.tunnel = tunnel
            //rooms[file['fileName']] = {}; //creating an empty dictionary in the global "room" variable with the filename as the key
            //var newRootRoom = rooms[file['fileName']];
            //newRootRoom['roomSvg'] = roomSvg;
            //newRootRoom['parents'] = [];
            //newRootRoom['childs'] = [];
            var name = svg.append("text")
            .attr("x", roomSvg.attr('cx'))
            .attr("y", roomSvg.attr('cy'))
            .text(file['fileName'])
            .attr("stroke-width", 0.5)
            .attr("stroke", "black")
            .style("font-family", "Verdana")
            .style("font-size", "12px")
            .style("fill", "white");

            this.nameLabel = name

            this.svg = roomSvg;

            grid.push(this.x, this.y, this)

        }



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



    function movePosition(ant, nextPos, tempTime) {
        var pos = ant.position;
        var direction = ant.direction;

        if(direction == "rigth"){
            if(pos < nextPos){
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")")
                .each("end", function(tempTime) {
                    isPaused = false;});
            }
            else if(pos > nextPos){
                ant.direction = "left";
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")" + "scale(" + [-1,1] + ")")
                .each("end", function(tempTime) {
                    isPaused = false;});
            }
        }else{
            if(pos < nextPos){
                ant.direction = "right";
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")")
                .each("end", function(tempTime) {
                    isPaused = false;});
            }
            else if(pos > nextPos){
                ant.group1.transition()
                .duration(500)
                .attr("transform", "translate(" + [nextPos,groundLevel-55] + ")" + "scale(" + [-1,1] + ")")
                .each("end", function(tempTime) {
                    isPaused = false;});
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
}