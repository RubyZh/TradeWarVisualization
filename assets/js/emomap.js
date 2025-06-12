const chart11 = echarts.init(document.getElementById('emotionMapContainer'));

chart11.setOption({
  title: {
    text: 'Global Emotion Map - US-China Trade War',
    left: 'center',
    top: 10,
    textStyle: {
      fontSize: 16
    }
  },
  tooltip: {
    trigger: 'item',
    enterable: true,
    backgroundColor: 'rgba(250, 250, 255, 0.95)',
    borderColor: '#a3c1ff',
    borderWidth: 1,
    borderRadius: 8,
    textStyle: { color: '#333', fontSize: 12 },
    formatter: function(params) {
      const emotions = tooltipEmotions[params.name];
      if (!emotions) return `${params.name}<br/>No Emotion Data`;
      const pieId = 'pie-' + params.name.replace(/\s/g, '_');

      setTimeout(() => {
        const pieChart = echarts.init(document.getElementById(pieId));
        pieChart.setOption({
          series: [{
            type: 'pie',
            radius: '40%',
            data: emotions,
            label: {
              formatter: '{b}: {d}%',
              fontSize: 10
            }
          }]
        });
      }, 10);

      return `
        <div><strong>${params.name}</strong></div>
        <div style='width:300px;height:160px;' id='${pieId}'></div>
      `;
    }
  },
  visualMap: {
    min: -2,
    max: 2,
    text: ['Positive', 'Negative'],
    textStyle: { fontSize: 12 },
    calculable: true,
    inRange: {
      color: ['#d94e5d', '#eac736', '#50a3ba']
    },
    left: 'left',
    bottom: '5%'
  },
  series: [{
    type: 'map',
    map: 'world',
    name: 'Emotion Score',
    roam: true,
    data: mapData
  }]
});

// Store chart instances in compareBox
const compareCharts = [];

chart11.on('click', function(params) {
  const country = params.name;
  const emotions = tooltipEmotions[country];
  if (!emotions) return;

  const containerId = 'compare-' + country.replace(/\s/g, '_');

  const existing = document.getElementById(containerId);
  if (existing) existing.remove();

  const box = document.createElement('div');
  box.className = 'compare-chart';
  box.id = containerId;

  box.innerHTML = `
    <div class="chart-title">${country}</div>
    <div id="${containerId}-chart" style="width:100%;height:140px;"></div>
  `;
  document.getElementById('compareBox').appendChild(box);

  const pie = echarts.init(document.getElementById(`${containerId}-chart`));
    pie.setOption({
    series: [{
        type: 'pie',
        radius: '40%', // 更大扇区
        label: {
        position: 'outside',  // 外部显示更稳定
        formatter: '{b}: {d}%',
        fontSize: 11
        },
        data: emotions
    }]
    });


  // Store chart instance for later resizing
  compareCharts.push({
    id: containerId,
    instance: pie
  });
});

// Listen for window resize and adjust chart sizes
window.addEventListener('resize', function() {
  chart11.resize();

  compareCharts.forEach(chart => {
    if (document.getElementById(`${chart.id}-chart`)) {
      chart.instance.resize();
    }
  });
});