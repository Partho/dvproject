import json
import ujson
from sklearn.feature_extraction.text import TfidfVectorizer
import json
import re


# this part of code is for combining the answers for every question
with open('webmd-answer.json') as json_data_ans:
    d = ujson.dumps(json_data_ans)
    d = d.strip(']')
    d  = d.strip('[')
    stlist = d.split('}, {')
    stlistDict = {}
    for i in range(len(stlist)):
        if i!=1:
            first =  stlist[i]
            startIndex = first.find("questionId") + len("questionId")
            endIndex = first.find("answerQuestionURL")
            questionId =  first[startIndex+6:endIndex-5].strip()
            startIndex = first.find("answerContent") + len("answerContent")
            endIndex = first.find("answerPostDate")
            answerContent =  first[startIndex+5:endIndex-3].strip()
            if questionId in stlistDict.keys():
                stlistDict[questionId].append(answerContent)
            else :
                stlistDict[questionId] = [answerContent]

    InputJson = stlistDict#print InputJson


#The below code is Topic wise classfication of question id. that is topis is the key and question Id are the values. 
topicBasedDict = {}
with open('webmd-question.json', 'r') as f:
    json_data = f.read()
    json_data = json_data.replace("\\'", "'")
    json_data=json_data.replace('\t', ' ')

data = json.loads(json_data)
for i in range(len(data)):
    #for i in range(20):
    topicList = data[i]['questionTopicId'].split(', ')
    #print topicList
    for j in range(len(topicList)):
        if  topicList[j] in topicBasedDict.keys():
            topicBasedDict[topicList[j]].append(data[i]['questionId'])
        else :
            topicBasedDict[topicList[j]] = [data[i]['questionId']]

print len(topicBasedDict.keys())

# # example u'scarlet-fever-questions,': [u'5036878', u'5049269']


# The below code is for topic clustering. for every topic it list downs the answers .
topicDict = {}

for key,val in topicBasedDict.items():
    #print key
    for valofQuestion in val :
        if valofQuestion in InputJson.keys():
            if key in topicDict.keys():
                topicDict[key].append(InputJson[valofQuestion])
            else:
                topicDict[key]  = [InputJson[valofQuestion]]

for key,val in  topicDict.items():
    print str(key) 
    print '\n'
    print val
    print '\n'


'''' 
chloride-questions

[['"Hi If its this Benzalkonium chloride, then yes is has a bad name in the eye world, can cause dry eye symptoms, so not so good for you. But if you google your answer, your find some interesting stuff to read. Good Luck \\"'], ['"This is most-likely your chemistry homework, so I would suggest that you do your research and find those uses. It would be too extensive to answer this question via this forum. \\"']]

''''

    # cosine similarity
    #vect = TfidfVectorizer(min_df=1)
    #tfidf = vect.fit_transform(["I'd like an apple", "An apple a day keeps the doctor away","Never compare an apple to an orange", "I prefer scikit-learn to Orange"])
    #print (tfidf * tfidf.T).A
