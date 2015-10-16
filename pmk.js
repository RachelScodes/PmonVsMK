window.onload = function () {
    console.log("It's loaded!");
    //no idea what goes here yet lol
    //global scorekeeping variables
    var playerOne = true;

    charSelectScreen();

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
      health: 60,
      //winMsg: ['http://img06.deviantart.net/6dae/i/2011/030/1/7/pikacide_by_kid_viral-d38fbjk.jpg', ('I don'+'t know where you got that axe, but you win buddy! An ELECTRIC victory!')]
   },

   sindel: {
      name: 'Sindel',
      avatar: ['http://vignette3.wikia.nocookie.net/mortalkombat/images/9/93/Vs_sindel.gif/revision/latest?cb=20090917142727&path-prefix=es', 'http://www.theageofmammals.com/blogmedia/mk/sindel-falling.gif', 'http://bestanimations.com/Games/Computer/MortalCombat/Sindel/mortalkombatsindelanimation-3.gif'],
      attack1: ['Scream', 4.5, 'Psychic', 'images/s-scream.gif'], //, 'sound-src-url??'],
      attack2: ['Hair Whip', 4.5, 'Physical', 'images/s-whip.gif'], //, 'sound-src-url??'],
      def: ['The Ring', 1.5, 'http://www.fightersgeneration.com/np2/char1/gifs/sindel-mk3-slip.gif'], //, 'sound-src-url??'],
      accuracy: 8.5,
      health: 70,
   },

   snorlax: {
      name: 'Snorlax',
      avatar: ['http://33.media.tumblr.com/e6a9f362751cdc95b3be52196ee66b2b/tumblr_mnalxua3us1rfjowdo1_500.gif', 'https://shadowdaleraven.files.wordpress.com/2013/03/snorlax.gif', 'http://orig07.deviantart.net/876e/f/2010/269/9/1/flying_snorlax_by_mrsquirrelz-d2zif7h.gif'],
      attack1: ['Stomp', 5, 'Physical', 'http://orig08.deviantart.net/66ad/f/2013/039/d/f/143att2_by_joshr691-d5u9qir.gif'], //, 'sound-src-url??'],
      attack2: ['Break Wind', 100, 'Toxic', 'http://i1014.photobucket.com/albums/af266/Nightslayer_321/Gifs/Snorlax-Rest_zpse7f40dd8.gif'], //, 'sound-src-url??'],
      def: ['Sleep', 3, 'https://shadowdaleraven.files.wordpress.com/2013/03/snorlax.gif'], //, 'sound-src-url??'],
      accuracy: 2,
      health: 100,
   },

   scorpion: {
      name: 'Scorpion',
      avatar: ['http://33.media.tumblr.com/f0bd4e780fe86557675903070dffa2a3/tumblr_mhqa0bHAC31s0pq6co1_250.gif', 'http://i225.photobucket.com/albums/dd155/GM123456/Scorpion_3d_UMK3_stumble.gif', 'http://i305.photobucket.com/albums/nn224/gigant3p/Scorpion_Dancing_by_Methados-1.gif'],
      attack1: ['Spear', 4, 'Physical', 'ttp://orig12.deviantart.net/75fd/f/2013/099/8/0/gif_scorpion_get_over_here_animation_mk_by_luis_mortalkombat14-d6128nw.gif'], //, 'sound-src-url??'],
      attack2: ['Hellfire Punch', 4.5, 'Fire', 'http://orig03.deviantart.net/06a8/f/2013/100/0/e/gif_scorpion_toasty_fatality_mk_by_luis_mortalkombat14-d6167ab.gif'], //, 'sound-src-url??'],
      def: ['Flips and Stuff', 3, 'http://i225.photobucket.com/albums/dd155/GM123456/Scorpion_3d_UMK3_stumble.gif'], //, 'sound-src-url??'],
      accuracy: 7,
      health: 80,
   }

};

var charSelectScreen = function (){

   var container = $('#character-select');
   var charSelect = doc.createElement('ul')
   charSelect.id = "char-select-screen"

   var inst = $('.default');

   for (var i in deck) {
      var char = doc.createElement('li');
      char.setAttribute('class', 'char-avatars');
      char.setAttribute('value', deck[i].name);
      $(char).css('background-image', 'url(' + deck[i].avatar[0] + ')');
      charSelect.appendChild(char);
      debugger
      $(char).on({
         mouseenter: function (){
            //push elements from deck[value] to matching html divs
            inst.detach();

            //
            //This is attaching scorpion every time. i want it to attach to the data for the character it's hovered over
            //
            $('#char-name').html(deck[i].name);
            debugger
            $('#avi-preview').eq(0).css('background-image', 'url(' + deck[i].avatar[2] + ')')
            $('#avi-preview').eq(0).css('background-position', 'center bottom');
         },
         mouseleave: function () {
            //restore render div to default
            inst.prependTo($('#card-render'));
         }
      });
   }
   container.append(charSelect);

};

// var charHoverRender = function(character)
