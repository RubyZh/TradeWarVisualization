var chartDom0 = document.getElementById('emotion-chart0');
var Chart0 = echarts.init(chartDom0);

var option0 = {
    title: {
      text: 'Emotion Flow: Country → Top1 Emotions'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        data: [{'name': 'neutral'}, {'name': 'joy'}, {'name': 'Japan'}, {'name': 'Malaysia'}, {'name': 'Canada'}, {'name': 'Australia'}, {'name': 'Ireland'}, {'name': 'France'}, {'name': 'United Kingdom'}, {'name': 'Belgium'}, {'name': 'Greece'}, {'name': 'India'}, {'name': 'anger'}, {'name': 'China'}, {'name': 'fear'}, {'name': 'Azerbaijan'}, {'name': 'Philippines'}, {'name': 'disgust'}, {'name': 'Indonesia'}, {'name': 'Bangladesh'}, {'name': 'Thailand'}, {'name': 'Pakistan'}, {'name': 'surprise'}, {'name': 'sadness'}, {'name': 'Nigeria'}, {'name': 'Singapore'}, {'name': 'New Zealand'}, {'name': 'United States'}],
        links: [{'source': 'United States', 'target': 'neutral', 'value': 562}, {'source': 'United States', 'target': 'fear', 'value': 371}, {'source': 'United States', 'target': 'surprise', 'value': 21}, {'source': 'United States', 'target': 'anger', 'value': 293}, {'source': 'United States', 'target': 'sadness', 'value': 76}, {'source': 'United States', 'target': 'disgust', 'value': 33}, {'source': 'United States', 'target': 'joy', 'value': 14}, {'source': 'Canada', 'target': 'fear', 'value': 168}, {'source': 'Canada', 'target': 'sadness', 'value': 50}, {'source': 'Canada', 'target': 'anger', 'value': 150}, {'source': 'Canada', 'target': 'neutral', 'value': 327}, {'source': 'Canada', 'target': 'disgust', 'value': 10}, {'source': 'Canada', 'target': 'joy', 'value': 11}, {'source': 'United Kingdom', 'target': 'fear', 'value': 128}, {'source': 'United Kingdom', 'target': 'anger', 'value': 70}, {'source': 'United Kingdom', 'target': 'neutral', 'value': 100}, {'source': 'Ireland', 'target': 'fear', 'value': 30}, {'source': 'Ireland', 'target': 'neutral', 'value': 35}, {'source': 'Ireland', 'target': 'anger', 'value': 14}, {'source': 'Belgium', 'target': 'neutral', 'value': 12}, {'source': 'Belgium', 'target': 'fear', 'value': 12}, {'source': 'France', 'target': 'fear', 'value': 12}, {'source': 'France', 'target': 'neutral', 'value': 13}, {'source': 'Greece', 'target': 'neutral', 'value': 17}, {'source': 'Azerbaijan', 'target': 'neutral', 'value': 14}, {'source': 'Nigeria', 'target': 'neutral', 'value': 10}, {'source': 'Nigeria', 'target': 'fear', 'value': 14}, {'source': 'Nigeria', 'target': 'anger', 'value': 17}, {'source': 'China', 'target': 'neutral', 'value': 84}, {'source': 'China', 'target': 'fear', 'value': 56}, {'source': 'China', 'target': 'joy', 'value': 11}, {'source': 'China', 'target': 'sadness', 'value': 13}, {'source': 'China', 'target': 'anger', 'value': 57}, {'source': 'Japan', 'target': 'fear', 'value': 11}, {'source': 'India', 'target': 'anger', 'value': 105}, {'source': 'India', 'target': 'fear', 'value': 109}, {'source': 'India', 'target': 'neutral', 'value': 149}, {'source': 'India', 'target': 'sadness', 'value': 14}, {'source': 'Pakistan', 'target': 'fear', 'value': 19}, {'source': 'Pakistan', 'target': 'neutral', 'value': 22}, {'source': 'Pakistan', 'target': 'anger', 'value': 14}, {'source': 'Bangladesh', 'target': 'neutral', 'value': 14}, {'source': 'Bangladesh', 'target': 'fear', 'value': 16}, {'source': 'Bangladesh', 'target': 'anger', 'value': 11}, {'source': 'Thailand', 'target': 'fear', 'value': 13}, {'source': 'Thailand', 'target': 'neutral', 'value': 13}, {'source': 'Malaysia', 'target': 'neutral', 'value': 22}, {'source': 'Malaysia', 'target': 'fear', 'value': 12}, {'source': 'Singapore', 'target': 'anger', 'value': 19}, {'source': 'Singapore', 'target': 'neutral', 'value': 37}, {'source': 'Singapore', 'target': 'fear', 'value': 19}, {'source': 'Philippines', 'target': 'neutral', 'value': 13}, {'source': 'Indonesia', 'target': 'neutral', 'value': 15}, {'source': 'Australia', 'target': 'fear', 'value': 26}, {'source': 'Australia', 'target': 'neutral', 'value': 61}, {'source': 'Australia', 'target': 'anger', 'value': 54}, {'source': 'Australia', 'target': 'disgust', 'value': 10}, {'source': 'New Zealand', 'target': 'fear', 'value': 12}, {'source': 'New Zealand', 'target': 'anger', 'value': 12}],
        emphasis: {
          focus: 'adjacency'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        }
      }
    ]
  };

Chart0.setOption(option0);