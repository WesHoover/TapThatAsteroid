$(document).ready(function() { //doc ready


  $('#search').on(click, function(event){
    event.preventDefault();
    getAsteroids();
  });



  function getAsteroids(query, limit) { // Query Asterank API
    var query, limit;
    var earl= "http://asterank.com/api/asterank?query={query}&limit={limit}";

    $.ajax(earl,{
      data: '',
      success: function(data){

      },
      error: ''
    });
  }
)};
