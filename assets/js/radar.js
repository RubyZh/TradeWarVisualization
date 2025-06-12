    var mainstream = [28.82, 37.73, 22.9, 5.14, 1.5, 2.43, 1.5];
    var niche = [25.34, 42.74, 20.82, 4.93, 2.19, 2.05, 1.92];

    var chart12 = echarts.init(document.getElementById('mediaradar'));
    var option = {
      tooltip: {},
      legend: {
        data: ['Mainstream Media', 'Niche Media'],
        top: 30
      },
      radar: {
        shape: 'circle',
        radius: '60%',
        indicator: [
          { name: 'Fear', max: 30 },
          { name: 'Neutral', max: 45 },
          { name: 'Anger', max: 25 },
          { name: 'Sadness', max: 6 },
          { name: 'Joy', max: 3 },
          { name: 'Disgust', max: 3 },
          { name: 'Surprise', max: 2.5 }
        ]
      },
      series: [{
        name: 'Emotion Comparison',
        type: 'radar',
        data: [
          {
            value: mainstream,
            name: 'Mainstream Media',
            areaStyle: { opacity: 0.2 }
          },
          {
            value: niche,
            name: 'Niche Media',
            areaStyle: { opacity: 0.2 }
          }
        ]
      }]
    };
    chart12.setOption(option);
window.addEventListener('resize', function () {
  chart12.resize();
});