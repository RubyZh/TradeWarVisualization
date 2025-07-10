import pandas as pd
from collections import Counter

df = pd.read_csv('sankey_data.csv')

df = df[['Country_Name', 'Top1_Emotion', 'Top2_Emotion']]

edges = []
edges += [(row['Country_Name'], row['Top1_Emotion']) for _, row in df.iterrows()]


# edges += [(row['Top1_Emotion'], row['Top2_Emotion']) for _, row in df.iterrows()]

edge_counts = Counter(edges)

nodes = set()
for source, target in edge_counts:
    nodes.add(source)
    nodes.add(target)

nodes = [{"name": name} for name in nodes]
links = [{"source": s, "target": t, "value": v} for (s, t), v in edge_counts.items()]
links = [link for link in links if link['value'] >= 10]
used_names = set()
for link in links:
    used_names.add(link['source'])
    used_names.add(link['target'])

nodes = [{"name": name} for name in used_names]


print(nodes)
print(links)