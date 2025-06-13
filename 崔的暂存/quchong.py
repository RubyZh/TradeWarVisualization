import pandas as pd

# 读取 Excel 文件
df = pd.read_excel("news_trade_ip_mark0.1.xlsx")

# 删除相邻行中 Content 重复的行
df_cleaned = df[df["Content"] != df["Content"].shift()]

# 保存为新的 CSV 文件
df_cleaned.to_csv("news_trade_ip_mark0.2.csv", index=False)

print("处理完成，重复内容已移除并保存为 news_trade_ip_mark0.2.csv")
