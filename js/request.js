$(function() { // doc ready shorthand
// Load Viz button listener

  var limit = 10;
  createViz(limit);
  // var query = ''; // select which piece of data to query and display

  // ===== Show 10 Asteroids ===== //
  $('#set-10').click(function(event) {
    event.preventDefault();
    limit = 10;
    createViz(limit);
    // alert('clicked 10');
  });

  // ===== Show 100 Asteroids ===== //
  $('#set-100').click(function(event) { // set limit to 100 when set-100 button clicked
    event.preventDefault();
    limit = 100;
    createViz(limit);
    // alert('clicked 100');
  });

  // ===== Show 500 Asteroids ===== //
  $('#set-500').click(function(event) {
    event.preventDefault();
    limit = 500;
    createViz(limit);
    // alert('clicked 500');
  });

  // ===== Show 1000 Asteroids ===== //
  $('#set-1000').click(function(event) {
    event.preventDefault();
    limit = 1000;
    createViz(limit);
    // alert('clicked 1000');
  });

  // ===== Show 10000 Asteroids ===== //
  $('#set-10000').click(function(event) {
    event.preventDefault();
    limit = 10000;
    createViz(limit);
    // alert('clicked 10000');
  });

  function createViz(limit) {
    var url = 'http://www.asterank.com/api/asterank?query={"diameter":{"$lt":1000}}&limit=' + limit ;
    console.log(url);
    var width = 800,height = 800;

    var canvas = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
        .attr("transform", "translate(20,50)");

    var pack = d3.layout.pack()
      // .sort(null)
      .size([width, height - 50])
      .value(function(d) {
        console.log(d);
        return d.diameter ? d.diameter : d.est_diameter;
       })
      .padding(10);

    // Passing Data to the pack, create end nodes
    d3.json(url, function(data){
      // console.log(data);
      // console.log(error);
     var nodes = pack.nodes({children: data}).slice(1);
    //  console.log(nodes);
     var node = canvas.selectAll(".node")
       .data(nodes)
       .enter()
       .append("g")
         .attr("class", "node")
         .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

       node.append("circle")
           .attr("r", function (d) { return d.r; })
           .attr("fill", "rgb(222, 222, 222)")
           .attr("opacity", 1);
          //  .attr("stroke", "black")
          //  .attr("stroke-width", "2");
    }); // end d3.json
  } // end createViz

}); // end doc ready
