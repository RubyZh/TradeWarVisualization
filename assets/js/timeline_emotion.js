var chartDom = document.getElementById('tariff-emotion');
var Chart10 = echarts.init(chartDom);

const emotionData = {
    "dates": [
      "2025-01-01",
      "2025-01-20",
      "2025-02-04",
      "2025-02-07",
      "2025-02-10",
      "2025-03-04",
      "2025-03-10",
      "2025-03-12",
      "2025-04-03",
      "2025-04-05",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11",
      "2025-04-12",
      "2025-05-03",
      "2025-05-14"
    ],
    "fear": [
    [
      "2025-01-01",
      0,
    ],
    [
      "2025-01-20",
      9
    ],
    [
      "2025-02-04",
      24
    ],
    [
      "2025-02-07",
      10
    ],
    [
      "2025-02-10",
      6
    ],
    [
      "2025-03-04",
      25
    ],
    [
      "2025-03-10",
      15
    ],
    [
      "2025-03-12",
      21
    ],
    [
      "2025-04-03",
      14
    ],
    [
      "2025-04-05",
      8
    ],
    [
      "2025-04-09",
      40
    ],
    [
      "2025-04-10",
      30
    ],
    [
      "2025-04-11",
      35
    ],
    [
      "2025-04-12",
      8
    ],
    [
      "2025-05-03",
      3
    ],
    [
      "2025-05-14",
      2
    ]
  ],
  "neutral": [
    [
      "2025-01-01",
      1
    ],
    [
      "2025-01-20",
      8
    ],
    [
      "2025-02-04",
      44
    ],
    [
      "2025-02-07",
      9
    ],
    [
      "2025-02-10",
      16
    ],
    [
      "2025-03-04",
      35
    ],
    [
      "2025-03-10",
      16
    ],
    [
      "2025-03-12",
      29
    ],
    [
      "2025-04-03",
      24
    ],
    [
      "2025-04-05",
      10
    ],
    [
      "2025-04-09",
      46
    ],
    [
      "2025-04-10",
      38
    ],
    [
      "2025-04-11",
      37
    ],
    [
      "2025-04-12",
      22
    ],
    [
      "2025-05-03",
      12
    ],
    [
      "2025-05-14",
      13
    ]
  ],
  "anger": [
    [
      "2025-01-01",
      0
    ],
    [
      "2025-01-20",
      11
    ],
    [
      "2025-02-04",
      28
    ],
    [
      "2025-02-07",
      3
    ],
    [
      "2025-02-10",
      6
    ],
    [
      "2025-03-04",
      44
    ],
    [
      "2025-03-10",
      9
    ],
    [
      "2025-03-12",
      25
    ],
    [
      "2025-04-03",
      6
    ],
    [
      "2025-04-05",
      1
    ],
    [
      "2025-04-09",
      27
    ],
    [
      "2025-04-10",
      18
    ],
    [
      "2025-04-11",
      30
    ],
    [
      "2025-04-12",
      5
    ],
    [
      "2025-05-03",
      1
    ],
    [
      "2025-05-14",
      3
    ]
  ],
  "sadness": [
    [
      "2025-01-01",
      0,
    ],
    [
      "2025-01-20",
      1
    ],
    [
      "2025-02-04",
      3
    ],
    [
      "2025-02-07",
      1
    ],
    [
      "2025-02-10",
      0
    ],
    [
      "2025-03-04",
      6
    ],
    [
      "2025-03-10",
      1
    ],
    [
      "2025-03-12",
      4
    ],
    [
      "2025-04-03",
      2
    ],
    [
      "2025-04-05",
      1
    ],
    [
      "2025-04-09",
      8
    ],
    [
      "2025-04-10",
      4
    ],
    [
      "2025-04-11",
      5
    ],
    [
      "2025-04-12",
      1
    ],
    [
      "2025-05-03",
      0
    ],
    [
      "2025-05-14",
      0
    ]
  ],
  "joy": [
    [
      "2025-01-01",
      0
    ],
    [
      "2025-01-20",
      1
    ],
    [
      "2025-02-04",
      3
    ],
    [
      "2025-02-07",
      0
    ],
    [
      "2025-02-10",
      0
    ],
    [
      "2025-03-04",
      0
    ],
    [
      "2025-03-10",
      0
    ],
    [
      "2025-03-12",
      1
    ],
    [
      "2025-04-03",
      0
    ],
    [
      "2025-04-05",
      0
    ],
    [
      "2025-04-09",
      2
    ],
    [
      "2025-04-10",
      2
    ],
    [
      "2025-04-11",
      0
    ],
    [
      "2025-04-12",
      1
    ],
    [
      "2025-05-03",
      0
    ],
    [
      "2025-05-14",
      0
    ]
  ],
  "disgust": [
    [
      "2025-01-01",
      0
    ],
    [
      "2025-01-20",
      0
    ],
    [
      "2025-02-04",
      4
    ],
    [
      "2025-02-07",
      2
    ],
    [
      "2025-02-10",
      0
    ],
    [
      "2025-03-04",
      0
    ],
    [
      "2025-03-10",
      0
    ],
    [
      "2025-03-12",
      3
    ],
    [
      "2025-04-03",
      2
    ],
    [
      "2025-04-05",
      0
    ],
    [
      "2025-04-09",
      3
    ],
    [
      "2025-04-10",
      1
    ],
    [
      "2025-04-11",
      0
    ],
    [
      "2025-04-12",
      3
    ],
    [
      "2025-05-03",
      2
    ],
    [
      "2025-05-14",
      1
    ]
  ],
  "surprise": [
    [
      "2025-01-01",
      0
    ],
    [
      "2025-01-20",
      0
    ],
    [
      "2025-02-04",
      2
    ],
    [
      "2025-02-07",
      0
    ],
    [
      "2025-02-10",
      0
    ],
    [
      "2025-03-04",
      1
    ],
    [
      "2025-03-10",
      0
    ],
    [
      "2025-03-12",
      1
    ],
    [
      "2025-04-03",
      0
    ],
    [
      "2025-04-05",
      0
    ],
    [
      "2025-04-09",
      0
    ],
    [
      "2025-04-10",
      0
    ],
    [
      "2025-04-11",
      0
    ],
    [
      "2025-04-12",
      1
    ],
    [
      "2025-05-03",
      1
    ],
    [
      "2025-05-14",
      2
    ]
  ],
};

