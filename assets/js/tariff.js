const spec0 = {
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
            "params": [
                {
                    "name": "hover-tariff",
                    "select": {
                        "type": "point",
                        "fields": ["TariffType"],
                        "on": "mouseover",
                        "clear": "mouseout"
                    }
                },
                // {
                //     "name": "select-legend",
                //     "select": {
                //         "type": "point",
                //         "fields": ["TariffType"],
                //         "on": "click",
                //     },
                //     "bind": "legend"
                // }
            ],
            "mark": {
                "type": "line",
                "point": true
            },
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
                    "title": "Tariff (%)",
                    "axis": { "orient": "left", "grid": true }
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
                        "param": "hover-tariff",
                        "value": 1
                    },
                    "value": 0.15
                }
            }
        },
        { // Tariff dots
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
            "params": [
                {
                    "name": "hover-points",
                    "select": {
                        "type": "point",
                        "on": "pointerover",
                        "clear": "mouseout",
                        "fields": ["DateISO", "TariffType"],
                        "nearest": true
                    }
                },
            ],
            "mark": {
                "type": "point",
            },
            "encoding": {
                "x": {"field": "DateISO", "type": "temporal",},
                "y": {"field": "TariffValue", "type": "quantitative",},
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
                    "legend": null
                },
                "opacity": {
                    "condition": {
                        "param": "hover-tariff",
                        "value": 1
                    },
                    "value": 0.15
                },
                "size": {
                    "condition": [
                        {
                            "param": "hover-points",
                            "value": 100,
                            "empty": false
                        }
                    ],
                    "value": 35
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

vegaEmbed('#tariff-chart0', spec0).then(console.log).catch(console.error);

const spec1 = {
	"$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "autosize": "fit",
    "title": "Tariff changes",
    "description": "Tariff",
    "width": "container",
    "height": 400,
    "layer" : [
        { // Sum of news area
            "data": {"url": "data/news_sum.csv"},
            "mark": {
                "type": "area",
                "line": {
                    "color": "#3896f9",
                    "size": 0.2
                },
                "color": {
                    "x1": 1,
                    "y1": 1,
                    "x2": 1,
                    "y2": 0,
                    "gradient": "linear",
                    "stops": [
                        {
                            "offset": 0,
                            "color": "white"
                        },
                        {
                            "offset": 1,
                            "color": "#3896f9"
                        }
                    ]
                }
            },
            "encoding": {
                "x": {
                    "field": "Date",
                    "type": "temporal",
                    "title": "Date",
                    "axis": { grid: false }
                },
                "y": {
                    "field": "Num",
                    "type": "quantitative",
                    "title": "Sum of News",
                    "axis": {
                        "orient": "right",
                        "grid": false
                    }
                },
                "opacity": {
                    "condition": {
                        "param": "hover-tariff",
                        "value": 1
                    },
                    "value": 0.3
                },
                "tooltip": [
                    {"field": "Date", "type": "temporal", "title": "Date"},
                    {"field": "Num", "type": "quantitative", "title": "Number of news"},
                ]
            }
        },
        { // Sum of news line
            "data": {"url": "data/news_sum.csv"},
            "mark": { "type": "line" },
            "params": [
                {
                    "name": "time-index",
                    "select": {
                        "type": "point",
                        "encodings": ["Date"],
                        "on": "pointermove",
                        "nearest": true
                    }
                }
            ],
            "encoding": {
                "x": {
                    "field": "Date",
                    "type": "temporal",
                    "title": "Date",
                    "axis": { grid: false }
                },
                "y": {
                    "field": "Num",
                    "type": "quantitative",
                    "title": "Sum of News",
                    "axis": {
                        "orient": "right",
                        "grid": false
                    }
                },
                "color": {
                    "value": "#3896f9"
                },
                "strokeWidth": {
                    "value": 0.2
                },
                "opacity": {
                    "condition": {
                        "param": "hover-tariff",
                        "value": 0.5
                    },
                    "value": 0.15
                },
                "tooltip": [
                    {"field": "Date", "type": "temporal", "title": "Date"},
                    {"field": "Num", "type": "quantitative", "title": "Number of news"},
                ]
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
            "params": [
                {
                    "name": "hover-tariff",
                    "select": {
                        "type": "point",
                        "fields": ["TariffType"],
                        "on": "mouseover",
                        "clear": "mouseout"
                    }
                },
                // {
                //     "name": "select-legend",
                //     "select": {
                //         "type": "point",
                //         "fields": ["TariffType"],
                //         "on": "click",
                //     },
                //     "bind": "legend"
                // }
            ],
            "mark": {
                "type": "line",
                "point": true
            },
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
                    "title": "Tariff (%)",
                    "axis": { "orient": "left", "grid": true }
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
                        "param": "hover-tariff",
                        "value": 1
                    },
                    "value": 0.15
                }
            }
        },
        { // Tariff dots
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
            "params": [
                {
                    "name": "hover-points",
                    "select": {
                        "type": "point",
                        "on": "pointerover",
                        "clear": "mouseout",
                        "fields": ["DateISO", "TariffType"],
                        "nearest": true
                    }
                },
            ],
            "mark": {
                "type": "point",
            },
            "encoding": {
                "x": {"field": "DateISO", "type": "temporal",},
                "y": {"field": "TariffValue", "type": "quantitative",},
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
                    "legend": null
                },
                "opacity": {
                    "condition": {
                        "param": "hover-tariff",
                        "value": 1
                    },
                    "value": 0.15
                },
                "size": {
                    "condition": [
                        {
                            "param": "hover-points",
                            "value": 100,
                            "empty": false
                        }
                    ],
                    "value": 35
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
    "resolve": {
        "scale": {
            "y": "independent"
        }
  }
};

vegaEmbed('#tariff-chart1', spec1).then(console.log).catch(console.error);