// code adapted from http://mbostock.github.com/d3/ex/bubble.html
//
// xkcd color scale:
// blue: #156b87, lightbrown: #876315, brown: #543510, red: #872815
// max: 24.5, min: 0.003
// 0.0-4.0: blue; 4.0-8.0: lightbrown; 8.0-18.0: brown; 18.0-23.5: red
var r = 960
  , format = d3.format(".2f");
// http://en.wikipedia.org/wiki/Jupiter_mass
var earthToJupiter = 317.83
  , jupiterToEarth = 0.00315;
var ourPlanets = [
  {name:'mercury', radius:'0.3829'},
  {name:'venus', radius:'0.9499'},
  {name:'earth', radius:'1.0'},
  {name:'mars', radius:'0.533'},
  {name:'jupiter', radius:'11.209'},
  {name:'saturn', radius:'9.4492'},
  {name:'uranus', radius:'4.007'},
  {name:'neptune', radius:'3.883'},
  {name:'pluto', radius:'0.18'},
];
var dFill = d3.scale.linear()
    .domain([0.0004, 2500])
    .range([d3.hsl('#DCDCDC'), d3.hsl('#156b87')]);
// making a custom scale
function cFill(d){
  if(d.name === 'alf Cen B b')
    return d3.hsl('#E0E35D');
  var val = d.radius;
  if(val >= 0.0 && val < 4.02)
    return d3.hsl('#156B87');
  if(val >= 4.02 && val < 11.210)
    return d3.hsl('#876315');
  if(val >= 11.210 && val < 16.0)
    return d3.hsl('#543510');
  else
    return d3.hsl('#872815');
}
var bubble = d3.layout.pack()
  .sort(null)
  .value(function(d) { return d.radius * d.radius; })
  .size([r, r]);
var vis = d3.select("body").append("svg")
  .attr("width", r)
  .attr("height", r+100)
  .attr("class", "bubble");
//colorblindness
vis.append("text")
  .attr("id", "colorBlind")
  .attr("x", r/2)
  .attr("y", r/2 + 300)
  .attr("fill", "white")
  .style("fill-opacity", ".0")
  .style("font-size", "750px")
  .style("text-anchor", "middle")
  .text("42");
// planet title
vis.append("text")
  .attr("id", "planet")
  .attr("x", 15)
  .attr("y", 80)
  .style("font-size", "32px")
  .style("text-anchor", "left")
  .text("Planet Name");
// earth mass info
vis.append("text")
  .attr("id", "earths")
  .attr("x", 15)
  .attr("y", 110)
  .style("text-anchor", "left")
  .text("(earth radius)");
// year info
vis.append("text")
  .attr("id", "year")
  .attr("x", 15)
  .attr("y", 170)
  .style("text-anchor", "left")
  .text("year discovered");

// atmosphere info
vis.append("text")
  .attr("id", "atmosphere")
  .attr("x", 15)
  .attr("y", 140)
  .style("text-anchor", "left")
  .text("atmosphere type");
var colorByDistance = false;
function toggleMetric() {
  if(!colorByDistance) {
    colorByDistance = true;
    d3.select('#distanceButton').style('fill', '#156B87');
    d3.select('#massButton').style('fill', 'white');
    updateNodes();
  } else {
    colorByDistance = false;
    d3.select('#massButton').style('fill', '#156B87');
    d3.select('#distanceButton').style('fill', 'white');
    updateNodes();
  }
}
// earth mass info
vis.append("rect")
  .attr("id", "massButton")
  .attr("x", r/2 - 50)
  .attr("y", 10)
  .attr("width", 10)
  .attr("height", 10)
  .style("stroke", 'black')
  .style("fill", "#156B87")
  .on("click", toggleMetric);
vis.append("rect")
  .attr("id", "distanceButton")
  .attr("x", r/2 - 50)
  .attr("y", 30)
  .attr("width", 10)
  .attr("height", 10)
  .style("stroke", 'black')
  .style("fill", 'white')
  .on("click", toggleMetric);
vis.append("text")
  .attr("id", "distanceButtonText")
  .style("font-size", "12px")
  .attr("x", r/2+15-50)
  .attr("y", 19)
  .text("color by radius");
vis.append("text")
  .attr("id", "distanceButtonText")
  .style("font-size", "12px")
  .attr("x", r/2+15-50)
  .attr("y", 39)
  .text("color by distance to nearest star");
