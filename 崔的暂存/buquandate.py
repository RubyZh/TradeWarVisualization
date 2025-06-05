import pandas as pd

# 读取 CSV 文件（指定 gbk 编码解决乱码或解码错误）
df = pd.read_csv("news_trade0.2_with_keywords.csv")
# 将 PTime 中为 "_" 的行，用 DTime 值填充
df.loc[df["PTime"] == "_", "PTime"] = df.loc[df["PTime"] == "_", "DTime"]

# 保存修改后的内容回原文件（同样用 gbk 编码写回）
df.to_csv(file_path, index=False, encoding="gbk")

print(f"✅ 已完成：将 PTime 为 '_' 的行填充为对应 DTime，并保存至 {file_path}")
