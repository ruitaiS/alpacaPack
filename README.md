[Live version](https://ruitais.github.io/alpacaPack/)


### About This Project

This is a simple web application written using React to place trades on the Alpaca online brokerage through their API. It's currently in very early stages of development, so there are still a number of bugs to be ironed out (see section on known bugs).

### Useage

#### Connecting
You will need an API key and a secret key from Alpaca in order to place trades on their brokerage. You can either set up your own account on https://alpaca.markets/, or you can use the default login credentials, which are linked to my personal paper trading account.

Alpaca distinguishes between paper trading and live trading accounts. Paper accounts are used for simulating trades, whereas live accounts are funded with actual money.

If you choose to create your own account, I highly recommend using a paper account, rather than a live one due to the aforementioned bugs.

In addition to the API key and secret key, you will also need to specificy which stock ticker symbol you'd like to follow. The app will attempt to connect using the credentials provided, and if successful, it should bring you to the trading screen.

Note that you will only be able to connect during market hours, between 9:30AM and 4PM, Monday-Friday. 

#### Trading Screen
The current price of the stock is displayed at the top.

The capital allocation input box defines the maximum amount of capital to use for each trade. When entering a position, the app will attempt to purchase as many shares as possible, up to the maximum allocation. When exiting a position, the maximum allocation is automatically updated to reflect the changes resulting from the previous trade (eg. if you lost $100 on the last trade, then the capital allocation will go down by $100). You can only adjust the allocation when you aren't currently holding any stocks and there are no open orders.

Enabling autosell will cause the app to place a limit sell order immediately after a buy order is filled. The sell price is the purchase price, plus Delta. (eg. if autosell is enabled, and delta is set to $0.01, then if you enter a position at a purchase price of $10, the app will immediately place a limit sell for all shares at $10.01)

The big button at the bottom displays the current price as well. When hovering over the button, the price will stop changing, and if you click, it will create a limit buy order at that price. Clicking again before the order fills will cancel that order. Clicking after the order fills will place a sell order, at the hover price.

There is also a manual entry / exit button at the bottom, which allows you to type in the value you'd like to enter at, rather than do the hover-over method.

"Log Open Orders" and "Log Positions" will display in the console the current open orders, and current held stocks, respectively.

"Cancel All Open Orders" does what its name implies ;)



### Known Bugs / Issues
- Due to market conditions, sometimes an order will only be partially filled - for example, if you place an order to buy 300 shares at a certain price, maybe only 100 shares will be bought. The logic for handling this situation hasn't been implemented yet (the app assumes all orders will be completely filled), so it causes some strange behavior on the app

- Log Open Orders does not display pre-existing orders that were already in place when the app opened (orders that had been left open from the past session, or initialized from the Alpaca web page instead of the app)

- Cash on hand should reflect the total cash value of the account, and capital allocation should not be allowed to exceed cash on hand.

- Delta is really really finicky to try to adjust. Ideally I'd also like to be able to adjust delta while waiting for a sell order to fill, in such a way that the previous order is automatically updated to reflect the new delta.
