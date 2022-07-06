import speech_recognition as sr
import os
import librosa
# import pyaudio
import wave
from pydub import AudioSegment
from pydub.playback import play 
import sys
sys.path.append('../project')


def rec_to_txt(rec_path):
    r = sr.Recognizer()
    print(rec_path)
    with sr.AudioFile(rec_path) as source:
        audio_data = r.record(source)
        rec_txt = r.recognize_google(audio_data,language='ar-EG')
        print(rec_txt)
    return rec_txt

def ref_to_txt(ref_path):
    x=ref_path.split('\\')
    print(x)
    ref_txt = os.path.splitext(x[2])[0]
    print(ref_txt)
    return ref_txt
    
def jaccard_similarity(x,y):
    """ returns the jaccard similarity between two lists """
    intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
    union_cardinality = len(set.union(*[set(x), set(y)]))
    return intersection_cardinality/float(union_cardinality)
# codebook construction
# KNN
# >75 mo7awla gayeda
# a2l mo7awla afdl lakn t7tag t7seen
# interface disolay signal in web , conditions for progress
# attractive categs
def compare(ref_path,rec_path):
    validation=jaccard_similarity(ref_to_txt(ref_path),rec_to_txt(rec_path))
    if ((validation*100) <= 40):
        return "Wrong Pronounciation"
    else:
        ## Reference audio data
        data1,sr1=librosa.load(ref_path)
        n_fft = int(0.025*sr1)      # 25 ms
        hop_length = int(0.01*sr1)  # 10 ms
        mfcc1 = librosa.feature.mfcc(y=data1, sr=sr1, n_mfcc=13, norm="ortho",hop_length=hop_length, n_fft=n_fft)
        x_seq = mfcc1.T
        ## Record audio data
        data2 ,sr2= librosa.load(rec_path)
        mfcc2 = librosa.feature.mfcc(y=data2, sr=sr2, n_mfcc=13, norm="ortho",hop_length=hop_length, n_fft=n_fft)
        y_seq = mfcc2.T 
        ## Comparison 
        D, wp = librosa.sequence.dtw(X=mfcc1, Y=mfcc2, metric='cosine')
        N = y_seq.shape[0]
        M = x_seq.shape[0]
        distance=D[-1, -1]/(M + N)
        return (((100-(distance*1000))+10 ),"%")
 
def play_Ref(file_path):
    return play(AudioSegment.from_wav(file_path))

    


ref_file_name = "./Dataset\أشخاص\شروق.wav"
rec_file_name = "rec.wav" 
