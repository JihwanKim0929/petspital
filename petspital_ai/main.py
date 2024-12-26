from fastapi import FastAPI
from pydantic import BaseModel
import io
import torch
import torch.nn as nn
from torchvision import transforms
import time
import os
import copy
import urllib.request
from urllib import request
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
from tempfile import TemporaryDirectory

def prediction(image_url,spec,part):
    #모델 구분을 위해 종과 부위명 합침
    specpart = spec+part
    device = torch.device('cpu')
    #이미지 받아오기
    url = image_url
    res = request.urlopen(url).read()
    img = Image.open(io.BytesIO(res))
    data_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    img = data_transform(img)
    img = img.unsqueeze(0)
    img = img.to(device)
    #각 모델 파일명 넣기
    model_names = {'dogeye': 'dogeye.pt',
                   'cateye': 'cateye.pt',
                   'dogskin': 'dogskin.pt',
                   'catskin': 'catskin.pt'}
    #각 모델별 클래스 이름
    class_names = {'dogeye': ['2', '3', '1', '4', '5', '6', '7', '8', '9', '10'],
                   'cateye': ['11', '12', '13', '1', '14', '15'],
                   'dogskin': ['16', '17', '18', '19', '20', '21', '1'],
                   'catskin': ['22', '23', '24', '1']}
    model = torch.load(model_names[specpart],map_location=device)
    model.eval()
    outputs_ovo = model(img)
    _, preds_ovo = torch.max(outputs_ovo, 1)
    #print(class_names[specpart][preds_ovo[0]])
    #print(outputs_ovo)
    return class_names[specpart][preds_ovo[0]]

class Item(BaseModel):
    image_url: str
    species: str
    part: str

app = FastAPI()

@app.post("/getDisease")
def file_read(item: Item):
    
    return prediction(item.image_url,item.species,item.part)
    

#uvicorn main:app --reload
