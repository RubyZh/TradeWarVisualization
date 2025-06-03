See Example.html

将图表的内容放在asset/js/xxxxxchart.js中，示例是examplechart.js

在需要插入图表的html内对应的位置，添加以下代码：

```
<div id="example-chart0" style="width: 100%; height: 100%; margin: auto;"></div>
```

id的内容可以修改，需要同examplechart.js最后的vegaEmbed('#example-chart0', spec)中的id一致

在文档最后<!-- Scripts -->部分加上

```
<script src="assets/js/examplechart.js"></script>
```

src对应修改路径

图表写在js文件中，如果需要背景颜色的设置和文字，可以参考tariff.js

把数据放在data文件夹下，excel不支持，改掉url即可

使用vscode的插件Live Server打开可以实时预览，解决数据无法显示的问题

"tranform"是对数据的一些处理

"mark"选择图表类型,包括"area", "bar", "circle", "line", "point", "rect", "rule", "square", "text", "tick", and "geoshape"，具体可看https://vega.github.io/vega-lite/docs/mark.html

"encoding"的部分将数据对应x轴y轴,设置颜色,透明度,线型,具体参考https://vega.github.io/vega-lite/docs/encoding.html

配合"params"可设置交互
