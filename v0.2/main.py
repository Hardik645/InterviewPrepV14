import requests
import json
from genrateFinalObj import generateFinalObj

def fetchAndSaveToFile(url, path):
    response = requests.get(url)
    with open(path, "w", encoding="utf-8") as f:
        f.write(response.text)

with open("v0.2/data/links.txt","r",encoding="utf-8") as f:
    urlArray= f.read().split("\n")

for i in range(0,len(urlArray)):
    try:
        fetchAndSaveToFile(urlArray[i], "v0.2/data/website.html")
        data=generateFinalObj()
        with open("v0.2/data/data.txt", "a", encoding="utf-8") as f:
            f.write(json.dumps(data))
            f.write(",\n")
        print(i)
    except:
        continue

