

##List of HTML names:


| name       | what it is/ what it does  | parent (css inherited) | child (css applied) | match js | jQ |
|------------|---------------------------|--------|-------|----------|----|
| container | div - holds all game elements, used to space other containers    | body   | header, arena, footer, etc | n/a | n/a
| header | div - holds loading screen - animates up to reveal board. | #container | #logos, timer, start button? | n/a | n/a |
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



header   
   hold start logo, and loading logo.        .open/closed - visible/not
   start.on(click) = rolls up to begin game;
