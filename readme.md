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