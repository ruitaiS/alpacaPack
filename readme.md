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