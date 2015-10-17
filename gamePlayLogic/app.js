//import deck from deck.js
var deck = deckObj;

//total back and forth turns:
var turnCount = 0;


var gameOver = false;

// playerDeck1 = [deck[card1], deck[card2]];
// playerDeck2 = [deck[card3], deck[card4]];
// [cardcharname].toLowerCase() = {
   // name: name,
   // avis: [default, lose, win]
   // attack1: [name, maxDam, type, pic],
   // attack2: [name, maxDam, type, pic],
   // def: [name, maxRegen, type, pic],
   // accuracy: #/10,
   // health: #/100,
// }

var playerOne = true;

var cardOne = deck.pikachu;
var cardTwo = deck.rachel;



console.log('Cards are selected! let\'s begin!');

//turn should be triggered by confirm button.
var turn = function(){

   //whose turn is it right now?
   var getYou = function() {
      if (playerOne) {
         return cardOne;
      } else {
         return cardTwo;
      }
   };
   var yourCard = getYou();
   console.log('Player one chose: ' + yourCard.name);
   //and what does your enemy have?
   var getEnemy = function() {
      if (!playerOne) {
         return cardOne;
      } else {
         return cardTwo;
      }
      //    return '#deckOne';
      //  else {
      //    return '#deckTwo';
      // }
   };
   var theirCard = getEnemy();
   console.log('Player two chose: ' + theirCard.name);


   //player has to choose a move,
   //then when confirmed, the turn starts
   //trigger on confirm of move
   //ASSIGN CLICK EVENT HERE!
   var attackChoice = 'attack1';

   console.log('You chose: '+ yourCard[attackChoice][0] + ' as your attack!');

   //extrapolate variables from card.
   if (yourCard.name === 'Snorlax') {
      var maxDamage = yourCard[attackChoice][1];
   } else {
      //balancing game
      var maxDamage = (yourCard[attackChoice][1]) * 3;
   }
   console.log('With a maximum damage of: '+ maxDamage + ',');
   var accuracy = yourCard.accuracy;
   console.log('And a ' + accuracy + ' in 10 chance of hitting that maximum.');
   var yourType = yourCard[attackChoice][2];
   var theirType = theirCard.def[2];
   console.log('You\'re fighting \"' + theirType + '\" with \"'+ yourType + '\"...');

   console.log('It\'s time for MORTAL KOMBAT!');

   var yourHealth = yourCard.health;
   var theirHealth = theirCard.health;
   console.log(yourCard.name + ' has ' + yourHealth + ' HP.');
   console.log(theirCard.name + ' has ' + theirHealth + ' HP.');

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

   //roll to calculate raw damage
   function rawDmg() {
      //start of roll
      var raw = 0;
      //roll dice to see if you got max
      hitMax = d10();

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

      var total = rawDmg();

      //different types have strengths/weaknesses
      console.log('Let\'s see how '+yourType+' stacks up against '+theirType+'...');
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
      return total;
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
   if (playerOne) {
      playerOne = false;
   } else {
      playerOne = true;
   }
   turnCount = turnCount + .5;


};

while (!gameOver) {
   turn();
}
   // function animate() {
   //    //swap gifs on card
   //    //move cards
   //    //add blood overlay
   //    //heathbar width = health attack
   // }
