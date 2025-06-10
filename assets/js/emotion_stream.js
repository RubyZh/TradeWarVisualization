var chart = echarts.init(document.getElementById('emotion-chart'));

				fetch('崔的暂存/emotion_stream_data.json')
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
						data: json.data.map(s => s.name)
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
						data: json.timeline
						}],
						yAxis: [{
						type: 'value'
						}],
						series: json.data
					});
					});