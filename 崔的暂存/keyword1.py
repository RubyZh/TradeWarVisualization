# import yake
#
# text = "In mid-March, customs officers in Hong Kong uncovered an unusual smuggling operation.When the officials cracked open a 40-foot shipping container near the city’s northern border, they did not uncover stacks of illegal drugs or counterfeit goods, but more than 25 tonnes of antimony – a rare metal used to make advanced military equipment that has been subject to strict export controls in China since last year.Weeks later, local media in the southern Chinese province of Guangxi reported a similar incident. This time, local customs officers intercepted a shipment of metal declared as soldering paste, but which lab tests later confirmed to be 55.3 per cent bismuth – another rare element placed under Chinese export controls.The cases are a sign of the intense pressure hi-tech manufacturers around the world – and especially in the United States – are facing as China restricts exports of critical minerals amid the trade war.China’s tight control over global supplies of rare minerals – which are essential to making everything from smartphones to fighter jets – has become arguably one of the country’s biggest sources of leverage over America, giving it a vital edge as it continues negotiations with Washington over a deal to roll back tariffs.The US relies on China for about 70 per cent of its imports of rare earths, a key subset of critical minerals, analysts said. And Beijing has increasingly weaponised this dependency over recent months, placing more than a dozen strategic minerals under export restrictions in retaliation against US tariffs.If the controls remain in place, they have the potential to cripple the US’ advanced manufacturing. Making just one F35 fighter jet requires 417kg (919lbs) of rare earth materials, according to an estimate by Wang Xiaosong, an economics professor at Renmin University of China in Beijing."
# # Simple usage with default parameters
# kw_extractor = yake.KeywordExtractor()
# keywords = kw_extractor.extract_keywords(text)
#
# for kw, score in keywords:
#     print(f"{kw} ({score})")
#
# # With custom parameters
# custom_kw_extractor = yake.KeywordExtractor(
#     lan="en",              # language
#     n=3,                   # ngram size
#     dedupLim=0.9,          # deduplication threshold
#     dedupFunc='seqm',      # deduplication function
#     windowsSize=1,         # context window
#     top=10,                # number of keywords to extract
#     features=None          # custom features
# )
#
# keywords = custom_kw_extractor.extract_keywords(text)
import pandas as pd
import yake

# 读取 CSV 文件
df = pd.read_csv("news_trade_ip_mark0.2.csv")

# 创建 YAKE 关键词提取器（自定义参数）
custom_kw_extractor = yake.KeywordExtractor(
    lan="en",              # language
    n=3,                   # max ngram size
    dedupLim=0.9,          # deduplication threshold
    dedupFunc='seqm',      # deduplication function
    windowsSize=1,         # context window size
    top=10,                # number of keywords to extract
    features=None          # custom features (default)
)

# 定义函数：提取关键词并返回关键词列表字符串
def extract_keywords(text):
    if pd.isna(text):
        return ""
    keywords = custom_kw_extractor.extract_keywords(str(text))
    keyword_list = [kw for kw, score in keywords]
    return ", ".join(keyword_list)

# 应用到每一行的 Content 列，生成 Keywords 列
df["Keywords"] = df["Content"].apply(extract_keywords)

# 保存结果或输出（可选）
df.to_csv("news_trade0.2_with_keywords.csv", index=False)
print(df[["Content", "Keywords"]])
