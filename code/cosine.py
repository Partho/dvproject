import json
import codecs
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle


def readJson(source):
    try:
       with open(source,'r') as jsonFile:
        j = json.load(jsonFile)
        return j
    except Exception, e:
        print e
        raise

def main():

    # Read JSON file
    source = '../data/cleaned_output.json'
    topic_dict = readJson(source)
    
    # Create TF - IDF matrix
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(topic_dict.values())

    # Compute cosine similarity
    cosine_matrix = (1.0000 - np.around((tfidf * tfidf.T).A, decimals=5))*100.0000
    pickle.dump(cosine_matrix, open( "../data/cosine.p", "wb" ) )

    ## Print cosine distance matrix
    # cosine = pickle.load(open( "cosine.p", "rb" ) )
    # print cosine


if __name__ == "__main__":
    main()