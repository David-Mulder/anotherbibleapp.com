fetch('../topical/topic-votes.txt').then((response) => response.text()).then(function(text){
  var lines = text.split('\n');
  lines = lines.map(line => line.split('\t'));
  lines.forEach(line => line.shift());
  lines = lines.map(line => line.map(n => parseInt(n)));
  lines.forEach(line => line[2] = Math.max(200, line[2]));
  lines.forEach(line => line[3] = line[2] / (line[1] - line[0]));
  lines = lines.filter(line => line[1] - line[0] < 20);

  var scoreCutOff = 100;
  var scoreCutOffLog = Math.log2(scoreCutOff);
  window.topicalCounter = function(v){
    var count = lines.reduce((prev, cur, i) => v >= cur[0] && v <= cur[1] ? prev + cur[3] : prev, 0);
    count = Math.max(count, scoreCutOff);
    return Math.round(Math.log2(count) - scoreCutOffLog);
  };
});
