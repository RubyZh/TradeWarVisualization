const datasets = {
	top150: top150,
	top100_cn: top100_cn,
	top100_us: top100_us,
	top100_in: top100_in
};

const chart = echarts.init(document.getElementById('wordcloudCanvas'));

function transformData(data) {
  return data.map(item => ({
    name: item.Keyword,
    value: item.Count
  }));
}

const wordcloudData = transformData(top150);

function transformData(data) {
    return data.map(item => ({
      name: item.Keyword,
      value: item.Count
    }));
  }

  function updateChart(sourceName, title) {
    document.getElementById("title").innerText = title;

    const option = {
      tooltip: {},
      series: [
        {
          type: 'wordCloud',
          gridSize: 2,
          sizeRange: [18, 70],
          rotationRange: [-90, 90],
          shape: 'pentagon', //'cardioid','triangleForward','diamond','pentagon','star','circle','triangleBackward',
          width: '100%',
          height: '100%',
          drawOutOfBound: false,
          textStyle: {
            fontFamily: 'Microsoft YaHei, sans-serif',
            color: () => {
              const colors = ['#00c6ff', '#0072ff', '#20bf6b', '#fc5c65', '#f7b731', '#a55eea'];
              return colors[Math.floor(Math.random() * colors.length)];
            }
          },
          emphasis: {
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: transformData(datasets[sourceName])
        }
      ]
    };

    chart.setOption(option);
  }

// 初始化默认数据
updateChart("top150", "Global News Keywords");

// 监听按钮点击切换数据集
document.querySelectorAll('#sidebar2 button[data-source]').forEach(btn => {
btn.addEventListener('click', () => {
	const source = btn.getAttribute('data-source');
	const title = btn.getAttribute('data-title');
	updateChart(source, title);
});
});

// 下载按钮
document.getElementById("downloadBtn").addEventListener("click", () => {
const url = chart.getDataURL({
	pixelRatio: 2,
	backgroundColor: "#fff"
});
const a = document.createElement("a");
a.href = url;
a.download = "wordcloud.png";
a.click();
});

// 自适应窗口
window.addEventListener('resize', () => {
	chart.resize();
});