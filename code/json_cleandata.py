# Author : Partho Mandal

import pprint
import re
import codecs
import json
import string
import scrubadub
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from HTMLParser import HTMLParser

# Initialize porter stemmer and HTML parser
stemmer = PorterStemmer()
html_parser = HTMLParser()


def textCleaning(text):

    # 1. Escape HTML characters
    text = html_parser.unescape(text)

    # 2. Remove name, url, email, phone, skype, ssn
    scrubadub.filth.base.Filth.prefix = u' '
    scrubadub.filth.base.Filth.suffix = u' '
    text = scrubadub.clean(text, replace_with='placeholder')
    scrub_placeholder_list = ["NAME", "URL", "EMAIL", "PHONE", "SKYPE", "SSN"]
    tokenized_words = text.replace("'"," '").split()
    placeholder_void_words  = [word for word in tokenized_words if word not in scrub_placeholder_list]
    

    # 3. Remove apostrophes
    APOSTROPHES = {
                    "'s"  : " is", 
                    "'re" : " are",
                    "'m"  : "am",
                    "'ve" : "have",
                    "'d"  : "would",
                    "'t"  : "not",
                    "'ll" : "will",
                    "'clock" : "clock"
                  }
    appostophes_removed = [APOSTROPHES[word] if word in APOSTROPHES else word for word in placeholder_void_words]

    
    text = ' '.join(appostophes_removed)

    # 4. Remove non - ASCII characters
    text = text.decode("utf8").encode('ascii','ignore')

    # 5. Remove punctuation
    text = text.translate(None, string.punctuation)

    # 6. Split Attached Words
    text = " ".join(re.findall('[A-Z][^A-Z]*', text))

    # 7. Remove numbers 
    number_removed = [i for i in text.split() if not i.isdigit()]

    # 8. Stemming
    text_tokens = [stemmer.stem(item.lower()) for item in number_removed]

    # 9. Stop word removal
    stop_words_removed = [word for word in text_tokens if word not in stopwords.words('english')]

    # 10. Join cleaned text 
    text = ' '.join([w for w in stop_words_removed if len(w)>1])
    return text 

def dataTransform(source):
    
    jX = returnJson(source)

    topic_dict = {}
    for item in jX:

        
        if item["answer_topics"] == [ ]:
            pass
        else:
            answer = item["answerContent"] 
            topic = list(set(x.strip() for x in item["answer_topics"][0]["questionTopicId"].split(",")))

        for t in topic:
            if t not in topic_dict:
                if t == "":
                    topic_dict["other-questions"] = [answer]
                else:
                    topic_dict[t] = [answer]
            else:
                if t == "":
                    topic_dict["other-questions"].append(answer)
                else:
                    topic_dict[t].append(answer)


    for key, value in topic_dict.items():
         topic_dict[key] = "".join(x for x in value)

    
    print "Topic clustering done."
    return  topic_dict


def dictCleaning(topic_dict):
    for key, value in topic_dict.items():
        topic_dict[key] = textCleaning(value)

    print "Text cleaning done."

    return topic_dict


def returnJson(source):
    try:
       with open(source,'r') as jsonFile:
        j = json.load(jsonFile)

        return j
    except Exception, e:
        print e
        raise

def main():

    source = '../data/output.json'
    topic_dict = dataTransform(source)
    topic_dict_final = dictCleaning(topic_dict)

    with open('../data/cleaned_output.json', 'wb') as fp:
        json.dump(topic_dict_final, fp)

    print "Cleaned data stored in cleaned_output.json"

if __name__ == "__main__":
    
    main()
        


