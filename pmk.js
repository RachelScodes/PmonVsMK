window.onload = function () {
    console.log("It's loaded!");
    //no idea what goes here yet lol
    //global scorekeeping variables


    //to start game, remove header
    $(function() {
      var start = $("#start");
      var head = $("header");
      var headStuff = $("#list");
      var health = $(".health");

      //when start button is clicked
      start.click(function() {

         //erase the start button
         start.detach();
         //show character select screen
         charSelectScreen();

         //wait for character input to set width of health bars

         //character input rec'd for both players

         //coin toss determines who is player one
         //set width of health bars based on health
         //of chosen character for each player

         //only the first time:
         //roll back masthead,
        if(head.hasClass('open')) {
          head.removeClass('open');
          head.addClass('closed');

          //show healthbars
          health.removeClass('closed');
          health.addClass('open');
          health.height('50px');
       }

      //show game commands


      });
    });


}

var doc = document;

var deck = {
   pikachu: {
      name: 'Pikachu',
      avatar: ['http://www.pokemon-paradijs.com/animated-gifs/image/pikachu_rent2.gif', 'http://t02.deviantart.net/qIauUAAZi3LyEERUiqEMA0CKWN4=/fit-in/150x150/filters:no_upscale():origin()/pre15/a015/th/pre/f/2013/019/f/9/dead_pikachu_by_pickachua-d5s17w6.png', 'http://i1263.photobucket.com/albums/ii631/Pokemon-Vampire-Knight-lover/pikachu_.gif'],
      attack1: ['ElectroCute', 4.5, 'Electric', 'http://orig15.deviantart.net/e860/f/2010/105/8/e/pikachu___volt_tackle_by_hanshumon.gif'], //, 'sound-src-url??'],
      attack2: ['Pound', 4, 'Physical', 'http://urpgdex.monbrey.com.au/art/models/25-2.gif'], //, 'sound-src-url??'],
      def: ['Defibrilator', 3.5, 'http://i634.photobucket.com/albums/uu68/coocoo406/moving_pikachu.gif'], //, 'sound-src-url??'],
      accuracy: 7,
      //winMsg: ['http://img06.deviantart.net/6dae/i/2011/030/1/7/pikacide_by_kid_viral-d38fbjk.jpg', ('I don'+'t know where you got that axe, but you win buddy! An ELECTRIC victory!')]
   },

   sindel: {
      name: 'Sindel',
      avatar: ['http://vignette3.wikia.nocookie.net/mortalkombat/images/9/93/Vs_sindel.gif/revision/latest?cb=20090917142727&path-prefix=es', 'http://www.theageofmammals.com/blogmedia/mk/sindel-falling.gif', 'http://bestanimations.com/Games/Computer/MortalCombat/Sindel/mortalkombatsindelanimation-3.gif'],
      attack1: ['Scream', 4.5, 'Psychic', 'images/s-scream.gif'], //, 'sound-src-url??'],
      attack2: ['Hair Whip', 4.5, 'Physical', 'images/s-whip.gif'], //, 'sound-src-url??'],
      def: ['The Ring', 1.5, 'http://www.fightersgeneration.com/np2/char1/gifs/sindel-mk3-slip.gif'], //, 'sound-src-url??'],
      accuracy: 8.5,
   }

   
};

var charSelectScreen = function (){
   var charSelect = doc.createElement('ul')
   charSelect.id = "char-select-screen"

   for (var i in deck) {
      var char = doc.createElement('li');
      char.setAttribute('class', 'char-avatars');
      char.html = '<img src="' + deck[i].avatar[0] + '" class="char-avatar-imgs"></img>';
      charSelect.appendChild(char);
      char.on({
    mouseenter: function ((this).val()) {
        //push elements from deck[value] to matching html divs
    },
    mouseleave: function () {
        //restore render div to default
    }
});
   }
   $('#card-render').append(charSelect);

};

var charHoverRender = function(character)
