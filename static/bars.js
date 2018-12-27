var height = 500;
var width = 800;
var margins = {
    left: 40,
    top: 40,
    right: 40,
    bottom: 40
}

var barData = [
    {strength:38},
    {strength:13},
    {strength:24},
    {strength:5},
    {strength:48},
    {strength:30},
    {strength:16},
    {strength:43},
    {strength:14},
    {strength:8},
    {strength:22},
    {strength:35}
]

var barData2 = [
    {strength:13},
    {strength:5},
    {strength:22},
    {strength:16},
    {strength:40},
    {strength:49},
    {strength:27},
    {strength:28},
    {strength:34},
    {strength:19},
    {strength:39},
    {strength:35}
]

var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

var xscale = d3.scaleLinear()
               .domain([0,barData.length])
               .range([0,width-margins.left-margins.right])

var yscale = d3.scaleLinear()
               .domain([0,50])
               .range([(height-margins.bottom),margins.top])

var xaxis = d3.axisBottom(xscale)
              .ticks(barData.length)

var yaxis = d3.axisLeft(yscale)
              .ticks(barData.length)

var barWidth = Math.floor((width-margins.left-margins.right)/barData.length);

svg.append("g")
    .attr("transform", "translate("+margins.left+","+(height-margins.bottom)+")")
    .call(xaxis)

svg.append("g")
    .attr("transform", "translate("+margins.left+",0)")
    .call(yaxis)

svg.selectAll("rect")
    //retrieve data from data source (ie. barData)
    .data(barData)
    //apply data and append to rectangles
    .enter().append("rect")
    // .attr("height", function(d){ return Math.floor(height-margins.bottom-yscale(d.strength)); })
    //grows top down; takes full height substracts bottom margin and subtracts starting point.
    // .attr("height", function(d){ return height-margins.bottom-yscale(d.strength); })
    .attr("height", function(d){ return height-margins.top-yscale(d.strength); })
    //even bar width
    .attr("width", barWidth)
    //starting x-coordinate
    .attr("x", function(d,i){ return xscale(i); })
    //starting y-coordinate
    .attr("y", function(d){ return yscale(d.strength); })
    // .attr("y", function(d){ return yscale(50); })
    .attr("transform", function(d){ return "translate("+(margins.left+barWidth/2)+",0)"; })


//set timeout pulls data from second source and uses timeout and transition to change bars
setTimeout(function(){
    svg.selectAll("rect")
        .data(barData2)
        .transition()
        .duration(2000)
        .attr("height", function(d){ return Math.floor(height-margins.bottom-yscale(d.strength)); })
        .attr("width", barWidth)
        .attr("x", function(d,i){ return xscale(i); })
        .attr("y", function(d){ return yscale(d.strength); })
        .attr("transform", function(d){ return "translate("+(margins.left+barWidth/2)+",0)"; })     
}, 5000)
    
