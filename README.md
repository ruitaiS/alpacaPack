[Live version](https://ruitais.github.io/alpacaPack/)


### About This Project

This is a small web application written using React to place trades on the Alpaca online brokerage through their API. It's currently in the very early stages of development, so there are still a number of bugs to be ironed out (see section on known bugs), and a LOT of missing features.

### Useage

#### Connecting
You will need an API key and a secret key from Alpaca in order to place trades on their brokerage. You can set up your own account on https://alpaca.markets/, or if you just want to play around with the functionality you can use the default login credentials, which are linked to my personal paper trading account.

Alpaca distinguishes between paper trading and live trading accounts. Paper accounts only simulate trades, whereas live accounts place real trades and are funded with actual money. If you're using your own account, I highly recommend using a paper account, rather than a live one, due to the aforementioned bugs.

In addition to the API key and secret key, you will also need to specify which stock ticker symbol you'd like to follow. Once you've done that, click "Connect" and the app will attempt a connection using the credentials provided. If successful, it should bring you to the trading screen.

(Note that you will only be able to connect during market hours, which are between 9:30AM and 4PM, Monday through Friday.)

#### Trading Screen
The current price of the stock is displayed at the top.

The capital allocation input box defines the maximum amount of capital to use for each trade. When entering a position, the app will attempt to purchase as many shares as possible, up to the maximum allocation. When exiting a position, the maximum allocation is automatically updated to reflect the changes resulting from the previous trade (eg. if you lost $100 on the last trade, then the capital allocation will go down by $100). You can only adjust the allocation when you aren't currently holding any stocks and there are no open orders.

Enabling Autosell will cause the app to automatically place a limit sell order whenever a buy order is filled, at a slight price bump (defined by Delta) over the average fill price. For example, let's say Autosell is enabled, and Delta is set to $0.01. If you then enter a position at an average cost of $10 per share, the app will immediately place a limit sell for all shares at $10.01

The big button at the bottom performs multiple functions, depending on the current state:
- When you aren't in a position, and there are no open orders, the button text will read "Enter at " followed by a continuously updating price for the stock. Hovering your mouse over the button will cause the displayed price to stop updating, and clicking on the button will place a limit buy order for the displayed price.

- When you *are* in a position, and there are no open orders (eg. a previously issued buy order has been successfully filled), the button text will instead read "Exit at ", followed by a price. The behavior is similar to that of entering a position described above, except instead of placing a limit buy order, it will place a limit sell order.

- When there are open orders that are still waiting to be filled, the text will read "Cancel", and (predictably) clicking the button will cancel all currently open orders.

At the bottom there is also a manual entry / exit button with an input box where you can type the price at which you'd like to place the order. You can use this in lieu of the hover-over method.

"Log Open Orders" and "Log Positions" will display in the developer console a JSON formatted string of currently open orders, and currently held stocks, respectively.

"Cancel All Open Orders" does exactly what you'd expect ;) 
(It may seem redundant, since the big button already has the functionality to cancel orders, but this will cancel *all* the open orders associated with the account, even orders for a different stock and/or orders placed from outside of the app.)



### Known Bugs / Issues
- Due to market conditions, sometimes an order will only be partially filled. For example, if you place an order to buy 300 shares at a certain price, it may be that only 100 shares are available for sale at that price, so the broker will buy up those 100 shares, but you still have an outstanding order for another 200 shares. The logic for handling this situation hasn't been implemented yet (the app assumes all orders will be completely filled), so it causes some strange behavior on the app

- Log Open Orders does not display pre-existing orders that were already in place when the app opened (orders that had been left open from the past session, or initialized from the Alpaca web page instead of the app)

- Cash on hand should reflect the total cash value of the account, and capital allocation should not be allowed to exceed cash on hand.

- Delta is really really finicky to try to adjust