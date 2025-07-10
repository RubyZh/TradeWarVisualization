const chartDom1 = document.getElementById('emotion-chart1');
const Chart1 = echarts.init(chartDom1);

fetch('data/emotion_parallel.json')
  .then(response => response.json())
  .then(data => {
    const schema = [
      { dim: 0, name: 'Country' ,type: 'category', axisLabel: { align: 'right', margin: -10 }},
      { dim: 1, name: 'ChinaAgree' },
      { dim: 2, name: 'USAgree' },
      { dim: 3, name: 'anger' },
      { dim: 4, name: 'disgust' },
      { dim: 5, name: 'fear' },
      { dim: 6, name: 'joy' },
      { dim: 7, name: 'neutral' },
      { dim: 8, name: 'sadness' },
      { dim: 9, name: 'surprise' },
      { dim: 10, name: 'Total' }
    ];

Chart1.setOption({
  parallelAxis: schema.map(s => ({
  dim: s.dim,
  name: s.name,
  type: s.type,
  axisLabel: s.axisLabel || {},
  })),
  visualMap: {
    type: 'continuous',
    dimension: 11,
    min: 0.1,
    max: 7,
    calculable: true,
    inRange: {
      color: ['#1586ff', '#e4b9f0', '#f71e17']
    }
  },
  tooltip: {
    formatter: function (params) {
      const values = params.data;
      return [
        `<strong>${values[0]}</strong>`,
        `ChinaAgree: ${values[1]}`,
        `USAgree: ${values[2]}`,
        `Anger: ${values[3]}`,
        `Disgust: ${values[4]}`,
        `Fear: ${values[5]}`,
        `Joy: ${values[6]}`,
        `Neutral: ${values[7]}`,
        `Sadness: ${values[8]}`,
        `Surprise: ${values[9]}`,
        `Total: ${values[10]}`,
      ].join('<br>');
    }
  },
  parallel: {
    left: '15%',
    right: '5%',
    bottom: '5%',
    top: '5%',
  },
  series: {
    type: 'parallel',
    lineStyle: {
      width: 2,
      opacity: 0.6
    },
    data: data
  }
  });
});


window.addEventListener('resize', function () {
  Chart1.resize();
});