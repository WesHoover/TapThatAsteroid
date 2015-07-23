// Exoplanet d3 script


var color = d3.scale.quantize()
    .range(["#156b87", "#876315", "#543510", "#872815"]);

var size = 960;

var pack = d3.layout.pack()
    .sort(null)
    // .size([size, size])
    .value(function(d) { return d.radius * d.radius; })
    .padding(5);

var svg = d3.select("#content-wrapper").append("svg");
    // .attr("width", size)
    // .attr("height", size);

// ===== Data input here - results of AJAX instead of csv ==========
// d3.json(csv, type, function(error, exoplanets) {
// getAsteroids() {
//   exoplanets.sort(function(a, b) {
//     return isFinite(a.distance) || isFinite(b.distance) ? a.distance - b.distance : 0;
//   });

  color.domain(d3.extent(exoplanets, function(d) { return d.radius; }));

  svg.selectAll("circle")
      .data(pack.nodes({children: exoplanets}).slice(1))
    .enter().append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .style("fill", function(d) { return color(d.radius); })
    .append("title")
      .text(function(d) {
        return d.name + "\nplanet radius: " + d.radius + " EU" + "\nstar distance: " + isFinite(d.distance) ? d.distance : "N/A" + " pc";
      });
});

function type(d) {
  d.radius = +d.radius;
  d.distance = d.distance ? +d.distance : Infinity;
  return d;
}

d3.select(self.frameElement).style("height", size + "px");