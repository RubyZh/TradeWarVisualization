import csv
import requests
import json
import time
import re

# DeepSeek API 配置
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"
DEEPSEEK_API_KEY = ""  # DeepSeek API Key

def get_country_info_from_deepseek(url):
    prompt = f"""
    请根据以下新闻 URL 分析其来源国家，并返回以下信息（严格使用 JSON 格式）：
    - 国家英文全称（如 "United States"）
    - ISO 3166-1 三位字母代码（如 "USA"）
    - 首都的纬度（如 38.9072）
    - 首都的经度（如 -77.0369）

    URL: {url}

    返回格式示例：
    {{
        "country_name": "United States",
        "country_iso": "USA",
        "capital_latitude": 38.9072,
        "capital_longitude": -77.0369
    }}
    """

    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.3,
        "max_tokens": 200
    }

    try:
        response = requests.post(DEEPSEEK_API_URL, headers=headers, json=payload)
        print("Status Code:", response.status_code)
        print("Raw response text:\n", response.text)

        result = response.json()
        reply = result["choices"][0]["message"]["content"]

        # 清理 markdown 代码块
        cleaned_reply = re.sub(r"^```json\s*|\s*```$", "", reply.strip(), flags=re.MULTILINE)
        country_data = json.loads(cleaned_reply)

        return (
            country_data.get("country_name"),
            country_data.get("country_iso"),
            country_data.get("capital_latitude"),
            country_data.get("capital_longitude")
        )
    except Exception as e:
        print(f"DeepSeek API 调用失败: {e}")
        return None, None, None, None

def process_csv(input_csv, output_csv):
    """处理 CSV，调用 DeepSeek API 获取国家信息并保存"""
    with open(input_csv, mode='r', encoding='gbk') as infile, \
         open(output_csv, mode='w', encoding='gbk', newline='') as outfile:
        
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames + [
            'Country_Name',
            'Country_ISO_Code',
            'Capital_Latitude',
            'Capital_Longitude'
        ]
        
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            url = row['URL']
            print(f"正在处理: {url}")
            
            # 调用 DeepSeek API 获取国家信息
            country_name, iso_code, lat, lon = get_country_info_from_deepseek(url)
            
            # 更新行数据
            row['Country_Name'] = country_name
            row['Country_ISO_Code'] = iso_code
            row['Capital_Latitude'] = lat
            row['Capital_Longitude'] = lon
            
            writer.writerow(row)
            time.sleep(1)  # 避免 API 速率限制
            
            print(f"处理完成: {country_name} ({iso_code})")

# 使用
input_csv = 'news_trade_test.csv'  # 输入 CSV 文件路径
output_csv = 'news_data_test_ip.csv'  # 输出 CSV 文件路径
process_csv(input_csv, output_csv)