const tariffData = {
  "china_to_us": [
    [
      "2025-01-01",
      21.1
    ],
    [
      "2025-01-20",
      21.1
    ],
    [
      "2025-02-04",
      21.2
    ],
    [
      "2025-02-07",
      21.9
    ],
    [
      "2025-02-10",
      21.9
    ],
    [
      "2025-03-04",
      21.9
    ],
    [
      "2025-03-10",
      22.6
    ],
    [
      "2025-03-12",
      22.6
    ],
    [
      "2025-04-03",
      22.6
    ],
    [
      "2025-04-05",
      22.6
    ],
    [
      "2025-04-09",
      22.6
    ],
    [
      "2025-04-10",
      22.6
    ],
    [
      "2025-04-11",
      147.6
    ],
    [
      "2025-04-12",
      147.6
    ],
    [
      "2025-05-03",
      147.6
    ],
    [
      "2025-05-14",
      32.6
    ]
  ],
  "china_to_row": [
    [
      "2025-01-01",
      6.5
    ],
    [
      "2025-01-20",
      6.5
    ],
    [
      "2025-02-04",
      6.5
    ],
    [
      "2025-02-07",
      6.5
    ],
    [
      "2025-02-10",
      6.5
    ],
    [
      "2025-03-04",
      6.5
    ],
    [
      "2025-03-10",
      6.5
    ],
    [
      "2025-03-12",
      6.5
    ],
    [
      "2025-04-03",
      6.5
    ],
    [
      "2025-04-05",
      6.5
    ],
    [
      "2025-04-09",
      6.5
    ],
    [
      "2025-04-10",
      6.5
    ],
    [
      "2025-04-11",
      6.5
    ],
    [
      "2025-04-12",
      6.5
    ],
    [
      "2025-05-03",
      6.5
    ],
    [
      "2025-05-14",
      6.5
    ]
  ],
  "us_to_china": [
    [
      "2025-01-01",
      20.8
    ],
    [
      "2025-01-20",
      20.8
    ],
    [
      "2025-02-04",
      30.8
    ],
    [
      "2025-02-07",
      30.8
    ],
    [
      "2025-02-10",
      30.8
    ],
    [
      "2025-03-04",
      40.8
    ],
    [
      "2025-03-10",
      40.8
    ],
    [
      "2025-03-12",
      42.1
    ],
    [
      "2025-04-03",
      42.1
    ],
    [
      "2025-04-05",
      49.5
    ],
    [
      "2025-04-09",
      49.5
    ],
    [
      "2025-04-10",
      134.7
    ],
    [
      "2025-04-11",
      124.1
    ],
    [
      "2025-04-12",
      124.1
    ],
    [
      "2025-05-03",
      126.5
    ],
    [
      "2025-05-14",
      51.1
    ]
  ],
  "us_to_row": [
    [
      "2025-01-01",
      3.0
    ],
    [
      "2025-01-20",
      3.0
    ],
    [
      "2025-02-04",
      3.0
    ],
    [
      "2025-02-07",
      3.0
    ],
    [
      "2025-02-10",
      3.0
    ],
    [
      "2025-03-04",
      3.0
    ],
    [
      "2025-03-10",
      3.0
    ],
    [
      "2025-03-12",
      3.8
    ],
    [
      "2025-04-03",
      5.2
    ],
    [
      "2025-04-05",
      10.5
    ],
    [
      "2025-04-09",
      15.7
    ],
    [
      "2025-04-10",
      10.5
    ],
    [
      "2025-04-11",
      10.5
    ],
    [
      "2025-04-12",
      10.5
    ],
    [
      "2025-05-03",
      11.7
    ],
    [
      "2025-05-14",
      11.7
    ]
  ],
  "events": {
    "2025-01-01": "China adjusts MFN tariff rates for 2025; US Section 301 tariffs imposed adjusted on selected Chinese products, including tungsten, wafers, and polysilicon",
    "2025-01-20": "Trump administration starts, Biden administration ends",
    "2025-02-04": "US tariffs of 10 percent imposed on all imports from China under International Emergency Economic Powers Act (IEEPA)",
    "2025-02-07": "US Section 201 tariffs reduced on solar panels in eighth year of policy",
    "2025-02-10": "China retaliates against US tariffs under IEEPA imposed February 4",
    "2025-03-04": "US tariffs of 10 percent on all imports from China under IEEPA; US tariffs imposed on imports from Canada and Mexico that are not compliant with USMCA [not shown]",
    "2025-03-10": "China retaliates against US tariffs under IEEPA imposed March 4",
    "2025-03-12": "US Section 232 tariffs imposed on steel, aluminum, and derivative products",
    "2025-04-03": "US Section 232 tariffs of 25 percent imposed on automobiles",
    "2025-04-05": "US tariffs of 10 percent imposed on nearly all countries, including China, under IEEPA, but with some sector carveouts",
    "2025-04-09": "US tariffs ranging from 1 percent to 74 percent imposed on nearly all countries with a trade surplus with the US, including China (74 percent), under IEEPA. US tariff on China includes an additional 50 percent tariff as counter-retaliation for China��s retaliation announcement",
    "2025-04-10": "China retaliates against US tariffs under IEEPA imposed April 5 and 9 by imposing tariffs of 84 percent; US eliminates tariffs imposed April 9 on trade surplus countries under IEEPA with exception of China, which faces an additional 41 percent tariff increase under IEEPA (to 125 percent total), but with some sector carveouts",
    "2025-04-11": "US removes some additional tariffs imposed under IEEPA on April 5, 9, and 10, carving out some additional products that contain semiconductors",
    "2025-04-12": "China retaliates against US tariffs under IEEPA imposed April 10, to reach levels of recent US tariff increases of 125 percent",
    "2025-05-03": "US Section 232 tariffs of 25 percent imposed on automobile parts",
    "2025-05-14": "US reduces to 10 percent from 125 percent the cumulative tariffs under IEEPA imposed on certain imports from China on April 5, 9 and 10; China reduces to 10 percent from 125 percent the cumulative retaliation to the IEEPA tariffs China had imposed on April 10 and 12"
  }
};

