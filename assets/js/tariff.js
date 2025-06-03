const spec = {
	"$schema": "https://vega.github.io/schema/vega-lite/v6.json",
    "autosize": "fit",
    "title": "Tariff changes",
    "description": "Tariff",
	"data": {
		"url": "data/tariff.csv",
		"format": {"type": "csv"}
	},
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
    "width": "container",
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
            "title": "Date"
        },
		"y": {
            "field": "TariffValue",
            "type": "quantitative",
            "title": "Tariff (%)"
        },
		"color": {
            "field": "TariffType",
            "type": "nominal",
            "title": "Tariff Type"
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
};

vegaEmbed('#chart0', spec).then(console.log).catch(console.error);