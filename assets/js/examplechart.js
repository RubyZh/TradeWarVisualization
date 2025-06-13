const spec = {
	"$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "autosize": "fit",
    "title": "Tariff changes",
    "description": "Tariff",
    "width": "container",
    "height": 400,
    "layer" : [
        { // Tariff lines
            "data": {"url": "data/tariff.csv"},
            "transform": [ // 数据处理
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
            "mark": { // 图表类型
                "type": "line",
                "point": true
            },
            "params": [ // 交互参数
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
            "encoding": { // 数据编码
                "x": { // X轴设置
                    "field": "DateISO", // 时间字段
                    "type": "temporal", // 时间类型
                    "title": "Date", // X轴标题
                    "axis": { "grid":false } // X轴网格线设置
                },
                "y": {
                    "field": "TariffValue", // 关税值字段
                    "type": "quantitative", // 数值类型
                    "title": "Tariff (%)" // Y轴标题
                },
                "color": { // 颜色设置
                    "field": "TariffType", // 关税类型字段
                    "type": "nominal",
                    "title": "Tariff Type", // 图例标题
                    "scale": {
                        "domain": [
                            "Chinese tariffs on US exports",
                            "Chinese tariffs on ROW exports",
                            "US tariffs on Chinese exports",
                            "US tariffs on ROW exports"
                        ],
                        "range": ["#e7100a", "#f52e28", "#3660df", "#1586ff"] // 颜色设置
                    },
                    "legend": { "orient": "bottom", "title": "Tariff Type" } // 图例设置
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
                    "legend": { "orient": "bottom", "title": "Line Style" } // 图例设置
                },
                "opacity": {
                    "condition": {
                        "param": "hover", // 鼠标悬停时的透明度
                        "value": 1
                    },
                    "value": 0.15
                },
                "tooltip": [ // 鼠标悬停时显示的提示信息
                    {"field": "DateISO", "type": "temporal", "title": "Date"},
                    {"field": "TariffType", "type": "nominal", "title": "Type"},
                    {"field": "TariffValue", "type": "quantitative", "title": "Tariff (%)"},
                    {"field": "Event", "type": "nominal", "title": "Event"}
                ]
            }
        }
    ],
};

vegaEmbed('#example-chart0', spec).then(console.log).catch(console.error);