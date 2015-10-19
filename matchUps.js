function hitOrMiss() {

   if (accuracy < 4) {
      switch (d6()) {
         case 6:
            raw = maxDamage / 2; // 50%
            redrawHeader();
            $('header').text('Uh-oh, you missed! Your attack is weaker!');
            break;
         case 5:
            raw = maxDamage / 4; // 25%
            redrawHeader();
            $('header').text('Uh-oh, you missed! Your attack is weaker!');
            break;
         default:
            raw = 0;
            redrawHeader();
            $('header').text('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
            break;
      }
   }

   //the better your character's accuracy
   //the less likely you'll miss or do less damage
   else if (accuracy <=7 ) {
      switch (hitMax) {
         case (accuracy+1) :
            raw = maxDamage / 2; // 50 percent
            redrawHeader();
            $('header').text('Uh-oh, you missed! Your attack is weaker!');
            break;
         case (accuracy+2) :
            raw = maxDamage / 4; // 25 percent
            redrawHeader();
            $('header').text('Uh-oh, you missed! Your attack is weaker!');
            break;
         default :
            raw = 0; //none
            redrawHeader();
            $('header').text('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
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
            redrawHeader();
            $('header').text('Hear that? That\'s the sound of your attack WHIFFING! NO DAMAGE DEALT!');
            break;
         case 2:
            raw = maxDamage / 4; // 25%
            redrawHeader();
            $('header').text('Uh-oh, you missed! Your attack is weaker!');
            break;
         default :
            raw = maxDamage / 2; // 50%
            redrawHeader();
            $('header').text('Uh-oh, you missed! Your attack is weaker!');
            break;
      }
   }
}
//end of damage calculation
