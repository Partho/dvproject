import pprint
import re
import codecs
import json
import string


def readJson(source):
    try:
       with open(source,'r') as jsonFile:
        j = json.load(jsonFile)
        return j
    except Exception, e:
        print e
        raise

def main():

    source = '../data/cleaned_output1.json'
    topic_dict = readJson(source)

    for key, value in topic_dict.items():
        print "KEY: ", key
        print "VALUE: ", value
        print "_______________"
        print ""


    with open('../data/cleaned_output2.json', 'wb') as fp:
        json.dump(topic_dict, fp)


if __name__ == "__main__":
    
    main()