import requests
import json
from genrateFinalObj import generateFinalObj
from requests_html import HTMLSession, HTMLResponse
from typing import cast


def fetchAndSaveToFile(url, path):
    session = HTMLSession()
    req = cast(HTMLResponse, session.get(url))
    req.html.render(sleep=5, keep_page=True)
    # response =requests.get(url)
    with open(path, "w", encoding="utf-8") as f:
        f.write(req.text)

fetchAndSaveToFile("https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/", "v0.2/data/website.html");
# with open("v0.2/data/links2.txt","r",encoding="utf-8") as f:
#     urlArray= f.read().split("\n")

# for i in range(0,len(urlArray)):
#     try:
#         fetchAndSaveToFile(urlArray[i], "v0.2/data/website.html")
#         data=generateFinalObj()
#         with open("v0.2/data/data.txt", "a", encoding="utf-8") as f:
#             f.write(json.dumps(data))
#             f.write(",\n")
#         print(i)
#     except:
#         continue

