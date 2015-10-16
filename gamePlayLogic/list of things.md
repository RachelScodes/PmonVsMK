

##List of HTML names:


| name       | what it is/ what it does  | parent (css inherited) | child (css applied) | match js | jQ |
|------------|---------------------------|--------|-------|----------|----|
| container | div - holds all game elements, used to space other containers    | body   | header, arena, footer, etc | n/a | n/a
| header | div - holds loading screen - animates up to reveal board. | #container | #logos, timer, start button? | n/a | n/a |
header   
   hold start logo, and loading logo.        .open/closed - visible/not
   start.on(click) = rolls up to begin game;
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |


##List of CSS Selectors:

| name       | what it does  | applied to | attached to event? | explain | jQ |
|------------|---------------------------|--------|-------|----------|----|
|#container  |selects main div  | div  | no  | used for css formatting  | $('#container') |
|.open  | toggles visibility of sliding div | header, health | yes | onclick start |  |
|.closed  | ibid | ibid | ibid | ibid |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |



##list of jav variables

|name | scope | what is it|
|-----|-------|-----------------------|
| playerOne | global | sets turn. |
|doc | global | document |
|deckObj |global | array of character objects |
|deckMax|global| max # of cards in hand. |
--------------------------------------------
|name | scope | what is it|
|-----|-------|-----------------------|
|  head | anonymous game function scope | header div
|headStuff |anonymous game function scope| header contents
|health |anonymous game function scope| health bar div
|start |anonymous game function scope| start button
|start.click |anonymous game function scope| anonymous function: -remove start button, roll back header, open health bars, and more:
|renderCharSelect() |start.click anon func | draw selection screen
|container |start.click anon func | #character-select div
|charSelectList |start.click anon func | ul of character li's
|inst |start.click anon func | instruction display div
|for loop1 | start.click anon func | makes avis from characters in deckObj
| char |start.click anon func loop1| char in progress
|assigned to char: | |class .char-avatars, 'value' = char name, .css(avatar gif)
| $(char).on( |DOM - avi hovered | mouseover event pushes char data to rendered card div
|charHov | mouseover event | 'value' of hovered object, corresponds to character name in deckObj
|charObj | mouseover event | deck[charHov] |
|$(char).click | DOM - avi clicked | click event
|eo | GLOBAL, DOM - avi clicked | event object (clicked div)
| deckJQ | char click event | makes or selects #deck div as jQuery object
| deckJS | char click event | convert jQ object to jS variable
| makeConfirmButton() | anonymous game function scope | makes CONFIRM buttons
|for loop2 | makeConfirmButton() | makes CONFIRM buttons
|playButt | makeConfirmButton() for loop | new jQuery button object
|assigned to button:| | innertext Player 1/2: CONFIRM'), class .play-butt, id #playButt1/2|
| $(playButt).click | makeConfirmButton() for loop | click event
|anonymous function | DOM- CONFIRM button object | creates player hands
|playerDeck| DOM- CONFIRM button object click event| new div
|playerDeck attributes" | | .player-deck
|getDeckID | DOM- CONFIRM button object click event | function assigns either #deckOne or #deckTwo|
