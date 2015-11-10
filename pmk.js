function redrawHeader(){
   $('header').slideUp(1000);
   $('header').slideDown(500);
}

window.onload = function () {

   $('#card-hover').hide(); //hide the card-preview area.

   var deckObj = deckJS; //import cards from deck.js
   var doc = document; //DOM shortcut

   //make SFX department...lol
   var bloodGif = $('<div>').addClass('blood');
   bloodGif = $(bloodGif).css('background-image', 'url(images/blood-drip.gif)');

   //global scorekeeping variables         //game on?
   var playerOne = true;                  var gameOver = false;
   var yourCard = '';                     var playerOneWins = 0;
   var theirCard = '';                    var playerTwoWins = 0;

   var health1 = $('#health1');           var health2 = $('#health2');
   var attackTrue = true;                 var attackChoice = '';

   // max # of cards in player decks      //total back and forth turns:
   var deckMax = 1;                       var turnCount = 0;

   //start game! pick cards!
   function chooseYourCards() {
      //TO-DO expand header as loading screen.
      $('header').css('background-color', 'white');

      //show character select thumbnail screen
      function makeSelectionThumbnails(){

         var inst = $('.card#instr'); //instruction card-area
         $('#instructions2').hide(); //playerOne starts

         //draw containers for character list
         var container = $('#character-select');
         var charThumbList = doc.createElement('ul');
         charThumbList.id = "char-thumbnail-ul";

         //draw character-select thumbnails
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

                  //pushing the stats from charObject into #card-hover
                  $('#char-name').html(charObj.name);
                  $('#avi-preview').eq(0).css('background-image', 'url(' + charObj.avatar[2] + ')');
                  $('p#health').html('Health: <span id="highlight">' + charObj.health + '</span> HP <span class="right"><span id="accuracy">');
                  $('span#accuracy').html('<span id="highlight">' + charObj.accuracy + '</span>/10 Accuracy</span></span>')
                  $('p#attack1').html('Attack 1: <span id="highlight">' + charObj.attack1[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack1[2] + '</span></span>');
                  $('p#attack2').html('Attack 2: <span id="highlight">' + charObj.attack2[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack2[2] + '</span></span>');
                  $('p#defense').html('Defense: <span id="highlight">' + charObj.def[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.def[2] + '</span></span>');
                  $('p#blerg').html('Your attack 1 max is: <span id="highlight"><span class="right">' + charObj.attack1[1] + '/5</span></span><br/>Your attack 2 max is: <span id="highlight"><span class="right">' + charObj.attack2[1] + '/5</span></span>')
               },
               mouseleave: function() {
                  $(this).css('border', '3px solid black');
                  //restore render div to default
                  $('#card-hover').hide();
                  inst.show();
               }, //end hover/char preview event

               //click adds/removes characters from deck,
               //user can swap char choice before confirming
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
                  //don't move a card into a full deck.
                  else if (($('#deck').children('li.char-avis').length === deckMax ) && (eo.parentElement.id !== 'deck')){
                     //TO-DO - refactor/update: pop over instructions?
                     alert('Greedy! You can play as one character at a time!\n Click a character in your deck to remove it first,\n THEN you can choose another one.');
                  }

                  //add card to the damned deck awready! lol
                   else if ($('#deck').children('li.char-avis').length < deckMax) {
                     $(eo).detach(); //detach clicked char
                     $(eo).appendTo($('#deck')); //add it to deck
                  }
                  //character has been selected; confirm choice.
                  confirmButton();
                  event.stopPropagation();
               } //end char move click event
            }); //end all mouse event definitions
         } //end thumbnail creation for loop

         //all thumbnails generated, add list to screen.
         container.append(charThumbList);

      } //end character-select thumbnail screen creation
      makeSelectionThumbnails();

      //Make button that CONFIRMS character choice and switches player
      function confirmButton(){

         //fetch the button. if no button exists, create one
         var playButt = $('.play-butt').length ? $('.play-butt') : $('<button class="play-butt">');

         //what goes in the button depends on whose turn it is.
         if (playerOne){
            $(playButt).text('Player One: CONFIRM');
            $(playButt).attr('id', 'playButt1');
         } else {
            $(playButt).text('Player Two: CONFIRM');
            $(playButt).attr('id', 'playButt2');
         }
         //what does the button do?
         $(playButt).click(function(){
            //selection is confirmed, player select switches
            //move deck selection, into player's personal hand.
            var yourDeck = 'empty';

            //fetch or make individual decks for players
            if (playerOne) {
               yourDeck = $('#deckOne').length ? $('#deckOne') : $('<div id="deckOne">');
            } else {
               yourDeck = $('#deckTwo').length ? $('#deckTwo') : $('<div id="deckTwo">');
            }
            yourDeck.addClass('playerDeck');
            yourDeck.appendTo('#arena');
            yourDeck.hide();

            //can't confirm if the deck isn't full.
            if ($('#deck').children('li.char-avis').length < deckMax) {
               alert('Your deck is not at the max yet, choose some characters!');
            }

            //if deck is full
            else {
               $(playButt).detach(); //detach button
               $(yourDeck).append($("#deck").html()); //add contents to player hand
               $('#deck').html(' '); //clear the deck, no repeats.

               //toggle player
               if (playerOne) {
                  //change instructions to match player
                  $('#instructions2').show();
                  $('#instructions1').hide();
                  $('#deck').css('background-color', 'beige');
                  playerOne = !playerOne;
               } else {
                  playerOne = !playerOne;

                  //it's fighting time!
                  startBattle();
               }
            }
            event.stopPropagation();
         });// CONFIRM button click event end

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
         } //end button creation and appending
      } //end confirmButton() maker
   }; //end chooseYourCards
   chooseYourCards();

   function startBattle(){
      //hide all the things!

      $('button').remove();

      $('#deck').hide("fade");
      $('#card-render').hide( "fade");
      $('#character-select').toggle( "fold");
      $('header').animate({
         height: "+=500px",
         fontSize: "70px",
         });

      //let users know what happens next
      $('header').html('<br/><br/>Now your decks are complete, choose your attacks wisely...<br/>IT\'S MORTAL KOMBAT!<br/>Click this screen to begin!');

      //when header is clicked, battle starts.
      $('header').click(function(){
         $('header').removeAttr('style').css('background-color');
         $('header').css('color', 'white');
         $('header').text('Click to select attack, ' + thisPlayer() + ', and then CONFIRM!');
         $('header').animate({
            height: "60px",
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fontSize: '40px',
         });
         $('#arena').animate({
            margin: "0px",
         })
         $('header').off('click');
         drawBattle();
         event.stopPropagation();
      }); //end header click event
   } //end startBattle()

   //make battleground
   function drawBattle(){

      //draw two divs for cards/decks
      //populate with data from selected card
      //for now, automatic to first choice

      var player1choice = $('#deckOne').children().get(0);
      player1choice = player1choice.getAttribute('value').toLowerCase();
      player1choice = deckObj[player1choice];

      var player2choice = $('#deckTwo').children().get(0);
      player2choice = player2choice.getAttribute('value').toLowerCase();
      player2choice = deckObj[player2choice];

      var playerScreen = 'unknown';
      var setClass = 'unknown';

      for (var i = 0; i<2; i++){
         playerScreen = $('<div>');

         //whose info goes in the card?
         if (playerOne) {
            setClass = 'playerOne';
            charObj = player1choice;
            healthBar = health1;
         } else {
            setClass = 'playerTwo';
            charObj = player2choice;
            healthBar = health2;
         }

         //place specific values into generic ones
         $(playerScreen).attr('class', setClass);
         $(playerScreen).attr('value', charObj);

         //automatically style card
         $(playerScreen).addClass('card');

         //display character choice
         var cardName = $('<h1>')
         $(cardName).attr('id', 'char-name').text(charObj.name);
         $(playerScreen).append(cardName);

         //display default avatar
         var cardPic = $('<div>')
         $(cardPic).attr('id', 'avi-preview').css('background-image', 'url(' + charObj.avatar[0] + ')');
         $(playerScreen).append(cardPic);

         //show starting health
         var cardHealthAcc = $('<p>')
         $(cardHealthAcc).attr('id', 'health').html('Health: <span id="highlight">' + charObj.health + '</span> HP <span class="right"><span id="accuracy"><span id="highlight">' + charObj.accuracy + '</span>/10 Accuracy</span></span>');
         $(playerScreen).append(cardHealthAcc);

         //clickable/selectable attacks
         //attack number 1
         var cardAtt1 = $('<p>')
         $(cardAtt1).attr('id', 'attack1').html('Attack 1: <span id="highlight">' + charObj.attack1[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack1[2] + '</span></span>');
         $(cardAtt1).on({
            mouseenter: function(){
               if (attackTrue) {
                  if (playerOne && (this.className === "playerOne")) {
                     $(this).css('border', '3px solid indianred');
                  } else if (!playerOne && (this.className === "playerTwo")) {
                     $(this).css('border', '3px solid cornflowerblue');
                  }
               } //highlight during attack only
               event.stopPropagation();
            },
            mouseleave: function(){
               $(this).css('border', 'border: 5px solid beige');
               event.stopPropagation();
            }}); //highlight matches current player
         $(cardAtt1).on("click", function(){
          if (attackTrue) {
           if (playerOne && (this.className === "playerOne")) {
             gameOver = false;
             $(this).css('border', '5px double indianred');

             //pass parameters into turn and animate functions
             yourCard = player1choice;
             theirCard = player2choice;

             //click registers attack and rolls dice
             attackChoice = this.id;
             //redrawHeader();
             alert(thisPlayer() + ', you chose: ' + (yourCard[attackChoice][0]).toUpperCase() + '!');
             okayButton();
           } else if (!playerOne && (this.className === "playerTwo")) {
             $(this).css('border', '5px double cornflowerblue');

             //pass parameters into turn and animate functions
             yourCard = player2choice;
             theirCard = player1choice;

             //click registers attack and rolls dice
             attackChoice = this.id;
             //redrawHeader();
             alert(thisPlayer() + ', you chose: ' + (yourCard[attackChoice][0]).toUpperCase() + '!');
             okayButton();
           } //match clicks to card
          } //you can only click an attack if it's attack time.
          event.stopPropagation();
          });//end attack 1 click event assignment
         $(playerScreen).append(cardAtt1);

         //attack number 2
         var cardAtt2 = $('<p>')
         $(cardAtt2).attr('id', 'attack2').html('Attack 2: <span id="highlight">' + charObj.attack2[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack2[2] + '</span></span>');

         // $(cardAtt2).on({
         //    mouseenter: function(){
         //       if (attackTrue) {
         //          if (playerOne && (this.className === "playerOne")) {
         //             $(this).css('border', '3px solid indianred');
         //          } else if (!playerOne && (this.className === "playerTwo")) {
         //             $(this).css('border', '3px solid cornflowerblue');
         //          }
         //       } //highlight during attack only
         //       event.stopPropagation();
         //    },
         //    mouseleave: function(){
         //       $(this).css('border', 'border: 5px solid beige');
         //       event.stopPropagation();
         //    }}); //highlight matches current player

         $(cardAtt2).on("click", function(){
          if (attackTrue) {
           if (playerOne && (this.className === "playerOne")) {
             gameOver = false;
             //$(this).css('border', '5px double indianred');

             //pass parameters into turn and animate functions
             yourCard = player1choice;
             theirCard = player2choice;

             //click registers attack and rolls dice
             attackChoice = this.id;
             redrawHeader();
             $('header').text(thisPlayer() + ', you chose: ' + (yourCard[attackChoice][0]).toUpperCase() + '!');
             okayButton();
           } else if (!playerOne && (this.className === "playerTwo")) {
             //$(this).css('border', '5px double cornflowerblue');

             //pass parameters into turn and animate functions
             yourCard = player2choice;
             theirCard = player1choice;

             //click registers attack and rolls dice
             attackChoice = this.id;
             $('header').text(thisPlayer() + ', you chose: ' + (yourCard[attackChoice][0]).toUpperCase() + '!');
             okayButton();
           } //match clicks to card
          } //you can only click an attack if it's attack time.
          event.stopPropagation();
          });//end attack 1 click event assignment
         $(playerScreen).append(cardAtt2);

         var cardDef = $('<p>')
         $(cardDef).attr('id', 'defense').html('Defense: <span id="highlight">' + charObj.def[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.def[2] + '</span></span>');

         // $(cardDef).on({
         //    mouseenter: function(){
         //       if (!attackTrue) {
         //          if (playerOne && (this.className === "playerOne")) {
         //             $(this).css('border', '3px solid indianred');
         //          } else if (!playerOne && (this.className === "playerTwo")) {
         //             $(this).css('border', '3px solid cornflowerblue');
         //          }
         //       } //highlight during attack only
         //       event.stopPropagation();
         //    },
         //    mouseleave: function(){
         //       $(this).css('border', 'border: 5px solid beige');
         //       event.stopPropagation();
         //    }
         // }); //highlight matches current player

         cardDef.hover(function(){
               if (!attackTrue) {
                  if (playerOne && (this.className === "playerOne")) {
                     $(this).css('border', '3px solid indianred');
                  } else if (!playerOne && (this.className === "playerTwo")) {
                     $(this).css('border', '3px solid cornflowerblue');
                  }
               } //highlight during attack only
            }, function(){
               $(this).css('border', 'border: 5px solid beige');
            }); //highlight matches current player
         cardDef.click(function(){
               if (!attackTrue) {
                  if (playerOne && (this.className === "playerTwo")) {
                     $(this).css('border', '5px double cornflowerblue');

                     //pass parameters into turn and animate functions
                     yourCard = player1choice;
                     theirCard = player2choice;

                     //click registers attack, and animates cards
                     rollRegen(this, yourCard, theirCard);
                  } else if (!playerOne && (this.className === "playerOne")) {
                     $(this).css('border', '5px double indianred');

                     //pass parameters into turn and animate functions
                     yourCard = player2choice;
                     theirCard = player1choice;

                     //click registers attack, and animates cards
                     rollRegen(this, yourCard, theirCard);
                  }
               } //you can only click a defense if it's NOT attack time.
            });//end defense mouse click event;
         $(playerScreen).append(cardDef);

         //give all card attributes the className of their player
         $(playerScreen).children().attr('class', setClass);

         //draw health bars
         $('.health').animate({
               height: "+=50px"
            });

         //base width on character health, multiplied for good pixel ratio
         var healthStartWidth = (charObj.health * 4) + 'px';

            $(healthBar).animate({
               width: healthStartWidth,
            }, "slow");

            //whose health is this?
            $(healthBar).text(charObj.name);

            //add card on top of decks
            $('#arena').prepend(playerScreen);

            playerOne = !playerOne; //toggle player
         } //end card drawing

         //show players deck choices
         $('#deckOne').show();
         $('#deckTwo').show();

   } //end drawBattle()


////////////////////////////////////////
//                                    //
//    GamePlay logic & variables      //
//                                    //
////////////////////////////////////////

//LETS THROW SOME DICE MOTHAF*CKAAAA!
function d10(){
   return Math.ceil(Math.random()*10);
}
function d6() {
   return Math.ceil(Math.random()*6);
} //FLY LIKE A D-6!!
function d3() {
   return Math.ceil(Math.random()*3);
}

//and also keep track of whose turn it is
//because ANBGT to ask all the time.
function thisPlayer() {
   if (playerOne){
      return 'Player One';
   } else {
      return 'Player Two';
   }
}
function otherPlayer(){
   if (playerOne){
      return 'Player One';
   } else {
      return 'Player Two';
   }
}

//okayButton rolls the start of a turn,
//if attack time, it rolls attack,
//if not, it rolls the regen
function okayButton() {
   var okButt = ($('button').length ? $('button') : $('<button>'));
    $(okButt).text('CONFIRM');
    $(okButt).off('click');

   if (playerOne && attackTrue) {
      $('#deckOne').append($(okButt));
      $(okButt).click(function(){
         debugger
         rollAttack();
         event.stopPropagation();
       });
   } else if (!playerOne && !attackTrue) {
      $('#deckOne').append($(okButt));
      $(okButt).click(function(){
          rollRegen();
          event.stopPropagation();
       });
   } else if (!playerOne && attackTrue) {
      $('#deckTwo').append($(okButt));
      $(okButt).click(function(){
          rollAttack();
          event.stopPropagation();
       });
   } else if (playerOne && !attackTrue){
      $('#deckTwo').append($(okButt));
      $(okButt).click(function(){
          rollRegen();
          event.stopPropagation();
      });
   }
};

//this button triggers the ending animations
//ending the attack, and ending the turn.
//this button switches attackTrue and raises turnCount
function switchButton() {
   var switchButt = ($('button').length ? $('button') : $('<button>'));
   $(switchButt).text('END ATTACK');
   $(switchButt).off('click');

   if (playerOne && attackTrue) {
      $('#deckOne').append($(switchButt));
      $(switchButt).click(function(){
          alert('Attack is over!');
          endAttack();
          event.stopPropagation();
      });
   } else if (!playerOne && attackTrue) {
      $('#deckTwo').append($(switchButt));
      $(switchButt).click(function(){
          endAttack();
          event.stopPropagation();
      });
   } else if (playerOne && !attackTrue){
      $('#deckTwo').append($(switchButt));
      alert('Turn is over!');
      endTurn();
      event.stopPropagation();
   } else if (!playerOne && !attackTrue){
      $('#deckOne').append($(switchButt));
      alert('Turn is over!');
      endTurn();
      event.stopPropagation();
   };
}

var player1choice = '';    var player2choice = '';
var totalInt = 0;          var rawInt = 0;

   function rollAttack() {
      $('button').remove();

      //attackchoice is set by the click event
      //get stats from card
      var maxDamage = yourCard[attackChoice][1];
      var accuracy = yourCard.accuracy;

      //balancing damage
      if (yourCard.name != 'Snorlax') {
         //multiply 3x to balance
         maxDamage = maxDamage * 3;
      }

      alert('you have a ' + accuracy + ' out of 10 chance of dishing out maximum damage!');
      //roll to calculate raw damage

      function rawDmg() {
        //start of roll
        var raw = 0;
        //roll dice to see if you got max
        var hitMax = d10();

        if (hitMax <= accuracy) {
         raw = maxDamage;
         alert('It\'s a direct hit!')
        }
        //you did not get max damage, what did you get?
        else {
         //if your accuracy is low, you have more chance
         //of missing, or doing less damage
         var hitOrMiss = function () {

            //if your accuracy is low, you're more likely
            //to miss, or hit for less
            var rd6 = d6();
            if (accuracy < 4) {
               switch (rd6) {
                  case 6:
                     raw = maxDamage / 2; // 50%
                     //redrawHeader();
                     alert('Uh-oh, you missed! Your attack is weaker!');
                     break;
                  case 5:
                     raw = maxDamage / 4; // 25%
                     //redrawHeader();
                     alert('Uh-oh, you missed! Your attack is weaker!');
                     break;
                  default:
                     break;
               }
            }
            //the better your character's accuracy
            //the less likely you'll miss or do less damage
            else if (accuracy <=7 ) {
               switch (hitMax) {
                  case (accuracy+1) :
                     raw = maxDamage / 2; // 50 %
                     //redrawHeader();
                     alert('Uh-oh, you missed! Your attack is weaker!');
                     break;
                  case (accuracy+2) :
                     raw = maxDamage / 4; // 25 %
                     //redrawHeader();
                     alert('Uh-oh, you missed! Your attack is weaker!');
                     break;
                  default :
                     break;
               }
            }
            //if you're in the middle, you have a 1/3
            //chance of either doing 50, 25, or 0% damage
            else {
               var rd3 = d3();
               switch (rd3) {
                  case 1:
                     raw = maxDamage / 2; // 50%
                     //redrawHeader();
                     alert('Uh-oh, you missed! Your attack is weaker!');
                     break;
                  case 2:
                     raw = maxDamage / 4; // 25%
                     //redrawHeader();
                     alert('Uh-oh, you missed! Your attack is weaker!');
                     break;
                  default :
                     break;
               }
            }

            //you missed completely!
            if (raw = 0){
               //redrawHeader();
               alert('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
            }//whiff!
         }//end of hitOrMiss
        }//end of calculating not max damage
         rawInt = raw;
         return rawInt;
      }//end of raw damage dice roll
      rawDmg();

      function totalDmg() {
        var yourType = yourCard[attackChoice][2];
        var theirType = theirCard.def[2];

        var total = rawInt;
        if (total <=0) {
            //different types have strengths/weaknesses
            //redrawHeader();
            alert('Let\'s see how ' + yourType+' stacks up against ' + theirType+'...');

            alert('Your type of attack vs their type of defense may give you an advantage!');
            if (yourType !== theirType){
            switch (yourType) {
               case ('Fire'):
                   switch (theirType) {
                    //STRONG
                    case ('Psychic') :
                       total = total * 2; //double damage
                       //redrawHeader();
                       alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                       break;
                    //WEAK
                    case ('Water') :
                       total = total / 2; //half damage
                       //redrawHeader();
                       alert('Yikes! ' + yourType + ' isn\'t super effective against ' + theirType + '.\nYour attack is weakened!');
                       break;
                    case ('Ground') :
                       total = total / 2;
                       //redrawHeader();
                       alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                       break;
                      default:
                        noBonus();
                        break;
                    }
                    break;

               case ('Electric'):
                switch (theirType) {
                   //STRONG
                   case ('Water') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   case ('Psychic') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   //WEAK
                   case ('Fire') :
                    total = total / 2; //half damage
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   case ('Ground') :
                    total = total / 2;
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   default:
                     noBonus();
                     break;
                   }
                   break;

               case ('Water'):
                switch (theirType) {
                   //STRONG
                   case ('Fire') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   case ('Ground') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   //WEAK
                   case ('Electric') :
                    total = total / 2; //half damage
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   case ('Toxic') :
                    total = total / 2;
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   default:
                     noBonus();
                     break;
                   }
                   break;

               case ('Fighting'):
                switch (theirType) {
                   //STRONG
                   case ('Toxic') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   //WEAK
                   case ('Psychic') :
                    total = total / 2; //half damage
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   case ('Water') :
                    total = total / 2;
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   default:
                     noBonus();
                     break;
                   }
                   break;

               case ('Toxic'):
                switch (theirType) {
                   //WEAK
                   case ('Water') :
                    total = total / 2; //half damage
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   case ('Fighting') :
                    noBonus();
                    break;
                   //TOXIC IS OP SON!
                   default :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   }
                   break;

               case ('Ground'):
                switch (theirType) {
                   //STRONG
                   case ('Electric') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   case ('Fire') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   //WEAK
                   case ('Water') :
                    total = total / 2;
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   default:
                     noBonus();
                     break;
                   }
                   break;

               case ('Psychic'):
                switch (theirType) {
                   //STRONG
                   case ('Fighting') :
                    total = total * 2; //double damage
                    //redrawHeader();
                    alert(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                    break;
                   //WEAK
                   case ('Ground') :
                    total = total / 2;
                    //redrawHeader();
                    alert('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                    break;
                   default:
                     noBonus();
                     break;
                } break;

                //NO EFFECT
                default :
                  break;
            } //end of all the switch cases
            function noBonus() {
               //redrawHeader();
               alert('No bonus for you :/');
            }
            }

            var theirHealth = function() {
              if (playerOne) {
                return $('.playerTwo#health').children('#highlight').get(0).innerText;
              } else {
                return $('.playerTwo#health').children('#highlight').get(0).innerText;
              }
            };
            theirHealth = theirHealth() - totalInt;
         }

         total = totalInt;
         return totalInt;
      };
      totalDmg();
      //end of offensive roll

      //show animations
      //change avatars
      var animateAttack = function() {
         var yourOldPic = ''; var theirOldPic = '';
         //ANIMATE ALL THE THINGS!
         //what are the action picture?
         var yourNewPic = yourCard[attackChoice][3];  //ATTACK
         var theirNewPic = theirCard.def[3];        //DEFENSE

         //and what are the current default pics:
         if (playerOne) {
            yourOldPic = $('div#avi-preview.playerOne');
            theirOldPic = $('div#avi-preview.playerTwo');
         } else {
            yourOldPic = $('div#avi-preview.playerTwo');
            theirOldPic = $('div#avi-preview.playerOne');
         }

         //let's get animated!
         $(yourOldPic).css('background-image', 'url(' + yourNewPic + ')');
         $(theirOldPic).css('background-image', 'url(' + theirNewPic + ')');
         $(theirOldPic).prepend(bloodGif);

      };
      //show the ending animations
      animateAttack();
      //signal end of attack mode
      switchButton();

   }//end rollAttack

   function endAttack(){
      $('button').remove();

      //what are their health bars?
      var theirHealthBar = '';
      if (playerOne) {
         theirHealthBar = health2;
         theirCardHealth = $('.playerTwo#health').children('span#highlight').get(0).innerText;
         } else {
         theirHealthBar = health1;
         theirCardHealth = $('.playerOne#health').children('span#highlight').get(0).innerText;
      }

      //animate health bars
      theirCardHealth -= totalInt;
      var newHBwidth = theirCardHealth * 4;
      theirHealthBar.animate({
          width: newHBwidth+'px',
      });

      //change the header text to show dmg amounts
      alert('You hit your opponent for '+ totalInt + ' HP!');
      redrawHeader();
      $('header').text(theirCard.name + ' now has ' + (theirCardHealth)+ ' HP.');
      $(theirCardHealth).text(theirCardHealth);

      attackTrue = !attackTrue;

      //trigger roll regen via button
      okayButton();

      return 'Attack is: ' + attackTrue;
   }

   function rollRegen(){
      var regen = theirCard.def[1];
      $('button').remove();

      //NO ZOMBIES!
      if (theirCardHealth > 0) {
         //ok, they aren't dead...yet. Regenerate!
         //redrawHeader();
         alert('Uh-oh, your opponent has a chance to heal!');

         //accuracy also determines if your defense
         //has a chance to heal.
         //var regen = def[1]

         var regAcc = theirCard.accuracy;
         var regRoll = d10();

         if ((regRoll <= accuracy) && (theirCard.name !== 'Snorlax')) {
            theirCardHealth = theirCardHealth + regen;
            //redrawHeader();
            alert(theirCard.name + ' healed for: ' + regen + ' HP!');
         } else if (theirCard.name == 'Snorlax') {
            theirCardHealth = theirCardHealth + regen;
            //redrawHeader();
            alert('Snorlax took a nap and healed for: ' + regen + ' HP!');
         } else {
            //redrawHeader();
            alert('No regeneration this time!');
         }


         //signal end turn via button
         //only if not gameOver
         switchButton();

      }//end regen roll
      //if their health is 0, GAME OVER!
      else {
        //redrawHeader();
        alert(thisPlayer() + ', ' + yourCard.name + ' won! It only took you: ' + (turnCount * 2) + ' turns...');
        //redrawHeader();
        $('header').text('Game over! Refresh!');

        //animate ending graphics
        //TBD

        //add to scorecard for user
        if (playerOne) {
           playerOneWins+=1;
        } else {
           playerTwoWins+=1;
        }

        //bonus: add new characters if win with more
        //than than half health
        //TBD

        gameOver = true;
        //restart button
        return gameOver;
      }//assign enemy health to card.

      //animate health bars
      //whose health bar needs a-changing?
      var theirHealthBar = '';
      if (!playerOne) {
         theirHealthBar = health2;
         theirCardHealth = $('.playerTwo#health').children('span#highlight').get(0).innerText;
      } else {
         theirHealthBar = health1;
         theirCardHealth = $('.playerOne#health').children('span#highlight').get(0).innerText;
      }
      //animate it!
      debugger
      if (theirCardHealth > 0) {
         var newHBwidth = theirCardHealth * 4;
         theirHealthBar.animate({
          width: newHBwidth+'px',
         });
      }

   }// end regenRoll

   function endTurn(){
      //reset avatars
      var yourOldPic = ''; var theirOldPic = '';
      //ANIMATE ALL THE THINGS!
      //and what are the current default pics:
      if (playerOne) {
         yourOldPic = $('div#avi-preview.playerOne');
         theirOldPic = $('div#avi-preview.playerTwo');
      } else {
         yourOldPic = $('div#avi-preview.playerTwo');
         theirOldPic = $('div#avi-preview.playerOne');
      }
      $('header').text('Turn ' + turnCount + 'Over!\n It\'s' + otherPlayer() + '\'s turn to attack!');
      playerOne = !playerOne; //switch player
      turnCount = turnCount + 1;

      //redrawHeader();
      alert(thisPlayer() + ': click an attack  FIGHT!');
   }
}//end onload
