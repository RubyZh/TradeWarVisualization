import pandas as pd
import json

df = pd.read_csv('news_with_summary_and_emotion.csv')
df = df[df['PTime'].astype(str).str.match(r'^\d{8}$')].copy()
df['date'] = pd.to_datetime(df['PTime'].astype(str), format='%Y%m%d')
df['month'] = df['date'].dt.to_period('M').astype(str)

# 筛选指定时间段
df = df[(df['month'] >= '2025-01') & (df['month'] < '2025-06')]

emotion_over_time = df.groupby(['month', 'Top1_Emotion']).size().unstack(fill_value=0).reset_index()

data = []
emotion_types = list(emotion_over_time.columns)[1:]

for emotion in emotion_types:
    data.append({
        "name": emotion,
        "type": "line",
        "stack": "Emotion",
        "smooth": True,
        "areaStyle": {},
        "emphasis": {"focus": "series"},
        "data": list(emotion_over_time[emotion])
    })

timeline = list(emotion_over_time['month'])

with open('emotion_stream_data.json', 'w', encoding='utf-8') as f:
    json.dump({"timeline": timeline, "data": data}, f, ensure_ascii=False, indent=2)
