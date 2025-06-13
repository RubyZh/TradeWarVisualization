const datasets = {
	top150: top150,
	top100_cn: top100_cn,
	top100_us: top100_us,
	top100_in: top100_in
};
const canvas = document.getElementById('wordcloudCanvas');
const maskImg = document.getElementById('maskImg');
const title = document.getElementById('title');
const buttons = document.querySelectorAll('#sidebar2 button');

let currentDataset = 'top150';

function resizeCanvas() {
const dpr = window.devicePixelRatio || 1;
canvas.style.width = '800px';
canvas.style.height = '600px';
canvas.width = 800 * dpr;
canvas.height = 600 * dpr;
}

function drawWordCloud() {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除旧内容

	const data = datasets[currentDataset];
	const wordList = data.map(item => [item.Keyword, item.Count]);
	const maxCount = Math.max(...data.map(d => d.Count));
	const tooltip = document.getElementById('tooltip');

	// 👇 判断当前数据源，设置字号放大倍率
	const zoomFactors = {
	top150: 1,
	top100_cn: 3.5,
	top100_us: 1.5,
	top100_in: 2.0
	};
	const zoomFactor = zoomFactors[currentDataset] || 1.5; // 设置默认值防止报错

	WordCloud(canvas, {
		list: wordList,
		gridSize: 6,
		weightFactor: (size) => zoomFactor * Math.sqrt(size) * 6,
		minSize: 8,
		fontFamily: "'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
		color: () => {
			const gradients = ['#00c6ff', '#0072ff', '#20bf6b', '#fc5c65', '#f7b731', '#a55eea'];
			return gradients[Math.floor(Math.random() * gradients.length)];
		},
		rotateRatio: 0.4,
		rotationSteps: 6,
		backgroundColor: 'rgba(255,255,255,0)',
		drawOutOfBound: false,
		shuffle: true,
		maskImage: maskImg,
		hover: function (item, dimension, event) {
			if (item) {
				tooltip.innerHTML = `<strong>${item[0]}</strong><br>frequency: ${item[1]}`;
				tooltip.classList.add('visible');
				requestAnimationFrame(() => {
				const tooltipWidth = tooltip.offsetWidth;
				const tooltipHeight = tooltip.offsetHeight;
				const viewportX = event.pageX - window.pageXOffset-500;
				const viewportY = event.pageY - window.pageYOffset+10;
				const left = Math.min(viewportX + 10, window.innerWidth - tooltipWidth - 10);
				const top = Math.min(viewportY + 10, window.innerHeight - tooltipHeight - 10);
				tooltip.style.left = left + 'px';
				tooltip.style.top = top + 'px';
				});
			} else {
				tooltip.classList.remove('visible');
			}
		}
	});
}


function init() {
resizeCanvas();
if (maskImg.complete) {
	drawWordCloud();
} else {
	maskImg.onload = drawWordCloud;
}
}

document.getElementById('downloadBtn').addEventListener('click', () => {
const link = document.createElement('a');
	link.download = `${currentDataset}_wordcloud.png`;
	link.href = canvas.toDataURL('image/png');
	link.click();
});


window.addEventListener("resize", () => {
resizeCanvas();
drawWordCloud();
});

buttons.forEach(button => {
button.addEventListener('click', () => {
	currentDataset = button.getAttribute('data-source');
	const newTitle = button.getAttribute('data-title');
	title.textContent = `🌟 Word Cloud - ${newTitle}`;
	drawWordCloud();
});
});

init();