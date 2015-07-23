$(function() { // doc ready shorthand
// Load Viz button listener
  $('#search').click(function(event) {
    event.preventDefault();
    getAsteroids();
  });

  // var query = '';
  // var limit = '';


  var url = 'http://www.asterank.com/api/asterank?query={"diameter":{"$lt":1000}}&limit=1000';
  var width = 1000,height = 700;

  var canvas = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
      .attr("transform", "translate(50,50)");

  var pack = d3.layout.pack()
    .sort(null)
    .size([width, height - 50])
    .value(function(d) {
      console.log(d);
      return d.diameter;
     })
    .padding(10);

  // Passing Data to the pack, create end nodes
  // d3.json(url, function(data) {
  //   var nodes = pack.nodes(data);
  //   console.log(nodes);
  // });

  d3.json(url, function(data){
    console.log(data);
    // console.log(error);
   var nodes = pack.nodes({children: data});
   console.log(nodes);
   var node = canvas.selectAll(".node")
     .data(nodes)
     .enter()
     .append("g")
       .attr("class", "node")
       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

     node.append("circle")
         .attr("r", function (d) { return d.r; })
         .attr("fill", "grey")
         .attr("opacity", 0.5)
         .attr("stroke", "black")
         .attr("stroke-width", "2");
 });


}); // end doc ready
