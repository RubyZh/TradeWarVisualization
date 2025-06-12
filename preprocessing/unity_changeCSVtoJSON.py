import pandas as pd
import json

# 设置文件路径
input_csv_path = "news_final.csv"         # 输入的 CSV 文件路径
output_json_path = "news_final.json"      # 输出的 JSON 文件路径

# 读取 CSV 文件
df = pd.read_csv(input_csv_path)

# 转换为字典列表
records = df.to_dict(orient="records")

# 保存为 JSON 文件
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print(f"成功转换为 JSON 文件: {output_json_path}")