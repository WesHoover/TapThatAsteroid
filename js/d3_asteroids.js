
  function createD3() {

    var viz = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
        .attr ("transform", "translate(50,50)");

    var pack = d3.layout.pack()
      .size([width, height - 50])
      .padding(10);



  }
