from bs4 import BeautifulSoup
import json

def extractData(path):
    with open(path,"r",encoding="utf-8") as f:
        data=f.read()
    return data

def generateFinalObj():
    data=extractData("v0.2/data/leetcode.html")
    soup=BeautifulSoup(data,'html.parser')

    jsonData=json.loads(soup.find(id="__NEXT_DATA__").get_text())

    questionData=jsonData["props"]["pageProps"]["dehydratedState"]["queries"][0]["state"]["data"]["question"]
    id=questionData["questionId"]
    title=questionData["title"]
    titleSlug=questionData["titleSlug"]
    difficulty=questionData["difficulty"]
    category=questionData["categoryTitle"]

    topicData=jsonData["props"]["pageProps"]["dehydratedState"]["queries"][9]["state"]["data"]["question"]["topicTags"]
    topics=[]
    for i in topicData:
        topics.append(i["name"])

    questionContent=jsonData["props"]["pageProps"]["dehydratedState"]["queries"][7]["state"]["data"]["question"]["content"]
    questionSoup=BeautifulSoup(questionContent,"html.parser")
    constaints=' '.join(map(str, questionSoup.find_all("li")))

    allpTags=questionSoup.find_all('p')
    question=''
    for i in allpTags:
        if(i.contents[0]=='\xa0'):
            break
        question+=str(i)

    examplePreTags=questionSoup.find_all('pre')
    examples=[]
    for i in range(len(examplePreTags)):
        arr=list(map(str,examplePreTags[i].stripped_strings))
        explanation=''
        if(len(arr)>5):
            explanation=arr[5]
        example={
            "id":i+1,
            "inputText":arr[1],
            "outputText":arr[3],
            "explanation":explanation
        }
        examples.append(example)

    TestCaseContent=jsonData["props"]["pageProps"]["dehydratedState"]["queries"][3]["state"]["data"]["question"]["exampleTestcaseList"]
    tests=[]
    for i in TestCaseContent:
        tests.append(json.loads(i.split("\n")[0]))

    answer=[]
    for i in examples:
        answer.append(json.loads(i["outputText"]))

    code=jsonData["props"]["pageProps"]["dehydratedState"]["queries"][11]["state"]["data"]["question"]["codeSnippets"][6]["code"]

    finalObj={
        "id":id,
        "title":title,
        "titleSlug":titleSlug,
        "difficulty":difficulty,
        "category":category,
        "topics":topics,
        "constaints":constaints,
        "question":question,
        "examples":examples,
        "tests":tests,
        "answer":answer,
        "code":code
    }
    return finalObj