import queue
import threading
import requests

q=queue.Queue()

with open("v0.2/data/proxyList.txt","r",encoding="utf-8") as f:
    proxies= f.read().split("\n")
    for p in proxies:
        q.put(p)

def checkProxies():
    global q
    while not q.empty():
        proxy=q.get
        try:
            res=requests.get("http://ipinfo.io/json",proxies={"http":proxy,"https":proxy})
        except:
            continue
        if res.status_code ==200:
            print(proxy)

for _ in range(10):
    threading.Thread(target=checkProxies).start()