var updateNodes = function() {
  var circs = vis.selectAll("g.node").selectAll('circle');
  circs.transition()
    .duration(1000)
    .style("fill", function(d) {
      if(!colorByDistance)
        return cFill(d);
      else
        return dFill(d.distance);
    });
  circs.on("mouseover", function(d) {
    if(colorByDistance) {
      d3.select("#planet").text(d.className);
      d3.select("#earths").text("("+format(d.distance)+" * earth-to-sun distance)");
      d3.select("#year").text("year discovered: "+d.year);
      d3.select("#atmosphere").text("atmosphere type: "+d.atmosphere);
      d3.select(this).style("fill", function(d) { return d3.hsl(dFill(d.distance)).darker(); });
    } else {
      d3.select("#planet").text(d.className);
      d3.select("#earths").text("("+format(d.radius)+" *  earth-radius)");
      d3.select("#year").text("year discovered: "+d.year);
      d3.select("#atmosphere").text("atmosphere type: "+d.atmosphere);
      d3.select(this).style("fill", function(d) { return cFill(d).brighter(); });
    }
  });
  circs.on("mouseout", function(d) {
    if(colorByDistance) {
      d3.select(this).style("fill", function(d) { return d3.hsl(dFill(d.distance)); });
    } else {
      d3.select(this).style("fill", function(d) { return cFill(d); });
    }
  });
}
// other planets
vis.selectAll('circle.ourPlanets')
  .data(ourPlanets)
  .enter().append('circle')
    .attr('class', 'ourPlanets')
    .attr('id', function(d) { return d.name; })
    .attr('cx', function(d, i) { return r - 70; })
    .attr('cy', function(d, i) { return 80 + 25*i; })
    .attr('r', function(d, i) {
      return d.radius;
    })
    .style('fill', function(d, i) {
        return cFill(d);
    })
    .on("mouseover", function(d) {
      d3.select("#planet").text(d.name);
      d3.select("#earths").text("("+format(d.radius)+" * earth radius)");
      d3.select("#year").text("");
      d3.select("#atmosphere").text("");
      d3.select(this).style("fill", function(d) { return cFill(d).brighter(); });
    })
    .on("mouseout", function(d) {
      d3.select(this).style("fill", function(d) { return cFill(d); });
    });

vis.selectAll('text.ourPlanets')
  .data(ourPlanets)
  .enter().append('text')
    .attr('class', 'ourPlanets')
    .style("font-size", "12px")
    .attr('x', function(d, i) { return r - 50; })
    .attr('y', function(d, i) { return 80 + 26*i; })
    .text(function(d) { return d.name; })
    .on("mouseover", function(d) {
      d3.select("#planet").text(d.name);
      d3.select("#earths").text("("+format(d.radius)+" * earth radius)");
      d3.select("#year").text("");
      d3.select("#atmosphere").text("");
      d3.select('#'+d.name).style("fill", function(d) { return cFill(d).brighter(); });
      if(d.name === 'pluto'){
        d3.select(this).text("jk!");
        d3.selectAll('circle.ourPlanets').select(d.name).style('fill', 'white');
      }
    })
    .on("mouseout", function(d) {
      d3.select('#'+d.name).style("fill", function(d) { return cFill(d); });
      if(d.name === 'pluto'){
        d3.select(this).text(d.name);
        d3.selectAll('circle.ourPlanets').select(d.name).style('fill', cFill(d));
      }
    });

d3.json("exoplanets.json", function(json) {
  var node = vis.selectAll("g.node")
      .data(bubble.nodes(classes(json))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + (80 + d.y) + ")"; });
  node.append("title")
    .text(function(d) { return d.className + "\n * Earth Radius: " + d.radius + "\n AU (distance to star): " + d.distance; });
  node.append("circle")
    .attr("r", function(d) { return Math.sqrt(d.r * d.r * .8); })
    .style("fill", function(d) { return cFill(d); })
    .on("mouseover", function(d) {
      d3.select("#planet").text(d.className);
      d3.select("#earths").text("("+format(d)+" * earth radius)");
      d3.select("#year").text("year discovered: "+d.year);
      d3.select("#atmosphere").text("atmosphere type: "+d.atmosphere);
      d3.select(this).style("fill", function(d) { return cFill(d).brighter(); });
    })
    .on("mouseout", function(d) {
      d3.select(this).style("fill", function(d) { return cFill(d); });
    });
});
// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];
  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.P_Name, radius: node.P_Radius_EU, distance: node.P_Mean_Distance_AU, year: node.P_Disc_Year, atmosphere: node.P_Atmosphere_Class});
  }
  recurse(null, root);
  return {children: classes};
}
function colorBlind(){
  var circs = vis.selectAll("g.node").selectAll('circle');
  circs.transition()
    .duration(1000)
    .style("fill-opacity", ".7");
  vis.transition()
   .duration(1000)
   .select("text#colorBlind")
   .attr("fill", "#a9a9a9")
   .style("fill-opacity", ".7");
}
</script>

<script>
(function (){
  "use strict";
  var konami = new Konami();

  konami.code = function() {
    colorBlind();
  };

  konami.iphone.code = function() {
    colorBlind();
  };

  konami.load()
}());
console.log('(after you\'re done, try the konami code: up, up, down, down, left, right, left, right, b, a, enter - refresh to start over)');
</script>
