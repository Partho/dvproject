# Author : Partho Mandal

import json
import codecs
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
import pickle

from gensim import corpora
from collections import defaultdict
from pprint import pprint
from gensim import corpora, models, similarities

from gensim.corpora import Dictionary
from gensim.models import ldamodel
from gensim.matutils import kullback_leibler, jaccard, hellinger, sparse2full


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


# def lsi():
#     source = '../data/cleaned_output.json'
#     topic_dict = readJson(source)
    
#     documents = topic_dict.values()
#     # Create TF - IDF matrix
#     transformer = TfidfVectorizer()
#     tfidf = transformer.fit_transform(documents)

#     # Create LDA model
#     svd = TruncatedSVD(n_components = 300 algorithm="arpack")
#     lsa = svd.fit_transform(tfidf.T)
#     lsa_model = np.dot(lsa,lsa.T)

def gensim_lsi():
    source = '../data/cleaned_output.json'
    topic_dict = readJson(source)
    
    documents = topic_dict.values()

    texts = [[word for word in document.split()] for document in documents]

    frequency = defaultdict(int)
    for text in texts:
        for token in text:
            frequency[token] += 1
    
    texts = [[token for token in text if frequency[token] > 1] for text in texts]
    dictionary = corpora.Dictionary(texts)
    dictionary.save('../data/gensim.dict')
    #print(dictionary.token2id)

    corpus = [dictionary.doc2bow(text) for text in texts]
    corpora.MmCorpus.serialize('../data/gensim.mm', corpus) 
    print(corpus)

    dictionary = corpora.Dictionary.load('../data/gensim.dict')
    corpus = corpora.MmCorpus('../data/gensim.mm') # comes from the first tutorial, "From strings to vectors"
    lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=1800)
    pickle.dump(lsi, open( "../data/lsi.p", "wb" ) )


    index = similarities.MatrixSimilarity(lsi[corpus]) # transform corpus to LSI space and index it
    index.save('../data/gensim.index')

    corpus = corpora.MmCorpus('../data/gensim.mm')
    lsi = pickle.load(open( "../data/lsi.p", "rb" ) )
    index = similarities.MatrixSimilarity.load('../data/gensim.index')
    # print index[0]

    vec_lsi = lsi[ corpus[1253] ]
    sims = index[vec_lsi]
    sims = sorted(enumerate(sims), key=lambda item: -item[1])

    pprint(sims) 
    

    
def docTopic_prob_association():
    topic_dict, cosine_matrix = pickle.load(open( "../data/cosine.p", "rb" ) )
    sim_data = []
    keys_list = topic_dict.keys()

    # for index, keys in enumerate(keys_list):
    #     print index, keys

    for index, key in enumerate(keys_list):
        chi_array = cosine_matrix[index].tolist()
        chi_tuple_array = []
        for index1, item in enumerate(chi_array):
                tup = (keys_list[index1], chi_array[index1])
                chi_tuple_array.append(tup)
        chi_tuple_array = sorted(chi_tuple_array, key=lambda item: item[1])
        sim_data.append({'index':index, 'topic':key, 'chi':chi_tuple_array[0:200]}) 

    destination = '../data/topic_similarity_sorted.json'
    writeJson(sim_data, destination)

def gensim_lda():
    # dictionary = corpora.Dictionary.load('../data/gensim.dict')
    # corpus = corpora.MmCorpus('../data/gensim.mm')
    # np.random.seed(1) # setting random seed to get the same results each time.
    # lda_model = ldamodel.LdaModel(corpus, id2word=dictionary, num_topics=1800)
    # pickle.dump(lda_model, open( "../data/lda.p", "wb" ) )

    lda_mode = pickle.load(open( "../data/lda.p", "rb" ) )
    lda_model.show_topics()

def main():

    #topic_dict, cosine = cosineMat()

    # Load cosine distance matrix from pickled object
    #topic_dict, cosine = pickle.load(open( "../data/cosine.p", "rb" ) )

    # Create a new JSON array associating topics with similarity array
    #cosineJson(topic_dict, cosine)

    #gensim_lsi()
    #docTopic_prob_association()

    gensim_lda()



if __name__ == "__main__":
    main()