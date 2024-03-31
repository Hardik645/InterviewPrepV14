import json
import sys
sys.stdout.reconfigure(encoding='utf-8')


def extractData(path):
    with open(path,"r",encoding="utf-8") as f:
        data=f.read()
    return data

data=json.loads(extractData("v0.2/data/data(936).json"))
for i in range(0,len(data)):
    data[i]["id"]=int(data[i]["id"])
    data[i]["tests"]=json.dumps(data[i]["tests"])
    data[i]["answer"]=json.dumps(data[i]["answer"])
    data[i]["likes"]=0
    data[i]["dislikes"]=0

data=sorted(data, key=lambda k: k['id'])
seen_ids = set()
unique_data = []
for obj in data:
    if obj["id"] not in seen_ids:
        unique_data.append(obj)
        seen_ids.add(obj["id"])
data=unique_data
print(len(data))
# for i in data:
#     print(i["id"])

# with open("app/mockProblems/problems3.ts", "a", encoding="utf-8") as f:
#     f.write(json.dumps(data))
#     f.write(",\n")