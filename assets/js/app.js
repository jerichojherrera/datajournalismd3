// D3 Scatterplot Assignment

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};


var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

var xScale = d3.scaleLinear().range([0, chartWidth]);
var yScale = d3.scaleLinear().range([chartHeight, 0]);

var bottomAxis = d3.axisBottom((xScale));
var leftAxis = d3.axisLeft(yScale);

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


d3.csv("data/data.csv", function(error, forceData) {
    if (error) {
        throw error;
    }

    console.log(forceData);

    forceData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;

    });

    xScale.domain(d3.extent(forceData, function(data) {
        return data.poverty;
    }));

    yScale.domain(d3.extent(forceData, function(data) {
        return data.obesity;
    }));

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(bottomAxis);

    svg.append("g")
    .attr("class","y axis")
    .call(leftAxis);

    svg.selectAll(".dot")
        .data(forceData)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(data){
            return xScale(data.poverty)
        });
        .attr("cy", function(data){
            return yScale(data.obesity)
        });
        .attr("fill", "blue");

    var text = svg.selectAll("dot")
        .data(forceData)
        .enter()
        .append("text");

    var labels = text
        .attr("class", "label")
        .attr("x", function(data){
            return xScale(data.poverty);
        })
        .attr("y", function(data){
            return yScale(data.obesity);
        }
        .text(function(data){
            return data.state;
        })
        
        .style("font-size", "10px")
        .style("font-weight", "bold");


        var xLabel = svg.append("text")
        .attr("class", "label")     
        .attr("x", chartWidth/2)
        .attr("y", chartHeight + 30)
        .attr("style", "font-weight:bold")
        .text("Poverty Rate (%)");

        var yLabel = svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight/2)
        .attr("y", -30)
        .attr("style", "font-weight:bold")
        .text("Obesity Rate (%)");


})