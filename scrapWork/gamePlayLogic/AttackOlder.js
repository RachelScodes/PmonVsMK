//test variables
// var maxDamage = card[chosenattack][]
// var accuracy = 7;
// var yourType = ['fire', 'water', 'electric', 'ground', 'psychic'];
// var theirType = yourType.sort();
//
// var yourHealth = 100;
// var theirHealth = 100;

//
//pseudo-code variables
//
var maxDamage = card[chosenattack][1];
var accuracy = card['accuracy'];
var yourType = card[chosenattack][2];
var theirType = theircard[def][2];

var yourHealth = card['health'];
var theirHealth = theircard['health'];

//Made the dice functions so they are
//rolled when called.
function d10(){
   return Math.ceil(Math.random()*10);
}
function d5() {
   return Math.ceil(Math.random()*5);
}
function d3() {
   return Math.ceil(Math.random()*3)
}

var rollAttack = function(){
   var dmg = 0;
   //roll dice to see if you got max
   hitMax = d10();
   console.log(hitMax);

   if (hitMax <= accuracy) {
      dmg = maxDamage;
   }

   //you did not get max damage, what did you get?
   else {
      debugger
      //if your accuracy is low, you have more chance
      //of missing, or doing less damage
      var hitOrMiss = (function() {
         debugger
         if (accuracy < 4) {
            debugger
            switch (d5()) {
               case 5:
                  dmg = maxDamage / 2;
                  break;
               case 4:
                  dmg = maxDamage / 5;
                  break;
               default:
                  dmg = 0;
                  break;
            }
         }
         //the better your character's accuracy
         //the less likely you'll miss or do less damage
         else if (accuracy <=7 ) {
            debugger
            switch (hitMax) {
               case (accuracy+1) :
                  dmg = maxDamage / 2; //50 percent
                  break;
               case (accuracy+2) :
                  dmg = maxDamage / 5; //20 percent
                  break;
               default :
                  dmg = 0; //none
                  break;
            }
         }

         //if you're in the middle, you have a 1/3
         //chance of either doing 50, 20, or 0% damage
         else {
            debugger;
            var rd3 = d3()
            switch (rd3) {
               case 1:
                  dmg = 0; // 0%
                  break;
               case 2:
                  dmg = maxDamage / 5; // 20%
                  break;
               default :
                  dmg = maxDamage / 2; // 50%
                  break;
            }
         }
      })();
   }
   debugger
   return dmg;

};
//end of dice roll

function rollDefense(){
   // var ours = yourType[0];
   // var theirs = theirType[0];
   var ours = 'Electric';
   var theirs = 'Electric';
   var dmg = rollAttack();

   //different types have strengths/weaknesses
   if (ours !== theirs){
      switch (ours) {
         case ('Fire'):
               switch (theirs) {
                  //STRONG
                  case ('Psychic') :
                     dmg = dmg * 2; //double damage
                     break;
                  //WEAK
                  case ('Water') :
                     dmg = dmg / 2; //half damage
                     break;
                  case ('Ground') :
                     dmg = dmg / 2;
                     break;
                  //NO EFFECT
                  default :
                     dmg = dmg; //no effect
                     break;
                  }
                  break;

         case ('Electric'):
            switch (theirs) {
               //STRONG
               case ('Water') :
                  dmg = dmg * 2; //double damage
                  break;
               case ('Psychic') :
                  dmg = dmg * 2; //double damage
                  break;
               //WEAK
               case ('Fire') :
                  dmg = dmg / 2; //half damage
                  break;
               case ('Ground') :
                  dmg = dmg / 2;
                  break;
               //NO EFFECT
               default :
                  dmg = dmg; //no effect
                  break;
               }
               break;

         case ('Water'):
            switch (theirs) {
               //STRONG
               case ('Fire') :
                  dmg = dmg * 2; //double damage
                  break;
               case ('Ground') :
                  dmg = dmg * 2; //double damage
                  break;
               //WEAK
               case ('Electric') :
                  dmg = dmg / 2; //half damage
                  break;
               case ('Toxic') :
                  dmg = dmg / 2;
                  break;
               //NO EFFECT
               default :
                  dmg = dmg; //no effect
                  break;
               }
               break;

         case ('Fighting'):
            switch (theirs) {
               //STRONG
               case ('Toxic') :
                  dmg = dmg * 2; //double damage
                  break;
               //WEAK
               case ('Psychic') :
                  dmg = dmg / 2; //half damage
                  break;
               case ('Water') :
                  dmg = dmg / 2;
                  break;
               //NO EFFECT
               default :
                  dmg = dmg; //no effect
                  break;
               }
               break;

         case ('Toxic'):
            switch (theirs) {
               //WEAK
               case ('Water') :
                  dmg = dmg / 2; //half damage
                  break;
               //NO EFFECT
               case ('Fighting') :
                  dmg = dmg; //no effect
                  break;
               //TOXIC IS OP SON!
               default :
                  dmg = dmg * 2; //double damage
                  break;
               }
               break;

         case ('Ground'):
            switch (theirs) {
               //STRONG
               case ('Electric') :
                  dmg = dmg * 2; //double damage
                  break;
               case ('Fire') :
                  dmg = dmg * 2; //double damage
                  break;
               //WEAK
               case ('Water') :
                  dmg = dmg / 2;
                  break;
               //NO EFFECT
               default :
                  dmg = dmg; //no effect
                  break;
               }
               break;

         case ('Psychic'):
            switch (theirs) {
               //STRONG
               case ('Fighting') :
                  dmg = dmg * 2; //double damage
                  break;
               //WEAK
               case ('Ground') :
                  dmg = dmg / 2;
                  break;
               //NO EFFECT
               default :
                  dmg = dmg; //no effect
                  break;
               }
               break;

      }
   }
   // if same type, no effect
   else if (ours === theirs) {
      console.log('No advantage fighting your own kind!');
   }
   return dmg;
}

var rollRegen = function() {
   //accuracy also determines if your defense
   //has a chance to heal for double.
   //var regen = def[1]

   //NO ZOMBIES!
   if (enemyhealth < 0)
   var regen = 10;
   var accuracy = 7
   var roll = d10();

   if (roll <= accuracy) {
      regen = regen * 2;
   } else {
      regen = regen;
   }
   console.log('Your enemy healed for: ' + regen + '!');
   return regen;
}
