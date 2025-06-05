const spec0 = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "An interactive choropleth map of the world.",
  "width": 1000,
  "height": 550,
  "autosize": "fit",
  "signals": [
    {"name": "type", "value": "mercator"},
    {"name": "scale", "value": 150},
    {"name": "translate0", "update": "width / 2"},
    {"name": "translate1", "update": "height / 2"},
    {"name": "borderWidth", "value": 1},
    {"name": "hover", "value": null, "on": [
      {"events": "shape:mouseover", "update": "datum"},
      {"events": "shape:mouseout",  "update": "null"}
    ]}
  ],
  "data": [
    {
      "name": "world",
      "url": "data/world-110m.json",
      "format": {"type": "topojson", "feature": "countries"}
    },
    {
      "name": "counts",
      "url": "data/news_count_country.csv",
      "format": {"type": "csv"}
    },
    {
      "name": "countries",
      "source": "world",
      "transform": [
        {
          "type": "lookup",
          "from": "counts",
          "key": "code",
          "fields": ["id"],
          "values": ["country", "count"]
        }
      ]
    }
  ],
  "projections": [
    {
      "name": "projection",
      "type": {"signal": "type"},
      "scale": {"signal": "scale"},
      "translate": [{"signal": "translate0"}, {"signal": "translate1"}]
    }
  ],
  "marks": [
    {
      "type": "shape",
      "from": {"data": "countries"},
      "encode": {
        "update": {
          "fill": [
            {"test": "datum.count != null", "scale": "color", "field": "count"},
            {"value": "#eee"}
          ],
          "stroke": {"value": "white"},
          "strokeWidth": {"signal": "borderWidth"},
          "zindex": {"value": 0},
          "tooltip": [
            {
              //"signal": "datum.country ? datum.country + ': ' + datum.count : 'No data'"
              // "signal": "{'Country': datum.country, 'ISO code': datum.id, 'News Count': datum.count}"
              // "signal": "datum.country && datum.count != null ? datum.country + ' (ISO:' + datum.id + ')\\n\\tNews Count: ' + datum.count : 'No data'"
              "signal": "datum.country && datum.count != null ? {'Country': datum.country, 'News Count': datum.count} : 'No data'"
            }
          ],
        },
        "hover": {
          "stroke": {"value": "#e7100a"},
          "strokeWidth": {"value": 1},
          "zindex": {"value": 2}
        }
      },
      "transform": [{"type": "geoshape", "projection": "projection"}]
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "fill": {"value": "black"},
          "fontSize": {"value": 12},
          "align": {"value": "left"},
          "baseline": {"value": "top"}
        },
        "update": {
          "x": {"signal": "hover ? x('hover') : 0"},
          "y": {"signal": "hover ? y('hover') : 0"},
          //"text": {"signal": "hover && hover.country + ': ' + hover.count"},
          "opacity": {"signal": "hover ? 1 : 0"},
        }
      }
    }
  ],
  "scales": [
    {
      "name": "color",
      "type": "linear",
      "domain": {"data": "counts", "field": "count"},
      "range": ["#f0f7ff", "#3896f9"],
      "nice": true
    },
  ],
  "legends": [
    {
      "fill": "color",
      "title": "News Count",
      "orient": "right",
      "gradientLength": 300
    }
  ],
};


vegaEmbed('#topic-chart0', spec0).then(console.log).catch(console.error);

const spec1 = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A configurable map of countries of the world.",
  "width": 900,
  "height": 500,
  "autosize": "none",
  "signals": [
    {
      "name": "type",
      "value": "mercator"
    },
    {
      "name": "scale",
      "value": 150
    },
    {"name": "translate0", "update": "width / 2"},
    {"name": "translate1", "update": "height / 2"},
    {"name": "graticuleDash", "value": 0},
    {"name": "borderWidth", "value": 1},
    {"name": "invert", "value": false}
  ],
  "projections": [
    {
      "name": "projection",
      "type": {"signal": "type"},
      "scale": {"signal": "scale"},
      "translate": [{"signal": "translate0"}, {"signal": "translate1"}]
    }
  ],
  "data": [
    {
      "name": "world",
      "url": "data/world-110m.json",
      "format": {"type": "topojson", "feature": "countries"}
    },
    {"name": "graticule", "transform": [{"type": "graticule"}]}
  ],
  "marks": [
    {
      "type": "shape",
      "from": {"data": "graticule"},
      "encode": {
        "update": {
          "strokeWidth": {"value": 1},
          "strokeDash": {"signal": "[+graticuleDash, +graticuleDash]"},
          "stroke": {"signal": "invert ? '#444' : '#ddd'"},
          "fill": {"value": null}
        }
      },
      "transform": [{"type": "geoshape", "projection": "projection"}]
    },
    {
      "type": "shape",
      "from": {"data": "world"},
      "encode": {
        "update": {
          "strokeWidth": {"signal": "+borderWidth"},
          "stroke": {"signal": "invert ? '#777' : '#bbb'"},
          "fill": {"signal": "invert ? '#fff' : '#000'"},
          "zindex": {"value": 0}
        },
        "hover": {
          "strokeWidth": {"signal": "+borderWidth + 1"},
          "stroke": {"value": "firebrick"},
          "zindex": {"value": 1}
        }
      },
      "transform": [{"type": "geoshape", "projection": "projection"}]
    }
  ],
  "config": {}
};

const spec2 = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 900,
  "height": 500,
  "autosize": "none",
  "signals": [
    { "name": "scale", "value": 150 },
    { "name": "translate0", "update": "width / 2" },
    { "name": "translate1", "update": "height / 2" }
  ],
  "projections": [
    {
      "name": "projection",
      "type": "mercator",
      "scale": { "signal": "scale" },
      "translate": [{ "signal": "translate0" }, { "signal": "translate1" }]
    }
  ],
  "data": [
    {
      "name": "world",
      "url": "data/world-110m.json",
      "format": { "type": "topojson", "feature": "countries" }
    },
    {
      "name": "values",
      "url": "data/news_count_country.csv",
      "format": { "type": "csv" },
      "transform": [
        {
          "type": "formula",
          "as": "count",
          "expr": "isValid(datum.count) && datum.count !== '' ? +datum.count : 0"
        }
      ]
    },
    {
      "name": "countries",
      "source": "world",
      "transform": [
        {
          "type": "lookup",
          "from": "values",
          "key": "code",
          "fields": ["id"],
          "values": ["count"],
          "as": ["count"]
        },
        {
          "type": "formula",
          "as": "count",
          "expr": "isValid(datum.count) ? datum.count : 0"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "color",
      "type": "linear",
      "domain": { "data": "countries", "field": "count" },
      "range": ["#e5f5f9", "#2ca25f"],
      "zero": true,
      "nice": true
    }
  ],
  "legends": [
    {
      "fill": "color",
      "title": "News Count",
      "orient": "right",
      "gradientLength": 300
    }
  ],
  "marks": [
    {
      "type": "shape",
      "from": { "data": "countries" },
      "encode": {
        "update": {
          "fill": { "scale": "color", "field": "count" },
          "stroke": { "value": "#fff" },
          "strokeWidth": { "value": 0.5 },
          "tooltip": {
            "signal": "{'ID': datum.id, 'News Count': datum.count}"
          }
        },
        "hover": {
          "stroke": { "value": "black" },
          "strokeWidth": { "value": 1.5 }
        }
      },
      "transform": [{ "type": "geoshape", "projection": "projection" }]
    }
  ]
};

vegaEmbed('#topic-chart2', spec2).then(console.log).catch(console.error);