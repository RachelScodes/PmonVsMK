window.onload = function () {
  console.log("It's loaded!");
   $('#card-hover').hide();

   //global scorekeeping variables
   var playerOne = true;

   //total back and forth turns:
   var turnCount = 0;

   //game on?
   var gameOver = false;

   var doc = document;

   //import cards from deck.js
   var deckObj = deckJS;

   // max # of cards in player decks
   var deckMax = 1 + 1; //+1 for button

   console.log('variables loaded ok');


   //start game
   console.log('startgame');
   (function() {

      //show character select thumbnail screen
      //deck selection
      function makeSelectionThumbnails(){
         //initialize card-render area
         $('#instructions2').hide();

         var container = $('#character-select');
         var charThumbList = doc.createElement('ul');
         charThumbList.id = "char-thumbnail-ul";

         var inst = $('.card#instr');

         for (var i in deckObj) {
            var char = doc.createElement('li');
            char.setAttribute('class', 'char-avis');
            char.setAttribute('value', deckObj[i].name);
            $(char).css('background-image', 'url(' + deckObj[i].avatar[0] + ')');
            charThumbList.appendChild(char);

            //hover displays char stats in #card-render
            //click moves choice to player deck.
            $(char).on({
               mouseenter: function() {
                  //change border on hover, like in MK
                  if (playerOne) {
                     $(this).css('border', '3px solid indianred');
                  } else {
                     $(this).css('border', '3px solid cornflowerblue');
                  }
                  //bind dom element to deck key
                  var charHov = $(this).attr('value').toLowerCase();
                  var charObj = deckObj[charHov];

                  inst.hide();
                  $('#card-hover').show();
                  //push elements from deckObj[value] to
                  //receiving matching html divs
                  //tldr: pushing the stats from the object into the dom
                  $('#char-name').html(charObj.name);
                  $('#avi-preview').eq(0).css('background-image', 'url(' + charObj.avatar[2] + ')');
                  $('p#health').html('Health: <span id="highlight">' + charObj.health + '</span> HP <span class="right"><span id="accuracy">');
                  $('span#accuracy').html('<span id="highlight">' + charObj.accuracy + '</span>/10 Accuracy</span></span>')
                  $('p#attack1').html('Primary Attack: <span id="highlight">' + charObj.attack1[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack1[2] + '</span></span>');
                  $('p#attack2').html('Secondary Attack: <span id="highlight">' + charObj.attack2[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack2[2] + '</span></span>');
                  $('p#defense').html('Defense move: <span id="highlight">' + charObj.def[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.def[2] + '</span></span>');
               },
               mouseleave: function() {

                  $(this).css('border', '3px solid black');
                  //restore render div to default
                  $('#card-hover').hide();
                  inst.show();
               }, //end hover/char preview event

               //click adds/removes charObjs from deck
               //aka swap char choice before confirming
               click: function() {

                  //eo is event object
                  eo = $(this).get(0);

                  //if no deck, create deck
                  var deckJQ = $('div#deck').length ? $('div#deck') : $('<div id="deck">');
                  deckJS = $(deckJQ).get(0);

                  //and add deck to arena, inside container.
                  if (deckJS.parentElement !== $('div#arena').get(0)){
                     $(deckJQ).appendTo($('#arena'));
                  }//if deck is already there, then nothing.

                  //if eo is currently in deck,
                  //move it back to char select screen.
                  if (eo.parentElement.id == 'deck') {
                     $(eo).detach();
                     $(eo).appendTo(charThumbList);
                     $('.play-butt').detach();
                  }

                  //if card is not in deck, but deck
                  //already has a card. no dice.
                  else if (($('#deck').children().length >= deckMax ) && (eo.parentElement.id !== 'deck')){
                  //else if ((!$('#deck').is(':empty')) && (eo.parentElement.id !== 'deck'))

                  //TO-DO - refactor/update: pop over instructions?
                     alert('Greedy! You can play as one character at a time!\n Click a character in your deck to remove it first,\n THEN you can choose another one.');
                  }

                  //if deck is empty and card is clicked
                  //add it to the damned deck awready! lol
                   else if ($('#deck').children().length < (deckMax - 1)) {
                     //detach clicked char
                     $(eo).detach();
                     //add it to deck
                     $(eo).appendTo($('#deck'));
                  }
                  //character has been selected, toggle
                  confirmButton();

               }
               //end char move click event
            });
         }
         //end character-select thumbnail screen creation

         container.append(charThumbList);
      }


      makeSelectionThumbnails();

      function confirmButton(){
         //Make buttons that CONFIRM character choice.
         //and switch player
         var playButt = $('.play-butt').length ? $('.play-butt') : $('<button class="play-butt">');

         if (playerOne){
            $(playButt).text('Player One: CONFIRM');
            $(playButt).attr('id', 'playButt1');
         } else {
            $(playButt).text('Player Two: CONFIRM');
            $(playButt).attr('id', 'playButt2');
         }

         $(playButt).click(function(){
            //selection is confirmed, player select switches
            //move deck selection, into player's personal hand.
            var yourDeck = null;

            if (playerOne) {
               yourDeck = $('#deckOne').length ? $('#deckOne') : $('<div id="deckOne">');
            } else {
               yourDeck = $('#deckTwo').length ? $('#deckTwo') : $('<div id="deckTwo">');
            }
            yourDeck.addClass('playerDeck');
            yourDeck.appendTo('#arena');
            yourDeck.hide();
            //must make a selection to succeed.
            if ($('#deck').children('.char-avis').length < (deckMax - 1)) {
               alert('Your deck is empty! Choose a character!')
            } else {
               $(playButt).detach();
               $(yourDeck).append($("#deck").html());
               $('#deck').html(' ');

               //toggle player and leave character select
               if (playerOne) {
                  $('#instructions2').show();
                  $('#instructions1').hide();
                  playerOne = !playerOne;
                  $('#deck').css('background-color', 'beige');
               } else {
                  playerOne = !playerOne;
                  startBattle();
               }
            }
         });
         // CONFIRM button click event end

         //if deck has selections
         //change bg to indicate player
         //and attach buttons
         if ($('#deck').html().length) {
            if (playerOne) {
               $('#deck').css('background-color', 'indianred');
               $('#deck').append($(playButt));
            } else {
               $('#deck').css('background-color', 'cornflowerblue');
               $('#deck').append($(playButt));
            }
         }
         //end button creation and appending

      } //end confirmButton() maker

     console.log('it\'s all loaded!');
  })(); //end startgame anon func

  function startBattle(){
     $('#deck').hide("fade");
     $('#card-render').hide( "fade");
     $('#character-select').toggle( "fold");
     $('header').animate({
           height: "+=500px",
           lineHeight: "40px",
           fontSize: "20px",
        });
      $('header').html('<br/>Now your decks are complete, choose your attacks wisely...<br/>IT\'S MORTAL KOMBAT!<br/>Click FIGHT! to begin!');
      $('header').click(function(){
          $('header').text('MORTAL KOMBAT!');
          $('header').toggle( "clip" );
          drawBattle();
       });

     //make battleground
   function drawBattle(){
      //draw two divs for cards/decks
      //populate with data from selected card
      //for now, automatic to first choice
      var player1choice = deckObj[$('#deckOne').children().get(0);
      player1choice = player1choice.getAttribute('value').toLowerCase();
      var player2choice = deckObj[$('#deckTwo').children().get(0);
      player2choice = player2choice.getAttribute('value').toLowerCase();

      var playerScreen = null;
      var setClass = '';

      for (var i = 0; i<2; i++){
         playerScreen = $('<div>');
         if (playerOne) {
            setClass = 'playerOne';
            charObj = deckObj[player1choice];
         } else {
            setClass = 'playerTwo';
            charObj = deckObj[player2choice];
         }
         $(playerScreen).attr('class', setClass);
         $(playerScreen).addClass('card');

         var cardName = $('<h1>')
         $(cardName).attr('id', 'char-name').text(charObj.name);
         $(playerScreen).append(cardName);

         var cardPic = $('<img>')
         $(cardPic).attr('id', 'avi-preview').css('background-image', 'url(' + charObj.avatar[2] + ')');
         $(playerScreen).append(cardPic);

         var cardHealthAcc = $('<p>')
         $(cardHealthAcc).attr('id', 'health').html('Health: <span id="highlight">' + charObj.health + '</span> HP <span class="right"><span id="accuracy"><span id="highlight">' + charObj.accuracy + '</span>/10 Accuracy</span></span>');
         $(playerScreen).append(cardHealthAcc);

         var cardAtt1 = $('<p>')
         $(cardAtt1).attr('id', 'attack1').html('Attack 1: <span id="highlight">' + charObj.attack1[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack1[2] + '</span></span>');
         cardAtt1.on(
            mouseenter:

            mouseleave:

            click:
         )
         $(playerScreen).append(cardAtt1);


         var cardAtt2 = $('<p>')
         $(cardAtt2).attr('id', 'attack2').html('Attack 2: <span id="highlight">' + charObj.attack2[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack2[2] + '</span></span>');
         cardAtt2.on(
            mouseenter:

            mouseleave:

            click:
         )
         $(playerScreen).append(cardAtt2);


         var cardDef = $('<p>')
         $(cardDef).attr('id', 'defense').html('Defense move: <span id="highlight">' + charObj.def[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.def[2] + '</span></span>');
         $(playerScreen).append(cardDef);

         $(playerScreen).children().attr('class', setClass);

         $('#arena').prepend(playerScreen);

         //

         playerOne = !playerOne;
      }
      $('#deckOne').show();
      $('#deckTwo').show();

   //start battle

     }
   }

 }
}
//end onload


//   var start = $("#start");    //start button
//   var head = $("header");     //header div
//   var headStuff = $("#list"); //header contents
//   var health = $(".health");  //health bars
  //
//   //when start button is clicked
//   start.click(function() {
//      makeSelectionThumbnails();
  //
//      //erase the start button
//      start.detach();
  //
//      //roll back masthead,
//     if(head.hasClass('open')) {
//       head.toggleClass('open', 'closed');
  //
//       //show healthbars
//       health.height('50px');
//       health.toggleClass('closed', 'open');
//       }
//    });
