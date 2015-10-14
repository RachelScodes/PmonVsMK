window.onload = function () {
    alert("It's loaded!");

    var doc = document;

    $(function() {
      var start = $("#start");
      var head = $("header");
      var headStuff = $("#list");
      var health = $(".health");

      start.click(function() {

        if(head.hasClass('open')) {
          head.removeClass('open');
          head.addClass('closed');
          health.removeClass('closed');
          health.addClass('open');
          health.height('50px');
          start.detach();
       }



      //   } else {
      //     head.removeClass('closed');
      //     head.addClass('open');
      //     head.height(true);
      //     health.removeClass('open');
      //     health.addClass('closed');
      //     health.height(0);



      });
    });


}





//when page loads, assign click event to start button
   //when start button is clicked
   //player1 = 'true';

   //display character array
      //shuffle characters each time?

//assign click event to character items
   //click assigns that character to player
   //click changes player1 to false (now player 2)


//assign hover event to character items
   //on hover, display stats


// var characters = [array of character objects]
//
//
// characterObjects:
