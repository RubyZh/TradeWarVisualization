import pandas as pd
from collections import Counter
import json

df = pd.read_csv("news_with_summary_and_emotion.csv")

all_keyword_counter = Counter()
country_keyword_counter = {"United States": Counter(), "China": Counter(), "India": Counter()}

# 统计关键词
for _, row in df.iterrows():
    country = row["Country_Name"]
    keywords_field = row["Keywords"]

    if pd.isna(keywords_field):
        continue

    keywords = str(keywords_field).split(",")

    for kw in keywords:
        kw = kw.strip().lower()
        if not kw:
            continue

        all_keyword_counter[kw] += 1
        if country in country_keyword_counter:
            country_keyword_counter[country][kw] += 1

# 输出1：所有新闻中出现频率最高的前150个关键词
top150 = all_keyword_counter.most_common(150)
with open("top150_keywords.js", "w", encoding="utf-8") as f:
    f.write("const top150Keywords = ")
    json.dump([{"Keyword": k, "Count": v} for k, v in top150], f, ensure_ascii=False, indent=2)
    f.write(";")

# 输出2：所有关键词总出现次数
all_keywords_list = [{"Keyword": k, "Count": v} for k, v in all_keyword_counter.items()]
with open("total_keyword_counts.js", "w", encoding="utf-8") as f:
    f.write("const totalKeywordCounts = ")
    json.dump(all_keywords_list, f, ensure_ascii=False, indent=2)
    f.write(";")

# 输出3：United States 的前100关键词
us_top100 = country_keyword_counter["United States"].most_common(100)
with open("top100_keywords_us.js", "w", encoding="utf-8") as f:
    f.write("const top100KeywordsUS = ")
    json.dump([{"Keyword": k, "Count": v} for k, v in us_top100], f, ensure_ascii=False, indent=2)
    f.write(";")

# 输出4：China前100关键词
us_top100 = country_keyword_counter["China"].most_common(100)
with open("top100_keywords_cn.js", "w", encoding="utf-8") as f:
    f.write("const top100KeywordsUS = ")
    json.dump([{"Keyword": k, "Count": v} for k, v in us_top100], f, ensure_ascii=False, indent=2)
    f.write(";")

# 输出4：India 的前100关键词
us_top100 = country_keyword_counter["India"].most_common(100)
with open("top100_keywords_in.js", "w", encoding="utf-8") as f:
    f.write("const top100KeywordsUS = ")
    json.dump([{"Keyword": k, "Count": v} for k, v in us_top100], f, ensure_ascii=False, indent=2)
    f.write(";")