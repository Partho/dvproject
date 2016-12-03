from gensim.corpora import Dictionary
from gensim.models import ldamodel
from gensim.matutils import kullback_leibler, jaccard, hellinger, sparse2full
import numpy
import pickle
from nltk.stem.porter import PorterStemmer
from gensim import corpora, models, similarities

stemmer = PorterStemmer()

document = []

topic_dict, cosine = pickle.load(open( "../data/cosine.p", "rb" ) )

for key,value in topic_dict.items():
    text_tokens = [stemmer.stem(item) for item in key.split()]
    text_key = ' '.join([w for w in text_tokens])
    text = str(text_key +" "+value)
    document.append(text)   

texts = [[word for word in doc.split()] for doc in document]
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]

jaccard_matrix = [round(jaccard(corpus[i], corpus[j])*100.00,5) for i in range(0, 1680) for j in range(0, 1680)]

pickle.dump(jaccard_matrix, open( "../data/jaccard.p", "wb" ) )