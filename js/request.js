$(function() { //doc ready

  $('#search').on(click, function(event){
    event.preventDefault();
    getAsteroids();
  });



  function getAsteroids() {

    var earl= "http://asterank.com/api/asterank?query={query}&limit={limit}";

    $.ajax(earl,{
      data: '',


    });
  }
)};
