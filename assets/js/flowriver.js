    // Initialize chart instance
    var chart = echarts.init(document.getElementById('emotion_river'));

    // Load JSON data
    fetch('data/emotion_stream_data.json')
      .then(res => res.json())
      .then(json => {
        chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            top: '5%',
            data: json.data.map(s => s.name),
            textStyle: {
              color: '#333'
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: json.timeline,
            axisLabel: {
              formatter: function (value, index) {
                return json.xLabels[index] || '';  // Only show specified date labels
              },
              interval: 0,
              rotate: 45
            },
            name: 'Date',
            nameLocation: 'middle',
            nameGap: 30
          }],
          yAxis: [{
            type: 'value',
            name: 'Number of News Articles'
          }],
          series: json.data
        });
      })
      .catch(err => {
        console.error("❌ Failed to load JSON data:", err);
      });
  window.addEventListener('resize', function () {
  chart.resize();
});
