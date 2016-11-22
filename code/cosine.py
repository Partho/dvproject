# Author : Partho Mandal

import json
import codecs
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle


def cosineJson(data, cosine_matrix):
    sim_data = []
    for index, (key, value) in enumerate(data.items()):
        sim_data.append({'index':index, 'topic':key, 'chi':cosine_matrix[index].tolist()}) 

    destination = '../data/topic_similarity.json'
    writeJson(sim_data, destination)

    print "topic_similarity.json created "

def readJson(source):
    try:
       with open(source,'r') as jsonFile:
        j = json.load(jsonFile)
        return j
    except Exception, e:
        print e
        raise

def writeJson(data, dest):
    try:
       with open(dest,'w') as fp:
            json.dump(data, fp)
    except Exception, e:
        print e
        raise

def cosineMat():
    # Read JSON file
    source = '../data/cleaned_output.json'
    topic_dict = readJson(source)
    
    # Create TF - IDF matrix
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(topic_dict.values())

    # Compute cosine distance
    cosine_matrix = (1.0000 - np.around((tfidf * tfidf.T).A, decimals=5))*100.0000


    dump_object = (topic_dict, cosine_matrix)
    pickle.dump(dump_object, open( "../data/cosine.p", "wb" ) )

    return dump_object

def main():

    #topic_dict, cosine = cosineMat()

    # Load cosine distance matrix from pickled object
    topic_dict, cosine = pickle.load(open( "../data/cosine.p", "rb" ) )

    # Create a new JSON array associating topics with similarity array
    cosineJson(topic_dict, cosine)


if __name__ == "__main__":
    main()