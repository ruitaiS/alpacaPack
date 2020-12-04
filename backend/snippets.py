#Code for buying:

api.submit_order(symbol='TSLA', 
		qty=1, 
		side='buy', 
		time_in_force='gtc', 
		type='limit', 
		limit_price=400.00, 
		client_order_id='001')