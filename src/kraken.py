import sys
import json
from websocket import create_connection
import binascii

api_feed = "book"
api_symbol = "XBT/USD"
api_depth = 1000
api_domain = "wss://ws.kraken.com/"
api_book = {"bid":{}, "ask":{}}

def dicttofloat(keyvalue):
        return keyvalue[0]

def api_output_book():
	bid = sorted(api_book["bid"].items(), key=dicttofloat, reverse=True)
	ask = sorted(api_book["ask"].items(), key=dicttofloat)
	# print("Bid\t\t\t\t\t\tAsk")
	# for x in range(int(api_depth)):
	# 	print("%(bidprice)s (%(bidvolume)s)\t\t\t\t%(askprice)s (%(askvolume)s)" % {"bidprice":bid[x][0], "bidvolume":bid[x][1], "askprice":ask[x][0], "askvolume":ask[x][1]})

def api_update_book(side, data):
	for x in data:
		price_level = x[0]
		if float(x[1]) != 0.0:
			api_book[side].update({price_level:x[1]})
		else:
			if price_level in api_book[side]:
				api_book[side].pop(price_level)
	if side == "bid":
		api_book["bid"] = dict(sorted(api_book["bid"].items(), key=dicttofloat, reverse=True)[:int(api_depth)])
	elif side == "ask":
		api_book["ask"] = dict(sorted(api_book["ask"].items(), key=dicttofloat)[:int(api_depth)])

def csum_compliant(val):
	ans = ""
	num = False
	for i in range (len(str(val))):
		if val[i]!="0" and val[i]!="." and num==False:
			ans += val[i]
			num=True
		elif val[i]!="." and num==True:
			ans += val[i]
	return ans
	
def checksum(c):
	csum = ""
	for i in list(api_book["ask"])[:10]:
		csum += csum_compliant(i) + csum_compliant(api_book["ask"][i])
	for i in list(api_book["bid"])[:10]:
		csum += csum_compliant(i) + csum_compliant(api_book["bid"][i])
	clocal = binascii.crc32(csum.encode('utf8'))
	print("checksum: ", clocal, c, str(clocal)==c)
	return str(clocal)==c

try:
	ws = create_connection(api_domain)
except Exception as error:
	print("WebSocket connection failed (%s)" % error)
	sys.exit(1)

api_data = '{"event":"subscribe", "subscription":{"name":"%(feed)s", "depth":%(depth)s}, "pair":["%(symbol)s"]}' % {"feed":api_feed, "depth":api_depth, "symbol":api_symbol}

try:
	ws.send(api_data)
except Exception as error:
	print("Feed subscription failed (%s)" % error)
	ws.close()
	sys.exit(1)

while True:
	try:
		api_data = ws.recv()
		# print(api_data)
	except KeyboardInterrupt:
		ws.close()
		sys.exit(0)
	except Exception as error:
		print("WebSocket message failed (%s)" % error)
		ws.close()
		sys.exit(1)
	api_data = json.loads(api_data)
	if type(api_data) == list:
		if "as" in api_data[1]:
			api_update_book("ask", api_data[1]["as"])
			api_update_book("bid", api_data[1]["bs"])
		elif "a" in api_data[1] or "b" in api_data[1]:
			for x in api_data[1:len(api_data[1:])-1]:
				if "a" in x:
					api_update_book("ask", x["a"])
				if "b" in x:
					api_update_book("bid", x["b"])
			api_output_book()
			# print(api_book)
			if "c" in api_data[1]:
				if checksum(x["c"])==False:
					ws.close()
			else:
				print("no_checksum")
		else:
			print(api_data)
			