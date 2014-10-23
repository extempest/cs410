queue()
.defer(d3.xml, "wiggle.svg", "image/svg+xml")
.await(ready);

function ready(error, xml) {
    
    //mockData
    //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    
    var groundLevel = 100;
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
                         'timestamp': new Date(2014, 0, 1, 2, 1 , 1, 1),
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

    
    
    //Adding our svg file to HTML document
    var importedNode = document.importNode(xml.documentElement, true);
    d3.select("#pathAnimation").node().appendChild(importedNode);
    
    var svg = d3.select("svg");
    
    
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
                        .text("")
    
    simulateDay(0, data.length, data)
    
    
    function simulateDay(index, lastIndex, iData){
        if (index < lastIndex) {
            var entry = iData[index];
            var delay = 1000;
            var now, before = new Date();
            var today = new Date(entry["date"]);
            var tommorrow = new Date(entry["date"]);
            
            var commits = entry["commits"];
            tommorrow.setDate(tommorrow.getDate()+1);
            //console.log("today:"+today);
            //console.log("tmrw:"+tommorrow);
            //console.log()
            var intervalId = setInterval(function() {
                                         todayLabel.text(today)
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
                                                         
                                                         var circ = svg.append("circle");
                                                         author["antMarker"] = circ;
                                                         circ.attr("r",7)
                                                         .attr("transform", "translate(" + [7,groundLevel] + ")")
                                                         .style("fill",function() {
                                                                return "hsl(" + Math.random() * 360 + ",100%,50%)";
                                                                });
                                                         
                                                         console.log(circ);
                                                         circ.transition()
                                                         .duration(500)
                                                         .attr("transform", "translate(" + [27,groundLevel] + ")")
                                                         
                                                         .transition()
                                                         .duration(500)
                                                         .attr("transform", "translate(" + [Math.random()*500,Math.random()*500] + ")");
                                                         
                                                         authors[commit["author"]] = author;
                                                         } else {
                                                         author["contribution"]  += 1;
                                                         
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