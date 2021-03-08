### Mar 8
After completing a buy or sell, we need to get the value of the fill price in order to update the capital allocation.

Okay so it sort of works, but is very very glitchy. Some things I've noticed:
    - If you're already in a position when you open the program, it falsely believes you're starting without anything. Can fix this by running a check on start if props.position.qty == 0
    - If you cancel midway through the autosell process (I'm not sure where) sometimes it gets really glitchy
    - Alpaca seems to have some issues with liquidity and fulfilling orders

### Mar 5

It's getting a lil (a lot) convoluted rn, so I think I'm just gonna take some time and figure out how everything works.

control:
    -user key and secret key
    -main window ticker symbol

    Disconnect keeps the existing apiHandler; a new one is created on re-connect, but the old one is still there.

yeah ok so everything is super janky, but it sorta works.

bump.click places the order if there aren't open positions (theoretically; it doesn't get out of the cancel state properly)

the order gets logged in bump's openOrders. Main has a callback that edits the position state.

When the order is successfully filled or cancelled, we call updateOrders from main. This triggers componentDidUpdate in bump (strangely, when orders are placed, this does not trigger...)

componentDidUpdate then looks through it's openOrders - if it is missing from the new props.positions.orders, then it is removed from openOrders
    -> Doesn't updateOrders always clear the orders? What if you had one order fill, and the rest did not? The order list would still be empty *** This would be something to double check tomorrow

Things to work on for next week:
    - Shit's broken if you try to start it without being in a position. Workaround is to open a position using alpaca. I think because the value prop passed to bump is unreadable if you're not in a position; some sort of interplay between how the price websocket updates prices and how it's related to the position updater is fucked. Crucially bump should not display unless there is a value in the value prop, whether that's coming from the price stream or from the position lister
    - Spend some more time sifting through the code. Idk, it's really really hard to buckle down and actually start working on stuff before 12; in the morning I'm actually so useless, idk. But then at 12 I have to go to work, so it's kinda like ffffufutfuntfuntfuntf.
    - 

### Mar 4
Calling updatePositions after fills, partial fills, and cancels

This clears the order dict as well, since the updatePositions always places a blank dict.

Got kind of a janky workaround going for detecting when orders are open vs. closed

componentDidUpdate will notice when an order is closed out, but not when an order is first opened.
But - you can detect when an order is first opened by seeing if the this.props.positions.orders has values in it or not

So rn the thought is:


---

Connecting does not get the open orders if there already were some prior to starting.



### Mar 3
Bug on startup where it can't set the order ID property. Next time it happens definitely keep an eye on it and tryt o figure out why it happens. AFAIK this is only after resetting your account, and it only happens once. Subsequent runs work fine

Still trying to sort out the behavior between cancellations.

When you cancel, it cancels all active orders, so I think it gives back a list of confirmations
When you just place one order, it gives only that one element.

### Mar 2
In main there is
    this.positions = {}
    and then inside of state of main, I have
    positions: null

and I just now did a similar thing with openOrders inside of bump.

>>Is this really necessary? Why not just establish one thing and put it into the state? I think the original reason was something to do with the tradepositions API callback that necessitated this. I can't really remember what it was, but openOrders wasn't working so I just copied the format I used in main. Maybe come back to this later on.

----
bump.js:
Orders filling does not update openOrders
Cancel orders does not work properly if no orders to cancel

