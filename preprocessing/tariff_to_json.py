import csv
import json
from datetime import datetime

input_csv = "tariff.csv"

chinese_to_us = []
chinese_to_row = []
us_to_china = []
us_to_row = []
event_dict = {}

with open(input_csv, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        year = row['Year'].zfill(4)
        month = row['Month'].zfill(2)
        day = row['Date'].zfill(2)
        date_str = f"{year}-{month}-{day}"

        try:
            chinese_to_us.append([date_str, float(row['Chinese tariffs on US exports'])])
            chinese_to_row.append([date_str, float(row['Chinese tariffs on ROW exports'])])
            us_to_china.append([date_str, float(row['US tariffs on Chinese exports'])])
            us_to_row.append([date_str, float(row['US tariffs on ROW exports'])])
        except ValueError:
            print('Error!')
            continue

        event = row['Event'].strip()
        if event:
            event_dict[date_str] = event

with open("tariff_series.json", "w", encoding='utf-8') as f:
    json.dump({
        "china_to_us": chinese_to_us,
        "china_to_row": chinese_to_row,
        "us_to_china": us_to_china,
        "us_to_row": us_to_row,
        "events": event_dict
    }, f, ensure_ascii=False, indent=2)

print("Succeed")
