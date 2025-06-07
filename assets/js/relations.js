const container1 = document.getElementById("topic-chart1");
const width1 = container1.clientWidth;

var spec1 = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": width1,
  "height": 300,
  "signals": [
    {
      "name": "chartWidth",
      "update": "width"
    }
  ],
  "data": [
    {
      "name": "votes",
      "values": [
        {"country": "Germany", "us": 0.3, "china": 0.7, "news": 120},
        {"country": "France", "us": 0.5, "china": 0.5, "news": 80},
        {"country": "Brazil", "us": 0.7, "china": 0.3, "news": 300}
      ],
      "transform": [
        {
          "type": "formula",
          "as": "x",
          "expr": "datum.us / (datum.us + datum.china) * chartWidth"
        },
        {
          "type": "formula",
          "as": "size",
          "expr": "datum.news"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "y",
      "type": "linear",
      "domain": [0, 1],
      "range": [250, 50]
    }
  ],
  "marks": [
    {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"value": 0},
          "y": {"value": 280},
          "text": {"value": "China"},
          "fontSize": {"value": 14},
          "align": {"value": "left"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "x": {"signal": "chartWidth"},
          "y": {"value": 280},
          "text": {"value": "US"},
          "fontSize": {"value": 14},
          "align": {"value": "right"}
        }
      }
    },
    {
      "type": "symbol",
      "from": {"data": "votes"},
      "encode": {
        "enter": {
          "x": {"field": "x"},
          "y": {"value": 150},
          "size": {"field": "size"},
          "fill": {"value": "#6baed6"},
          "stroke": {"value": "#3182bd"}
        }
      }
    },
    {
      "type": "text",
      "from": {"data": "votes"},
      "encode": {
        "enter": {
          "x": {"field": "x"},
          "y": {"value": 150},
          "text": {"field": "country"},
          "align": {"value": "center"},
          "baseline": {"value": "middle"},
          "fontSize": {"value": 10},
          "fill": {"value": "#000"}
        }
      }
    }
  ]
};


let view1; // 用于存储 Vega View 实例

function renderChart() {
  const width1 = container1.clientWidth;
  const specCopy = JSON.parse(JSON.stringify(spec1)); // 避免原始 spec 被污染
  specCopy.width = width1;
  specCopy.height = 500;

  vegaEmbed("#topic-chart1", specCopy, { renderer: "canvas" }).then((result) => {
    view1 = result.view;
  });
}

renderChart(); // 初次渲染
  // 监听窗口大小变化并重新渲染
  window.addEventListener("resize", () => {
  renderChart();
});

//vegaEmbed("#topic-chart1", spec1, { renderer: "canvas" }).then(console.log).catch(console.error);