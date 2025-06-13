import pandas as pd
from transformers import pipeline
from tqdm import tqdm

# 加载情感分类模型
classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

# 读取包含摘要的 CSV 文件
input_file = "news_with_summary.csv"
df = pd.read_csv(input_file, encoding="utf-8-sig")

# 检查是否有 Summary 字段
if "Summary" not in df.columns:
    raise ValueError("CSV 文件中未找到 'Summary' 列")

# 存储情感分析结果的列表
top1_emotion = []
top1_score = []
top2_emotion = []
top2_score = []

# 批量分析摘要情感
print("正在分析摘要情感...")
for text in tqdm(df["Summary"].fillna("")):
    try:
        result = classifier(text)[0]
        # 按 score 排序，获取前两个情感
        sorted_result = sorted(result, key=lambda x: x['score'], reverse=True)
        top1_emotion.append(sorted_result[0]['label'])
        top1_score.append(round(sorted_result[0]['score'], 4))
        top2_emotion.append(sorted_result[1]['label'])
        top2_score.append(round(sorted_result[1]['score'], 4))
    except Exception as e:
        # 出现错误时填充为 None 或 "[ERROR]"
        top1_emotion.append("[ERROR]")
        top1_score.append(None)
        top2_emotion.append("[ERROR]")
        top2_score.append(None)

# 添加新列到 DataFrame 中
df["Top1_Emotion"] = top1_emotion
df["Top1_Score"] = top1_score
df["Top2_Emotion"] = top2_emotion
df["Top2_Score"] = top2_score

# 保存新 CSV 文件
output_file = "news_with_summary_and_emotion.csv"
df.to_csv(output_file, index=False, encoding="utf-8")
print(f"情感分析结果已保存至：{output_file}")