### Mar 1
FinnHub stream is hella slow compared to polygon :(

Or like.. it updates weirdly. There are laggy moments where there aren't a lot of updates, and then suddenly a bunch of them will come through. So I guess not as smooth as polygon.



### Feb 28
Working on conversion to finnhub stream
Seems to be connected, but priceListener needs some tweaking to properly parse the incoming data

### Feb 24

Alpaca is phasing out polygon, I can get a free month but after i'll have to pay 200 a month, so I really need to get this going.

Today I got the hold prices working and order placement working

now i need to think about how to:
    update the value of the shares in real time
    confirm trade acceptance / completion
        bump needs to wait for trade update listener to have some useful information
            >>TUL should update a status dict within main
            >>status dict is passed to bump as a prop
            >>bump reads status dict and does something when it detects change

Position updater only updates position state if *in* a position - if held quantity is zero, it does not update
trade status updater updates when orders are opened or closed
    >>Event type: new
        update positions with status (waiting-entry or waiting-exit), along with number of shares and limit price
            >>gets read by bump
    >>Event type: fill
        check if it completely closes out the order (eg. are there outstanding shares that have yet to be complete?)
        check if it closes out the position (eg. are the sold shares = to the held shares?). If yes:
            update qty to zero (b/c position updater won't)
            update the amount of capital based on how much the shares were sold for
            update status to out
        



### Feb 22
I've kinda been branching out in too many different directions. I think it's really time to re-focus and work on building a minimum viable product.

Focus on building out the bump strategy. UI and display is not super important at this point - you can use robinhood or the alpaca website's graph. Within the next few days, get the core functionality working, so you can confirm whether or not this is a viable strategy.

In general, focus on building out strategies, rather than the UI. Don't get sidetracked into menial labor working on nice-to-haves. Figure out now if this is a feasible idea, or if it's a dead end.

### Feb 21
Retooling the way the position list updates, vis the watchlist

also thinking about how the whole interface should be:
    Several groupings of stocks? Each group has a position list, and a strategy / pseudo-alg that it's employing?

also also - realized you probably need to untangle the position updating
    -> from within each group, update the main watchlist / position list
    -> when polygon initializes, go through the main watchlist and subscribe to everything
        -> whenever watchlist is updated from subcomponents, unsub directly from polygon
    -> alpaca updates the positions that it's in
    -> the alpaca positions will always be a subset of the polygon subscriptions

### Feb 20
In the future leave a couple of positions open when you start the weekend - otherwise you can't open any new positions, and the position list won't actually render.

Working on:
    >> Switching to a watchlist rather than a positionList.
        -> Read / Write watchlist to a local file for now
        -> Update each item on the watchlist from the open positions list with the number of shares held

        Turns out react can't actually write to local files very easily... I've got a janky download thing set up, where it prompts you for a save location -> ideally we want this to be automated, but for now this is an ok workaround.

Today added:
    >> Generic priced button with mouseover hold -> This will need testing once the market is live
    >> Draggable components -> this is more game-y stuff, but I think it will be necessary once you start thinking about how to recategorize stocks into different strategy groups (https://js.plainenglish.io/making-draggable-components-in-react-4c6d4d1df95f)

### Feb 18
Got trade_updates websocket working - it was wrapped in a weird way, but I managed to get it opened (see stream.js alpaca.onmessage section for into)

Currently writing code to parse through the return message from trade_updates in order to update the watch list as orders get filled.



### Feb 5
Apparently there is a trade_updates websocket stream through alpaca that should push the trade confirms.

I'm going to try to see if I can add that as a seperate websocket contained within stream, and then when generating it, point it to two listeners (one listening to the polygon price data, the other to listen to trade updates).


priceListener and tradeStatusListener are basically the same thing, but they send / receive slightly different messages two websockets. Not a huge fan of the fact that they're repeating each other's code.

### Feb 3
Increasing quantities updates properly, because they're still being returned by alpaca

Exiting a position entirely doesn't update, because the alpaca position list doesn't return them at all. Is there a better way to do this other than to set all of the position quantities to 0 at the start?

There's also the issue of knowing when an order actually fills or not - When you do the callback, it just returns a receipt for the order - it's not a callback for when the order actually gets filled.



### Feb 2
I think the issue for position updating is fixed (it will check if the positions entry for that symbol is null, if yes then it subscribes)
    -> Will need to test/tweak tomorrow to confirm, as the market is closed now and I can't adjust positions. Especially check the behavior when exiting and re-entering a position. I want to have it stay on the watch-list, stay subscribed, showing 0 shares, but alpaca might not return that entry at all when being pinged for updated positions
    -> don't remove it from the list until explicitly removed

### Feb 1
Minor issue with the pctBar when it goes past large changes - the width stays at 68px but it does past the actual width of the containing box.

Not a major problem, but just something I noticed on the gamestop stock.

Positions do not update when changed from Alpaca website. I think because it only pings for the position list once, and it's not getting a constant update.

### Jan 30
Right now, position list doesn't render if we're not getting price data from the websocket.

this.state.positions updates really weirdly - We have a local this.positions, and then after we update this.positions, we do this.setState(positions: this.positions). I think this is essentially the crux of the issue; it's not updating the state unless it's getting websocket data.

~~Shouldn't be too hard to convert it to update the state directly (rather than use a local variable, and then re-assigning it constantly)~~
JK turns out you shouldn't be mutating state directly; you should create a new instance and re-assign it, as I've been doing


### Jan 28
Ok that took way longer than it really should have. It's done in kind of a janky way rn, but it works. After pressing connect, it creates a API instance and then a WS instance. When the WS has confirmed authentication, the streamListener callback creates a positions dict, then as the WS feeds more data to the callback, it updates the prices in the dict by iterating through the data message.

Next steps would be:
    Get a miniaturized version of the percent bar working within the watchlist
    At the top, you should also have a conglomerate sort of thing that shows the total percentage change.

    Be able to enter / exit positions without having to adjust the quantity; should remember the previous quantity

### Jan 15
Working on the portfolio / Position list

Alpaca API returns a list of open positions as well as number of shares.

I want to have each of them updated with live price data from the Polygon websocket (Alpaca can also do this, but it doesn't update as quickly).

Right now I'm having an issue with the order in which items are updated / pulled.

Main.js contains the api and the websocket instances.
Positions are updated by a test button (this should probably be tied to connect?)
Position list is passed to list.js, which iterates through it and generates a box for each position.



### Jan 2
Not totally sure what the behavior should be when switching from forex to stocks, wrt the connections.
I can definitely foresee a dangerous situation where the alpaca endpoint is still active even after switching to forex, and trade orders are going through when you press the buttons.

### Dec 29

Refactoring everything b/c the first version was done kind of hastily / messily.

Hierarchy:
    Main
        Control Panel - User Info input
        Chart - Updated with price data from stream
        Order Panel - stream data, as well as api instantiated based on login info given
            Percent Bar
            Order Button
            More Order Buttons
            Order History




### Dec 27
When the market is open, the prices move way too fast to glean any information by looking at the decimals, and also too fast for clicking.

RN I'm thinking using the charting library to show the prices over time, in milliseconds

Then have two sliders determine the buy and sell prices
Then have a button that you hold down, and it executes for the duration that you're holding down the button.

There's also definitely a lot of refactoring work that needs to be done; the structure of the program is really really messy b/c i'm just playing around with what feels good in terms of setup; don't want to spend too much time refactoring until I'm sure I have a thing that actually feels pretty intuitive to use.

# TODO:

## General
    Clean up the UI / get rid of test outputs
    Resolve instances of infinity / NAN percentage changes

## HealthBar
    Add inversion parameter (so a price drop is green and a price increase is red; useful for comparing limit vs. current price)
    >> How to set default prop values?
    Add price changes to left and right
    Reset healthbar when lifting off the button

    weird decimal values @ certain points
    
    Stretches the buy button / displaces the selector when it gets too big

## Selector
    Read off the chosen limit price and current price from the stream (lift state up)