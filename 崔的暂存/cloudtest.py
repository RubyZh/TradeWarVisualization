from stylecloud import gen_stylecloud
import jieba
import re
import random

# 模拟数据，替代datas.txt内容
data = """
习近平强调，要坚持以人民为中心的发展思想，推动经济高质量发展。
中国科技创新日新月异，5G、人工智能等技术引领未来。
"""

# 文本预处理 只提取中文字符
new_data = re.findall('[\u4e00-\u9fa5]+', data, re.S)
new_data = "/".join(new_data)

# 文本分词
seg_list_exact = jieba.cut(new_data, cut_all=True)

# 模拟停用词集合，替代stop_words.txt
stop_words = {"的", "了", "和", "是", "要", "以", "为", "等"}

result_list = []
for word in seg_list_exact:
    if word not in stop_words and len(word) > 1:
        result_list.append(word)

print(result_list)

# 模拟调色板，替代palettable配色方案.txt
choices = [
    "colorbrewer.qualitative.Dark2_7",
    "cartocolors.qualitative.Bold_5",
    "colorbrewer.qualitative.Set1_8"
]

gen_stylecloud(
    text=' '.join(result_list),              # 文本数据
    size=600,                                # 词云图大小
    font_path=r'C:\Windows\Fonts\msyh.ttc',  # 注意去掉开头的隐藏字符
    output_name='词云.png',                  # 输出文件名
    icon_name='fas fa-grin-beam',            # 图标
    palette=random.choice(choices)           # 随机配色方案
)
