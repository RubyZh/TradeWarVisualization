const container = document.getElementById("topic-chart0");
const width = container.clientWidth;

var spec0 = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "An interactive choropleth map of the world.",
  "width": width,
  "height": 500,
  "autosize": {
    "type": "fit",
    "contains": "padding"
    // "resize": true
  },
  "signals": [
    {"name": "type", "value": "mercator"},
    {"name": "scale", "value": 150},
    {"name": "translate0", "update": "width / 2"},
    {"name": "translate1", "update": "height / 2"},
    {"name": "borderWidth", "value": 1},
    { "name": "slide", "value": 0,
      "bind": {"input": "range", "min": -180, "max": 180, "step": 1} },
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
      "translate": [{"signal": "translate0"}, {"signal": "translate1"}],
      "rotate": [
        {"signal": "slide"}
      ],
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
              // "signal": "{'Country': d atum.country, 'ISO code': datum.id, 'News Count': datum.count}"
              // "signal": "datum.country && datum.count != null ? datum.country + ' (ISO:' + datum.id + ')\\n\\tNews Count: ' + datum.count : 'No data'"
              "signal": "datum.country && datum.count != null ? {'Country': datum.country, 'News Count': datum.count} : 'No data'"
            }
          ],
        },
        "hover": {
          "stroke": {"value": " #ff0037"},
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
      // "type": "linear",
      // "domain": {"data": "counts", "field": "count"},
      // "range": ["#f0f7ff", "#3896f9"],
      // "nice": true
      "type": "threshold",
      "domain": [1, 5, 10, 20, 50, 100, 300, 500, 1000, 1500],
      "range": [" #edf8fb"," #d7ebe7"," #c0ded3"," #aad1c0"," #93c4ac"," #7db698","rgb(116, 177, 143)","rgb(90, 165, 122)","rgb(70, 156, 105)"," #238249"],
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

let view;

function renderChart() {
  const width = container.clientWidth;
  const specCopy = JSON.parse(JSON.stringify(spec0));
  specCopy.width = width;
  specCopy.height = 500;

  vegaEmbed("#topic-chart0", specCopy, { renderer: "canvas" }).then((result) => {
    view = result.view;
  });
}

renderChart(); // 初次渲染

// 使用 ResizeObserver 而不是 window.resize
const resizeObserver = new ResizeObserver(() => {
  renderChart();
});
resizeObserver.observe(container);


// vegaEmbed("#topic-chart0", spec0, { renderer: "canvas" }).then(console.log).catch(console.error);