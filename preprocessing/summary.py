import os
from tqdm import tqdm
import pandas as pd
from transformers import pipeline, AutoTokenizer

# 设置 Hugging Face 镜像
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

# 加载模型和对应的 tokenizer
model_name = "facebook/bart-large-cnn"
summarizer = pipeline("summarization", model=model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# 模型最大输入 token 长度
MAX_TOKENS = 1000

# 读取 CSV 文件
input_file = "pre_summary_encode.csv"
df = pd.read_csv(input_file, encoding="utf-8")

# 检查是否有 Content 字段
if "Content" not in df.columns:
    raise ValueError("CSV 文件中未找到 'Content' 列")

# 创建新列存储摘要
summaries = []

# 批量处理摘要
print("正在生成摘要...")
for text in tqdm(df["Content"].fillna("")):
    text = str(text).strip()
    
    # 使用 tokenizer 进行编码
    tokenized = tokenizer.encode(text, truncation=False)
    
    # 如果 token 少于 100，就跳过摘要
    if len(tokenized) < 100:
        summaries.append(text)
        continue

    try:
        # 如果 token 太多就截断
        if len(tokenized) > MAX_TOKENS:
            tokenized = tokenized[:MAX_TOKENS]
            text = tokenizer.decode(tokenized, skip_special_tokens=True)

        summary = summarizer(text, max_length=250, min_length=100, do_sample=False)
        if summary and isinstance(summary, list) and "summary_text" in summary[0]:
            summaries.append(summary[0]["summary_text"])
        else:
            summaries.append("[ERROR] Empty or invalid summary result")

    except Exception as e:
        summaries.append(f"[ERROR] {e}")

# 添加摘要列
df["Summary"] = summaries

# 保存为新文件
output_file = "news_with_summary.csv"
df.to_csv(output_file, index=False, encoding="utf-8")
print(f"摘要已保存至：{output_file}")