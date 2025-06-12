    var chartDom = document.getElementById('tariff-emotion');
    var Chart10 = echarts.init(chartDom);

    var emotions = datasetSource.slice(1).map(row => row[0]);
    var dates = datasetSource[0].slice(1);  // Remove "emotion" header

    var seriesData = datasetSource.slice(1).map(row => {
      return {
        name: row[0],
        type: 'line',
        smooth: true,
        showSymbol: true,
        emphasis: { focus: 'series' },
        data: dates.map((date, i) => [date, row[i + 1]])
      };
    });

    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        top: 'top'
      },
      xAxis: {
        type: 'time',
        name: 'Date',
        min: '2025-01-01',
        max: '2025-05-14',
        splitNumber: 13, // 控制大致分成多少段（约等于每周）
        axisLabel: {
          formatter: function (value) {
            var date = new Date(value);
            return echarts.format.formatTime('MM-dd', date);  // e.g., 01-08
          }
        }
      },
      yAxis: {
        name: 'Number of News Articles'
      },
      grid: {
        top: '8%',
        bottom: '40%'  // 留出空间给底部饼图
      },
      series: [
        ...seriesData,
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '85%'],  // 显示在底部
          emphasis: { focus: 'self' },
          label: {
            formatter: '{b}: {@[' + 1 + ']} ({d}%)'
          },
          encode: {
            itemName: 'emotion',
            value: 1,
            tooltip: 1
          },
          data: emotions.map((emotion, idx) => ({
            name: emotion,
            value: datasetSource[idx + 1][1] // 初始显示第一天数据
          }))
        }
      ]
    };

    Chart10.setOption(option);

    // 联动更新饼图
    Chart10.on('updateAxisPointer', function (event) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const currentDate = new Date(xAxisInfo.value);
        let nearestIndex = 0;
        let minDiff = Infinity;

        dates.forEach((dateStr, idx) => {
          const diff = Math.abs(new Date(dateStr) - currentDate);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = idx;
          }
        });

        Chart10.setOption({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + (nearestIndex + 1) + ']} ({d}%)'
            },
            encode: {
              value: nearestIndex + 1,
              tooltip: nearestIndex + 1
            },
            data: emotions.map((emotion, i) => ({
              name: emotion,
              value: datasetSource[i + 1][nearestIndex + 1]
            }))
          }
        });
      }
    });

    window.addEventListener('resize', function () {
  Chart10.resize();
});

