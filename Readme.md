##User Story:


  1. user navigates to my site and is intrigued. they decide the want to play and click **"Fight!"**
  2. user then gets to select a character from a displayed grid. The user can choose if the want a character that's high-risk/high-reward, slow-and-steady, funny, or something in between.
  3. To help them decide, as they hover over the image of a character they are thinking of selecting, the character's stats are displayed.

  -----------------
  >Stats Visible to User:
  >> - Attributes: Health, accuracy, type, and defense.
  >> - 2 attack moves that:
  >>> a. deal damage, rated 1-5 (5 being heaviest);
  >>> b. have a damage type
  >> - 1 defensive move
  >> - displayed "Control" image

  ----------------
  >Stats invisible to user, used for gameplay:
  >> - Vulnerabilities (types that will be resistant to attacks, and deal greater damage). These can be inferred by people who have played the game or...lived life. obviously fire will not react well with water. i mean, come on. lol.
  >> - the attacks will also have images that change the picture on the card for the duration of the move
  >> - I will also make gruesome death images bc I have a sick, sick, mindbrain.

  4. They click to select a character they like, and voila! The user has become a player.
  5. Then their opponent can choose a character.
  6. When both characters make a selection, they are displayed. If they are not happy, they can go back and change characters.
  7. Once they are happy, they proceed. The game begins and health bars are revealed. Health will be proportional to the character.
  8. a "coin" will be tossed to determine who goes first
  9. first player can select a move for their character, and watch the damage ensue. (and vice-versa)
  10. the first player to health < 0 loses.
  11. then you have an option to play again that resets the game.


##Extras I'd like to add, in order of difficulty and priority:

  - A fatality option if the victor has above a certain health threshold.
  - High scores/leaderboards (new games that remember wins and losses).
  - Time-challenge (get opponent below a certain level before time is up. Timer only counts down during your turn).
  - Unlockable characters/abilities for defeat of time-trial within a certain shorter time, or in regular mode with a high remaining health threshold.
  - Decks of 3 player would choose a card to play, then select one move. When health < 0 that card is discarded.
  - Decks of 5 or more with multiple cards and moves played per turn.
  - AI that plays against you
  - Story-mode! Using the AI to play against characters in order of ascending difficulty, gradually increasing attack and defense attributes for cards in your deck. Upon defeat you can choose to add one of the defeated enemies to your deck.
  - Cut-scenes with voiceovers done by me. Which will be preeeetty funny.


##Strategies:

  - I'm building the html/css skeleton my program will hang in first. I'm pretty much done with that tbh.
  - Next, I'm going to focus on jQuery and Javascript, adding one step at a time. I'm being very ambitious and I don't have that much skill to back myself up yet. So add one step at a time and test, test, test.
  - Once the jS/jQ logic works, then I will add more dom-manipulation to get everything looking the way I want. And test, test, test.
  - After I've made sure the logic and dom work the way I want, then I will build the database of characters
  - and if I finish all THAT, then i'll start working on extra features in the order listed above.
