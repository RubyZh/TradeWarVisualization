import os
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
import numpy as np

# 初始化 BERT 向量模型
embedder = SentenceTransformer("paraphrase-MiniLM-L6-v2")

# 创建 FastAPI app
app = FastAPI()

# 请求格式：传关键词池
class KeywordPoolRequest(BaseModel):
    keywords: List[str]

@app.post("/cluster_keywords")
async def cluster_keywords(req: KeywordPoolRequest):
    raw_keywords = [kw.strip().lower() for kw in req.keywords if kw and kw.strip()]
    if not raw_keywords:
        return {"top_keywords": []}

    # 嵌入向量化
    embeddings = embedder.encode(raw_keywords, normalize_embeddings=True)

    # 聚类
    n_clusters = min(10, len(set(raw_keywords)))
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init="auto")
    labels = kmeans.fit_predict(embeddings)

    # 聚类中心提取代表词
    clustered = {}
    for label, phrase in zip(labels, raw_keywords):
        clustered.setdefault(label, []).append(phrase)

    top_keywords = []
    for label, phrases in clustered.items():
        phrase_vecs = embedder.encode(phrases, normalize_embeddings=True)
        center = kmeans.cluster_centers_[label]
        distances = np.linalg.norm(phrase_vecs - center, axis=1)
        top_keywords.append(phrases[np.argmin(distances)])

    # 去重保留10个
    top_keywords = list(dict.fromkeys(top_keywords))[:10]
    return {"top_keywords": top_keywords}