const tariffSeries = [
  { name: "China → US", data: tariffData.china_to_us },
  { name: "China → ROW", data: tariffData.china_to_row },
  { name: "US → China", data: tariffData.us_to_china },
  { name: "US → ROW", data: tariffData.us_to_row }
].map(item => ({
  name: item.name,
  type: 'line',
  smooth: true,
  yAxisIndex: 1,
  showSymbol: true,
  symbolSize: 6,
  data: item.data
}));

const emotionSeries = [
  { name: "fear", data: emotionData.fear },
].map(item => ({
  name: item.name,
  type: 'line',
  smooth: true,
  yAxisIndex: 1,
  showSymbol: true,
  symbolSize: 6,
  data: item.data
}));


const option = {
  title: {
    text: 'Tariffs and Emotion Trends',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {
    top: 30
  },
  toolbox: {
    feature: {
      dataZoom: { yAxisIndex: 'none' },
      restore: {},
      saveAsImage: {}
    }
  },
  axisPointer: {
    link: [{ xAxisIndex: 'all' }]
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    },
    {
      type: 'inside',
      realtime: true,
      start: 0,
      end: 100,
      xAxisIndex: [0, 1]
    }
  ],
  grid: [
    {
      left: 60,
      right: 40,
      height: '35%'
    },
    {
      left: 60,
      right: 40,
      top: '55%',
      height: '35%'
    }
  ],
  xAxis: [
    {
      type: 'time',
      name: 'Date',
      min: '2025-01-01',
      max: '2025-05-14',
    },
    {
      gridIndex: 1,
      type: 'time',
      name: 'Date',
      min: '2025-01-01',
      max: '2025-05-14',
    }
  ],
  yAxis: [
    {
      name: 'Tariff Rate (%)',
      type: 'value',
      min: 0,
      max: 30
    },
    {
      gridIndex: 1,
      name: 'Emotion Count',
      type: 'value',
      min: 0
    }
  ],
  series: [
    {
      name: 'Chinese tariffs on US exports',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      data: tariffData.china_to_us
    },
    {
      name: 'Chinese tariffs on ROW exports',
      type: 'line',
      symbol: 'triangle',
      symbolSize: 8,
      data: tariffData.china_to_row
    },
    {
      name: 'US tariffs on Chinese exports',
      type: 'line',
      symbol: 'diamond',
      symbolSize: 8,
      data: tariffData.us_to_china
    },
    {
      name: 'US tariffs on ROW exports',
      type: 'line',
      symbol: 'square',
      symbolSize: 8,
      data: tariffData.us_to_row
    },
    {
      name: 'Fear',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.fear
    },
    {
      name: 'Netural',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.neutral
    },
    {
      name: 'Anger',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.anger
    },
    {
      name: 'Sadness',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.sadness
    },
    {
      name: 'Joy',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.joy
    },
    {
      name: 'Disgust',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.disgust
    },
    {
      name: 'Surprise',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: emotionData.surprise
    },
    {
      type: 'pie',
      id: 'emotion-pie',
      radius: '30%',
      center: ['50%', '85%'],
      label: {
        formatter: '{b}: {c} ({d}%)'
      },
      data: []
    }
  ]
};

Chart10.setOption(option);



Chart10.on('updateAxisPointer', function (event) {
  const xAxisInfo = event.axesInfo[0];
  if (xAxisInfo) {
    const dateStr = echarts.format.formatTime('yyyy-MM-dd', xAxisInfo.value);
    const dateIdx = emotionData.dates.indexOf(dateStr);
    if (dateIdx !== -1) {
      const pieData = Object.keys(emotionData).filter(key => key !== 'dates').map(emotion => ({
        name: emotion,
        value: emotionData[emotion][dateIdx][1]  // [date, value]
      }));

      Chart10.setOption({
        series: [{
          id: 'emotion-pie',
          data: pieData
        }]
      });
    }
  }
});

window.addEventListener('resize', function () {
  Chart10.resize();
});

