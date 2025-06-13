var Chart2 = echarts.init(document.getElementById('tariff-chart2'));

var option2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      axis: 'x',
      label: {
        backgroundColor: '#aaa'
      }
    }
  },
  legend: {
    data: ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise']
  },
  singleAxis: {
    top: 50,
    bottom: 50,
    axisTick: {},
    axisLabel: {},
    type: 'time',
    axisPointer: {
      animation: true,
      label: {
        show: true
      }
    }
  },
  series: [
    {
      type: 'themeRiver',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.8)'
        }
      },
      data: "data/theme_river_data.json",
    }
  ]
};

Chart2.setOption(option2);