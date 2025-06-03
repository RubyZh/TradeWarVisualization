const spec = {
	"$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "autosize": "fit",
    "title": "Tariff changes",
    "description": "Tariff",
    "width": "container",
    "height": 400,
    "layer" : [
        {
            "data": {
                "values": [
                    {
                        "label": "Biden",
                        "x": "2025-01-01",
                        "x2": "2025-01-20",
                        "color": "#737373"
                    },
                    {
                        "label": "Trump",
                        "x": "2025-01-20",
                        "x2": "2025-05-14",
                        "color": "#d9d9d9"
                    }
                ]
            },
            "mark": {
                "type": "rect",
                "opacity": 0.5
            },
            "encoding": {
                "x": {
                    "field": "x",
                    "type": "temporal",
                    "scale": { "domain": ["2025-01-01", "2025-05-14"] }
                },
                "x2": {
                    "field": "x2",
                    "type": "temporal"
                },
                "color": {
                    "field": "color",
                    "type": "nominal",
                    "scale": null
                }
            }
        },
        { // 左右文字标签
            "data": {
                "values": [
                    {
                        "label": "Biden",
                        "x": "2025-01-07",
                    },
                    {
                        "label": "Trump",
                        "x": "2025-03-12",
                    }
                ]
            },
            "mark": {
                "type": "text",
                "fontSize": 14,
                "color": "#000000",
                "opacity": 0.8,
                "align": "middle",
                "dy": -130
            },
            "encoding": {
                "x": {
                    "field": "x",
                    "type": "temporal"
                },
                "text": {
                    "field": "label"
                }
            }
        },
        { // Tariff lines
            "data": {"url": "data/tariff.csv"},
            "transform": [
                {
                    "calculate": "toDate(datum.Year + '-' + (datum.Month < 10 ? '0' + datum.Month : datum.Month) + '-' + (datum.Date < 10 ? '0' + datum.Date : datum.Date))",
                    "as": "DateISO"
                },
                {
                    "fold": [
                        "Chinese tariffs on US exports",
                        "Chinese tariffs on ROW exports",
                        "US tariffs on Chinese exports",
                        "US tariffs on ROW exports"
                    ],
                    "as": ["TariffType", "TariffValue"]
                }
            ],
            "mark": {
                "type": "line",
                "point": true
            },
            "params": [
                {
                    "name": "hover",
                    "select": {
                        "type": "point",
                        "fields": ["TariffType"],
                        "on": "mouseover",
                        "clear": "mouseout"
                    }
                }
            ],
            "encoding": {
                "x": {
                    "field": "DateISO",
                    "type": "temporal",
                    "title": "Date",
                    "axis": { "grid":false }
                },
                "y": {
                    "field": "TariffValue",
                    "type": "quantitative",
                    "title": "Tariff (%)"
                },
                "color": { // 颜色设置
                    "field": "TariffType",
                    "type": "nominal",
                    "title": "Tariff Type",
                    "scale": {
                        "domain": [
                            "Chinese tariffs on US exports",
                            "Chinese tariffs on ROW exports",
                            "US tariffs on Chinese exports",
                            "US tariffs on ROW exports"
                        ],
                        "range": ["#e7100a", "#f52e28", "#3660df", "#1586ff"]
                    },
                    "legend": { "orient": "bottom", "title": "Tariff Type" }
                },
                "strokeDash": { // 线型设置
                "field": "TariffType",
                "type": "nominal",
                "scale": {
                    "domain": [
                        "Chinese tariffs on US exports",
                        "Chinese tariffs on ROW exports",
                        "US tariffs on Chinese exports",
                        "US tariffs on ROW exports"
                    ],
                    "range": [
                        // 实线[1, 0] 虚线[5, 5] 点线[2, 2] 点划线[10, 5, 2, 5]
                        [1, 0],
                        [2, 2],
                        [1, 0],
                        [2, 2]
                    ]
                },
                    "legend": { "orient": "bottom", "title": "Line Style" }
                },
                "opacity": {
                    "condition": {
                        "param": "hover",
                        "value": 1
                    },
                    "value": 0.15
                },
                "tooltip": [
                    {"field": "DateISO", "type": "temporal", "title": "Date"},
                    {"field": "TariffType", "type": "nominal", "title": "Type"},
                    {"field": "TariffValue", "type": "quantitative", "title": "Tariff (%)"},
                    {"field": "Event", "type": "nominal", "title": "Event"}
                ]
            }
        }
    ],
};

vegaEmbed('#tariff-chart0', spec).then(console.log).catch(console.error);