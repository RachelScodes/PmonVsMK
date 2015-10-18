window.onload = function () {
  console.log("It's loaded!");
   $('#card-hover').hide();
   //import cards from deck.js
   var deckObj = deckJS;

   //global scorekeeping variables
   var playerOne = true;
   var yourCard = '';
   var theirCard = '';

   //total back and forth turns:
   var turnCount = 0;

   //game on?
   var gameOver = false;

   var doc = document;

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
         //Make button that CONFIRMS character choice.
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
  }

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

      var playerScreen = null;
      var setClass = '';

      for (var i = 0; i<2; i++){
         playerScreen = $('<div>');

         if (playerOne) {
            setClass = 'playerOne';
            charObj = player1choice;
            healthBar = $('#health1')
         } else {
            setClass = 'playerTwo';
            charObj = player2choice;
            healthBar = $('#health2');
         }

         $(playerScreen).attr('class', setClass);
         $(playerScreen).attr('value', charObj);
         $(playerScreen).addClass('card');

         var cardName = $('<h1>')
         $(cardName).attr('id', 'char-name').text(charObj.name);
         $(playerScreen).append(cardName);

         var cardPic = $('<img>')
         $(cardPic).attr('id', 'avi-preview').css('background-image', 'url(' + charObj.avatar[0] + ')');
         $(playerScreen).append(cardPic);

         var cardHealthAcc = $('<p>')
         $(cardHealthAcc).attr('id', 'health').html('Health: <span id="highlight">' + charObj.health + '</span> HP <span class="right"><span id="accuracy"><span id="highlight">' + charObj.accuracy + '</span>/10 Accuracy</span></span>');
         $(playerScreen).append(cardHealthAcc);

         var cardAtt1 = $('<p>')
         $(cardAtt1).attr('id', 'attack1').html('Attack 1: <span id="highlight">' + charObj.attack1[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack1[2] + '</span></span>');
         cardAtt1.on({
            mouseover: function(){
               if (playerOne && (this.className === "playerOne")) {
                  $(this).css('border', '3px solid indianred');
               } else if (!playerOne && (this.className === "playerTwo")) {
                  $(this).css('border', '3px solid cornflowerblue');
               } else {
                  //nothing
               }
            },
            mouseleave: function() {
               $(this).css('border', 'none');
            },
            click: function(){
               if (playerOne && (this.className === "playerOne")) {
                  $(this).css('border', '5px double indianred');
                  yourCard = player1choice;
                  theirCard = player2choice;
                  confirmAttack(this, yourCard, theirCard);
               } else if (!playerOne && (this.className === "playerTwo")) {
                  $(this).css('border', '5px double cornflowerblue');
                  yourCard = player2choice;
                  theirCard = player1choice;
                  confirmAttack(this, yourCard, theirCard);
               } else {
                  if (playerOne) {
                     alert('Player One: Choose your attack!');
                  } else {
                     alert('Player Two: Choose your attack!');
                  }
               }
            }

         });
         $(playerScreen).append(cardAtt1);


         var cardAtt2 = $('<p>')
         $(cardAtt2).attr('id', 'attack2').html('Attack 2: <span id="highlight">' + charObj.attack2[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.attack2[2] + '</span></span>');
         cardAtt2.on({
            mouseover: function(){
               if (playerOne && (this.className === "playerOne")) {
                  $(this).css('border', '3px solid indianred');
               } else if (!playerOne && (this.className === "playerTwo")) {
                  $(this).css('border', '3px solid cornflowerblue');
               } else {
                  //nothing
               }
            },
            mouseleave: function() {
               $(this).css('border', 'none');
            },
            click: function(){
               if (playerOne && (this.className === "playerOne")) {
                  $(this).css('border', '5px double indianred');
                  confirmAttack(this, yourCard, theirCard);
               } else if (!playerOne && (this.className === "playerTwo")) {
                  $(this).css('border', '5px double cornflowerblue');
                  confirmAttack(this, yourCard, theirCard);

               } else {
                  if (playerOne) {
                     alert('Player One: Choose your attack!');
                  } else {
                     alert('Player Two: Choose your attack!');
                  }
               }
            }

         });
         $(playerScreen).append(cardAtt2);


         var cardDef = $('<p>')
         $(cardDef).attr('id', 'defense').html('Defense move: <span id="highlight">' + charObj.def[0] + '</span><span class="right"> Type: <span id="highlight">' + charObj.def[2] + '</span></span>');
         $(playerScreen).append(cardDef);

         $(playerScreen).children().attr('class', setClass);

         $('.health').animate({
               height: "+=50px",
               lineHeight: "40px",
               fontSize: "20px",
            });
         var healthwidth = player1choice.health * 4;
         $(healthBar).animate({
            width: healthwidth + 'px',
         });
         $(healthBar).text(charObj.name);

         $('#arena').prepend(playerScreen);

         //

         playerOne = !playerOne;
      }

      $('#deckOne').show();
      $('#deckTwo').show();
   }

   //LETS THROW SOME DICE MOTHAF*CKA!
   function d10(){
      return Math.ceil(Math.random()*10);
   }
   function d5() {
      return Math.ceil(Math.random()*5);
   }
   function d3() {
      return Math.ceil(Math.random()*3);
   }



   function confirmAttack(attackChoice, yourCard, theirCard){
      debugger
      //get stats from card
      attackChoice = attackChoice.id;
      var maxDamage = yourCard[attackChoice][1];
      var accuracy = yourCard.accuracy;

      //multiply 4x for pixel proportions
      if (yourCard.name === 'Snorlax') {
         maxDamage = maxDamage * 4;
      } else {
         //multiply 3x to balance
         maxDamage = maxDamage * 12;
      }

      var theirHealth = theirCard.health * 4;

      //roll to calculate raw damage
      function rawDmg() {
         //start of roll
         var raw = 0;
         //roll dice to see if you got max
         var hitMax = d10();

         if (hitMax <= accuracy) {
            raw = maxDamage;

         }
         //you did not get max damage, what did you get?
         else {
            //if your accuracy is low, you have more chance
            //of missing, or doing less damage
            var hitOrMiss = (function() {

               if (accuracy < 4) {
                  switch (d5()) {
                     case 5:
                        raw = maxDamage / 2; // 50%
                        console.log('Uh-oh, you missed! Your attack is weaker!');
                        break;
                     case 4:
                        raw = maxDamage / 4; // 25%
                        console.log('Uh-oh, you missed! Your attack is weaker!');
                        break;
                     default:
                        raw = 0;
                        console.log('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
                        break;
                  }
               }

               //the better your character's accuracy
               //the less likely you'll miss or do less damage
               else if (accuracy <=7 ) {
                  switch (hitMax) {
                     case (accuracy+1) :
                        raw = maxDamage / 2; // 50 percent
                        console.log('Uh-oh, you missed! Your attack is weaker!');
                        break;
                     case (accuracy+2) :
                        raw = maxDamage / 4; // 25 percent
                        console.log('Uh-oh, you missed! Your attack is weaker!');
                        break;
                     default :
                        raw = 0; //none
                        console.log('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
                        break;
                  }
               }

               //if you're in the middle, you have a 1/3
               //chance of either doing 50, 25, or 0% damage
               else {
                  var rd3 = d3();
                  switch (rd3) {

                     case 1:
                        raw = 0; // 0%
                        console.log('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
                        break;
                     case 2:
                        raw = maxDamage / 4; // 25%
                        console.log('Uh-oh, you missed! Your attack is weaker!');
                        break;
                     default :
                        raw = maxDamage / 2; // 50%
                        console.log('Uh-oh, you missed! Your attack is weaker!');
                        break;
                  }
               }
            })();
            //end of damage calculation

         }
         //end of else
         return raw;

         }
      //end of raw damage dice roll

      function totalDmg(){
         var yourType = yourCard[attackChoice][2];
         var theirType = theirCard.def[2];

         var total = rawDmg();

         //different types have strengths/weaknesses
         console.log('Let\'s see how ' + yourType+' stacks up against ' + theirType+'...');
         if (yourType !== theirType){
            switch (yourType) {
               case ('Fire'):
                     switch (theirType) {
                        //STRONG
                        case ('Psychic') :
                           total = total * 2; //double damage
                           console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                           break;
                        //WEAK
                        case ('Water') :
                           total = total / 2; //half damage
                           console.log('Yikes! ' + yourType + ' isn\'t super effective against ' + theirType + '.\nYour attack is weakened!');
                           break;
                        case ('Ground') :
                           total = total / 2;
                           console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                           break;
                        //NO EFFECT
                        default :
                           total = total; //no effect
                           console.log('Eh, no advantage, but no disadvantage either.');
                           break;
                        }
                        break;

               case ('Electric'):
                  switch (theirType) {
                     //STRONG
                     case ('Water') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     case ('Psychic') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     //WEAK
                     case ('Fire') :
                        total = total / 2; //half damage
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     case ('Ground') :
                        total = total / 2;
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     //NO EFFECT
                     default :
                        total = total; //no effect
                        console.log('Eh, no advantage, but no disadvantage either.');
                        break;
                     }
                     break;

               case ('Water'):
                  switch (theirType) {
                     //STRONG
                     case ('Fire') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     case ('Ground') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     //WEAK
                     case ('Electric') :
                        total = total / 2; //half damage
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     case ('Toxic') :
                        total = total / 2;
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     //NO EFFECT
                     default :
                        total = total; //no effect
                        console.log('Eh, no advantage, but no disadvantage either.');
                        break;
                     }
                     break;

               case ('Fighting'):
                  switch (theirType) {
                     //STRONG
                     case ('Toxic') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     //WEAK
                     case ('Psychic') :
                        total = total / 2; //half damage
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     case ('Water') :
                        total = total / 2;
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     //NO EFFECT
                     default :
                        total = total; //no effect
                        console.log('Eh, no advantage, but no disadvantage either.');
                        break;
                     }
                     break;

               case ('Toxic'):
                  switch (theirType) {
                     //WEAK
                     case ('Water') :
                        total = total / 2; //half damage
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     //NO EFFECT
                     case ('Fighting') :
                        total = total; //no effect
                        console.log('Eh, no advantage, but no disadvantage either.');
                        break;
                     //TOXIC IS OP SON!
                     default :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     }
                     break;

               case ('Ground'):
                  switch (theirType) {
                     //STRONG
                     case ('Electric') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     case ('Fire') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     //WEAK
                     case ('Water') :
                        total = total / 2;
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     //NO EFFECT
                     default :
                        total = total; //no effect
                        console.log('Eh, no advantage, but no disadvantage either.');
                        break;
                     }
                     break;

               case ('Psychic'):
                  switch (theirType) {
                     //STRONG
                     case ('Fighting') :
                        total = total * 2; //double damage
                        console.log(yourType + ' SLAMS ' + theirType + ' with DOUBLE DAMAGE!');
                        break;
                     //WEAK
                     case ('Ground') :
                        total = total / 2;
                        console.log('Yikes! ' + yourType + ' isn\'t super effective against '+ theirType + '.\nYour attack is weakened!');
                        break;
                     //NO EFFECT
                     default :
                        total = total; //no effect
                        console.log('Eh, no advantage, but no disadvantage either.');
                        break;
                     }
                     break;

            }
         }
         // if same type, no effect
         else if (yourType === theirType) {
            console.log('Stop the in-fighting: there\'s no advantage to fighting your own kind!');
         }
         //amounts were small
         theirHealth = theirHealth - total;
         console.log('You dealt a total of '+ total + ' to your opponent.');
         console.log(theirCard.name + ' now has ' + theirHealth + ' HP.');

         if (playerOne) {
            $('#health2').animate({
               width: '-= total',
            });
         }
         else {
            $('#health1').animate({
               width: '-= total',
            })
         }
      }
      //end of offensive roll
      totalDmg();

      //regen roll
      //NO ZOMBIES!
      if (theirHealth > 0) {
      //ok, they aren't dead...yet. Regenerate!
      console.log('Uh-oh, your opponent has a chance to heal!');
         var rollRegen = function() {
            //accuracy also determines if your defense
            //has a chance to heal.
            //var regen = def[1]

            var regen = theirCard.def[1];
            var regAcc = theirCard.accuracy;
            var regRoll = d10();

            if (regRoll <= accuracy) {
               theirHealth = theirHealth + regen;
               console.log(theirCard.name + ' healed for: ' + regen + ' HP!');
            } else if (theirCard.name == 'Snorlax'){
               theirHealth = theirHealth + regen;
               console.log('Snorlax took a nap and healed for: ' + regen + ' HP!');
            } else {
               console.log('Whew! No regeneration this time!');
            }
            return regen;
         };
         //end regen roll
         rollRegen();
         theirCard.health = theirHealth;
      }
         //assign enemy health to card.
      else {
         console.log(yourCard.name + ' won! It only took you: ' + (turnCount * 2) + ' turns...');
         console.log('Game over! Refresh!');
         gameOver = true;
      }

      //end of turn.
      playerOne = !playerOne;

      turnCount = turnCount + .5;

   };


}//end onload

function animate(){
   yourCard.children('')
   function changeImagesBack() {
  timeoutID = window.setTimeout(slowAlert, 2000);
  button click is back on
}

function slowAlert() {
  alert("That was really slow!");
}
}
